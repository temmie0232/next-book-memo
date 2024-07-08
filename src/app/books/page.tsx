"use client";

import React, { useState } from 'react';
import BookList from '@/features/books/BookList/BookList';
import Header from '@/components/header/header';
import { useTheme } from '@/contexts/theme/useTheme';
import './style.css';
import GenreFilter from '@/features/books/GenreFilter/GenreFilter';
import { genres } from "@/types/bookType"


const BooksPage: React.FC = () => {
    const { theme } = useTheme();
    const [selectedGenre, setSelectedGenre] = useState<string>('すべて');

    const handleGenreSelect = (genre: string) => {
        setSelectedGenre(genre);
    };

    return (
        <div className={`books-page ${theme}`}>
            <Header />
            <GenreFilter
                genres={genres}
                selectedGenre={selectedGenre}
                onGenreSelect={handleGenreSelect}
            />
            <div className="content-container">
                <BookList selectedGenre={selectedGenre} />
            </div>
        </div>
    );
};


export default BooksPage;