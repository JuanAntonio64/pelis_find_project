import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">
          © {new Date().getFullYear()} PelisFind · Datos proporcionados por TMDb
        </p>

        <p className="footer__subtext">
          Juan ANtonio Morales Balderas
        </p>
      </div>
    </footer>
  );
}

export default Footer;
