import React from 'react';
import Link from 'next/link';
import { Book as BookType } from '@/types/book.types';
import styles from './Book.module.css';
import {
    FaRegFaceSmile,
    FaRegFaceFrownOpen,
    FaRegCircle,
    FaRegFaceMehBlank,
    FaRegFaceGrinSquint
} from 'react-icons/fa6';
import { FaRegDizzy } from 'react-icons/fa';
import { useTheme } from '@/contexts/theme/useTheme';

interface BookProps {
    book: BookType;
}

const Book: React.FC<BookProps> = ({ book }) => {
    const { theme } = useTheme();

    const getRatingIcon = (rating: string | null) => {
        const IconComponent = (() => {
            switch (rating) {
                case '5': return FaRegFaceGrinSquint;
                case '4': return FaRegFaceSmile;
                case '3': return FaRegFaceMehBlank;
                case '2': return FaRegFaceFrownOpen;
                case '1': return FaRegDizzy;
                default: return FaRegCircle;
            }
        })();

        return <IconComponent color={theme === 'dark' ? 'white' : 'black'} />;
    };

    const getStatusColor = (status: 'not-started' | 'in-progress' | 'completed') => {
        switch (status) {
            case 'not-started': return '#FF5C5C';
            case 'in-progress': return '#FFD700';
            case 'completed': return '#32CD32';
            default: return '#808080';
        }
    };

    const backgroundColor = theme === 'dark' ? '#333333' : '#ebebeb';
    const bookColor = theme === 'dark' ? '#3E3E3E' : '#F8F8F8'; // 赤または青

    return (
        <Link href={`/book/${book.id}`} className={styles.bookLink}>
            <div className={`${styles.book} ${theme === 'dark' ? styles.darkBook : styles.lightBook}`} style={{ backgroundColor: bookColor }}>
                <span className={styles.bookTitle}>{book.title}</span>
                <div className={styles.bookStatus} style={{ backgroundColor }}>
                    {getRatingIcon(book.rating)}
                    <div
                        className={styles.statusIndicator}
                        style={{
                            backgroundColor: getStatusColor(book.status),
                            borderColor: backgroundColor
                        }}
                    ></div>
                </div>
            </div>
        </Link>
    );
};

export default Book;