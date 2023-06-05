import { useDispatch, useSelector } from "react-redux";
import "./ProductsHome.css";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  axiosProductsByCategory,
  prevPageHome,
  nextPageHome,
} from "../../redux/actions";
import Card from "../Products/Card";

export default function ProductsHome() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);

  const prodNames = Object.keys(products);
  const nameOne = prodNames[0];
  const nameTwo = prodNames[1];
  const nameThree = prodNames[2];

  const [actualPage, setActualPage] = useState({
    [nameOne]: 0,
    [nameTwo]: 0,
    [nameThree]: 0,
  });

  useEffect(() => {
    // Hacer un dispatch por cada categoría
    window.sessionStorage.removeItem("filtroCategoria");
    window.sessionStorage.removeItem('filtroNombre')
    categories.slice(0, 3).forEach((category) => {
      dispatch(axiosProductsByCategory(category.name));
      Aos.init({ duration: 1000 });
    });

    if (nameThree !== undefined)
      setActualPage({
        [nameOne]: 0,
        [nameTwo]: 0,
        [nameThree]: 0,
      });
  }, [dispatch, categories, nameThree]);

  const productsOne = products[prodNames[0]]?.rows;
  const productsTwo = products[prodNames[1]]?.rows;
  const productsThree = products[prodNames[2]]?.rows;

  const totalProductsOne = products[prodNames[0]]?.count;
  const totalProductsTwo = products[prodNames[1]]?.count;
  const totalProductsThree = products[prodNames[2]]?.count;

  const pagesOfProductsOne = Math.ceil(totalProductsOne / 3);
  const pagesOfProductsTwo = Math.ceil(totalProductsTwo / 3);
  const pagesOfProductsThree = Math.ceil(totalProductsThree / 3);

  function handleClick(e) {
    const value = e.currentTarget.value;
    const action = e.currentTarget.getAttribute("action");
    switch (value) {
      case nameOne:
        if (action === "prev") {
          if (actualPage[nameOne] === 0) return null;

          dispatch(prevPageHome(value, actualPage[nameOne] - 1));
          setActualPage({
            ...actualPage,
            [nameOne]: actualPage[nameOne] - 1,
          });
        } else {
          if (actualPage[nameOne] === pagesOfProductsOne - 1) return null;
          dispatch(nextPageHome(value, actualPage[nameOne] + 1));
          setActualPage({
            ...actualPage,
            [nameOne]: actualPage[nameOne] + 1,
          });
        }
        break;
      case nameTwo:
        if (action === "prev") {
          if (actualPage[nameTwo] === 0) return null;

          dispatch(prevPageHome(value, actualPage[nameTwo] - 1));
          setActualPage({
            ...actualPage,
            [nameTwo]: actualPage[nameTwo] - 1,
          });
        } else {
          if (actualPage[nameTwo] === pagesOfProductsTwo - 1) {
            return null;
          }
          dispatch(nextPageHome(value, actualPage[nameTwo] + 1));
          setActualPage({
            ...actualPage,
            [nameTwo]: actualPage[nameTwo] + 1,
          });
        }
        break;
      case nameThree:
        if (action === "prev") {
          if (actualPage[nameThree] === 0) return null;

          dispatch(prevPageHome(value, actualPage[nameThree] - 1));
          setActualPage({
            ...actualPage,
            [nameThree]: actualPage[nameThree] - 1,
          });
        } else {
          if (actualPage[nameThree] === pagesOfProductsThree - 1) return null;
          dispatch(nextPageHome(value, actualPage[nameThree] + 1));
          setActualPage({
            ...actualPage,
            [nameThree]: actualPage[nameThree] + 1,
          });
        }
        break;
      default:
        break;
    }
  }


  return (
    <div className="container">
      <div className="container-sections" data-aos="fade-left">
        <div className="text-container">
          <h1>{prodNames[0]}</h1>
        </div>
        <div className="section-all">
          <div className="button-container">
            <button value={prodNames[0]} action="prev" onClick={handleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: "rgba(0, 0, 0, 1)" }}
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
              </svg>
            </button>
          </div>
          {productsOne?.map((p, index) => (
            <Card
              key={index}
              name={p.name}
              price={p.price}
              img={p.img[0]}
              id={p.id}
              stock={p.stock}
              userId={p.userId}
            ></Card>
          ))}

          <div className="button-container next">
            <button value={prodNames[0]} action="next" onClick={handleClick}>
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
      </div>

      <div className="hr"></div>
      <div data-aos='fade-right' className="container-sections">
        <div className="text-container">
          <h1>{prodNames[1]}</h1>
        </div>
        <div className="section-all">
          <div className="button-container">
            <button value={prodNames[1]} action="prev" onClick={handleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: "rgba(0, 0, 0, 1)" }}
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
              </svg>
            </button>
          </div>
          {productsTwo?.map((p, index) => (
            <Card
              key={index}
              name={p.name}
              price={p.price}
              img={p.img[0]}
              id={p.id}
              stock={p.stock}
              userId={p.userId}
            ></Card>
          ))}
          <div className="button-container next">
            <button value={prodNames[1]} action="next" onClick={handleClick}>
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
      </div>
      <div className="hr"></div>
      <div data-aos='fade-left' className="container-sections">
        <div className="text-container">
          <h1>{prodNames[2]}</h1>
        </div>
        <div className="section-all">
          <div className="button-container">
            <button value={prodNames[2]} action="prev" onClick={handleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: "rgba(0, 0, 0, 1)" }}
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
              </svg>
            </button>
          </div>
          {productsThree?.map((p, index) => (
            <Card
              key={index}
              name={p.name}
              price={p.price}
              img={p.img[0]}
              id={p.id}
              stock={p.stock}
              userId={p.userId}
            ></Card>
          ))}
          <div className="button-container next">
            <button value={prodNames[2]} action="next" onClick={handleClick}>
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
      </div>
    </div>
  );
}
