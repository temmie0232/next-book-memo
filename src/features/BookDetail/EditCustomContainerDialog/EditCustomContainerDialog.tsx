import React, { useState, useEffect } from 'react';
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
import { CustomContainer } from '@/types/customContainer';

interface EditContainerDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: (id: string, title: string, content: string) => void;
    container: CustomContainer | null;
}

export const EditCustomContainerDialog: React.FC<EditContainerDialogProps> = ({ isOpen, onClose, onEdit, container }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (container) {
            setTitle(container.title);
            setContent(container.content);
        }
    }, [container]);

    const handleEdit = () => {
        if (container) {
            onEdit(container.id, title, content);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>コンテナを編集</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            タイトル
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
                            内容
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
                    <Button type="submit" onClick={handleEdit}>更新</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};