-- ============================================================
-- EZPlay Cards System — Migration
-- ============================================================

-- 1. GAMES
-- ============================================================
create table if not exists games (
  id             serial primary key,
  slug           text unique not null,
  name_ro        text not null,
  name_en        text not null,
  description_ro text,
  description_en text,
  version        text not null default '1.0',
  is_active      boolean default true,
  sort_order     integer default 0,
  created_at     timestamptz default now()
);

alter table games enable row level security;
create policy "games_public_read" on games for select using (is_active = true);
create policy "games_admin_all"   on games for all using (
  exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
);

-- 2. CARD_SETS (base-game, expansions)
-- ============================================================
create table if not exists card_sets (
  id             serial primary key,
  slug           text unique not null,
  name_ro        text not null,
  name_en        text not null,
  description_ro text,
  description_en text,
  version        text not null default '1.0',
  price          numeric(10,2),          -- null = gratuit/inclus
  is_base        boolean default false,  -- true = acordat automat la înregistrare
  is_active      boolean default true,
  released_at    date,
  sort_order     integer default 0,
  created_at     timestamptz default now()
);

alter table card_sets enable row level security;
create policy "card_sets_public_read" on card_sets for select using (is_active = true);
create policy "card_sets_admin_all"   on card_sets for all using (
  exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
);

-- 3. CARD_SET_GAMES (many-to-many: set ↔ joc)
-- ============================================================
create table if not exists card_set_games (
  card_set_id integer references card_sets(id) on delete cascade,
  game_id     integer references games(id) on delete cascade,
  primary key (card_set_id, game_id)
);

alter table card_set_games enable row level security;
create policy "card_set_games_public_read" on card_set_games for select using (true);
create policy "card_set_games_admin_all"   on card_set_games for all using (
  exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
);

-- 4. CARD_TYPES
-- ============================================================
create table if not exists card_types (
  id         serial primary key,
  slug       text unique not null,
  name_ro    text not null,
  name_en    text not null,
  sort_order integer default 0
);

alter table card_types enable row level security;
create policy "card_types_public_read" on card_types for select using (true);
create policy "card_types_admin_all"   on card_types for all using (
  exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
);

-- 5. ASSET_TYPES
-- ============================================================
create table if not exists asset_types (
  id       serial primary key,
  slug     text unique not null,
  name_ro  text not null,
  name_en  text not null
);

alter table asset_types enable row level security;
create policy "asset_types_public_read" on asset_types for select using (true);
create policy "asset_types_admin_all"   on asset_types for all using (
  exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
);

-- 6. CARDS (tabelul principal)
-- ============================================================
create table if not exists cards (
  id                serial primary key,
  card_set_id       integer references card_sets(id),
  card_type_id      integer references card_types(id),
  asset_type_id     integer references asset_types(id),

  -- Identificare
  external_id       text not null,         -- ID original din CSV: '101'
  slug              text unique not null,  -- 's101', 'e101', 'a101'

  -- Conținut bilingv
  name_ro           text not null,
  name_en           text not null,
  special_effect_ro text,
  special_effect_en text,

  -- Stats (null = n/a)
  cost              integer,
  production        integer,
  marketing         integer,
  expense           integer,

  -- Mecanici
  calculation       text check (calculation in ('additive', 'choice')),
  format            text check (format in ('portrait', 'landscape')),

  -- Imagini Supabase Storage (path relativ la bucket 'cards')
  image_micro       text,  -- 'base-game/micro/s101.webp'
  image_thumb       text,  -- 'base-game/thumb/s101.webp'
  image_card        text,  -- 'base-game/card/s101.webp'
  image_full        text,  -- 'base-game/full/s101.webp'

  -- Meta
  is_active         boolean default true,
  sort_order        integer default 0,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

alter table cards enable row level security;
create policy "cards_public_read" on cards for select using (is_active = true);
create policy "cards_admin_all"   on cards for all using (
  exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger cards_updated_at
  before update on cards
  for each row execute procedure update_updated_at();

-- 7. USER_OWNED_SETS
-- ============================================================
create table if not exists user_owned_sets (
  id          serial primary key,
  user_id     uuid references auth.users(id) on delete cascade,
  card_set_id integer references card_sets(id),
  acquired_at timestamptz default now(),
  source      text check (source in ('base_included', 'purchase', 'gift', 'admin_grant')),
  unique(user_id, card_set_id)
);

alter table user_owned_sets enable row level security;
create policy "owned_sets_own_read" on user_owned_sets
  for select using (user_id = auth.uid());
create policy "owned_sets_own_insert" on user_owned_sets
  for insert with check (user_id = auth.uid());
create policy "owned_sets_admin_all" on user_owned_sets for all using (
  exists (select 1 from user_profiles where id = auth.uid() and role = 'admin')
);

-- 8. TRIGGER: Acordare automată base-game la înregistrare
-- ============================================================
create or replace function grant_base_sets_on_register()
returns trigger language plpgsql security definer as $$
begin
  insert into user_owned_sets (user_id, card_set_id, source)
  select new.id, id, 'base_included'
  from card_sets
  where is_base = true and is_active = true
  on conflict (user_id, card_set_id) do nothing;
  return new;
end;
$$;

create trigger on_user_profile_created_grant_base_sets
  after insert on user_profiles
  for each row execute procedure grant_base_sets_on_register();

-- ============================================================
-- SEED DATA
-- ============================================================

-- Games
insert into games (slug, name_ro, name_en, version, sort_order) values
  ('ezplay-1', 'EZPlay 1', 'EZPlay 1', '1.0', 1)
on conflict (slug) do nothing;

-- Card Sets
insert into card_sets (slug, name_ro, name_en, version, is_base, sort_order) values
  ('base-game', 'Jocul de bază', 'Base Game', '0.2', true, 1)
on conflict (slug) do nothing;

-- Card Set ↔ Games
insert into card_set_games (card_set_id, game_id)
select cs.id, g.id
from card_sets cs, games g
where cs.slug = 'base-game' and g.slug = 'ezplay-1'
on conflict do nothing;

-- Card Types
insert into card_types (slug, name_ro, name_en, sort_order) values
  ('standard',     'Standard',    'Standard',    1),
  ('event',        'Eveniment',   'Event',       2),
  ('entrepreneur', 'Antreprenor', 'Entrepreneur',3)
on conflict (slug) do nothing;

-- Asset Types
insert into asset_types (slug, name_ro, name_en) values
  ('tangible-assets',   'Active corporale',  'Tangible Assets'),
  ('human-resources',   'Resurse umane',     'Human Resources'),
  ('intangible-assets', 'Active necorporale','Intangible Assets'),
  ('event',             'Eveniment',         'Event'),
  ('entrepreneur',      'Antreprenor',       'Entrepreneur')
on conflict (slug) do nothing;
