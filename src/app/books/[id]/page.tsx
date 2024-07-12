"use client";

import React from 'react';
import { useTheme } from '@/contexts/theme/useTheme';
import BookDetailHeader from '@/features/BookDetail/BookDetailHeader';
import { useAuth } from '@/hooks/useAuth';

const BookDetailPage: React.FC = () => {
    const { theme } = useTheme();
    const { user, loading, authChecked } = useAuth();

    const handleSave = () => {
        // 保存ロジック
        console.log('Saving book details...');
    };

    if (loading || !authChecked) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

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