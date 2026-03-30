import "./MovieGrid.css";
import MovieCard from "../MovieCard/MovieCard";

function MovieGrid({ movies }) {
  return (
    <section className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}

export default MovieGrid;
