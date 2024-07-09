
// フォームの入力値の型定義
export interface FormValues {
    username: string;
    email: string;
    password: string;
}

// フォームのエラーメッセージの型
export interface FormErrors {
    username?: string;
    email?: string;
    password?: string;
    auth?: string;
}

// フォームの現在のモード
export type ActionType = "ログイン" | "ユーザー登録";
