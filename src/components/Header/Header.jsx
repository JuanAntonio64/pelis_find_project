import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          🎬 PelisFind
        </Link>

        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
