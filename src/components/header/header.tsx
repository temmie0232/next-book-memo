"use client"

import React from 'react';
import "./header.css";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Image from 'next/image';
import logo_light from "~/public/logo-black.png";
import logo_dark from "~/public/logo-white.png";
import search_icon_light from "~/public/search-w.png";
import search_icon_dark from "~/public/search-b.png";
import { auth } from '~/firebase';
import { useTheme } from '@/contexts/theme/useTheme';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();

    const toggle_mode = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/'); // ログアウト後にルートページ（ログインページ）にリダイレクト
        } catch (error) {
            console.error("ログアウトに失敗しました", error);
        }
    };

    return (
        <div className='header'>
            <div className="logo-container">
                <Image
                    src={theme === "light" ? logo_light : logo_dark}
                    alt="Logo"
                    className='logo'
                    width={180}
                    height={50}
                    objectFit="contain"
                />
            </div>

            <div className="search-box">
                <input type="text" placeholder='Search...' />
                <div className="search-icon-container">
                    <FaSearch className={`w-6 h-6 ${theme === 'dark' ? 'text-black' : 'text-white'}`} />
                </div>
            </div>

            <div className="nav-buttons">
                {theme === "light" ? (
                    <MdDarkMode
                        onClick={toggle_mode}
                        className="theme-toggle-button"
                        title="テーマの切り替え"
                        aria-label="ダークモードに切り替え"
                    />
                ) : (
                    <MdLightMode
                        onClick={toggle_mode}
                        className="theme-toggle-button"
                        title="テーマの切り替え"
                        aria-label="ライトモードに切り替え"
                    />
                )}
                <div className='vertical-divider'></div>
                <IoIosLogOut
                    onClick={handleLogout}
                    className="logout-button"
                    title="ログアウト"
                    aria-label="ログアウト"
                />
            </div>
        </div>
    );
};

export default Header;