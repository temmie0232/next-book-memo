"use client"

import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import "./LoginForm.css";
import user_icon from "../../../public/person.png";
import email_icon from "../../../public/email.png";
import password_icon from "../../../public/password.png";
import { FaGoogle } from "react-icons/fa";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from '../../../firebase';

interface FormValues {
    username: string;
    email: string;
    password: string;
}

interface FormErrors {
    username?: string;
    email?: string;
    password?: string;
    auth?: string;
}

const LoginForm: React.FC = () => {
    const initialValues: FormValues = { username: "", email: "", password: "" };
    const [formValues, setFormValues] = useState<FormValues>(initialValues);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [action, setAction] = useState<"ログイン" | "ユーザー登録">("ログイン");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                if (action === "ユーザー登録") {
                    await auth.createUserWithEmailAndPassword(formValues.email, formValues.password);
                    const user = auth.currentUser;
                    if (user) {
                        await user.updateProfile({
                            displayName: formValues.username
                        });
                    }
                } else {
                    await auth.signInWithEmailAndPassword(formValues.email, formValues.password);
                }
                console.log(action + "に成功しました");
            } catch (error) {
                console.error(error);
                if (error instanceof Error) {
                    setFormErrors({ ...formErrors, auth: error.message });
                }
            }
        }
    }

    const validate = (values: FormValues): FormErrors => {
        const errors: FormErrors = {};
        const regex = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

        if (!values.username && action === "ユーザー登録") {
            errors.username = "ユーザー名を入力してください";
        }
        if (!values.email) {
            errors.email = "メールアドレスを入力してください";
        } else if (!regex.test(values.email)) {
            errors.email = "正しいメールアドレスを入力してください"
        }
        if (!values.password) {
            errors.password = "パスワードを入力してください";
        } else if (values.password.length < 6) {
            errors.password = "6文字以上のパスワードを入力してください"
        }
        return errors;
    };

    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            await auth.signInWithPopup(provider);
            console.log("Googleログインに成功しました");
        } catch (error) {
            console.error("Googleログインエラー:", error);
            if (error instanceof Error) {
                if (error.name === 'auth/popup-closed-by-user') {
                    setFormErrors({ ...formErrors, auth: "ログインがキャンセルされました。再度お試しください。" });
                } else {
                    setFormErrors({ ...formErrors, auth: "Googleログインに失敗しました。再度お試しください。" });
                }
            }
        }
    }

    useEffect(() => {
        setFormErrors({});
    }, [action]);

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