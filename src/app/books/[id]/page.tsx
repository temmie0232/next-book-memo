"use client";

import React from 'react';
import { useTheme } from '@/contexts/theme/useTheme';

const BookDetailPage: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className={`book-detail-page ${theme}`}>
            <h1>aaa</h1>
        </div>
    );
};

export default BookDetailPage;