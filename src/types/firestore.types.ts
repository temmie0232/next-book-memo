export interface Genre {
    name: string;
}

export interface User {
    email: string;
    displayName: string;
    initialized: boolean;
}

export interface FirestoreCollections {
    users: User;
    genres: Genre;
}