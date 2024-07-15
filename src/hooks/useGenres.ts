import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '~/firebase';
import { useAuth } from '@/hooks/useAuth';

/**
 * ユーザーのジャンル一覧を取得するカスタムフック
 * 
 * @returns {object} genres: ジャンルの配列, loading: 読み込み中フラグ, error: エラーオブジェクト
 */
export const useGenres = () => {
    // ジャンルのState
    const [genres, setGenres] = useState<string[]>([]);
    // ローディング状態のState
    const [loading, setLoading] = useState(true);
    // エラー状態のState
    const [error, setError] = useState<Error | null>(null);
    // 認証情報を取得
    const { user } = useAuth();

    useEffect(() => {
        // 初期状態をセット
        setLoading(true);
        setError(null);

        // ユーザーが未認証の場合、空の配列をセットして終了
        if (!user) {
            setGenres([]);
            setLoading(false);
            return;
        }

        // Firestoreのユーザードキュメントへの参照を作成
        const userDocRef = doc(db, 'users', user.uid);

        // Firestoreのリアルタイムリスナーを設定
        const unsubscribe = onSnapshot(userDocRef,
            (doc) => {
                if (doc.exists()) {
                    // ドキュメントが存在する場合、ジャンルデータを取得してStateを更新
                    const userData = doc.data();
                    setGenres(userData.genres || []);
                } else {
                    // ドキュメントが存在しない場合、空の配列をセット
                    setGenres([]);
                }
                // ローディング完了
                setLoading(false);
            },
            (err) => {
                // エラーが発生した場合、エラー情報をセット
                console.error("Error fetching genres:", err);
                setError(err as Error);
                setLoading(false);
            }
        );

        // コンポーネントのアンマウント時にリスナーを解除
        return () => unsubscribe();
    }, [user]); // userが変更されたときにeffectを再実行

    // ジャンルデータ、ローディング状態、エラー状態を返す
    return { genres, loading, error };
};