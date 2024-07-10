import React from 'react';
import styles from './BookList.module.css';
import { useTheme } from '@/contexts/theme/useTheme';
import { useBookshelfLayout } from '@/hooks/useBookshelfLayout';
import BookshelfRow from '@/features/books/BookshelfRow/BookshelfRow';
import { useBookList } from '@/hooks/useBookList';
import { Book } from '@/types/book.types';

interface BookListProps {
    selectedGenre: string;
    activeStatus: 'not-started' | 'in-progress' | 'completed' | null;
}

const BookList: React.FC<BookListProps> = ({ selectedGenre, activeStatus }) => {
    // useBookListフックを使用して本のリスト、ローディング状態、エラー状態を取得
    const { books, loading, error } = useBookList();
    // 本棚のレイアウトを計算するカスタムフックを使用
    const booksPerShelf = useBookshelfLayout();
    // 現在のテーマを取得
    const { theme } = useTheme();

    // ローディング中の表示
    if (loading) {
        return <div className={styles.loadingMessage}>読み込み中...</div>;
    }

    if (error) {
        return <div className={styles.errorMessage}>{error.message}</div>;
    }

    const filterBooks = (books: Book[]): Book[] => {
        return books.filter(book => {
            const genreMatch = selectedGenre === 'すべて' || book.genreId === selectedGenre;
            const statusMatch = activeStatus === null || book.status === activeStatus;
            return genreMatch && statusMatch;
        });
    };

    const filteredBooks = filterBooks(books);

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