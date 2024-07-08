import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

/**
 * コンポーネントでテーマの状態を使用するためのフック
 * 
 * @returns {ThemeContextType} テーマの状態と更新関数を含むオブジェクト
 * @throws {Error} ThemeProviderの外でuseThemeが使用された場合
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
