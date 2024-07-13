import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabSelectorProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const CustomTabSelector: React.FC<TabSelectorProps> = ({ activeTab, onTabChange }) => {
    return (
        <Tabs defaultValue={activeTab} onValueChange={onTabChange} className="w-3/5">
            <TabsList className="grid w-full grid-cols-2 rounded-xl">
                <TabsTrigger value="characters" className="rounded-xl">登場人物</TabsTrigger>
                <TabsTrigger value="important-notes" className="rounded-xl">重要メモ</TabsTrigger>
            </TabsList>
            <TabsContent value="characters">
                {/* Characters content */}
            </TabsContent>
            <TabsContent value="important-notes">
                {/* Important notes content */}
            </TabsContent>
        </Tabs>
    );
};