"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './BookList.css';
import GenreFilter from '../GenreFilter/GenreFilter';
import { useTheme } from '@/contexts/ThemeContext';

// ジャンルのリスト
const genres: string[] = ['コミック', 'ミステリー', 'ファンタジー', 'ホラー', '恋愛', '専門書', '暮らし'];

// 本の型定義
interface Book {
    id: number;
    title: string;
    genre: string;
}

// テスト用の本のデータを生成
const generateBooks = (count: number): Book[] => {
    const books: Book[] = [];
    for (let i = 1; i <= count; i++) {
        books.push({
            id: i,
            title: `本のタイトル ${i}`,
            genre: genres[Math.floor(Math.random() * genres.length)], // ランダムなジャンル
        });
    }
    return books;
};

// 本のコンポーネント
const Book: React.FC<{ book: Book }> = ({ book }) => (
    <Link href={`/book/${book.id}`} className="book-link">
        <div className="book">
            <span className="book-title">{book.title}</span>
        </div>
    </Link>
);

// 本棚の段コンポーネント
const BookshelfRow: React.FC<{ books: Book[] }> = ({ books }) => (
    <div className="bookshelf-row">
        <div className="books-container">
            {books.map((book) => (
                <Book key={book.id} book={book} />
            ))}
        </div>
        <div className="shelf-divider"></div>
    </div>
);

// メインの本リストコンポーネント
const BookList: React.FC = () => {
    const [allBooks, setAllBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [booksPerShelf, setBooksPerShelf] = useState<number>(12);
    const [selectedGenre, setSelectedGenre] = useState<string>('すべて');
    const { theme } = useTheme(); // 現在のテーマを取得

    useEffect(() => {
        // 36冊の本を生成（テスト用）
        const generatedBooks = generateBooks(36);
        setAllBooks(generatedBooks);
        setFilteredBooks(generatedBooks);
    }, []);

    useEffect(() => {
        const updateBooksPerShelf = () => {
            const bookWidth = 120; // BookList.cssの.bookのwidth
            const containerPadding = 32; // BookList.cssの.book-list-containerのpadding (16px * 2)
            const bookGap = 16; // BookList.cssの.books-containerのgap
            const availableWidth = window.innerWidth - containerPadding;
            const targetWidth = availableWidth * 0.80; // 画面の80%
            const booksPerRow = Math.floor((targetWidth + bookGap) / (bookWidth + bookGap));
            setBooksPerShelf(Math.max(1, booksPerRow));
        };

        updateBooksPerShelf();
        window.addEventListener('resize', updateBooksPerShelf);
        return () => window.removeEventListener('resize', updateBooksPerShelf);
    }, []);

    const handleGenreSelect = (genre: string) => {
        setSelectedGenre(genre);
        if (genre === 'すべて') {
            setFilteredBooks(allBooks);
        } else {
            const filtered = allBooks.filter(book => book.genre === genre);
            setFilteredBooks(filtered);
        }
    };

    // 本を段ごとにグループ化
    const bookShelves: Book[][] = [];
    for (let i = 0; i < filteredBooks.length; i += booksPerShelf) {
        bookShelves.push(filteredBooks.slice(i, i + booksPerShelf));
    }

    return (
        <div className={`book-list-container ${theme}`}>
            <GenreFilter
                genres={genres}
                selectedGenre={selectedGenre}
                onGenreSelect={handleGenreSelect}
            />

            <div className="bookshelf">
                {bookShelves.map((shelfBooks, index) => (
                    <BookshelfRow key={index} books={shelfBooks} />
                ))}
            </div>
        </div>
    );
};

export default BookList;