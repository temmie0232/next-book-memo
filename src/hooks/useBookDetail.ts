import { useState, useEffect } from 'react';
import { Book } from '@/types/book.types';
import { getBook, updateBook } from '@/utils/bookManager';

/**
 * 本の詳細情報を管理するカスタムフック
 * 
 * @param userId ユーザーID
 * @param bookId 本のID
 * @returns 本の情報と更新関数
 */
export const useBookDetail = (userId: string | undefined, bookId: string) => {
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        if (userId && bookId) {
            const fetchBook = async () => {
                const fetchedBook = await getBook(userId, bookId);
                setBook(fetchedBook);
            };
            fetchBook();
        }
    }, [userId, bookId]);

    /**
     * 本の情報を更新する関数
     * @param updatedBook 更新された本の情報
     */
    const handleSave = async (updatedBook: Book) => {
        if (userId && book) {
            await updateBook(userId, book.id, updatedBook);
            setBook(updatedBook);
        }
    };

    return { book, handleSave };
};