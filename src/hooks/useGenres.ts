import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '~/firebase';

export const useGenres = (userId: string | undefined) => {
    const [genres, setGenres] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const userDocRef = doc(db, 'users', userId);

        const unsubscribe = onSnapshot(userDocRef,
            (doc) => {
                if (doc.exists()) {
                    const userData = doc.data();
                    setGenres(userData.genres || []);
                    setLoading(false);
                } else {
                    setGenres([]);
                    setLoading(false);
                }
            },
            (err) => {
                console.error("Error fetching genres:", err);
                setError(err);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [userId]);

    return { genres, loading, error };
};