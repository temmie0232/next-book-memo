import { auth, db } from '~/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FirebaseUser, UserData } from '@/types/auth.types';
import { initializeDefaultGenres } from './genreManager';

// ユーザー登録関数
export const signUp = async (email: string, password: string, username: string): Promise<FirebaseUser> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
            await updateProfile(userCredential.user, {
                displayName: username
            });
            await initializeUserInFirestore(userCredential.user, username);
        }
        return userCredential.user;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
};

// ユーザーログイン関数
export const signIn = async (email: string, password: string): Promise<FirebaseUser> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await initializeUserInFirestore(userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
};

// Firestoreにユーザー情報を初期化する内部関数
export const initializeUserInFirestore = async (user: User, username?: string): Promise<void> => {
    const userDocRef = doc(db, 'users', user.uid);

    const userData: UserData = {
        email: user.email,
        displayName: username || user.displayName || '',
        initialized: true,
        genresInitialized: false,
        genres: []
    };

    await setDoc(userDocRef, userData, { merge: true });

    await initializeDefaultGenres(user.uid);

    await setDoc(userDocRef, { genresInitialized: true }, { merge: true });

    console.log('User initialization completed:', user.uid);
};