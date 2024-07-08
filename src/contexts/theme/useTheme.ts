import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

/**
 * コンポーネントでテーマの状態を使用するためのフック
 * 
 * @returns {ThemeContextType} テーマの状態と更新関数を含むオブジェクト
 * @throws {Error} ThemeProviderの外でuseThemeが使用された場合
 */
export const useTheme = () => {

    // ReactのuseContextフックを使用してThemeContextの値を取得
    const context = useContext(ThemeContext);

    // コンテキストが未定義の場合（ThemeProviderの外で使用された場合）エラーをスロー
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    // ThemeContextの値（テーマの状態と更新関数）を返す
    return context;
};
