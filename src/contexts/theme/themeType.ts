// テーマの型を 'light' または 'dark' に限定 
export type Theme = 'light' | 'dark';

/** 
 * ThemeContextの型定義
 * テーマの状態と更新関数
 */
export interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}