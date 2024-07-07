"use client";

import React from 'react';
import HomeScreen from '@/features/books/HomeScreen/HomeScreen';
import { useTheme } from '@/contexts/ThemeContext';

const BooksPage: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <HomeScreen />
    );
};

export default BooksPage;