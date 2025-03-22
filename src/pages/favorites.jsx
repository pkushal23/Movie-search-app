import MovieCard from "../components/Moviecard"; // ✅ Fix import case
import { useMovieContext } from "../contexts/MovieContext";
import "../css/Favorites.css";

function Favorite() {
    const { favorites } = useMovieContext();

    return (
        <div className="favorites">
            <h2>Your Favorites</h2>
            {favorites.length === 0 ? (
                <div className="favorite-empty">
                    <h2>No Favorite Movies Yet</h2>
                    <p>Start adding movies to your favorites and they will appear here.</p>
                </div>
            ) : (
                <div className="movies-grid">
                    {favorites.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorite;
