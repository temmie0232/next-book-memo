import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}

/**
 * 削除確認ダイアログコンポーネント
 * 
 * @param open ダイアログの開閉状態
 * @param onOpenChange ダイアログの開閉状態を変更する関数
 * @param onConfirm 削除を確認する関数
 */
const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onOpenChange, onConfirm }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>コンテナの削除</DialogTitle>
                    <DialogDescription>
                        このコンテナには変更が加えられています。本当に削除しますか？
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>キャンセル</Button>
                    <Button variant="destructive" onClick={onConfirm}>削除</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteDialog;