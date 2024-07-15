import { auth, db } from '~/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FirebaseUser, UserData } from '@/types/auth.types';

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

export const initializeUserInFirestore = async (user: User, username?: string): Promise<void> => {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        const userData: UserData = {
            email: user.email,
            displayName: username || user.displayName || '',
            initialized: false,
            isNewUser: true,
            genres: []
        };
        await setDoc(userDocRef, userData);
    } else {
        const userData = userDoc.data() as UserData;
        if (!userData.initialized) {
            await setDoc(userDocRef, { initialized: true }, { merge: true });
        }
    }
};