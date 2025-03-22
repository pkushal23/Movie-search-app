import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieCard.css";

function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id);

    function onFavoriteClick(e) {
        e.preventDefault(); // Prevent navigating away when clicking the favorite button
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }

    return (
        <div className="movie-card">
            {/* ✅ Wrap the poster in a Link */}
            <Link to={`/movie/${movie.id}`} className="movie-link">
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="movie-overlay">
                        <button className={`favourite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                            {favorite ? "🔥 Remove" : "⭐ Add"}
                        </button>
                    </div>
                </div>
            </Link>

            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    );
}

export default MovieCard;
