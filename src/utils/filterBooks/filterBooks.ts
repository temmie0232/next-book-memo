import { BookType } from '@/types/bookType';

/**
 * 指定されたジャンルに基づいて本をフィルタリングする関数
 * 
 * @param {BookType[]} books - フィルタリング対象の本の配列
 * @param {string} genre - フィルタリングするジャンル
 * @returns {BookType[]} フィルタリングされた本の配列
 */
export const filterBooks = (books: BookType[], genre: string): BookType[] => {
    // ジャンルが'すべて'の場合、フィルタリングせずに全ての本を返す
    if (genre === 'すべて') {
        return books;
    }
    else {
        // 指定されたジャンルに一致する本だけをフィルタリングして返す
        return books.filter(book => book.genre === genre);
    }
};