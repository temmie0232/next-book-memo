import React from 'react';
import { useRouter } from 'next/navigation';
import { IoMdArrowBack } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { useTheme } from '@/contexts/theme/useTheme';
import CustomTooltip from '@/components/elements/CustomTooltip';
import SettingsDropdown from '@/components/elements/SettingsDropdown';
import { auth } from '~/firebase';
import { signOut } from 'firebase/auth';

interface BookDetailHeaderProps {
    onSave: () => void;
}

const BookDetailHeader: React.FC<BookDetailHeaderProps> = ({ onSave }) => {
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const handleGoBack = () => {
        router.back();
    };

    const toggleTheme = () => {
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
        <header className={`fixed top-0 left-0 right-0 z-10 flex justify-between items-center h-16 p-4 ${theme === 'dark'
            ? 'bg-[#2E2E2E] text-white border-b border-[#858383]'
            : 'bg-[#ebebeb] text-black border-b border-gray-400'
            }`}>
            <CustomTooltip content="戻る">
                <Button variant="ghost" onClick={handleGoBack} className="p-2">
                    <IoMdArrowBack size={34} />
                </Button>
            </CustomTooltip>
            <div className="flex items-center space-x-2">
                <SettingsDropdown onLogout={handleLogout} />
            </div>
        </header>
    );
};

export default BookDetailHeader;