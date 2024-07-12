"use client"

import { useTheme } from '@/contexts/theme/useTheme';
import LoginForm from '@/features/LoginForm/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import styles from './style.module.css';

export default function Home() {
  const { user, loading, authChecked } = useAuth(false);
  const { theme } = useTheme();

  // 認証状態のロード中 => Loading... と表示  
  if (loading || !authChecked) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={`${styles.container} ${theme}`}>
      <LoginForm />
    </div>
  );
}