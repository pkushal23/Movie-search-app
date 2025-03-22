import { useEffect, useState } from "react";
import { Link } from "react-router-dom";  
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { getPopularMovies, getTopRatedMovies } from "../services/api";

function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const [popular, topRated] = await Promise.all([getPopularMovies(), getTopRatedMovies()]);
                setPopularMovies(popular);
                setTopRatedMovies(topRated);
            } catch (err) {
                console.error(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };
        loadMovies();
    }, []);

    return (
        <div className="home">
            {/* Link to Search Page */}
            <div className="search-container">
                <Link to="/search" className="search-button">🔍 Search Movies</Link>
            </div>


            {/* Show Home Page Content */}
            {loading && <p>Loading movies...</p>}
            {error && <p className="error-message">{error}</p>}

            {!loading && (
                <>
                    <h2>Popular Movies</h2>
                    <div className="movies-grid">
                        {popularMovies.map((movie) => (
                            <Link to={`/movie/${movie.id}`} key={movie.id}>  
                                <MovieCard movie={movie} />
                            </Link>
                        ))}
                    </div>

                    <h2>Top Rated Movies</h2>
                    <div className="movies-grid">
                        {topRatedMovies.map((movie) => (
                            <Link to={`/movie/${movie.id}`} key={movie.id}>  
                                <MovieCard movie={movie} />
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
