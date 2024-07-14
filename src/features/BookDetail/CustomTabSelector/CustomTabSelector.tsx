import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabSelectorProps {
    activeTab: 'important-notes' | 'characters';
    onTabChange: (tab: 'important-notes' | 'characters') => void;
}

export const CustomTabSelector: React.FC<TabSelectorProps> = ({ activeTab, onTabChange }) => {
    return (
        <Tabs
            value={activeTab}
            onValueChange={onTabChange as (value: string) => void}
            className="w-3/5"
        >
            <TabsList className="grid w-full grid-cols-2 rounded-xl">
                <TabsTrigger value="important-notes" className="rounded-xl">重要メモ</TabsTrigger>
                <TabsTrigger value="characters" className="rounded-xl">登場人物</TabsTrigger>
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