import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { auth } from '~/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { validate } from '@/utils/validate/validate';
import { FormValues, FormErrors, ActionType } from '@/utils/validate/validate.types';

/**
 * ログインフォームの状態と機能を管理するカスタムフック
 * 
 * @returns {Object} フォームの状態と操作関数を含むオブジェクト
 */
export const useLoginForm = () => {

    // フォームの初期値
    const initialValues: FormValues = { username: "", email: "", password: "" };

    // フォームの値の状態
    const [formValues, setFormValues] = useState<FormValues>(initialValues);
    // フォームのエラーの状態
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    // 現在のアクション(ログイン/登録)の状態
    const [action, setAction] = useState<"ログイン" | "ユーザー登録">("ログイン");


    /**
     * 入力フィールドの変更を処理するハンドラ
     * @param {ChangeEvent<HTMLInputElement>} e - 変更イベント
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        // e.target(input要素) から name(例: "username", "email") と value(現在の値) を分割代入
        const { name, value } = e.target;

        // フォームの値を更新
        setFormValues({ ...formValues, [name]: value });
        /*
        ...fromValues : 既存の fromValueオブジェクトの全プロパティをコピー
        [name]: value : name の値に基づいて、対応するプロパティを更新します。
        指定された名前のフィールドだけが新しい値で更新され、他のフィールドは変更されない。
        */
    }


    // フォーム送信を処理するハンドラ
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        // フォームのデフォルトの動作(リロードなど)を防ぐ
        e.preventDefault();

        // validate関数でフォームの値をチェックし、エラーがあればそれを状態にセット
        const errors = validate(formValues, action);
        setFormErrors(errors);

        // エラーがないとき
        if (Object.keys(errors).length === 0) {
            try {
                // ユーザー登録
                if (action === "ユーザー登録") {
                    const userCredential = await createUserWithEmailAndPassword(auth, formValues.email, formValues.password);
                    if (userCredential.user) {
                        await updateProfile(userCredential.user, {
                            displayName: formValues.username
                        });
                    }
                    alert("ユーザー登録が完了しました！\n画面が切り替わります。");
                    setFormValues(initialValues);
                }
                // ログイン
                else {
                    await signInWithEmailAndPassword(auth, formValues.email, formValues.password);
                }
                console.log(action + "に成功しました");
            }
            // エラー発生時
            catch (error) {
                console.error(error);
                if (error instanceof Error) {
                    setFormErrors({ ...formErrors, auth: error.message });
                }
            }
        }
    }


    /**
     * Googleでサインインする関数
     */
    const signInWithGoogle = async () => {
        // Google認証プロバイダーのインスタンスを作成
        const provider = new GoogleAuthProvider();

        try {
            // ポップアップウィンドウを使用してGoogleサインイン
            await signInWithPopup(auth, provider);

            // サインインが成功した場合のログ出力
            console.log("Googleログインに成功しました");
        } catch (error) {
            // エラーハンドリング
            console.error("Googleログインエラー:", error);

            // エラーオブジェクトの型チェック
            if (error instanceof Error) {
                // エラー処理
                if (error.name === 'auth/popup-closed-by-user') {
                    setFormErrors({ ...formErrors, auth: "ログインがキャンセルされました。再度お試しください。" });
                } else {
                    setFormErrors({ ...formErrors, auth: "Googleログインに失敗しました。再度お試しください。" });
                }
            }
        }
    }


    // action の値が変更されるたびに formErrors の状態をリセット
    useEffect(() => {
        setFormErrors({});
    }, [action]);


    // フックから返す値と関数
    return {
        formValues,
        formErrors,
        action,
        handleChange,
        handleSubmit,
        signInWithGoogle,
        setAction,
    };
}