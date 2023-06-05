import { useEffect } from "react";
import "./Categories.css";
import { useDispatch, useSelector } from "react-redux";
import { checkExpiration, getCategories } from "../../redux/actions";
import SearchBar from "../Nav/nav";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Categories() {
  const allCategories = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(checkExpiration())
  }, [dispatch]);

  return (
    <>
      <SearchBar />
      <main className="main">
        <h1>Categorías</h1>
        <div className="hr"></div>
        <div className="buttons-container">
          {allCategories?.map((c, index) => (
            <Link to={`/categories/${c.name}`} key={index} className="buttons">
              <img className="image-button" src={c.img} alt={c.name}></img>
              <p>{c.name}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
