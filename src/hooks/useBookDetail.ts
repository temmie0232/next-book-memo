import { useState, useEffect } from 'react';
import { Book } from '@/types/book.types';
import { getBook, updateBook } from '@/utils/bookManager';

const bookCache: { [key: string]: Book } = {};

export const useBookDetail = (userId: string | undefined, bookId: string) => {
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        if (userId && bookId) {
            const fetchBook = async () => {
                if (bookCache[bookId]) {
                    setBook(bookCache[bookId]);
                } else {
                    const fetchedBook = await getBook(userId, bookId);
                    if (fetchedBook) {
                        bookCache[bookId] = fetchedBook;
                        setBook(fetchedBook);
                    }
                }
            };
            fetchBook();
        }
    }, [userId, bookId]);

    const handleSave = async (updatedBook: Book) => {
        if (userId && book) {
            await updateBook(userId, book.id, updatedBook);
            bookCache[book.id] = updatedBook;
            setBook(updatedBook);
        }
    };

    return { book, handleSave };
};