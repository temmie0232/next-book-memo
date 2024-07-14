
// 本のデータを表す型定義（更新版）
export interface Book {
    id: string;              // 本のユニークID（文字列型）
    title: string;           // 本のタイトル（必須）
    author: string | null;   // 著者名（null許容）
    genreId: string | null;  // ジャンルID（null許容）
    startDate: string | null; // 読書開始日（null許容）
    endDate: string | null;   // 読書終了日（null許容）
    status: 'not-started' | 'in-progress' | 'completed';  // 読書状態（必須）
    rating: string | null;    // 評価（null許容）
}

// ジャンルのリスト
export const genres: string[] = ['コミック', 'ミステリー', 'ファンタジー', 'ホラー', '恋愛', '専門書', '暮らし'];
