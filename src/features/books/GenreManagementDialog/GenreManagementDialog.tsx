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
import { PlusCircle, Trash2 } from "lucide-react";
import { CiEdit } from 'react-icons/ci';
import styles from './GenreManagementDialog.module.css';
import { useAuth } from '@/hooks/useAuth';
import { useGenres } from '@/hooks/useGenres';
import { addGenre, deleteGenre } from '@/utils/genreManager';

const GenreManagementDialog = () => {
    const [newGenre, setNewGenre] = useState('');
    const { user } = useAuth();
    const { genres, loading, error } = useGenres();

    const handleAddGenre = async () => {
        if (user && newGenre.trim() !== '') {
            try {
                await addGenre(user.uid, newGenre.trim());
                setNewGenre('');
            } catch (error) {
                console.error('ジャンルの追加に失敗しました:', error);
            }
        }
    };

    const handleDeleteGenre = async (genreName: string) => {
        if (user) {
            try {
                await deleteGenre(user.uid, genreName);
            } catch (error) {
                console.error('ジャンルの削除に失敗しました:', error);
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={styles.editIcon}>
                    <CiEdit className="text-3xl dark:text-white" />
                </div>
            </DialogTrigger>
            <DialogContent className={`sm:max-w-[425px] ${styles.dialog}`}>
                <DialogHeader>
                    <DialogTitle>ジャンル管理</DialogTitle>
                    <DialogDescription>
                        ジャンルの追加や削除ができます。
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-genre" className="text-right">
                            新しいジャンル
                        </Label>
                        <Input
                            id="new-genre"
                            value={newGenre}
                            onChange={(e) => setNewGenre(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <Button className="w-full" onClick={handleAddGenre}>
                        <PlusCircle className="mr-2 h-4 w-4" /> ジャンルを追加
                    </Button>
                    <div className="mt-4">
                        <h4 className="mb-2 font-medium">現在のジャンル:</h4>
                        {loading ? (
                            <p>読み込み中...</p>
                        ) : error ? (
                            <p>エラーが発生しました: {error.message}</p>
                        ) : (
                            <ul className="space-y-2">
                                {genres.map((genre, index) => (
                                    <li key={index} className="flex items-center justify-between">
                                        <span>{genre}</span>
                                        <Button variant="ghost" size="sm" onClick={() => handleDeleteGenre(genre)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default GenreManagementDialog;