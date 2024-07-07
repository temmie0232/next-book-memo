import { FormValues, FormErrors, ActionType } from './validate.types';

// フォームの入力値を検証し、エラーを返す
export const validate = (values: FormValues, action: ActionType): FormErrors => {

    // エラーメッセージを格納するオブジェクト
    const errors: FormErrors = {};

    // メールアドレスの形式を検証する正規表現
    const regex = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

    // ユーザー名のバリデーション（ユーザー登録時のみ）
    if (!values.username && action === "ユーザー登録") {
        errors.username = "ユーザー名を入力してください";
    }

    // メールアドレス : 入力がない場合
    if (!values.email) {
        errors.email = "メールアドレスを入力してください";
    }
    // メールアドレス : 正規表現にマッチしていない場合
    else if (!regex.test(values.email)) {
        errors.email = "正しいメールアドレスを入力してください"
    }

    // パスワード : 入力がない場合
    if (!values.password) {
        errors.password = "パスワードを入力してください";
    }
    // パスワード : 6文字未満の場合
    else if (values.password.length < 6) {
        errors.password = "6文字以上のパスワードを入力してください"
    }

    // 検証結果（エラーオブジェクト）を返す
    return errors;
};