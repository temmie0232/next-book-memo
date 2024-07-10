import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { addBook } from '@/utils/bookManager';
import { BookData } from '@/types/book.types';

/**
 * 本の追加フォームのロジックを管理するカスタムフック
 * 
 * このフックは以下の機能を提供します：
 * - フォームの各フィールドの状態管理
 * - フォームの送信処理
 * - フォームのリセット
 * - バリデーション（タイトルの必須チェック）
 */
export const useAddBookForm = () => {
    const { user } = useAuth();  // 現在のユーザー情報を取得

    // フォームの各フィールドの状態
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState<'not-started' | 'in-progress' | 'completed'>('not-started');
    const [rating, setRating] = useState('');
    const [titleError, setTitleError] = useState('');

    /**
     * フォームをリセットする関数
     */
    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setGenre('');
        setStartDate('');
        setEndDate('');
        setStatus('not-started');
        setRating('');
        setTitleError('');
    };

    /**
     * フォームを送信する関数
     * @returns {Promise<boolean>} 送信が成功したかどうか
     */
    const handleSubmit = async () => {
        if (!user) return false;  // ユーザーが未ログインの場合は処理を中断

        // タイトルのバリデーション
        if (!title.trim()) {
            setTitleError('タイトルは必須項目です');
            return false;
        }

        // BookDataオブジェクトの作成
        const bookData: BookData = {
            title: title.trim(),
            author: author.trim() || undefined,
            genreId: genre !== 'later' ? genre : undefined,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
            status: status,
            rating: rating !== 'later' ? rating : undefined,
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
        handleSubmit,
        resetForm
    };
};