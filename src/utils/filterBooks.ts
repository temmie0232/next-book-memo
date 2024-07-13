import { Book } from '@/types/book.types';

/**
 * 指定されたジャンルに基づいて本をフィルタリングする関数
 * 
 * @param {Book[]} books - フィルタリング対象の本の配列
 * @param {string} genre - フィルタリングするジャンル
 * @returns {Book[]} フィルタリングされた本の配列
 */
export const filterBooks = (books: Book[], genre: string): Book[] => {
    // ジャンルが'すべて'の場合、フィルタリングせずに全ての本を返す
    if (genre === 'すべて') {
        return books;
    }
    else {
        // 指定されたジャンルに一致する本だけをフィルタリングして返す
        return books.filter(book => book.genreId === genre);
    }
};