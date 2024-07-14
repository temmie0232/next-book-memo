import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from '@/contexts/theme/useTheme';
import { cn } from "@/lib/utils";

interface TabSelectorProps {
    activeTab: 'important-notes' | 'characters';
    onTabChange: (tab: 'important-notes' | 'characters') => void;
}

export const CustomTabSelector: React.FC<TabSelectorProps> = ({ activeTab, onTabChange }) => {
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    return (
        <Tabs
            value={activeTab}
            onValueChange={onTabChange as (value: string) => void}
            className="w-3/5"
        >
            <TabsList
                className={cn(
                    "grid w-full grid-cols-2 p-1 rounded-lg",
                    isDarkTheme ? "bg-[#222222]" : "bg-[#EBEBEB]"
                )}
            >
                <TabsTrigger
                    value="important-notes"
                    className={cn(
                        "rounded-md transition-colors duration-200",
                        isDarkTheme
                            ? "data-[state=active]:bg-[#404040] data-[state=active]:text-white text-white hover:bg-[#333333]"
                            : "data-[state=active]:bg-[#FBFBFB] data-[state=active]:text-black text-black hover:bg-[#F0F0F0]",
                        "focus:outline-none focus:ring-2 focus:ring-offset-2",
                        isDarkTheme ? "focus:ring-white focus:ring-offset-[#222222]" : "focus:ring-black focus:ring-offset-[#EBEBEB]"
                    )}
                >
                    重要メモ
                </TabsTrigger>
                <TabsTrigger
                    value="characters"
                    className={cn(
                        "rounded-md transition-colors duration-200",
                        isDarkTheme
                            ? "data-[state=active]:bg-[#404040] data-[state=active]:text-white text-white hover:bg-[#333333]"
                            : "data-[state=active]:bg-[#FBFBFB] data-[state=active]:text-black text-black hover:bg-[#F0F0F0]",
                        "focus:outline-none focus:ring-2 focus:ring-offset-2",
                        isDarkTheme ? "focus:ring-white focus:ring-offset-[#222222]" : "focus:ring-black focus:ring-offset-[#EBEBEB]"
                    )}
                >
                    登場人物
                </TabsTrigger>
            </TabsList>
            <TabsContent value="important-notes">
                {/* 重要メモのコンテンツ */}
            </TabsContent>
            <TabsContent value="characters">
                {/* 登場人物のコンテンツ */}
            </TabsContent>
        </Tabs>
    );
};