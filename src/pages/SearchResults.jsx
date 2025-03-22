import { useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "../css/Search.css";
import { searchMovies } from "../services/api";

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const results = await searchMovies(searchQuery);
            setSearchResults(results);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to search movies...");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-page">
            <h1>Search Movies</h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
                {searchQuery && (
                    <button type="button" className="clear-button" onClick={() => setSearchQuery("")}>Clear</button>
                )}
            </form>

            {/* Search Results */}
            {loading && <p>Loading search results...</p>}
            {error && <p className="error-message">{error}</p>}

            {searchResults.length > 0 && (
                <div className="movies-grid">
                    {searchResults.map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id}>  
                            <MovieCard movie={movie} />
                        </Link>
                    ))}
                </div>
            )}

            {/* Back to Home */}
            <Link to="/" className="back-home-button">🏠 Back to Home</Link>
        </div>
    );
}

export default Search;
