"use client";

import React, { useState } from 'react';
import BookList from '@/features/books/BookList/BookList';
import NavBar from '@/components/header/header';
import { useTheme } from '@/contexts/ThemeContext';
import './style.css';
import GenreFilter from '@/features/books/GenreFilter/GenreFilter';

// ジャンルのリスト（これは適切な場所に移動させるべきかもしれません）
const genres: string[] = ['コミック', 'ミステリー', 'ファンタジー', 'ホラー', '恋愛', '専門書', '暮らし'];

const BooksPage: React.FC = () => {
    const { theme } = useTheme();
    const [selectedGenre, setSelectedGenre] = useState<string>('すべて');

    const handleGenreSelect = (genre: string) => {
        setSelectedGenre(genre);
    };

    return (
        <div className={`books-page ${theme}`}>
            <NavBar />
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