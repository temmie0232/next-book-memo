import { BookType } from '@/types/bookType';

export const filterBooks = (books: BookType[], genre: string): BookType[] => {
    if (genre === 'すべて') {
        return books;
    } else {
        return books.filter(book => book.genre === genre);
    }
};