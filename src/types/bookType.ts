// 本の型定義
export interface BookType {
    id: number;
    title: string;
    genre: string;
}

// ジャンルのリスト
export const genres: string[] = ['コミック', 'ミステリー', 'ファンタジー', 'ホラー', '恋愛', '専門書', '暮らし'];