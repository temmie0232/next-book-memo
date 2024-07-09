"use client"

import React from 'react';
import styles from "./header.module.css";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import Image from 'next/image';
import logo_light from "~/public/logo-black.png";
import logo_dark from "~/public/logo-white.png";
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
            router.push('/');
        } catch (error) {
            console.error("ログアウトに失敗しました", error);
        }
    };

    return (
        <div className={`${styles.header} ${theme === 'dark' ? styles.dark : ''}`}>
            <div className={styles.logoContainer}>
                <Image
                    src={theme === "light" ? logo_light : logo_dark}
                    alt="Logo"
                    className={styles.logo}
                    width={180}
                    height={50}
                    objectFit="contain"
                />
            </div>

            <div className={styles.searchBox}>
                <input type="text" placeholder='Search...' />
                <div className={styles.searchIconContainer}>
                    <FaSearch className={`w-6 h-6 ${theme === 'dark' ? 'text-black' : 'text-white'}`} />
                </div>
            </div>

            <div className={styles.navButtons}>
                {theme === "light" ? (
                    <MdDarkMode
                        onClick={toggle_mode}
                        className={styles.themeToggleButton}
                        title="テーマの切り替え"
                        aria-label="ダークモードに切り替え"
                    />
                ) : (
                    <MdLightMode
                        onClick={toggle_mode}
                        className={styles.themeToggleButton}
                        title="テーマの切り替え"
                        aria-label="ライトモードに切り替え"
                    />
                )}
                <div className={styles.verticalDivider}></div>
                <IoIosLogOut
                    onClick={handleLogout}
                    className={styles.logoutButton}
                    title="ログアウト"
                    aria-label="ログアウト"
                />
            </div>
        </div>
    );
};

export default Header;