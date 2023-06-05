import React from "react";
import "../Footer/Footer.css";
import { Link } from "react-router-dom";
import image from "../../assets/envelope-regular-24.png";
import logo from "../../assets/Recurso 1.png";
import logoDark from "../../assets/envelope-solid-24.png";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logoTukiDark from "../../assets/tuki-market-darks.jpg";

export default function Footer() {
  const location = useLocation();
  const darkModes = useSelector((state) => state?.darkModes);

  return (
    <footer className={darkModes ? "footer-dark" : "footer"}>
      <div className={darkModes ? "redirect-links-dark" : "redirect-links"}>
        <h4 className="Redirect-h4">Redirecciones</h4>
        <div className="Redireccc">
          <ul>
            {location.pathname !== "/" ? (
              <li>
                <Link to="/">Hogar</Link>
              </li>
            ) : null}

            <li>
              <Link to="/about">Nosotros</Link>
            </li>
          </ul>
        </div>
      </div>
      <img
        className={darkModes ? "footer-logo-dark" : "footer-logo"}
        src={darkModes ? logoTukiDark : logo}
        alt="TukiMarket"
      ></img>
      <div className="contact-block">
        <h4 className="Redirect-h4">
          <Link
            to="/contact"
            className={darkModes ? "contact-dark" : "contact"}
          >
            Contáctanos
          </Link>
        </h4>
        <div>
          <img src={darkModes ? logoDark : image} alt="mail" />
          <span>TukiMarket@gmail.com</span>
        </div>
      </div>
    </footer>
  );
}
