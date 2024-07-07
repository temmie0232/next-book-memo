import React from 'react';
import Link from 'next/link';
import { BookType } from '@/types/bookType';
import './Book.css';

interface BookProps {
    book: BookType;
}

const Book: React.FC<BookProps> = ({ book }) => (
    <Link href={`/book/${book.id}`} className="book-link">
        <div className="book">
            <span className="book-title">{book.title}</span>
        </div>
    </Link>
);

export default Book;