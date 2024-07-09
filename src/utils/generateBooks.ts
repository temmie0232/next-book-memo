import { BookType, genres } from '@/types/book.types';

/**
 * 指定された数のテスト用本データを生成する関数
 * 
 * @param count - 生成する本の数
 * @returns 生成された本オブジェクトの配列
 */
export const generateBooks = (count: number): BookType[] => {

    // 生成した本を格納する配列
    const books: BookType[] = [];

    // 指定された数だけループして本を生成
    for (let i = 1; i <= count; i++) {
        // 新しい本オブジェクトを作成し、配列に追加
        books.push({
            id: i,  // 一意のID（ループのインデックスを利用）
            title: `本のタイトル ${i}`,  // タイトルにはインデックスを含める
            genre: genres[Math.floor(Math.random() * genres.length)],  // ジャンルはランダムに選択
        });
    }

    // 生成された本の配列を返す
    return books;
};