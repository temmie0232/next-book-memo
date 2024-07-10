import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IoMdAdd } from 'react-icons/io';
import { useGenres } from '@/hooks/useGenres';
import { useAuth } from '@/hooks/useAuth';

const AddBookDialog = () => {
    const [open, setOpen] = useState(false);
    const { user } = useAuth();
    const { genres, loading, error } = useGenres();
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');

    if (!user) {
        return null;
    }

    const handleSubmit = () => {
        if (!title.trim()) {
            setTitleError('タイトルは必須項目です');
            return;
        }
        // 本の追加処理をあとで記述する
        console.log('本を追加:', title);
        setOpen(false);
        setTitle('');
        setTitleError('');
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="fixed bottom-10 right-10 rounded-full w-16 h-16 p-0 flex items-center justify-center">
                    <IoMdAdd className="w-12 h-12" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>新しい本の追加</DialogTitle>
                    <DialogDescription>
                        追加したい本の詳細について記述してください。
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            タイトル <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="title"
                            className="col-span-3"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setTitleError('');
                            }}
                        />
                    </div>
                    {titleError && (
                        <p className="text-red-500 text-sm ml-[25%]">{titleError}</p>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="author" className="text-right">
                            著者
                        </Label>
                        <Input id="author" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="genre" className="text-right">
                            ジャンル
                        </Label>
                        <Select disabled={loading}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder={loading ? "読み込み中..." : "ジャンルを選択"} />
                            </SelectTrigger>
                            <SelectContent>
                                {/* デフォルトの「後で設定する」オプション */}
                                <SelectItem value="later">後で設定する</SelectItem>

                                {error ? (
                                    // エラーが発生した場合の処理
                                    <SelectItem value="error">エラーが発生しました</SelectItem>
                                ) : (
                                    // ユーザーが設定したジャンルのリスト
                                    genres.map((genre) => (
                                        // 各ジャンルに対してSelectItemを生成
                                        <SelectItem key={genre} value={genre}>
                                            {genre}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="startDate" className="text-right">
                            読書 開始日
                        </Label>
                        <Input id="startDate" type="date" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="endDate" className="text-right">
                            読書 終了日
                        </Label>
                        <Input id="endDate" type="date" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                            状態
                        </Label>
                        <Select>
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
                        <Select>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="評価を選択" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="later">後で設定する</SelectItem>
                                <SelectItem value="1">1 - 面白くない</SelectItem>
                                <SelectItem value="2">2 - あまり面白くない</SelectItem>
                                <SelectItem value="3">3 - 普通</SelectItem>
                                <SelectItem value="4">4 - 面白い</SelectItem>
                                <SelectItem value="5">5 - とても面白い</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button type="submit" onClick={handleSubmit}>本を追加</Button>
            </DialogContent>
        </Dialog>
    );
};

export default AddBookDialog;