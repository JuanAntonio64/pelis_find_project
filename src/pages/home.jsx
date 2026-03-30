import { useEffect, useState } from "react";
import { getTrendingMovies, getPopularMovies } from "../utils/api";
import Preloader from "../components/Preloader/Preloader";
import Carrusel from "../components/Carrusel/Carrusel";
import MovieGrid from "../components/MovieGrid/MovieGrid";

const MOVIES_PER_LOAD = 3;

function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [visibleCount, setVisibleCount] = useState(MOVIES_PER_LOAD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getTrendingMovies(), getPopularMovies()])
      .then(([trendingRes, popularRes]) => {
        setTrending(trendingRes.results);
        setPopular(popularRes.results);
      })
      .catch((err) => {
        console.error("Error cargando películas:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + MOVIES_PER_LOAD);
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <main>
      <section>
        <Carrusel movies={trending} />
      </section>

      <section>
        <MovieGrid movies={popular.slice(0, visibleCount)} />

        {visibleCount < popular.length && (
          <div className="show-more">
            <button onClick={handleShowMore}>
              Mostrar más
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
