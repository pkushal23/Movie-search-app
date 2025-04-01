const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${apiKey}`); // Corrected
    const data = await response.json();
    return data.results;
};

export const getTopRatedMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${apiKey}`); // Corrected
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`); // Corrected
    const data = await response.json();
    return data.results;
};

export const getMovieDetails = async (movieId) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`); // Corrected
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
};

export const getMovieProviders = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/watch/providers?api_key=${apiKey}`); // Corrected
    const data = await response.json();
    return data.results;
};