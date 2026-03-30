import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
} from "../../utils/api";
import Preloader from "../../components/Preloader/Preloader";
import "./MovieDetail.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      getMovieDetails(id),
      getMovieCredits(id),
      getMovieVideos(id),
    ])
      .then(([movieRes, creditsRes, videosRes]) => {
        setMovie(movieRes);
        setCredits(creditsRes.cast.slice(0, 8));

        const trailerVideo = videosRes.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );

        setTrailer(trailerVideo || null);
      })
      .catch((err) => console.error("Error cargando detalles:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !movie) return <Preloader />;

  return (
    <main className="movie-detail">
      <section
        className="movie-detail__hero"
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
        }}
      >
        <div className="movie-detail__overlay">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>

          <div className="movie-detail__meta">
            <span>⭐ {movie.vote_average}</span>
            <span>{movie.release_date?.slice(0, 4)}</span>
            <span>{movie.runtime} min</span>
          </div>
        </div>
      </section>

      {trailer && (
        <section className="movie-detail__trailer">
          <h2>Tráiler</h2>
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            allowFullScreen
          />
        </section>
      )}

      <section className="movie-detail__cast">
        <h2>Reparto</h2>
        <div className="cast-grid">
          {credits.map((actor) => (
            <div key={actor.id} className="cast-card">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : "/no-avatar.png"
                }
                alt={actor.name}
              />
              <span>{actor.name}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default MovieDetail;
