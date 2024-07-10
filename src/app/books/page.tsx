"use client";

import React, { useState } from 'react';
import BookList from '@/features/books/BookList/BookList';
import Header from '@/components/header/header';
import { useTheme } from '@/contexts/theme/useTheme';
import styles from './style.module.css';
import GenreFilter from '@/features/books/GenreFilter/GenreFilter';
import { useAuth } from '@/hooks/useAuth';
import { useGenres } from '@/hooks/useGenres';
import AddBookDialog from '@/features/books/AddBookDialog/AddBookDialog';

const BooksPage: React.FC = () => {
    const { theme } = useTheme();
    const { user } = useAuth();
    const { genres, loading, error } = useGenres();
    const [selectedGenre, setSelectedGenre] = useState<string>('すべて');
    const [activeStatus, setActiveStatus] = useState<'not-started' | 'in-progress' | 'completed' | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleGenreSelect = (genre: string) => {
        setSelectedGenre(genre);
    };

    const handleStatusFilterChange = (status: 'not-started' | 'in-progress' | 'completed' | null) => {
        setActiveStatus(status);
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    return (
        <div className={`${styles.booksPage} ${theme}`}>
            <Header onSearch={handleSearch} />
            <GenreFilter
                selectedGenre={selectedGenre}
                onGenreSelect={handleGenreSelect}
                onStatusFilterChange={handleStatusFilterChange}
            />
            <div className={styles.contentContainer}>
                <BookList
                    selectedGenre={selectedGenre}
                    activeStatus={activeStatus}
                    searchTerm={searchTerm}
                />
            </div>
            <AddBookDialog />
        </div>
    );
};

export default BooksPage;