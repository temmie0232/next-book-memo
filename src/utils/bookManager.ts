import { db } from '~/firebase';
import { collection, addDoc, doc, getDocs } from 'firebase/firestore';
import { Book, BookData } from '@/types/book.types';  // 更新された import
import { getAuth } from 'firebase/auth';

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

        // 評価が未設定の場合、nullとして扱う
        const bookDataWithNullRating = {
            ...bookData,
            rating: bookData.rating || null
        };

        // 新しい本のドキュメントを追加
        const docRef = await addDoc(booksCollectionRef, bookDataWithNullRating);
        // 追加された本のドキュメントIDを返す
        return docRef.id;
    } catch (error) {
        // エラーが発生した場合はコンソールに出力し、エラーをスロー
        console.error('Error adding book:', error);
        throw new Error('Failed to add book');
    }
};

/**
 * Firestoreデータベースから本の情報を取得する関数
 * 
 * @returns {Promise<Book[]>} 取得された本の配列
 */
export const fetchBooks = async (): Promise<Book[]> => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            console.warn('User not authenticated. Returning empty book list.');
            return [];
        }

        const userDocRef = doc(db, 'users', user.uid);
        const booksCollectionRef = collection(userDocRef, 'books');
        const querySnapshot = await getDocs(booksCollectionRef);

        const books: Book[] = [];
        querySnapshot.forEach((doc) => {
            books.push({ id: doc.id, ...doc.data() } as Book);
        });

        return books;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};