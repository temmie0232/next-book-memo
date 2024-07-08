"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "./LoginForm.css";
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
        <form onSubmit={handleSubmit} className='wrapper'>
            <div className='login_container'>
                <div className='header'>
                    <div className='text'>{action}</div>
                    <div className='underline'></div>
                </div>
                <div className="inputs">
                    {action === "ユーザー登録" && (
                        <div className='input'>
                            <IoMdPerson className="input-icon" />
                            <input
                                type="text"
                                placeholder='Name'
                                name="username"
                                value={formValues.username}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    <p className="errorMsg">{formErrors.username}</p>
                    <div className="input">
                        <IoMdMail className="input-icon" />
                        <input
                            type="email"
                            placeholder='Email'
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="errorMsg">{formErrors.email}</p>
                    <div className="input">
                        <IoMdLock className="input-icon" />
                        <input
                            type="password"
                            placeholder='Password'
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="errorMsg">{formErrors.password}</p>
                </div>
                {action === "ログイン" && <div className='forgot-password'>パスワードを忘れた場合<span>こちら</span>へ</div>}
                <button type="submit" className='enter'>Enter</button>
                {formErrors.auth && <p className="errorMsg">{formErrors.auth}</p>}
                <div className='divider'>または</div>
                <div className='google-login' onClick={signInWithGoogle}>
                    <FaGoogle className='google-icon' />
                    <span>Googleでログイン</span>
                </div>
            </div>
            <div className='submit-container'>
                <div
                    className={action === "ユーザー登録" ? "submit gray" : "submit"}
                    onClick={() => { setAction("ログイン") }}
                >
                    ログイン
                </div>
                <div
                    className={action === "ログイン" ? "submit gray" : "submit"}
                    onClick={() => { setAction("ユーザー登録") }}
                >
                    登録
                </div>
            </div>
        </form>
    )
}

export default LoginForm;