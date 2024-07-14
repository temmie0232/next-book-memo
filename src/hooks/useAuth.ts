"use client"

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/navigation';

/**
 * 認証状態を管理し、必要に応じてリダイレクトを行うカスタムフック
 * 
 * @param {boolean} requireAuth - このページが認証を必要とするかどうか（デフォルトはtrue (ログインページ以外は認証必須のため) ）
 * @returns {Object} 認証状態に関する情報
 */
export const useAuth = (requireAuth: boolean = true) => {
    // Firebase の認証状態を取得
    // user: 現在のユーザー情報（ログイン中はユーザーオブジェクト、未ログインはnull）
    // loading: 認証状態の読み込み中かどうか
    const [user, loading] = useAuthState(auth);

    // 認証チェックが完了したかどうかを追跡
    const [authChecked, setAuthChecked] = useState(false);

    // Next.jsのルーターを使用してページ遷移を制御
    const router = useRouter();

    useEffect(() => {

        // ローディングが終了したら認証状態をチェック
        if (!loading) {

            if (requireAuth && !user) {
                // 認証が必要なページで未認証の場合、ログインページにリダイレクト
                router.push('/');
            }
            else if (!requireAuth && user) {
                // 認証不要のページで認証済みの場合、booksページにリダイレクト
                router.push('/books');
            }

            // 認証チェック完了を示すフラグを設定
            setAuthChecked(true);
        }
    }, [user, loading, requireAuth, router]);
    // 依存配列: これらの値が変更されたときに useEffect が再実行される

    // フックの戻り値: 
    // - user: 現在のユーザー情報
    // - loading: 認証状態の読み込み中かどうか
    // - authChecked: 認証チェックが完了したかどうか
    return { user, loading, authChecked };
};