"use client";

import React, { useState, useEffect } from 'react';
import styles from './BookList.module.css';
import { useTheme } from '@/contexts/theme/useTheme';
import { Book } from '@/types/book.types';
import { useBookshelfLayout } from '@/hooks/useBookshelfLayout';
import { filterBooks } from '@/utils/filterBooks';
import BookshelfRow from '@/features/books/BookshelfRow/BookshelfRow';
import { fetchBooks } from '@/utils/bookManager';
import { useAuth } from '@/hooks/useAuth';

// コンポーネントのプロップスの型定義
interface BookListProps {
    selectedGenre: string;
}

// BookListコンポーネントの定義
const BookList: React.FC<BookListProps> = ({ selectedGenre }) => {
    // 状態変数の定義
    const [allBooks, setAllBooks] = useState<Book[]>([]); // 全ての本のリスト
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]); // フィルタリングされた本のリスト
    const [isLoading, setIsLoading] = useState(true); // ローディング状態
    const [error, setError] = useState<string | null>(null); // エラーメッセージ

    // カスタムフックの使用
    const booksPerShelf = useBookshelfLayout(); // 棚あたりの本の数を取得
    const { theme } = useTheme(); // 現在のテーマを取得
    const { user, loading: authLoading } = useAuth(); // 認証情報を取得

    // 本のデータを取得するeffect
    useEffect(() => {
        const loadBooks = async () => {
            if (authLoading) return; // 認証処理中は何もしない
            if (!user) {
                setError("ユーザーが認証されていません。");
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                const books = await fetchBooks(); // 本のデータを取得
                setAllBooks(books);
                setFilteredBooks(books);
                setError(null);
            } catch (err) {
                setError("本の取得中にエラーが発生しました。");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        loadBooks();
    }, [user, authLoading]);

    // 選択されたジャンルに基づいて本をフィルタリングするeffect
    useEffect(() => {
        const filtered = filterBooks(allBooks, selectedGenre);
        setFilteredBooks(filtered);
    }, [selectedGenre, allBooks]);

    // ローディング中の表示
    if (isLoading) {
        return <div className={styles.loadingMessage}>読み込み中...</div>;
    }

    // エラー時の表示
    if (error) {
        return <div className={styles.errorMessage}>{error}</div>;
    }

    // 本を棚ごとに分割
    const bookShelves: Book[][] = [];
    for (let i = 0; i < filteredBooks.length; i += booksPerShelf) {
        bookShelves.push(filteredBooks.slice(i, i + booksPerShelf));
    }

    // 本棚の描画
    return (
        <div className={`${styles.bookListContainer} ${theme === 'dark' ? styles.dark : ''}`}>
            <div className={styles.bookshelf}>
                {bookShelves.map((shelfBooks, index) => (
                    <BookshelfRow key={index} books={shelfBooks} />
                ))}
            </div>
        </div>
    );
};

export default BookList;