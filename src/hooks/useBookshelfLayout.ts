import { useState, useEffect } from 'react';

export const useBookshelfLayout = () => {
    const [booksPerShelf, setBooksPerShelf] = useState<number>(12);

    useEffect(() => {
        const updateBooksPerShelf = () => {
            const bookWidth = 120; // BookList.cssの.bookのwidth
            const containerPadding = 32; // BookList.cssの.book-list-containerのpadding (16px * 2)
            const bookGap = 16; // BookList.cssの.books-containerのgap
            const availableWidth = window.innerWidth - containerPadding;
            const targetWidth = availableWidth * 0.80; // 画面の80%
            const booksPerRow = Math.floor((targetWidth + bookGap) / (bookWidth + bookGap));
            setBooksPerShelf(Math.max(1, booksPerRow));
        };

        updateBooksPerShelf();
        window.addEventListener('resize', updateBooksPerShelf);
        return () => window.removeEventListener('resize', updateBooksPerShelf);
    }, []);

    return booksPerShelf;
};