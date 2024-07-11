"use client";

import React from 'react';
import { useTheme } from '@/contexts/theme/useTheme';
import BookDetailHeader from '@/features/BookDetail/BookDetailHeader';

const BookDetailPage: React.FC = () => {
    const { theme } = useTheme();

    const handleSave = () => {
        // 保存ロジック
        console.log('Saving book details...');
    };

    return (
        <div className={`min-h-screen pt-16 ${theme === 'dark' ? 'bg-[#2E2E2E] text-white' : 'bg-[#ebebeb] text-black'}`}>
            <BookDetailHeader onSave={handleSave} />
            <div className="p-4">
                {/* コンテンツ */}
                <h1>本の詳細ページ</h1>
            </div>
        </div>
    );
};

export default BookDetailPage;