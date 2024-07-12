import { db } from '~/firebase';
import { collection, addDoc, doc, getDocs, updateDoc, getDoc } from 'firebase/firestore';
import { Book, BookData } from '@/types/book.types';
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
 * Firestoreデータベースから全ての本の情報を取得する関数
 * 
 * @returns {Promise<Book[]>} 取得された本の配列
 */
export const fetchBooks = async (): Promise<Book[]> => {
    try {
        // 現在ログインしているユーザーの情報を取得
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            console.warn('User not authenticated. Returning empty book list.');
            return [];
        }

        // ユーザーのbooksコレクションへの参照を取得
        const userDocRef = doc(db, 'users', user.uid);
        const booksCollectionRef = collection(userDocRef, 'books');

        // booksコレクションから全てのドキュメントを取得
        const querySnapshot = await getDocs(booksCollectionRef);

        // 取得した各ドキュメントをBook型の配列に変換
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

/**
 * 特定の本の情報をFirestoreから取得する関数
 * 
 * @param userId - ユーザーID
 * @param bookId - 取得する本のID
 * @returns {Promise<Book | null>} 取得された本の情報、存在しない場合はnull
 */
export const getBook = async (userId: string, bookId: string): Promise<Book | null> => {
    try {
        // ユーザーのドキュメント参照を取得
        const userDocRef = doc(db, 'users', userId);
        // 指定された本のドキュメント参照を取得
        const bookDocRef = doc(userDocRef, 'books', bookId);
        // 本のドキュメントを取得
        const bookDoc = await getDoc(bookDocRef);

        if (bookDoc.exists()) {
            // ドキュメントが存在する場合、Book型に変換して返す
            return { id: bookDoc.id, ...bookDoc.data() } as Book;
        } else {
            // ドキュメントが存在しない場合、nullを返す
            return null;
        }
    } catch (error) {
        console.error('Error fetching book:', error);
        throw error;
    }
};

/**
 * 特定の本の情報をFirestoreで更新する関数
 * 
 * @param userId - ユーザーID
 * @param bookId - 更新する本のID
 * @param updatedBook - 更新するフィールドと値を含むオブジェクト
 * @returns {Promise<void>}
 */
export const updateBook = async (userId: string, bookId: string, updatedBook: Partial<Book>): Promise<void> => {
    try {
        // ユーザーのドキュメント参照を取得
        const userDocRef = doc(db, 'users', userId);
        // 更新する本のドキュメント参照を取得
        const bookDocRef = doc(userDocRef, 'books', bookId);
        // 本のドキュメントを更新
        await updateDoc(bookDocRef, updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};