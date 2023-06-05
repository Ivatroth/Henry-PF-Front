import React from "react";
import "../CarEmpty/CarEmpty.css";
import Footer from "../Footer/Footer";
import SearchBar from "../Nav/nav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CarEmpty() {
  const DarkModes = useSelector((state) => state.DarkModes);

  return (
    <div className="container-empty">
      <SearchBar />
      <img
        className="img-empty"
        src="https://petshop-35b9a.web.app/static/media/carrito_vacio.4e048d38.gif"
        alt=""
      />
      <h2>¡No hay productos en el carrito!</h2>
      <div className="sugerencia">
        <p>
          ¿Quieres seguir buscando en el inicio a ver si encuentras algo que te
          guste?
        </p>
      </div>
      <Link to="/">
        <button className="btn btn-outline-primary">Ir al inicio</button>
      </Link>
      <Footer />
    </div>
  );
}
