"use client"

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/navigation';

export const useAuth = (requireAuth: boolean = false) => {
    const [user, loading] = useAuthState(auth);
    const [authChecked, setAuthChecked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (requireAuth && !user) {
                router.push('/');
            } else if (!requireAuth && user) {
                router.push('/books');
            }
            setAuthChecked(true);
        }
    }, [user, loading, requireAuth, router]);

    return { user, loading, authChecked };
};