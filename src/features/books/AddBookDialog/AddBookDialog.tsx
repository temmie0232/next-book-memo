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
import { IoIosAddCircleOutline, IoMdAdd } from 'react-icons/io';

const AddBookDialog = () => {
    const [open, setOpen] = useState(false);

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
                            タイトル
                        </Label>
                        <Input id="title" className="col-span-3" />
                    </div>
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
                        <Select>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="ジャンルを選択" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="fiction">Fiction</SelectItem>
                                <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                                <SelectItem value="science">Science</SelectItem>
                                <SelectItem value="history">History</SelectItem>
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
                </div>
                <Button type="submit" onClick={() => setOpen(false)}>Add Book</Button>
            </DialogContent>
        </Dialog>
    );
};

export default AddBookDialog;