import { BookType, genres } from '@/types/bookType';

// テスト用の本のデータを生成
export const generateBooks = (count: number): BookType[] => {
    const books: BookType[] = [];
    for (let i = 1; i <= count; i++) {
        books.push({
            id: i,
            title: `本のタイトル ${i}`,
            genre: genres[Math.floor(Math.random() * genres.length)], // ランダムなジャンル
        });
    }
    return books;
};