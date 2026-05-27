import { AuthProvider } from '@/features/ezplay/platform/auth/AuthContext';

export default function EZPlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
