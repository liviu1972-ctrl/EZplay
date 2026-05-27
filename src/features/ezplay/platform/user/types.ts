export type UserRole = 'standard' | 'admin' | 'premium';

export interface UserProfile {
  uid: string;
  email?: string | null;
  displayName: string;
  nickname: string;
  companyName: string;
  avatarUrl: string;
  role: UserRole;
  ezc: number;
  ezg: number;
  createdAt?: number;
  lastLogin?: number;
}
