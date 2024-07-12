import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Book } from '@/types/book.types';
import { useGenres } from '@/hooks/useGenres';

interface EditBookDialogProps {
    book: Book;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (updatedBook: Book) => void;
}

const EditBookDialog: React.FC<EditBookDialogProps> = ({ book, open, onOpenChange, onSave }) => {
    const [editedBook, setEditedBook] = useState<Book>(book);
    const { genres } = useGenres();

    const handleChange = (field: keyof Book, value: string | null) => {
        setEditedBook(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        onSave(editedBook);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>本の情報を編集</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            タイトル
                        </Label>
                        <Input
                            id="title"
                            value={editedBook.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="author" className="text-right">
                            著者
                        </Label>
                        <Input
                            id="author"
                            value={editedBook.author || ''}
                            onChange={(e) => handleChange('author', e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="genre" className="text-right">
                            ジャンル
                        </Label>
                        <Select
                            value={editedBook.genreId || 'unspecified'}
                            onValueChange={(value) => handleChange('genreId', value === 'unspecified' ? null : value)}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="ジャンルを選択" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="unspecified">指定なし</SelectItem>
                                {genres.map((genre) => (
                                    <SelectItem key={genre} value={genre}>
                                        {genre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                            状態
                        </Label>
                        <Select
                            value={editedBook.status}
                            onValueChange={(value: 'not-started' | 'in-progress' | 'completed') => handleChange('status', value)}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="状態を選択" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="not-started">未読</SelectItem>
                                <SelectItem value="in-progress">読書中</SelectItem>
                                <SelectItem value="completed">完読</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="rating" className="text-right">
                            評価
                        </Label>
                        <Select
                            value={editedBook.rating || 'unrated'}
                            onValueChange={(value) => handleChange('rating', value === 'unrated' ? null : value)}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="評価を選択" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="unrated">評価なし</SelectItem>
                                <SelectItem value="1">1 - 面白くない</SelectItem>
                                <SelectItem value="2">2 - あまり面白くない</SelectItem>
                                <SelectItem value="3">3 - 普通</SelectItem>
                                <SelectItem value="4">4 - 面白い</SelectItem>
                                <SelectItem value="5">5 - とても面白い</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="startDate" className="text-right">
                            開始日
                        </Label>
                        <Input
                            id="startDate"
                            type="date"
                            value={editedBook.startDate || ''}
                            onChange={(e) => handleChange('startDate', e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="endDate" className="text-right">
                            終了日
                        </Label>
                        <Input
                            id="endDate"
                            type="date"
                            value={editedBook.endDate || ''}
                            onChange={(e) => handleChange('endDate', e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <Button onClick={handleSubmit}>保存</Button>
            </DialogContent>
        </Dialog>
    );
};

export default EditBookDialog;