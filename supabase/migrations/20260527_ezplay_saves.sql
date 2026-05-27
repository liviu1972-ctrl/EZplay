create table if not exists ezplay_saves (
  user_id uuid primary key references auth.users(id) on delete cascade,
  game_state jsonb not null,
  metadata jsonb not null,
  updated_at timestamptz default now()
);

alter table ezplay_saves enable row level security;
create policy "ezplay_saves_own_read" on ezplay_saves for select using (user_id = auth.uid());
create policy "ezplay_saves_own_insert" on ezplay_saves for insert with check (user_id = auth.uid());
create policy "ezplay_saves_own_update" on ezplay_saves for update using (user_id = auth.uid());
