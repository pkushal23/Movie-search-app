import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api"; 
import "../css/MovieDetails.css"; // Import the CSS file

const MovieDetails = () => {
    const { id } = useParams(); 
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        getMovieDetails(id).then(setMovie);
    }, [id]);

    if (!movie) return <h2>Loading...</h2>;

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
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
