import { db } from '~/firebase';
import { collection, addDoc, doc } from 'firebase/firestore';
import { BookData } from '@/types/book.types';  // 更新された import

/**
 * 新しい本をFirestoreデータベースに追加する関数
 * 
 * @param userId - 本を追加するユーザーのID
 * @param bookData - 追加する本のデータ
 * @returns 追加された本のドキュメントID
 */
export const addBook = async (userId: string, bookData: BookData): Promise<string> => {
    try {
        // ユーザーのドキュメント参照を取得
        const userDocRef = doc(db, 'users', userId);
        // ユーザーの 'books' サブコレクションへの参照を取得
        const booksCollectionRef = collection(userDocRef, 'books');
        // 新しい本のドキュメントを追加
        const docRef = await addDoc(booksCollectionRef, bookData);
        // 追加された本のドキュメントIDを返す
        return docRef.id;
    } catch (error) {
        // エラーが発生した場合はコンソールに出力し、エラーをスロー
        console.error('Error adding book:', error);
        throw new Error('Failed to add book');
    }
};