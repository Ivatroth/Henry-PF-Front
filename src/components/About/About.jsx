import "../About/About.css";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container-about">
      <div className="container-h1">
        <h1>Sobre Nosotros</h1>
      </div>
      <Link to="/">
        <button className="btn btn-outline-success">Hogar</button>
      </Link>
      <div className="About">
        <h3 className="aboutTuki">
        ¡Bienvenidos a TukiMarket! Con TukiMarket, podrás comprar y vender una amplia variedad de productos, tanto nuevos como usados, de manera segura y conveniente. Nuestra plataforma te permite conectarte con vendedores confiables y encontrar todo lo que necesitas en un solo lugar. Ya sea que estés buscando electrónicos, ropa, artículos para el hogar o cualquier otro producto, TukiMarket tiene todo lo que necesitas. Únete a nuestra comunidad y descubre la nueva forma de comprar y vender en línea con TukiMarket.
        </h3>
      </div>
    </div>
  );
}
