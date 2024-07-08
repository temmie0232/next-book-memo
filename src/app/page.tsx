"use client"

import { useTheme } from '@/contexts/theme/useTheme';
import LoginForm from '@/features/LoginForm/LoginForm';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {

  const { user, loading, authChecked } = useAuth();
  const { theme } = useTheme();

  // 認証状態のロード中 => Loading... と表示  
  if (loading || !authChecked) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`container ${theme}`}>
      <LoginForm />
    </div>
  );
}