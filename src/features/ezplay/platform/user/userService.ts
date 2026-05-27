import { createClient } from '@/lib/supabase/client';
import { UserProfile } from './types';

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const supabase = createClient();
  const { data: profile } = await supabase.from('user_profiles').select('*').eq('id', uid).single();
  if (!profile) return null;
  
  const { data: wallet } = await supabase.from('wallets').select('*').eq('user_id', uid).single();

  return {
    uid: profile.id,
    displayName: profile.display_name,
    nickname: profile.display_name, // Map display name to nickname for now
    companyName: 'Start-up SRL', 
    avatarUrl: profile.avatar_url || 'https://ezplay.org/cards/base-game/a102.webp',
    role: profile.role || 'standard',
    ezc: wallet?.ezc_balance || 0,
    ezg: wallet?.ezg_balance || 0,
  };
};

export const processTransaction = async (
  uid: string, 
  currency: 'ezc' | 'ezg', 
  amount: number, 
  reason: string
): Promise<void> => {
  const supabase = createClient();
  // Call RPC or insert into ledger depending on how wallets are updated.
  // Assuming a basic insert into token_transactions triggers wallet update, or we manually update wallet.
  // We'll update the wallet directly for now if RLS allows, or insert into transactions.
  await supabase.from('token_transactions').insert({
    user_id: uid,
    token_type: currency,
    delta: amount,
    reason: reason
  });
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>): Promise<void> => {
  const supabase = createClient();
  await supabase.from('user_profiles').update({
    display_name: data.displayName,
    avatar_url: data.avatarUrl
  }).eq('id', uid);
};

export const getAllUsers = async (): Promise<UserProfile[]> => {
  const supabase = createClient();
  const { data } = await supabase.from('user_profiles').select('*');
  return (data || []).map(p => ({
    uid: p.id,
    displayName: p.display_name,
    nickname: p.display_name,
    companyName: 'Start-up SRL',
    avatarUrl: p.avatar_url,
    role: p.role,
    ezc: 0,
    ezg: 0
  }));
};
