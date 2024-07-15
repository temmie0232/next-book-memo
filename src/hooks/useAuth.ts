import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '~/firebase';

export const useAuth = (requireAuth: boolean = true) => {
    // Firebase Authenticationの状態を取得
    const [user, loading] = useAuthState(auth);
    // 認証チェックが完了したかどうかの状態
    const [authChecked, setAuthChecked] = useState(false);
    // 新規ユーザーかどうかの状態
    const [isNewUser, setIsNewUser] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            if (user) {
                // ユーザーのFirestoreドキュメント参照を取得
                const userRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    // ユーザードキュメントが存在する場合、isNewUser状態を設定
                    const userData = userDoc.data();
                    setIsNewUser(userData.isNewUser ?? true);
                } else {
                    // ユーザードキュメントが存在しない場合、新規作成
                    await setDoc(userRef, { isNewUser: true });
                    setIsNewUser(true);
                }
            }
            // 認証チェック完了を示す
            setAuthChecked(true);
        };

        // ローディングが終了したらユーザーチェックを実行
        if (!loading) {
            checkUser();
        }
    }, [user, loading]); // user または loading の状態が変化したら再実行

    // 認証関連の状態と関数を返す
    return { user, loading, authChecked, isNewUser, setIsNewUser };
};