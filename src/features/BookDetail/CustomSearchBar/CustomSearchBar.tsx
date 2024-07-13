import React from 'react';
import styles from './CustomSearchBar.module.css';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Search } from 'lucide-react';
import { useTheme } from '@/contexts/theme/useTheme';

interface SearchBarProps {
    searchTerm: string;
    titleOnly: boolean;
    onSearch: (term: string) => void;
    onToggle: (checked: boolean) => void;
}

export const CustomSearchBar: React.FC<SearchBarProps> = ({ searchTerm, titleOnly, onSearch, onToggle }) => {
    const { theme } = useTheme();

    return (
        <div className={styles.searchBar}>
            <div className={styles.searchBarContent}>
                <div className={styles.searchInputWrapper}>
                    <Input
                        type="text"
                        placeholder="検索..."
                        value={searchTerm}
                        onChange={(e) => onSearch(e.target.value)}
                        className={`${styles.searchInput} ${theme === 'dark' ? 'bg-[#333333] text-white' : 'bg-black text-white'}`}
                    />
                    <Search
                        className={`${styles.searchIcon} text-white`}
                        size={20}
                    />
                </div>
                <Switch
                    checked={titleOnly}
                    onCheckedChange={onToggle}
                    className="ml-2"
                />
            </div>
            <div className={styles.searchToggleLabel}>
                <span className={`text-xs ${theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>
                    現在: {titleOnly ? 'タイトルのみ' : '内容を含む'}
                </span>
            </div>
        </div>
    );
};