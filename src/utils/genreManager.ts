import { db } from '~/firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

// ユーザーのジャンルを取得する関数
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

// ジャンルを追加する関数
export const addGenre = async (userId: string, genreName: string): Promise<void> => {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
        genres: arrayUnion(genreName)
    });
};

// ジャンルを削除する関数
export const deleteGenre = async (userId: string, genreName: string): Promise<void> => {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
        genres: arrayRemove(genreName)
    });
};

// デフォルトのジャンルを初期化する関数
export const initializeDefaultGenres = async (userId: string): Promise<void> => {
    const defaultGenres = ['小説', '語学', 'IT', '政治', '歴史'];
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
        genres: defaultGenres
    });
};