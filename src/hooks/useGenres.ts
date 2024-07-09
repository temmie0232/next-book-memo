import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '~/firebase';
import { useAuth } from '@/hooks/useAuth';

export const useGenres = () => {
    const [genres, setGenres] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        setLoading(true);
        setError(null);

        if (!user) {
            setGenres([]);
            setLoading(false);
            return;
        }

        const userDocRef = doc(db, 'users', user.uid);

        const unsubscribe = onSnapshot(userDocRef,
            (doc) => {
                if (doc.exists()) {
                    const userData = doc.data();
                    setGenres(userData.genres || []);
                } else {
                    setGenres([]);
                }
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching genres:", err);
                setError(err as Error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    return { genres, loading, error };
};