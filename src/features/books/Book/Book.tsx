import React from 'react';
import Link from 'next/link';
import { BookType } from '@/types/bookType';
import styles from './Book.module.css';

interface BookProps {
    book: BookType;
}

const Book: React.FC<BookProps> = ({ book }) => (
    <Link href={`/book/${book.id}`} className={styles.bookLink}>
        <div className={styles.book}>
            <span className={styles.bookTitle}>{book.title}</span>
        </div>
    </Link>
);

export default Book;