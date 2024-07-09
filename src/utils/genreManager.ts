import { db } from '~/firebase';
import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

// デフォルトのジャンルを初期化する関数
export const initializeDefaultGenres = async (userId: string): Promise<void> => {
    // デフォルトのジャンル配列を定義
    const defaultGenres = ['小説', '語学', 'IT', '政治', '歴史'];
    // ユーザーのジャンルドキュメントへの参照を作成
    const genresRef = doc(db, `users/${userId}/genres`);
    // setDocを使用して、ドキュメント全体を上書き（または新規作成）し、デフォルトのジャンルを設定
    await setDoc(genresRef, { genres: defaultGenres });
};