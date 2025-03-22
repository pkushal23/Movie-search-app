import { useEffect, useState } from "react";
import { Link } from "react-router-dom";  
import MovieCard from "../components/Moviecard";
import "../css/Home.css";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to search movies...");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
    <input
        type="text"
        placeholder="Search for movies..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button type="submit" className="search-button">Search</button>
    <button 
        type="button" 
        className="clear-button"
        onClick={() => {
            setSearchQuery("");  
            setLoading(true);
            setError(null);
            getPopularMovies()
                .then(setMovies)
                .catch(() => setError("Failed to load movies..."))
                .finally(() => setLoading(false));
        }}
    >
        Clear
    </button>
</form>


            {loading && <p>Loading movies...</p>}
            {error && <p className="error-message">{error}</p>}
            
            {loading ? (
                <div className="loading">Loading....</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id}>  
                            <MovieCard movie={movie} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
