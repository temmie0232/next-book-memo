import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AddCustomContainerDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (title: string, content: string) => void;
    activeTab: string;
}

export const AddCustomContainerDialog: React.FC<AddCustomContainerDialogProps> = ({ isOpen, onClose, onAdd, activeTab }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleAdd = () => {
        onAdd(title, content);
        setTitle('');
        setContent('');
        onClose();
    };

    const isCharactersTab = activeTab === 'characters';

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>コンテナを追加</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            {isCharactersTab ? '名前' : 'タイトル'}
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="content" className="text-right">
                            {isCharactersTab ? '詳細' : '内容'}
                        </Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleAdd}>追加</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
