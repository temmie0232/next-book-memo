import React, { useState } from 'react';
import styles from "./header.module.css";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoIosLogOut, IoMdSettings } from "react-icons/io";
import { FaSearch, FaUser } from "react-icons/fa";
import Image from 'next/image';
import logo_light from "~/public/logo-black.png";
import logo_dark from "~/public/logo-white.png";
import { auth } from '~/firebase';
import { useTheme } from '@/contexts/theme/useTheme';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
    onSearch: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm);
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

            <form onSubmit={handleSearch} className={styles.searchBox}>
                <input
                    type="text"
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className={styles.searchIconContainer}>
                    <FaSearch className={`w-6 h-6 ${theme === 'dark' ? 'text-black' : 'text-white'}`} />
                </button>
            </form>

            <DropdownMenu>
                <DropdownMenuTrigger className={` ${styles.settingsButton} `}>
                    <IoMdSettings className="w-9 h-9" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <div className={styles.userInfo}>
                            {auth.currentUser?.photoURL ? (
                                <Image
                                    src={auth.currentUser.photoURL}
                                    alt="User"
                                    width={32}
                                    height={32}
                                    className={styles.userAvatar}
                                />
                            ) : (
                                <FaUser className={styles.userIcon} />
                            )}
                            <span className={styles.displayName}>{auth.currentUser?.displayName}</span>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={toggle_mode}>
                        {theme === "light" ? (
                            <>
                                <MdDarkMode className={styles.menuIcon} />
                                <span>ダークモードに切り替え</span>
                            </>
                        ) : (
                            <>
                                <MdLightMode className={styles.menuIcon} />
                                <span>ライトモードに切り替え</span>
                            </>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                        <IoIosLogOut className={styles.menuIcon} />
                        <span>ログアウト</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Header;