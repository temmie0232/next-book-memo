// ThemeProvider.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import { Theme } from './themeType';

/**
 * ThemeProviderコンポーネント：子コンポーネントにテーマコンテキストを渡す
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - 子コンポーネント
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    // テーマの状態を管理するためのuseState (初期値は'light')
    const [theme, setTheme] = useState<Theme>('light');

    // コンポーネントのマウント時にローカルストレージからテーマを読み込む
    useEffect(() => {
        // ローカルストレージからテーマを取得
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        // 保存されたテーマがあれば、それを現在のテーマとして設定
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []); // 空の依存配列で、このeffectはマウント時にのみ実行される

    // テーマを設定し、ローカルストレージに保存する関数
    const handleSetTheme = (newTheme: Theme) => {
        // 新しいテーマを状態にセット
        setTheme(newTheme);
        // 新しいテーマをローカルストレージに保存
        localStorage.setItem('theme', newTheme);
    };

    // ThemeContextのProviderを返す
    return (
        // ThemeContextに現在のテーマと設定関数を提供
        <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
            {/* このプロバイダーの子コンポーネントをそのまま描画 */}
            {children}
        </ThemeContext.Provider>
    );
};