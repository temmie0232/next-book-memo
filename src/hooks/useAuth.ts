"use client"

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/navigation';

/**
 * 認証状態を管理し、必要に応じてリダイレクトを行うカスタムフック
 * 
 * @param {boolean} requireAuth - このページが認証を必要とするかどうか
 * @returns {Object} 認証状態に関する情報
 */
export const useAuth = (requireAuth: boolean = false) => {

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

            // 認証必須のページ && ユーザーが未認証 => ログインページ ("/") にリダイレクト
            if (requireAuth && !user) {
                router.push('/');
            }

            // 認証不要のページ && ユーザーが認証済み => booksページ ("/books") にリダイレクト
            else if (!requireAuth && user) {
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


    // フックの戻り値: 現在のユーザー、ローディング状態、認証チェック完了フラグ
    return { user, loading, authChecked };
};

