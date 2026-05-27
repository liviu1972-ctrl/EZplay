export interface UserProfile {
  uid: string;
  email?: string | null;
  displayName: string;
  nickname: string;
  companyName: string;
  avatarUrl: string;
  role: string;
  ezc: number;
  ezg: number;
  createdAt?: number;
  lastLogin?: number;
}
