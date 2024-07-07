"use client";

import React from 'react';
import BookList from '../BookList/BookList';
import NavBar from '../NavBar/NavBar';
import { useTheme } from '@/contexts/ThemeContext';
import './HomeScreen.css';

const HomeScreen: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className={`home-screen ${theme}`}>
            <NavBar />
            <div className="content-container">
                <BookList />
            </div>
        </div>
    );
};

export default HomeScreen;