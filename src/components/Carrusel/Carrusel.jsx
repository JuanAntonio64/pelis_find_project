import "./Carrusel.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function Carrusel({ movies }) {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = window.innerWidth;

    slider.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="carousel">
      {/* Navegación izquierda */}
      <button
        className="carousel__nav carousel__nav--left"
        onClick={() => scroll("left")}
        aria-label="Anterior"
      >
        <span>‹</span>
      </button>

      {/* Track */}
      <div className="carousel__track" ref={sliderRef}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="carousel__slide"
            onClick={() => navigate(`/movie/${movie.id}`)}
            style={{
              backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
            }}
          >
            <div className="carousel__overlay">
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navegación derecha */}
      <button
        className="carousel__nav carousel__nav--right"
        onClick={() => scroll("right")}
        aria-label="Siguiente"
      >
        <span>›</span>
      </button>
    </section>
  );
}

export default Carrusel;
