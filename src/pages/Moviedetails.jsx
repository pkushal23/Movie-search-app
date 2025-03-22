import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieProviders } from "../services/api";
import "../css/MovieDetails.css"; // Import CSS for styling

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [providers, setProviders] = useState([]); // State for OTT providers

    useEffect(() => {
        async function fetchMovieData() {
            const movieData = await getMovieDetails(id);
            setMovie(movieData);

            // Fetch OTT providers
            const providerData = await getMovieProviders(id);
            const country = providerData["IN"] || providerData["US"]; // Default to India/US
            if (country?.flatrate) {
                setProviders(country.flatrate);
            }
        }

        fetchMovieData();
    }, [id]);

    if (!movie) return <h2>Loading...</h2>;

    // Extract top 5 cast members
    const topCast = movie.credits?.cast?.slice(0, 5); 

    return (
        <div className="movie-details">
            <div className="movie-container">
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
