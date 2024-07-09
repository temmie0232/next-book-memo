import React from 'react';
import styles from './GenreFilter.module.css';
import GenreManagementDialog from '@/features/books/GenreManagementDialog/GenreManagementDialog';

interface GenreFilterProps {
    genres: string[];
    selectedGenre: string;
    onGenreSelect: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selectedGenre, onGenreSelect }) => {
    return (
        <div className={styles.genreFilterContainer}>
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