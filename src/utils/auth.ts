import { auth, db } from '~/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FirebaseUser, UserData } from '@/types/auth.types';

/**
 * ユーザー登録を行う関数
 * 
 * @param email - ユーザーのメールアドレス
 * @param password - ユーザーのパスワード
 * @param username - ユーザーの表示名
 * @returns Promise<FirebaseUser> - 作成されたユーザーオブジェクト
 */
export const signUp = async (email: string, password: string, username: string): Promise<FirebaseUser> => {
    try {
        // Firebaseで新しいユーザーを作成
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
            // ユーザーのプロフィールを更新（表示名を設定）
            await updateProfile(userCredential.user, {
                displayName: username
            });
            // Firestoreにユーザーの初期データを保存
            await initializeUserInFirestore(userCredential.user, username);
        }
        return userCredential.user;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
};

/**
 * ユーザーログインを行う関数
 * 
 * @param email - ユーザーのメールアドレス
 * @param password - ユーザーのパスワード
 * @returns Promise<FirebaseUser> - ログインしたユーザーオブジェクト
 */
export const signIn = async (email: string, password: string): Promise<FirebaseUser> => {
    try {
        // Firebaseでユーザー認証を行う
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Firestoreのユーザーデータを初期化（必要な場合）
        await initializeUserInFirestore(userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
};

/**
 * Firestoreにユーザーデータを初期化する関数
 * 
 * @param user - Firebaseユーザーオブジェクト
 * @param username - ユーザーの表示名（オプション）
 */
export const initializeUserInFirestore = async (user: User, username?: string): Promise<void> => {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        // ユーザードキュメントが存在しない場合、新規作成
        const userData: UserData = {
            email: user.email,
            displayName: username || user.displayName || '',
            initialized: false,
            isNewUser: true,
            genres: []
        };
        await setDoc(userDocRef, userData);
    } else {
        // ユーザードキュメントが存在する場合、必要に応じて初期化フラグを更新
        const userData = userDoc.data() as UserData;
        if (!userData.initialized) {
            await setDoc(userDocRef, { initialized: true }, { merge: true });
        }
    }
};