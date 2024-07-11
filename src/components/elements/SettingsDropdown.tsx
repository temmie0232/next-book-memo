import React from 'react';
import Image from 'next/image';
import { IoMdSettings } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from '@/contexts/theme/useTheme';
import { useAuth } from '@/hooks/useAuth';
import CustomTooltip from '@/components/elements/CustomTooltip';

interface SettingsDropdownProps {
    onLogout: () => Promise<void>;
}

const SettingsDropdown: React.FC<SettingsDropdownProps> = ({ onLogout }) => {
    const { theme, setTheme } = useTheme();
    const { user } = useAuth();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    if (!user) {
        return null;  // ユーザーが認証されていない場合は何も表示しない
    }

    return (
        <DropdownMenu>
            <CustomTooltip content="設定">
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-2">
                        <IoMdSettings size={38} />
                    </Button>
                </DropdownMenuTrigger>
            </CustomTooltip>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                            {user.photoURL ? (
                                <Image
                                    src={user.photoURL}
                                    alt="User"
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                            ) : (
                                <FaUser size={32} />
                            )}
                            <p className="text-sm font-medium leading-none">{user.displayName}</p>
                        </div>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleTheme}>
                    {theme === "light" ? (
                        <>
                            <MdDarkMode className="mr-2 h-4 w-4" />
                            <span>ダークモードに切り替え</span>
                        </>
                    ) : (
                        <>
                            <MdLightMode className="mr-2 h-4 w-4" />
                            <span>ライトモードに切り替え</span>
                        </>
                    )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>
                    <IoIosLogOut className="mr-2 h-4 w-4" />
                    <span>ログアウト</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SettingsDropdown;