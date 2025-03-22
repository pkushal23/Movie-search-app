import React, { useEffect, useState } from "react";
import { db, auth } from "../services/firebase"; // ✅ Import Firebase
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import MovieCard from "../components/MovieCard";
import "../css/Favorites.css";

function Favorite() {
    const [user] = useAuthState(auth); // ✅ Get logged-in user
    const [favorites, setFavorites] = useState([]); // ✅ Store user's favorites

    useEffect(() => {
        if (user) {
            fetchFavorites();
        }
    }, [user]);

    // ✅ Fetch user favorites from Firestore
    const fetchFavorites = async () => {
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            setFavorites(userDoc.data().favorites || []);
        }
    };

    // ✅ Remove movie from favorites
    const removeFromFavorites = async (movieId) => {
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const updatedFavorites = userDoc
                .data()
                .favorites.filter((movie) => movie.id !== movieId);

                await updateDoc(userRef, { favorites: updatedFavorites });
                setFavorites(updatedFavorites);
                fetchFavorites();
            
        }
    };

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
                        <div key={movie.id} className="favorite-item">
                            <MovieCard movie={movie} />
                            <button className="remove-btn" onClick={() => removeFromFavorites(movie.id)}>
                                ❌ Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorite;
