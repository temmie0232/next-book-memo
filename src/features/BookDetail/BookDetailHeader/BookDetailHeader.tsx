import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoMdArrowBack } from 'react-icons/io';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { useTheme } from '@/contexts/theme/useTheme';
import CustomTooltip from '@/components/elements/CustomTooltip';
import SettingsDropdown from '@/components/elements/SettingsDropdown';
import { auth } from '~/firebase';
import { signOut } from 'firebase/auth';
import { Book } from '@/types/book.types';
import BookInfoDialog from '../BookInfoDialog/BookInfoDialog';
import EditBookDialog from '../EditBookDialog/EditBookDialog';
import DeleteBookDialog from '../DeleteBookDialog/DeleteBookDialog';
import { useContainers } from '@/hooks/useContainers';
import { deleteBook } from '@/utils/bookManager';

interface BookDetailHeaderProps {
    book: Book;
    onSave: (updatedBook: Book) => void;
}

const BookDetailHeader: React.FC<BookDetailHeaderProps> = ({ book, onSave }) => {
    const router = useRouter();
    const { theme } = useTheme();
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { containers, addContainer, updateContainer, deleteContainer } = useContainers(book.id);

    const handleGoBack = () => {
        router.back();
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error("ログアウトに失敗しました", error);
        }
    };

    const handleDeleteBook = async () => {
        try {
            await deleteBook(auth.currentUser!.uid, book.id);
            router.push('/books');
        } catch (error) {
            console.error("本の削除に失敗しました", error);
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-10 flex justify-between items-center h-16 p-4 ${theme === 'dark'
            ? 'bg-[#2E2E2E] text-white border-b border-[#858383]'
            : 'bg-[#ebebeb] text-black border-b border-gray-400'
            }`}>
            <CustomTooltip content="戻る">
                <Button variant="ghost" onClick={handleGoBack} className="p-2">
                    <IoMdArrowBack size={34} />
                </Button>
            </CustomTooltip>
            <div className="flex items-center space-x-4">
                <Button variant="ghost" className='text-2xl' onClick={() => setInfoDialogOpen(true)}>
                    {book.title}
                </Button>
                <CustomTooltip content="編集">
                    <Button variant="ghost" onClick={() => setEditDialogOpen(true)}>
                        <FaEdit size={20} />
                    </Button>
                </CustomTooltip>
                <CustomTooltip content="削除">
                    <Button variant="ghost" onClick={() => setDeleteDialogOpen(true)}>
                        <FaTrash size={20} />
                    </Button>
                </CustomTooltip>
            </div>
            <SettingsDropdown onLogout={handleLogout} />
            <BookInfoDialog book={book} open={infoDialogOpen} onOpenChange={setInfoDialogOpen} />
            <EditBookDialog book={book} open={editDialogOpen} onOpenChange={setEditDialogOpen} onSave={onSave} />
            <DeleteBookDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDeleteBook}
            />
        </header>
    );
};

export default BookDetailHeader;