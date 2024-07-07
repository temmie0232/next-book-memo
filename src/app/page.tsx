"use client"

import { useTheme } from '@/contexts/ThemeContext';
import LoginForm from '@/features/LoginForm/LoginForm';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user, loading, authChecked } = useAuth();
  const { theme } = useTheme();

  if (loading || !authChecked) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`container ${theme}`}>
      <LoginForm />
    </div>
  );
}