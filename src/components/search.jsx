// // TODO: refine the input's style, refer to original design
import { useState, useCallback,  } from 'react';

const TMDB_KEY = "cbf82ce50662cd3f8743dd72f213eeb8";

export default function SearchBox({ onMovieSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [matches, setMatches] = useState([]);
    const [activeMatchIndex, setActiveMatchIndex] = useState(-1);
    const showList = matches?.length > 0;
    const [listStyle, setListStyle] = useState(null);

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const handleInputChange = (e) => {
        const value = e.target.value.trim();
        setSearchTerm(value);
        if (value.length > 0) {
            debouncedFetchMovies(value);
        } else {
            setMatches([]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setActiveMatchIndex((prevIndex) => (prevIndex + 1) % matches.length);
        } else if (e.key === 'ArrowUp') {
            setActiveMatchIndex((prevIndex) => (prevIndex - 1 + matches.length) % matches.length);
        } else if (e.key === 'Enter' && activeMatchIndex >= 0) {
            handleMatchedClick(matches[activeMatchIndex]);
        }
    };

    const handleMatchedClick = (movie) => {
        setSearchTerm(movie.title);
        setMatches([]);
        onMovieSelect(movie);
    };
    const debouncedFetchMovies = useCallback(debounce((query) => {
        const fetchMovies = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${query}`
            );
            const data = await response.json();
            if (data.results) {
                setMatches(data.results);
                setTimeout(() => {
                    setListStyle({
                        opacity: 1,
                        marginTop: 0
                    })
                }, 100);
            } else {
                setMatches([]);
            }
        };
        fetchMovies();
    }, 200), []);

    return (
        <div className="search-box">
            {/* TODO: add validation for input to check the length of input value, and make a error message */}
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search Movie Title..."
                className="searchBoxInput"
                maxLength="50"
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid white', font: 'inherit' }}
            />
            {
                showList && (
                    <ul className="matches-list" style={listStyle}>
                        {matches.map((match, index) => (
                            <li
                                key={index}
                                onClick={() => handleMatchedClick(match)}
                                style={{
                                    padding: '10px',
                                    cursor: 'text',
                                    backgroundColor: index === activeMatchIndex ? '#00FC87' : 'transparent',
                                    color: index === activeMatchIndex ? 'black' : 'white', 
                                }}
                            >
                                {match.title}
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    );
}

