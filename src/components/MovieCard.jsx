import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../services/firebase"; // ✅ Import Firestore & Auth
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import "../css/MovieCard.css";

function MovieCard({ movie, removeFromFavorites, onFavoriteUpdate }) {
    const [user] = useAuthState(auth); // ✅ Get logged-in user
    const [isFavorite, setIsFavorite] = useState(false); // ✅ Track favorite status

    useEffect(() => {
        if (user) checkIfFavorite();
    }, [user]);

    // ✅ Check if movie is already favorited
    const checkIfFavorite = async () => {
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists() && userDoc.data().favorites) {
            setIsFavorite(userDoc.data().favorites.some((fav) => fav.id === movie.id));
        }
    };

    // ✅ Add/remove movie from Firestore favorites
    const toggleFavorite = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please log in to save favorites!");
            return;
        }

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        let updatedFavorites = [];

        if (userDoc.exists()) {
            const currentFavorites = userDoc.data().favorites || [];
            if (isFavorite) {
                updatedFavorites = currentFavorites.filter((fav) => fav.id !== movie.id);
            } else {
                updatedFavorites = [...currentFavorites, movie];
            }
            await updateDoc(userRef, { favorites: updatedFavorites });
        } else {
            await setDoc(userRef, { favorites: [movie] });
            updatedFavorites = [movie];
        }

        setIsFavorite(!isFavorite); // ✅ Toggle button UI
        if (onFavoriteUpdate) onFavoriteUpdate(updatedFavorites); // ✅ Notify parent component
    };

    return (
        <div className="movie-card">
            <Link to={`/movie/${movie.id}`} className="movie-link">
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="movie-overlay">
                        <button className={`favourite-btn ${isFavorite ? "active" : ""}`} onClick={toggleFavorite}>
                            {isFavorite ? "🔥 Remove" : "⭐ Add"}
                        </button>
                    </div>
                </div>
            </Link>

            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>

                {/* ✅ Only show remove button in favorites page, not home page */}
                
            </div>
        </div>
    );
}

export default MovieCard;
