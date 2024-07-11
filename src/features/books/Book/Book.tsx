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
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

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

    const getStatusText = (status: 'not-started' | 'in-progress' | 'completed') => {
        switch (status) {
            case 'not-started': return '未読';
            case 'in-progress': return '読書中';
            case 'completed': return '完読';
            default: return '不明';
        }
    };

    const getRatingText = (rating: string | null) => {
        switch (rating) {
            case '5': return 'とても面白い';
            case '4': return '面白い';
            case '3': return '普通';
            case '2': return 'あまり面白くない';
            case '1': return '面白くない';
            default: return '評価なし';
        }
    };

    const getDateRange = (startDate: string | null, endDate: string | null) => {
        if (!startDate && !endDate) return '登録されていません';
        if (startDate && endDate) return `[ ${startDate} ] ~ [ ${endDate} ]`;
        if (startDate) return `${startDate} ~`;
        if (endDate) return `~ ${endDate}`;
        return '登録されていません';
    };

    const backgroundColor = theme === 'dark' ? '#333333' : '#ebebeb';
    const bookColor = theme === 'dark' ? '#3E3E3E' : '#F8F8F8';

    return (
        <Link href={`/books/${book.id}`} className={styles.bookLink}>
            <div className={`${styles.book} ${theme === 'dark' ? styles.darkBook : styles.lightBook}`} style={{ backgroundColor: bookColor }}>
                <span className={styles.bookTitle}>{book.title}</span>
                <HoverCard>
                    <HoverCardTrigger asChild>
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
                    </HoverCardTrigger>
                    <HoverCardContent className="w-96" sideOffset={25}>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: getStatusColor(book.status) }}></div>
                                <span className="text-xl font-medium">{getStatusText(book.status)}</span>
                            </div>
                            <h4 className="text-xl font-semibold">{book.title}</h4>
                            <p className="text-base">著者 : {book.author || '登録されていません'}</p>
                            <p className="text-base">分類 : {book.genreId || '登録されていません'}</p>
                            <p className="text-base text-muted-foreground">期間 : {getDateRange(book.startDate, book.endDate)}</p>
                            <div className="flex items-center">
                                <span className="text-3xl mr-3">{getRatingIcon(book.rating)}</span>
                                <span className="text-xl font-medium">{getRatingText(book.rating)}</span>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
        </Link>
    );
};

export default Book;