import React from 'react';
import './GenreFilter.css';

interface GenreFilterProps {
    genres: string[];
    selectedGenre: string;
    onGenreSelect: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selectedGenre, onGenreSelect }) => {
    return (
        <div className="genre-filter">
            <button
                className={`genre-button ${selectedGenre === 'すべて' ? 'active' : ''}`}
                onClick={() => onGenreSelect('すべて')}
            >
                すべて
            </button>
            {genres.map((genre) => (
                <button
                    key={genre}
                    className={`genre-button ${selectedGenre === genre ? 'active' : ''}`}
                    onClick={() => onGenreSelect(genre)}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
};

export default GenreFilter;