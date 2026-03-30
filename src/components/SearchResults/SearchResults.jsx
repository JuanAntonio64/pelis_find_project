import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../utils/api";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import Preloader from "../../components/Preloader/Preloader";
import "./SearchResults.css";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    searchMovies(query)
      .then((res) => {
        setMovies(res.results);
      })
      .catch((err) => {
        console.error("Error buscando películas:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <main className="search">
      <section className="search__header">
        <h1>
          Resultados para: <span>“{query}”</span>
        </h1>
        <p>{movies.length} películas encontradas</p>
      </section>

      <MovieGrid movies={movies} />
    </main>
  );
}

export default SearchResults;
