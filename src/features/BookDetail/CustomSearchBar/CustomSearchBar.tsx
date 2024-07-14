import React from 'react';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Search } from 'lucide-react';
import { useTheme } from '@/contexts/theme/useTheme';
import { cn } from "@/lib/utils";

interface SearchBarProps {
    searchTerm: string;
    titleOnly: boolean;
    onSearch: (term: string) => void;
    onToggle: (checked: boolean) => void;
}

export const CustomSearchBar: React.FC<SearchBarProps> = ({ searchTerm, titleOnly, onSearch, onToggle }) => {
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    return (
        <div className="flex flex-col items-center mt-4 w-4/5">
            <div className="flex w-full items-center justify-between">
                <div className="relative w-4/5">
                    <Input
                        type="text"
                        placeholder="検索..."
                        value={searchTerm}
                        onChange={(e) => onSearch(e.target.value)}
                        className={cn(
                            "pr-10 rounded-xl",
                            "border-none focus:ring-0 focus:ring-offset-0",
                            "focus-visible:ring-0 focus-visible:ring-offset-0",
                            isDarkTheme
                                ? "bg-[#2E2E2E] text-white placeholder-grey-400"
                                : "bg-[#EAEAEA] text-black placeholder-grey-600"
                        )}
                    />
                    <Search
                        className={cn(
                            "absolute right-3 top-1/2 transform -translate-y-1/2",
                            isDarkTheme ? "text-white" : "text-gray-500"
                        )}
                        size={20}
                    />
                </div>
                <Switch
                    checked={titleOnly}
                    onCheckedChange={onToggle}
                    className="ml-2"
                />
            </div>
            <div className="w-full text-left mt-1">
                <span className={cn(
                    "text-xs",
                    isDarkTheme ? "text-gray-300" : "text-gray-600"
                )}>
                    現在: {titleOnly ? 'タイトルのみ' : '内容を含む'}
                </span>
            </div>
        </div>
    );
};