import SearchBox from "./components/search";
import { useEffect, useState } from "react";
import MovieDetails from "./components/card";
import './App.css'

const TMDB_KEY = "cbf82ce50662cd3f8743dd72f213eeb8";

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    if (selectedMovie) {
      const fetchMovieDetails = async () => {
        // const response = await fetch(`https://api.themoviedb.org/3/movie/${selectedMovie.id}?api_key=${TMDB_KEY}`);
        const response = await fetch(`https://api.themoviedb.org/3/movie/${selectedMovie.id}?api_key=${TMDB_KEY}&append_to_response=production_companies,production_countries,genres`);
        const data = await response.json();
        setMovieDetails(data);

        document.body.style.backgroundImage = selectedMovie && selectedMovie.backdrop_path ? `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})` : `url(https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg)`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
      }
      fetchMovieDetails();
    }
  }, [selectedMovie]);

  const backgroundStyle = {
    height: 'auto',
    transition: 'background-image 0.5s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };

  return (
    <div>
      <div style={backgroundStyle}>
        <div className="search-container">
          <img alt="Logo" src="./logo.svg" className="logo" />
          <div className="search-box-container">
            <SearchBox onMovieSelect={setSelectedMovie} />
          </div>
        </div>
        <MovieDetails movie={movieDetails} />
      </div>
      <footer style={{ fontSize: '.9em', textAlign: 'center', textShadow: '1px 1px 1px #000'}}>
        <p>
          <a href="http://www.stephenkempin.co.uk/">Designed & developed by Stephen Kempin</a>
        </p>
        <p>
          <a href="https://github.com/Skempin/reactjs-tmdb-app">View Code</a>
        </p>
        <p>
          <a href="https://play.google.com/store/apps/developer?id=SK+-+UK">Developer Google Play Store</a>
        </p>
        <p>
          <a href="https://apps.apple.com/gb/developer/stephen-kempin/id1451415928">Developer Apple App Store</a>
        </p>
      </footer>
    </div>
  );
}
