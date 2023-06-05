import { useParams } from "react-router-dom";
import "./CategoriesProduct.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../Nav/nav";
import {
  getProductByCategory,
  filterByCategory,
  changePagesCategory,
  changePageFilterCategory,
  orderByCategory,
  changePageOrderCategory,
  sortPriceCategory,
  changePageSortPriceCategory,

} from "../../redux/actions";
import CardList from "../Products/CardList";
import Footer from "../Footer/Footer";
import Paginate from "../Paginate/Paginate";
import Loading from "../Loading/Loading";
import FilterButtons from "../home/filterButtons/filterButtons";

export default function CategoriesProduct() {
  const products = useSelector((state) => state.products);
  const { name } = useParams();
  const dispatch = useDispatch();
  const darkModes = useSelector((state) => state.darkModes);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilters, setPriceFilters] = useState({
    min: "",
    max: "",
  });
  const [filters, setFilters] = useState("");

  useEffect(() => {
    window.sessionStorage.removeItem("filtroNombre");
    const filtro = window.sessionStorage.getItem("filtroCategoria");
    if (!filtro) {
      dispatch(getProductByCategory(name));
      return;
    }
    if (filtro.includes("A partir de") || filtro.includes("Maximo") || filtro.includes("Entre")) {
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
   const filtro = window.sessionStorage.getItem("filtroCategoria");
   if(!filtro){
     setFilters("")
   } 
  },[name])

  const changePage = (value) => {
    if (filters.includes("A partir de") || filters.includes("Maximo") || filters.includes("Entre")) {
      setCurrentPage(value);
      let min = priceFilters.min;
      let max = priceFilters.max;
      max === 0 || max === ""
        ? (max = 999999999999999)
        : (max = parseInt(priceFilters.max));
      min === "" ? (min = 0) : (min = parseInt(priceFilters.min));
      dispatch(changePageFilterCategory(name, min, max, value));
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
      dispatch(changePageOrderCategory(name, filter, value));
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return null;
    }
    if (filters.includes("precio")) {
      let filter;
      filters.includes("Menor") ? (filter = "ascPrice") : (filter = "descPrice");
      setCurrentPage(value);
      dispatch(changePageSortPriceCategory(name, filter, value));
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return null;
    }
    if (currentPage == value) return null;
    setCurrentPage(value);
    dispatch(changePagesCategory(name, value));
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
    if(!min && !max){
      return null
    }
    !max ? (max = 999999999999999) : (max = priceFilters.max);
    !min ? (min = 0) : (min = priceFilters.min);
    console.log(min, max);
    
    dispatch(filterByCategory(name, min, max));
    if(min === 0){
      setFilters(`Maximo $${max}`);
      window.sessionStorage.setItem("filtroCategoria", `Maximo $${max}`);
    }
    if(max < 1){
      setFilters(`A partir de $${min}`);
      window.sessionStorage.setItem("filtroCategoria", `A partir de $${min}`);
    }
    if(min !== 0 && max !== 2^52){
      setFilters(`Entre $${min} y $${max}`);
      window.sessionStorage.setItem("filtroCategoria", `Entre $${min} y $${max}`);
    }
    setCurrentPage(1);
  };

  const cleanFilter = () => {
    setFilters("");
    setPriceFilters({
      min: "",
      max: "",
    });
    dispatch(getProductByCategory(name));
  };

  const handleOrder = (e) => {
    let order = e.target.value;
    let mode;
    order === "asc" ? (mode = "A-Z") : (mode = "Z-A");

    setFilters(`Ordenado alfabéticamente ${mode}`);
    dispatch(orderByCategory(name, order));
    setCurrentPage(1);
    window.sessionStorage.setItem("filtroCategoria", "afabetico");
  };

  const handleSortPrice = (e) => {
    let order = e.target.value;
    let mode;
    order === "ascPrice" ? (mode = "Menor precio") : (mode = "Mayor precio");
    setFilters(`${mode}`);
    dispatch(sortPriceCategory(name, order));
    setCurrentPage(1);
    window.sessionStorage.setItem("filtroCategoria", mode);
  };

  if (!products.rows) {
    return <Loading />;
  }

  return (
    <div>
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
                onClick={handleOrder}
                className="buttons-filter"
                value="asc"
              >
                A-Z
              </button>
              <button
                onClick={handleOrder}
                className="buttons-filter"
                value="desc"
              >
                Z-A
              </button>
            </div>
          </div>
          <div className="price-order-container">
            <label>Orden Precio:</label>
            <div>
              <button
                onClick={handleSortPrice}
                className="buttons-filter"
                value="ascPrice"
              >
                Menor Precio
              </button>
              <button
                onClick={handleSortPrice}
                className="buttons-filter"
                value="descPrice"
              >
                Mayor Precio
              </button>
            </div>
          </div>
        </div>
        <div className="all-container-category">
            <FilterButtons />
          <div className="list-container">
            {products?.rows?.map((p, index) => (
              <CardList
                key={index}
                id={p.id}
                title={p.name}
                img={p.img}
                description={p.description}
                category={p.Categories[0].name}
                stock={p.stock}
                price={p.price}
                userId={p.userId}
                dataAos={index % 2 === 0 ? "fade-left" : "fade-right"}
              />
            ))}
          </div>
          <Paginate
            totalProducts={products.count}
            currentPage={currentPage}
            productsPerPage={6}
            changePage={changePage}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
