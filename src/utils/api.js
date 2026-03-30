const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const LANGUAGE = "es-ES";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
};

// Peliculas para el carrusel
export const getTrendingMovies = () => {
  return fetch(
    `${BASE_URL}/trending/movie/week?language=${LANGUAGE}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  ).then(checkResponse);
};

// Peliculas para el grid
export const getPopularMovies = (page = 1) => {
  return fetch(
    `${BASE_URL}/movie/popular?language=${LANGUAGE}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  ).then(checkResponse);
};

// Detalles de una pelicula
export const getMovieDetails = (movieId) => {
  return fetch(
    `${BASE_URL}/movie/${movieId}?language=${LANGUAGE}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  ).then(checkResponse);
};

// Reparto
export const getMovieCredits = (movieId) => {
  return fetch(
    `${BASE_URL}/movie/${movieId}/credits?language=${LANGUAGE}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  ).then(checkResponse);
};

// Trailers
export const getMovieVideos = (movieId) => {
  return fetch(
    `${BASE_URL}/movie/${movieId}/videos?language=${LANGUAGE}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  ).then(checkResponse);
};

// Buscar peliculas
export const searchMovies = (query, page = 1) => {
  return fetch(
    `${BASE_URL}/search/movie?language=${LANGUAGE}&query=${encodeURIComponent(
      query
    )}&page=${page}&include_adult=false`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  ).then(checkResponse);
};
