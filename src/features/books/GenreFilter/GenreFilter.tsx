import React, { useState } from 'react';
import styles from './GenreFilter.module.css';
import GenreManagementDialog from '@/features/books/GenreManagementDialog/GenreManagementDialog';
import { useAuth } from '@/hooks/useAuth';
import { useGenres } from '@/hooks/useGenres';

interface GenreFilterProps {
    selectedGenre: string;
    onGenreSelect: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenre, onGenreSelect }) => {
    const { user } = useAuth();
    const { genres, loading, error } = useGenres();
    const [statusFilter, setStatusFilter] = useState({
        notStarted: false,
        inProgress: false,
        completed: false
    });

    const toggleStatusFilter = (status: 'notStarted' | 'inProgress' | 'completed') => {
        setStatusFilter(prev => ({ ...prev, [status]: !prev[status] }));
    };

    if (loading) return <div>ジャンルを読み込み中...</div>;
    if (error) return <div>ジャンルの読み込みに失敗しました</div>;

    return (
        <div className={styles.genreFilterContainer}>
            <div className={styles.statusFilterContainer}>
                <button
                    className={`${styles.statusButton} ${styles.notStarted} ${statusFilter.notStarted ? styles.active : ''}`}
                    onClick={() => toggleStatusFilter('notStarted')}
                    aria-label="未読"
                />
                <button
                    className={`${styles.statusButton} ${styles.inProgress} ${statusFilter.inProgress ? styles.active : ''}`}
                    onClick={() => toggleStatusFilter('inProgress')}
                    aria-label="読書中"
                />
                <button
                    className={`${styles.statusButton} ${styles.completed} ${statusFilter.completed ? styles.active : ''}`}
                    onClick={() => toggleStatusFilter('completed')}
                    aria-label="完読"
                />
            </div>
            <div className={styles.divider}></div>
            <div className={styles.genreFilter}>
                <button
                    className={`${styles.genreButton} ${selectedGenre === 'すべて' ? styles.active : ''}`}
                    onClick={() => onGenreSelect('すべて')}
                >
                    すべて
                </button>
                {genres.map((genre) => (
                    <button
                        key={genre}
                        className={`${styles.genreButton} ${selectedGenre === genre ? styles.active : ''}`}
                        onClick={() => onGenreSelect(genre)}
                    >
                        {genre}
                    </button>
                ))}
            </div>
            <div className={styles.divider}></div>
            <div className={styles.gmdContainer}>
                <GenreManagementDialog />
            </div>
        </div>
    );
};

export default GenreFilter;