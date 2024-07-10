// 本のデータを表す型定義（新しい定義）
export interface BookData {
    title: string;           // 本のタイトル（必須）
    author?: string;         // 著者名（オプショナル）
    genreId?: string;        // ジャンルID（オプショナル）
    startDate?: string;      // 読書開始日（オプショナル）
    endDate?: string;        // 読書終了日（オプショナル）
    status?: 'not-started' | 'in-progress' | 'completed';  // 読書状態（オプショナル）
    rating?: string;         // 評価（オプショナル）
}

// 本の完全な情報を表す型定義（IDを含む、新しい定義）
export interface Book extends BookData {
    id: string;              // 本のユニークID（文字列型）
}

// 既存の BookType 定義（互換性のために残す）
export interface BookType {
    id: number;              // 本のユニークID（数値型）
    title: string;           // 本のタイトル
    genre: string;           // ジャンル
}

// ジャンルのリスト
export const genres: string[] = ['コミック', 'ミステリー', 'ファンタジー', 'ホラー', '恋愛', '専門書', '暮らし'];