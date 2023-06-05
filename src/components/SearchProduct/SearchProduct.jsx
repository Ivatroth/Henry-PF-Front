import { useParams } from "react-router-dom";
import "./SearchProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  changePagesName,
  getProductByName,
  filterByName,
  sortAlphabeticProducts,
  changePageFilterNames,
  changePageOrderName,
  sortPriceProducts,
  changePageSortPriceName,

} from "../../redux/actions";
import SearchBar from "../Nav/nav";
import CardList from "../Products/CardList";
import Footer from "../Footer/Footer";
import Paginate from "../Paginate/Paginate";

export default function SearchProduct() {
  const { name } = useParams();
  const products = useSelector((state) => state.products);
  const darkModes = useSelector((state) => state.darkModes);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilters, setPriceFilters] = useState({
    min: "",
    max: "",
  });
  const [filters, setFilters] = useState("");
  useEffect(() => {
    window.sessionStorage.removeItem("filtroCategoria");
    const filtro = window.sessionStorage.getItem("filtroNombre");
    if (!filtro ) {
      dispatch(getProductByName(name));
      return;
    }
    if (filtro.includes('A partir de') || filtro.includes('Maximo') || filtro.includes('Entre')) {
      setFilters(filtro);
    }
    if (filtro === "alfabetico") {
      setFilters("Ordenado alfabéticamente");
    }
    if (filtro === "Menor precio") {
      setFilters("Menor Precio");
    }
    if (filtro === "Mayor precio") {
      setFilters("Mayor Precio");
    }
  }, [dispatch, name]);

  useEffect(()=>{
    const filtro = window.sessionStorage.getItem("filtroNombre");
    if(!filtro){
      setFilters("")
    }
  },[name])

  const changePage = (value) => {
    if (filters == "Precio") {
      setCurrentPage(value);
      let min = priceFilters.min;
      let max = priceFilters.max;
      max === 0 || max === ""
        ? (max = 999999999)
        : (max = parseInt(priceFilters.max));
      min === "" ? (min = 0) : (min = parseInt(priceFilters.min));
      dispatch(changePageFilterNames(name, min, max, value));
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return null;
    }
    if (filters.includes("alfabéticamente")) {
      let filter;
      filters.includes("A-Z") ? (filter = "asc") : (filter = "desc");
      setCurrentPage(value);
      dispatch(changePageOrderName(name, filter, value));
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return null;
    }
    if(filters.includes("precio")){
      setCurrentPage(value);
      let filter;
      filters.includes("Menor") ? (filter = "ascPrice") : (filter = "descPrice");
      dispatch(changePageSortPriceName(name, filter, value));
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return null;
    }
    if (currentPage == value) return null;
    setCurrentPage(value);
    dispatch(changePagesName(name, value));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChange = (e) => {
    setPriceFilters({
      ...priceFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    let min = priceFilters.min;
    let max = priceFilters.max;
    if(!min && !max) return null;
    max === 0 || max === ""
      ? (max = 999999999999999)
      : (max = parseInt(priceFilters.max));
    min === "" ? (min = 0) : (min = parseInt(priceFilters.min));
    dispatch(filterByName(name, min, max));
    if(min === 0){
      setFilters(`Maximo $${max}`);
      window.sessionStorage.setItem("filtroNombre", `Maximo $${max}`);
    }
    if(max === 999999999999999){
      setFilters(`A partir de $${min}`);
      window.sessionStorage.setItem("filtroNombre", `A partir de $${min}`);
    }
    if(min !== 0 && max !== 999999999999999){
      setFilters(`Entre $${min} y $${max}`);
      window.sessionStorage.setItem("filtroNombre", `Entre $${min} y $${max}`);
    }
    setCurrentPage(1);
  };

  const cleanFilter = () => {
    setFilters("");
    setPriceFilters({
      min: "",
      max: "",
    });
    dispatch(getProductByName(name));
    setCurrentPage(1);
    window.sessionStorage.removeItem("filtroNombre");
  };

  const handleSort = (e) => {
    const value = e.target.value;
    const filter = value === "asc" ? "A-Z" : "Z-A";
    setFilters(`Ordenado alfabéticamente ${filter}`);
    dispatch(sortAlphabeticProducts(name, value));
    setCurrentPage(1);
    window.sessionStorage.setItem("filtroNombre", "alfabetico");
  };

  const handleSortPrice = (e) => {
    const value = e.target.value;
    const filter = value === "ascPrice" ? "Menor precio" : "Mayor precio";
    setFilters(filter);
    dispatch(sortPriceProducts(name, value));
    setCurrentPage(1);
    window.sessionStorage.setItem("filtroNombre", filter);
  }

  return (
    <>
      <SearchBar view={true} />
      <main className="main-category">
        <div
          className={darkModes ? "filters-container-dark" : "filters-container"}
        >
          <h4>Filtros</h4>
          {filters && (
            <h5 className="filters-applied">
              {filters}
              <button onClick={cleanFilter} className="button-filters-applied">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  style={{ fill: "rgba(0, 0, 0, 1)" }}
                >
                  <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                </svg>
              </button>
            </h5>
          )}
          <div className="price-container">
            <label className="label">Precio:</label>
            <div className="input-container">
              <input
                name="min"
                onChange={handleChange}
                className="inputs"
                type="number"
                placeholder="mínimo"
                value={priceFilters.min}
              />
              <input
                name="max"
                onChange={handleChange}
                className="inputs"
                type="number"
                placeholder="máximo"
                value={priceFilters.max}
              />
              <button onClick={handleSubmit} className="button-price">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{ fill: "rgba(0, 0, 0, 1)" }}
                >
                  <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="alphabetic-container">
            <label>Orden Alfabetico:</label>
            <div>
              <button
                value="asc"
                onClick={handleSort}
                className="buttons-filter"
              >
                A-Z
              </button>
              <button
                value="desc"
                onClick={handleSort}
                className="buttons-filter"
              >
                Z-A
              </button>
            </div>
          </div>
          <div className="price-order-container">
              <label>Orden por precio:</label>
              <div>
                <button onClick={handleSortPrice} className="buttons-filter" value="ascPrice">Menor Precio</button>
                <button onClick={handleSortPrice} className="buttons-filter" value="descPrice">Mayor Precio</button>
              </div>
            </div>
        </div>
        <div className="all-container">
          <div className="list-container">
            {products?.rows?.map((p, index) => (
              <CardList
                key={index}
                id={p.id}
                title={p.name}
                img={p.img}
                description={p.description}
                category={p?.Categories[0]?.name}
                stock={p.stock}
                price={p.price}
                userId={p.userId}
                dataAos={index % 2 == 0 ? "fade-left" : "fade-right"}
              />
            ))}
          </div>
          <Paginate
            totalProducts={products.count}
            currentPage={currentPage}
            changePage={changePage}
            productsPerPage={6}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
