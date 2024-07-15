import { User as FirebaseUser } from 'firebase/auth';

export interface UserData {
    email: string | null;
    displayName: string | null;
    initialized: boolean;
    genres: string[];
    isNewUser: boolean;
}

export interface AuthFunctions {
    signUp: (email: string, password: string) => Promise<FirebaseUser>;
    signIn: (email: string, password: string) => Promise<FirebaseUser>;
}

export type { FirebaseUser };