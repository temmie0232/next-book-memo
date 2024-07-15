import { db } from '~/firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

/**
 * ユーザーのジャンルを取得する関数
 * 
 * @param userId - ユーザーID
 * @returns Promise<string[]> - ジャンルの配列
 * 
 * 1. 指定されたユーザーIDのFirestoreドキュメントを取得
 * 2. ドキュメントからgenresフィールドの値を取得
 * 3. genresフィールドが存在しない場合は空の配列を返す
 */
export const getGenres = async (userId: string): Promise<string[]> => {
    try {
        console.log('ジャンルを取得するユーザー:', userId);
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const genres = userDoc.data().genres || [];
            console.log('取得されたジャンル:', genres);
            return genres;
        }
        return [];
    } catch (error) {
        console.error('getGenresでエラーが発生:', error);
        throw new Error(`ジャンルの取得に失敗: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

/**
 * ジャンルを追加する関数
 * 
 * @param userId - ユーザーID
 * @param genreName - 追加するジャンル名
 * 
 * 1. 指定されたユーザーIDのFirestoreドキュメントを取得
 * 2. genresフィールドに新しいジャンルを追加（重複は自動的に排除される）
 */
export const addGenre = async (userId: string, genreName: string): Promise<void> => {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
        genres: arrayUnion(genreName)
    });
};

/**
 * ジャンルを削除する関数
 * 
 * @param userId - ユーザーID
 * @param genreName - 削除するジャンル名
 * 
 * 1. 指定されたユーザーIDのFirestoreドキュメントを取得
 * 2. genresフィールドから指定されたジャンルを削除
 */
export const deleteGenre = async (userId: string, genreName: string): Promise<void> => {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
        genres: arrayRemove(genreName)
    });
};

/**
 * デフォルトのジャンルを初期化する関数
 * 
 * @param userId - ユーザーID
 * 
 * 1. デフォルトのジャンル一覧を定義
 * 2. 指定されたユーザーIDのFirestoreドキュメントのgenresフィールドを
 *    デフォルトのジャンル一覧で上書き
 */
export const initializeDefaultGenres = async (userId: string): Promise<void> => {
    const defaultGenres = ['小説', '語学', 'IT', '政治', '歴史'];
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
        genres: defaultGenres
    });
};