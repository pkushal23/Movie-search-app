import React, { useEffect, useState } from "react";
import { db, auth } from "../services/firebase"; 
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import MovieCard from "../components/MovieCard";
import "../css/Favorites.css";

function Favorite() {
    const [user] = useAuthState(auth); 
    const [favorites, setFavorites] = useState([]); 

    useEffect(() => {
        if (user) {
            fetchFavorites();
        }
    }, [user]);

   
    const fetchFavorites = async () => {
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            setFavorites(userDoc.data().favorites || []);
        }
    };

  
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
                            <MovieCard movie={movie} removeFromFavorites={removeFromFavorites} onFavoriteUpdate={setFavorites} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorite;
