import React, { useState } from 'react';
import styles from "./header.module.css";
import { FaSearch } from "react-icons/fa";
import Image from 'next/image';
import logo_light from "~/public/logo-black.png";
import logo_dark from "~/public/logo-white.png";
import { auth } from '~/firebase';
import { useTheme } from '@/contexts/theme/useTheme';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import SettingsDropdown from '@/components/elements/SettingsDropdown';

interface HeaderProps {
    onSearch: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const { theme } = useTheme();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

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

            <SettingsDropdown onLogout={handleLogout} />
        </div>
    );
};

export default Header;