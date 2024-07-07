"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "./LoginForm.css";  // このインポートはそのままで問題ありません
import user_icon from "~/public/person.png";
import email_icon from "~/public/email.png";
import password_icon from "~/public/password.png";
import { FaGoogle } from "react-icons/fa";
import { useLoginForm } from '@/hooks/useLoginForm';
import { useAuth } from '@/hooks/useAuth';

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
                            <img src={user_icon.src} alt="" />
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
                        <img src={email_icon.src} alt="" />
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
                        <img src={password_icon.src} alt="" />
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