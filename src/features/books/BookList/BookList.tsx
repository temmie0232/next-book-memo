"use client";

import React, { useState, useEffect } from 'react';
import './BookList.css';
import { useTheme } from '@/contexts/ThemeContext';
import { BookType } from '@/types/bookType';
import { generateBooks } from '@/utils/generateBooks/generateBooks';
import { useBookshelfLayout } from '@/hooks/useBookshelfLayout';
import { filterBooks } from '@/utils/filterBooks/filterBooks';
import BookshelfRow from '@/features/books/BookshelfRow/BookshelfRow';

interface BookListProps {
    selectedGenre: string;
}

const BookList: React.FC<BookListProps> = ({ selectedGenre }) => {
    const [allBooks, setAllBooks] = useState<BookType[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<BookType[]>([]);
    const booksPerShelf = useBookshelfLayout();
    const { theme } = useTheme();

    useEffect(() => {
        const generatedBooks = generateBooks(36);
        setAllBooks(generatedBooks);
        setFilteredBooks(generatedBooks);
    }, []);

    useEffect(() => {
        const filtered = filterBooks(allBooks, selectedGenre);
        setFilteredBooks(filtered);
    }, [selectedGenre, allBooks]);

    const bookShelves: BookType[][] = [];
    for (let i = 0; i < filteredBooks.length; i += booksPerShelf) {
        bookShelves.push(filteredBooks.slice(i, i + booksPerShelf));
    }

    return (
        <div className={`book-list-container ${theme}`}>
            <div className="bookshelf">
                {bookShelves.map((shelfBooks, index) => (
                    <BookshelfRow key={index} books={shelfBooks} />
                ))}
            </div>
        </div>
    );
};

export default BookList;