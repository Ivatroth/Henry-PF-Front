import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../../redux/actions";
import "./filterButtons.css";

export default function FilterButtons() {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="filter-buttons-container">
      <h3>Categorías</h3>
      <div className="button-container">
        {categories?.slice(0, 5).map((c, index) => (
          <Link
            to={`/categories/${c.name}`}
            key={index}
            className="button-filter"
          >
            <img className="filter-image" src={c.img} />
            <p key={index} className="filter-title">
              {c.name}
            </p>
          </Link>
        ))}
        <Link to="/categories" className="button-filter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            style={{ fill: "rgba(0, 0, 0, 1)" }}
          >
            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
          </svg>{" "}
          <p className="filter-title">Más Categorias</p>
        </Link>
      </div>
      <div className="hr"></div>
    </div>
  );
}
