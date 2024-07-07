import React from 'react';
import "./BookshelfRow.css"
import { BookType } from '@/types/bookType';
import Book from '@/features/books/Book/Book';

interface BookshelfRowProps {
    books: BookType[];
}

const BookshelfRow: React.FC<BookshelfRowProps> = ({ books }) => (
    <div className="bookshelf-row">
        <div className="books-container">
            {books.map((book) => (
                <Book key={book.id} book={book} />
            ))}
        </div>
        <div className="shelf-divider"></div>
    </div>
);

export default BookshelfRow;