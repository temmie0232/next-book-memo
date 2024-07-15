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

interface DeleteBookDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}

const DeleteBookDialog: React.FC<DeleteBookDialogProps> = ({ open, onOpenChange, onConfirm }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>本の削除</DialogTitle>
                    <DialogDescription>
                        この本を削除してもよろしいですか？この操作は取り消せません。
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

export default DeleteBookDialog;