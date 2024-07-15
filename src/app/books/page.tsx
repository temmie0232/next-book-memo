"use client";

"use client";

import React, { useState, useEffect } from 'react';
import BookList from '@/features/books/BookList/BookList';
import Header from '@/components/header/header';
import { useTheme } from '@/contexts/theme/useTheme';
import styles from './style.module.css';
import GenreFilter from '@/features/books/GenreFilter/GenreFilter';
import { useAuth } from '@/hooks/useAuth';
import { useGenres } from '@/hooks/useGenres';
import AddBookDialog from '@/features/books/AddBookDialog/AddBookDialog';
import SampleDataConfirmationDialog from '@/features/books/SampleDataConfirmationDialog/SampleDataConfirmationDialog';

const BooksPage: React.FC = () => {
    // テーマ、認証情報、ジャンル情報を取得
    const { theme } = useTheme();
    const { user, isNewUser, setIsNewUser } = useAuth();
    const { genres, loading, error } = useGenres();

    // 状態管理
    const [selectedGenre, setSelectedGenre] = useState<string>('すべて');
    const [activeStatus, setActiveStatus] = useState<'not-started' | 'in-progress' | 'completed' | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showSampleDataDialog, setShowSampleDataDialog] = useState(false);

    // 新規ユーザーの場合、サンプルデータ確認ダイアログを表示
    useEffect(() => {
        if (isNewUser) {
            setShowSampleDataDialog(true);
        }
    }, [isNewUser]);

    // ジャンル選択ハンドラー
    const handleGenreSelect = (genre: string) => {
        setSelectedGenre(genre);
    };

    // 読書状態フィルター変更ハンドラー
    const handleStatusFilterChange = (status: 'not-started' | 'in-progress' | 'completed' | null) => {
        setActiveStatus(status);
    };

    // 検索ハンドラー
    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    // サンプルデータ確認後のハンドラー
    const handleSampleDataConfirmation = () => {
        setIsNewUser(false);
        setShowSampleDataDialog(false);
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
            {showSampleDataDialog && user && (
                <SampleDataConfirmationDialog
                    userId={user.uid}
                    onConfirm={handleSampleDataConfirmation}
                />
            )}
        </div>
    );
};

export default BooksPage;