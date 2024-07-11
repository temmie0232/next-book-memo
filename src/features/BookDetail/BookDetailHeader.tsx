import React from 'react';
import { useRouter } from 'next/navigation';
import { IoMdArrowBack, IoMdSettings } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
        <header className={`fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4 ${theme === 'dark' ? 'bg-[#2E2E2E] text-white' : 'bg-[#ebebeb] text-black'}`}>
            <CustomTooltip content="戻る">
                <Button variant="ghost" onClick={handleGoBack} className="p-2">
                    <IoMdArrowBack size={24} />
                </Button>
            </CustomTooltip>
            <div className="flex items-center space-x-2">
                <CustomTooltip content="保存">
                    <Button variant="ghost" onClick={onSave} className="p-2">
                        <FaSave size={20} />
                    </Button>
                </CustomTooltip>
                <DropdownMenu>
                    <CustomTooltip content="設定">
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="p-2">
                                <IoMdSettings size={24} />
                            </Button>
                        </DropdownMenuTrigger>
                    </CustomTooltip>
                    {/*<SettingsDropdown onLogout={handleLogout}>  なぜかここを追加するとページが遷移しない*/}
                </DropdownMenu>
            </div>
        </header>
    );
};

export default BookDetailHeader;