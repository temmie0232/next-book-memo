import React, { useState, useEffect } from 'react';
import styles from './GenreFilter.module.css';
import GenreManagementDialog from '@/features/books/GenreManagementDialog/GenreManagementDialog';
import { useAuth } from '@/hooks/useAuth';
import { useGenres } from '@/hooks/useGenres';

interface GenreFilterProps {
    selectedGenre: string;
    onGenreSelect: (genre: string) => void;
    onStatusFilterChange: (status: 'not-started' | 'in-progress' | 'completed' | null) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenre, onGenreSelect, onStatusFilterChange }) => {
    const { user } = useAuth();
    const { genres, loading, error } = useGenres();
    const [activeStatus, setActiveStatus] = useState<'not-started' | 'in-progress' | 'completed' | null>(null);

    const toggleStatusFilter = (status: 'not-started' | 'in-progress' | 'completed') => {
        if (activeStatus === status) {
            setActiveStatus(null);
            onStatusFilterChange(null);
        } else {
            setActiveStatus(status);
            onStatusFilterChange(status);
        }
    };

    if (loading) return <div>ジャンルを読み込み中...</div>;
    if (error) return <div>ジャンルの読み込みに失敗しました</div>;

    return (
        <div className={styles.genreFilterContainer}>
            <div className={styles.statusFilterContainer}>
                <button
                    className={`${styles.statusButton} ${styles.notStarted} ${activeStatus === 'not-started' ? styles.active : ''}`}
                    onClick={() => toggleStatusFilter('not-started')}
                    aria-label="未読"
                />
                <button
                    className={`${styles.statusButton} ${styles.inProgress} ${activeStatus === 'in-progress' ? styles.active : ''}`}
                    onClick={() => toggleStatusFilter('in-progress')}
                    aria-label="読書中"
                />
                <button
                    className={`${styles.statusButton} ${styles.completed} ${activeStatus === 'completed' ? styles.active : ''}`}
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