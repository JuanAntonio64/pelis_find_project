import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <article className="movie-card" onClick={handleClick}>
      <div className="movie-card__image">
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : "/no-poster.png"
          }
          alt={movie.title}
          loading="lazy"
        />
      </div>

      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__meta">
          <span>{movie.release_date?.slice(0, 4)}</span>
          <span className="movie-card__rating">⭐ {movie.vote_average}</span>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
