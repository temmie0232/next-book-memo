import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc } from 'firebase/firestore';
import { db } from '~/firebase';
import { Book } from '@/types/book.types';
import { useAuth } from '@/hooks/useAuth';

export const useBookList = () => {
    // 本のリストの状態を管理
    const [books, setBooks] = useState<Book[]>([]);
    // ローディング状態を管理
    const [loading, setLoading] = useState(true);
    // エラー状態を管
    const [error, setError] = useState<Error | null>(null);
    // 認証情報を取得
    const { user } = useAuth();

    useEffect(() => {
        // ユーザーが認証されていない場合、本のリストをクリアしてローディングを終了
        if (!user) {
            setBooks([]);
            setLoading(false);
            return;
        }

        // ローディング状態を開始
        setLoading(true);

        // ユーザーのドキュメント参照を取得
        const userDocRef = doc(db, 'users', user.uid);
        // ユーザーの 'books' サブコレクションへの参照を取得
        const booksCollectionRef = collection(userDocRef, 'books');
        // クエリを作成（将来的にフィルタリングや並べ替えを追加）
        const q = query(booksCollectionRef);

        // Firestoreのリアルタイムリスナーを設定
        const unsubscribe = onSnapshot(q,
            (querySnapshot) => {
                const bookList: Book[] = [];
                // クエリスナップショットから本のデータを取得
                querySnapshot.forEach((doc) => {
                    bookList.push({ id: doc.id, ...doc.data() } as Book);
                });
                // 本のリストを更新
                setBooks(bookList);
                // ローディングを終了
                setLoading(false);
            },
            (err) => {
                // エラーが発生した場合、コンソールにエラーを出力
                console.error("Error fetching books:", err);
                // エラー状態を更新
                setError(err);
                // ローディングを終了
                setLoading(false);
            }
        );

        // コンポーネントのアンマウント時にリスナーを解除
        return () => unsubscribe();
    }, [user]); // ユーザーが変更されたときに効果を再実行

    // 本のリスト、ローディング状態、エラー状態を返す
    return { books, loading, error };
};