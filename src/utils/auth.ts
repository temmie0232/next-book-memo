import { auth, db } from '~/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, writeBatch } from 'firebase/firestore';
import { FirebaseUser, UserData } from '@/types/auth.types';
import { sampleGenres } from '@/data/sampleGenres';
import { sampleBooks } from '@/data/sampleBooks';

/**
 * ユーザー登録関数
 * 新しいユーザーを作成し、Firestoreにユーザー情報を初期化します
 * 
 * @param email ユーザーのメールアドレス
 * @param password ユーザーのパスワード
 * @param username ユーザーの表示名
 * @returns Promise<FirebaseUser> 作成されたユーザーオブジェクト
 */
export const signUp = async (email: string, password: string, username: string): Promise<FirebaseUser> => {
    try {
        // Firebase Authenticationを使用してユーザーを作成
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
            // ユーザープロフィールを更新（表示名を設定）
            await updateProfile(userCredential.user, {
                displayName: username
            });
            // Firestoreにユーザー情報を初期化
            await initializeUserInFirestore(userCredential.user, username);
        }
        return userCredential.user;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
};

/**
 * ユーザーログイン関数
 * 既存のユーザーでログインし、必要に応じてFirestore情報を初期化します
 * 
 * @param email ユーザーのメールアドレス
 * @param password ユーザーのパスワード
 * @returns Promise<FirebaseUser> ログインしたユーザーオブジェクト
 */
export const signIn = async (email: string, password: string): Promise<FirebaseUser> => {
    try {
        // Firebase Authenticationを使用してユーザーログイン
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Firestoreのユーザー情報を確認・初期化
        await initializeUserInFirestore(userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
};

/**
 * デフォルトジャンルの初期化関数
 * ユーザーのFirestoreドキュメントにサンプルジャンルを追加します
 * 
 * @param userId ユーザーID
 */
export const initializeDefaultGenres = async (userId: string): Promise<void> => {
    const userDocRef = doc(db, 'users', userId);
    // サンプルジャンルをユーザードキュメントに追加（既存のデータとマージ）
    await setDoc(userDocRef, {
        genres: sampleGenres
    }, { merge: true });
};

/**
 * Firestoreユーザー初期化関数
 * 新規ユーザーの場合はデータを作成し、サンプルデータを追加します
 * 既存ユーザーの場合は必要に応じてジャンルを初期化します
 * 
 * @param user Firebaseユーザーオブジェクト
 * @param username オプションのユーザー名
 */
export const initializeUserInFirestore = async (user: User, username?: string): Promise<void> => {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        // 新規ユーザーの場合、初期データを作成
        const userData: UserData = {
            email: user.email,
            displayName: username || user.displayName || '',
            initialized: true,
            genresInitialized: false,
            genres: []
        };
        await setDoc(userDocRef, userData);
        // デフォルトジャンルを初期化
        await initializeDefaultGenres(user.uid);
        await setDoc(userDocRef, { genresInitialized: true }, { merge: true });

        // 新規ユーザーにサンプルの本を追加
        await addSampleBooks(user.uid);
    } else {
        // 既存ユーザーの場合、ジャンルが初期化されていなければ初期化
        const userData = userDoc.data() as UserData;
        if (!userData.genresInitialized) {
            await initializeDefaultGenres(user.uid);
            await setDoc(userDocRef, { genresInitialized: true }, { merge: true });
        }
    }
};

/**
 * サンプル本追加関数
 * 新規ユーザーのFirestoreドキュメントにサンプルの本データを追加します
 * 
 * @param userId ユーザーID
 */
const addSampleBooks = async (userId: string) => {
    const batch = writeBatch(db);
    const userDocRef = doc(db, 'users', userId);

    for (const book of sampleBooks) {
        const { containers, importantNotes, characters, ...bookData } = book;
        const bookRef = doc(collection(userDocRef, 'books'));
        // 本の基本データを追加
        batch.set(bookRef, bookData);

        // コンテナを追加
        containers.forEach((container) => {
            const containerRef = doc(collection(bookRef, 'containers'));
            batch.set(containerRef, container);
        });

        // 重要なメモを追加
        importantNotes.forEach((note) => {
            const noteRef = doc(collection(bookRef, 'customContainers'));
            batch.set(noteRef, { ...note, createdAt: new Date(), updatedAt: new Date() });
        });

        // キャラクター情報を追加
        characters.forEach((character) => {
            const characterRef = doc(collection(bookRef, 'customContainers'));
            batch.set(characterRef, { ...character, createdAt: new Date(), updatedAt: new Date() });
        });
    }

    // バッチ処理をコミット（一括して書き込み）
    await batch.commit();
};