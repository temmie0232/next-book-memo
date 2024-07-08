import React from 'react';
import styles from './GenreFilter.module.css';

interface GenreFilterProps {
    genres: string[];
    selectedGenre: string;
    onGenreSelect: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selectedGenre, onGenreSelect }) => {
    return (
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
    );
};

export default GenreFilter;