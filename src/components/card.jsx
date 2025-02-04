const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetails({ movie }) {
    if (!movie) return null;

    const movieBoxStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
    };

    const introductionStyle = {
        fontFamily: 'Oswald,sans-serif',
        fontSize: '1rem',
        lineHeight: '1.5',
    }

    const oswaldStyle = {
        fontFamily: 'Oswald,sans-serif',
        color: '#00FC87',
        fontSize: '1.6em',
        lineHeight: '1.1em',
    }

    return (
        <div>
            <div className="movie-box" style={movieBoxStyle}>
                <div className="movie-details">
                    <img
                        className="poster"
                        src={IMAGE_BASE_URL + movie.poster_path}
                        alt={movie.title}
                        style={{
                            marginRight: '20px',
                        }}
                    />
                    <div className="movie-info">
                        <h1 style={{
                            marginBottom: '10px',
                            fontFamily: 'Lato,sans-serif',
                            fontSize: '2.5em',
                            fontWeight: '700',
                            lineHeight: '1.1',
                            marginTop: '0',
                            display: 'block',
                            textTransform: 'uppercase',
                            unicodeBidi: 'isolate'
                        }}>{movie.title}</h1>
                        <p style={oswaldStyle}>{movie.tagline}</p>
                        <p
                            style={{
                                fontSize: '1rem',
                                fontFamily: 'Lato,sans-serif',
                                marginTop: '0',
                                marginBottom: '1rem',
                            }}>
                            {movie.overview || 'No description available.'}
                        </p>
                        <span style={{ color: '#00FC87', display: 'block', fontSize: '1.4em', fontFamily: 'Oswald,sans-serif' }}>{movie.genres.map(genre => genre.name).join(', ')}</span>
                        <span style={introductionStyle}> {movie.production_companies.map(company => company.name).join(', ')}</span>
                        <div className="release-details" style={{ display: 'grid', gridTemplateColumns: ' 1fr 1fr', marginTop: '15px', gap: 15 }}>
                            <div style={introductionStyle}>Original Release:<div style={oswaldStyle}>{movie.release_date}</div></div>
                            <div style={introductionStyle}>Running Time:<div style={oswaldStyle}>{movie.runtime}mins</div></div>
                            <div style={introductionStyle}>Box Office:<div style={oswaldStyle}>{movie.revenue ? movie.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'N/A'}</div></div>
                            <div style={introductionStyle}>Vote Average:<div style={oswaldStyle}>{movie.vote_average}/10</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
