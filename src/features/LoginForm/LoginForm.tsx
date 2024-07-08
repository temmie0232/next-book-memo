"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./LoginForm.module.css";
import { FaGoogle } from "react-icons/fa";
import { useLoginForm } from '@/hooks/useLoginForm';
import { useAuth } from '@/hooks/useAuth';
import { IoMdLock, IoMdMail, IoMdPerson } from 'react-icons/io';

const LoginForm: React.FC = () => {
    const {
        formValues,
        formErrors,
        action,
        handleChange,
        handleSubmit,
        signInWithGoogle,
        setAction,
    } = useLoginForm();

    const { user, loading, authChecked } = useAuth(false);
    const router = useRouter();

    useEffect(() => {
        if (authChecked && user) {
            router.push('/books');
        }
    }, [user, authChecked, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className={styles.wrapper}>
            <div className={styles.loginContainer}>
                <div className={styles.header}>
                    <div className={styles.text}>{action}</div>
                    <div className={styles.underline}></div>
                </div>
                <div className={styles.inputs}>
                    {action === "ユーザー登録" && (
                        <div className={styles.input}>
                            <IoMdPerson className={styles.inputIcon} />
                            <input
                                type="text"
                                placeholder='Name'
                                name="username"
                                value={formValues.username}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    <p className={styles.errorMsg}>{formErrors.username}</p>
                    <div className={styles.input}>
                        <IoMdMail className={styles.inputIcon} />
                        <input
                            type="email"
                            placeholder='Email'
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                    </div>
                    <p className={styles.errorMsg}>{formErrors.email}</p>
                    <div className={styles.input}>
                        <IoMdLock className={styles.inputIcon} />
                        <input
                            type="password"
                            placeholder='Password'
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                    </div>
                    <p className={styles.errorMsg}>{formErrors.password}</p>
                </div>
                {action === "ログイン" && <div className={styles.forgotPassword}>パスワードを忘れた場合<span>こちら</span>へ</div>}
                <button type="submit" className={styles.enter}>Enter</button>
                {formErrors.auth && <p className={styles.errorMsg}>{formErrors.auth}</p>}
                <div className={styles.divider}>または</div>
                <div className={styles.googleLogin} onClick={signInWithGoogle}>
                    <FaGoogle className={styles.googleIcon} />
                    <span>Googleでログイン</span>
                </div>
            </div>
            <div className={styles.submitContainer}>
                <div
                    className={`${styles.submit} ${action === "ユーザー登録" ? styles.gray : ''}`}
                    onClick={() => { setAction("ログイン") }}
                >
                    ログイン
                </div>
                <div
                    className={`${styles.submit} ${action === "ログイン" ? styles.gray : ''}`}
                    onClick={() => { setAction("ユーザー登録") }}
                >
                    登録
                </div>
            </div>
        </form>
    )
}

export default LoginForm;