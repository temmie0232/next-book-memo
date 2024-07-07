"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';

// テーマの型を 'light' または 'dark' に限定
type Theme = 'light' | 'dark';

// ThemeContextの型定義。テーマの状態と更新関数を含む
interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

// ThemeContextの作成。初期値はundefined
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


// ThemeProviderコンポーネント：子コンポーネントにテーマコンテキストを提供
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    // テーマの状態を管理
    const [theme, setTheme] = useState<Theme>('light');

    // コンポーネントのマウント時にローカルストレージからテーマを取得
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    // テーマを設定し、ローカルストレージに保存する関数
    const handleSetTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // ThemeContextの値を子コンポーネントに提供
    return (
        <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// コンポーネントでテーマの状態を使用するためのフック
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        // ThemeProviderの外でuseThemeが使用された場合にエラーを投げる
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};