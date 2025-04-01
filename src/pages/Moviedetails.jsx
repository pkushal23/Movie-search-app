import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieProviders } from "../services/api";
import { db, auth } from "../services/firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "../css/MovieDetails.css";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [providers, setProviders] = useState([]);
    const [user] = useAuthState(auth); 
    const [isFavorite, setIsFavorite] = useState(false); 

    useEffect(() => {
        async function fetchMovieData() {
            const movieData = await getMovieDetails(id);
            setMovie(movieData);

          
            const providerData = await getMovieProviders(id);
            const country = providerData["IN"] || providerData["US"]; 
            if (country?.flatrate) {
                setProviders(country.flatrate);
            }
        }

        fetchMovieData();

       
        if (user) {
            checkIfFavorite();
        }
    }, [id, user]);

   
    const checkIfFavorite = async () => {
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists() && userDoc.data().favorites?.some((fav) => fav.id === movie.id)) {
            setIsFavorite(true);
        }
    };


    const addToFavorites = async () => {
        if (!user) {
            alert("Please log in to add favorites!");
            return;
        }

        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
           
            await updateDoc(userRef, {
                favorites: arrayUnion({
                    id: movie.id,
                    title: movie.title,
                    poster: movie.poster_path,
                }),
            });
        } else {
        
            await setDoc(userRef, {
                favorites: [
                    {
                        id: movie.id,
                        title: movie.title,
                        poster: movie.poster_path,
                    },
                ],
            });
        }

        setIsFavorite(true);
        alert("Added to Favorites!");
    };

    if (!movie) return <h2>Loading...</h2>;


    const topCast = movie.credits?.cast?.slice(0, 5);

    return (
        <div className="movie-details">
            <div className="modal-container">
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className="moviedetail-poster"
                />
                <div className="movie-info">
                    <h1>{movie.title}</h1>
                    <p><strong>Overview:</strong> {movie.overview}</p>
                    <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>

                    {/* ✅ Favorite Button */}
                    <button onClick={addToFavorites} disabled={isFavorite} className="favorite-btn">
                        {isFavorite ? "✔ Added to Favorites" : "❤️ Add to Favorites"}
                    </button>

                    {/* ✅ Display Top Cast */}
                    <h2>Top Cast</h2>
                    <div className="cast-list">
                        {topCast?.map((actor) => (
                            <div key={actor.id} className="cast-item">
                                <img 
                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} 
                                    alt={actor.name} 
                                    className="cast-photo"
                                />
                                <p>{actor.name}</p>
                                <p className="character">as {actor.character}</p>
                            </div>
                        ))}
                    </div>

                    {/* ✅ Display OTT Streaming Providers */}
                    {providers.length > 0 && (
                        <div className="ott-section">
                            <h3>Available On:</h3>
                            <div className="ott-list">
                                {providers.map((provider) => (
                                    <div key={provider.provider_id} className="ott-item">
                                        <img 
                                            src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`} 
                                            alt={provider.provider_name} 
                                        />
                                        <p>{provider.provider_name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
