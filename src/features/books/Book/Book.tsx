import React from 'react';
import Link from 'next/link';
import { Book as BookType } from '@/types/book.types';
import styles from './Book.module.css';
import {
    FaRegFaceGrinBeam,
    FaRegFaceSmile,
    FaRegFaceMeh,
    FaRegFaceFrownOpen,
    FaRegFaceFrown,
    FaRegCircle
} from 'react-icons/fa6';

interface BookProps {
    book: BookType;
}

const Book: React.FC<BookProps> = ({ book }) => {
    // 評価に基づいてアイコンを選択する関数
    const getRatingIcon = (rating: string | null) => {
        switch (rating) {
            case '5': return <FaRegFaceGrinBeam />;
            case '4': return <FaRegFaceSmile />;
            case '3': return <FaRegFaceMeh />;
            case '2': return <FaRegFaceFrownOpen />;
            case '1': return <FaRegFaceFrown />;
            default: return <FaRegCircle />;
        }
    };

    // ステータスに基づいて色を選択する関数
    const getStatusColor = (status: 'not-started' | 'in-progress' | 'completed') => {
        switch (status) {
            case 'not-started': return 'text-red-500';
            case 'in-progress': return 'text-yellow-500';
            case 'completed': return 'text-green-500';
            default: return '';
        }
    };

    return (
        <Link href={`/book/${book.id}`} className={styles.bookLink}>
            <div className={styles.book}>
                <span className={styles.bookTitle}>{book.title}</span>
                <div className={`${styles.bookStatus} ${getStatusColor(book.status)}`}>
                    {getRatingIcon(book.rating)}
                </div>
            </div>
        </Link>
    );
};

export default Book;