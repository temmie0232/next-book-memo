import React from 'react';
import styles from "./BookshelfRow.module.css";
import { Book as BookType } from '@/types/book.types';
import Book from '@/features/books/Book/Book';

interface BookshelfRowProps {
    books: BookType[];
}

const BookshelfRow: React.FC<BookshelfRowProps> = ({ books }) => (
    <div className={styles.bookshelfRow}>
        <div className={styles.booksContainer}>
            {books.map((book) => (
                <Book key={book.id} book={book} />
            ))}
        </div>
        <div className={styles.shelfDivider}></div>
    </div>
);

export default BookshelfRow;