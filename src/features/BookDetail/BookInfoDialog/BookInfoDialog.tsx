import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Book } from '@/types/book.types';
import { getStatusText, getRatingIcon, getRatingText, getStatusColor, getDateRange } from '@/utils/bookUtils';

interface BookInfoDialogProps {
    book: Book;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const BookInfoDialog: React.FC<BookInfoDialogProps> = ({ book, open, onOpenChange }) => {
    const RatingIcon = getRatingIcon(book.rating);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-2xl'>{book.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p className="text-base">著者 : {book.author || '登録されていません'}</p>
                    <p className="text-base">分類 : {book.genreId || '登録されていません'}</p>
                    <p className="text-base text-muted-foreground">
                        期間 : {getDateRange(book.startDate, book.endDate)}
                    </p>
                    <div className="flex items-center">
                        <span className="text-3xl mr-3"><RatingIcon /></span>
                        <span className="text-xl font-medium">{getRatingText(book.rating)}</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full mr-4 ml-2" style={{ backgroundColor: getStatusColor(book.status) }}></div>
                        <span className="text-xl font-medium">{getStatusText(book.status)}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookInfoDialog;