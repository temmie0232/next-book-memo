import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { addBook } from '@/utils/bookManager';
import { Book } from '@/types/book.types';

/**
 * 本の追加フォームのロジックを管理するカスタムフック
 * 
 * このフックは以下の機能を提供します：
 * - フォームの各フィールドの状態管理
 * - フォームの送信処理
 * - フォームのリセット
 * - バリデーション（タイトルと状態の必須チェック）
 */
export const useAddBookForm = () => {
    const { user } = useAuth();  // 現在のユーザー情報を取得

    // フォームの各フィールドの状態
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string | null>(null);
    const [genre, setGenre] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [status, setStatus] = useState<'not-started' | 'in-progress' | 'completed' | null>(null);
    const [rating, setRating] = useState<string | null>(null);
    const [titleError, setTitleError] = useState('');
    const [statusError, setStatusError] = useState('');

    /**
     * フォームをリセットする関数
     */
    const resetForm = () => {
        setTitle('');
        setAuthor(null);
        setGenre(null);
        setStartDate(null);
        setEndDate(null);
        setStatus(null);
        setRating(null);
        setTitleError('');
        setStatusError('');
    };

    /**
     * フォームを送信する関数
     * @returns {Promise<boolean>} 送信が成功したかどうか
     */
    const handleSubmit = async () => {
        if (!user) return false;  // ユーザーが未ログインの場合は処理を中断

        // タイトルと状態のバリデーション
        let isValid = true;
        if (!title.trim()) {
            setTitleError('タイトルは必須項目です');
            isValid = false;
        }
        if (!status) {
            setStatusError('状態は必須項目です');
            isValid = false;
        }

        if (!isValid) return false;

        // BookDataオブジェクトの作成
        const bookData: Book = {
            title: title.trim(),
            author: author,
            genreId: genre,
            startDate: startDate,
            endDate: endDate,
            status: status as 'not-started' | 'in-progress' | 'completed', // null の可能性を排除
            rating: rating,
            id: ''
        };

        try {
            // Firestoreに本を追加
            await addBook(user.uid, bookData);
            console.log('本を追加しました:', title);
            resetForm();  // フォームをリセット
            return true;  // 成功
        } catch (error) {
            console.error('本の追加に失敗しました:', error);
            return false;  // 失敗
        }
    };

    // フックから返す値と関数
    return {
        title,
        setTitle,
        author,
        setAuthor,
        genre,
        setGenre,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        status,
        setStatus,
        rating,
        setRating,
        titleError,
        setTitleError,
        statusError,
        setStatusError,
        handleSubmit,
        resetForm
    };
};