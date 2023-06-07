import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { getCategories } from "../../redux/actions";
import "./form.css";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./validacion";
import { postCreate } from "../../redux/actions";
import { FormGroup, Input } from "reactstrap";
import axios, { all } from "axios";
import logo from "../../assets/Recurso 1.png";
import logoTukiDark from "../../assets/tuki-market-darks.jpg";
import Typewriter from "typewriter-effect";
import Swal from "sweetalert2";

function verificarObjeto(objeto) {
  for (let clave in objeto) {
    if (objeto[clave] !== "") {
      return false;
    }
  }
  return true;
}

function verifyForm(form) {
  for (const value in form) {
    if (form[value] === "") {
      return false;
    }
  }
  return true;
}

export default function FormCreateProducs() {
  const allCategories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkModes = useSelector((state) => state.darkModes);
  const email = window.localStorage.getItem("email");
  const [actualImg, setActualImg] = useState(0);

  
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    isOnSale: false,
    salePrice: null,
    email: email,
    status: "Nuevo",
    categories: allCategories[0]?.name,
    img: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    email: "",
    status: "",
    categories: "",
    salePrice: "",
    img: "",
  });



  useEffect(() => {
    dispatch(getCategories());
    if(!input.isOnSale){
      setErrors({
        ...errors,
        salePrice: "",
      });
      setInput({
        ...input,
        salePrice: null,
      });
    }
  }, [dispatch, input.isOnSale]);
  
  const handleChange = (e) => {
    if (e.target.name === "isOnSale") {
      if (input.isOnSale === false) {
        setInput({
          ...input,
          isOnSale: true,
        });
      } else {
        setInput({
          ...input,
          isOnSale: false,
        });
      }
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      Validation(
        { ...input, [e.target.name]: e.target.value },
        setErrors,
        errors,
        e
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificar = verificarObjeto(errors);
    const form = verifyForm(input);
    if (verificar && form) {
      dispatch(postCreate(input));
      setInput({
        name: "",
        description: "",
        price: "",
        stock: "",
        isOnSale: false,
        salePrice: "",
        email: "",
        status: "Nuevo",
        categories: allCategories[0].name,
        img: [],
      });
      setErrors({
        name: "",
        description: "",
        price: "",
        stock: "",
        email: "",
        status: "",
        categories: "",
        salePrice: "",
        img: "",
      });
      Swal.fire({
        icon: "success",
        title: "Producto creado con exito!",
        showConfirmButton: true,
        confirmButtonText: "Ver producto",
        showDenyButton: true,
        denyButtonText: "Crear otro producto",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/Search/${input.name}`);
        }});
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal, verifique haber llenado todos los casilleros correctamente!",
      });
    }
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "tukimarquet");
    setLoading(true);
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/diyccpins/image/upload",
      data
    );
    const file = await res.data;
    setInput({
      ...input,
      img: [...input.img, file.secure_url],
    });
    setLoading(false);
    Validation(
      { ...input, img: [...input.img, file.secure_url] },
      setErrors,
      errors,
      e
    );
  };

  const handleDeleteImg = (index) => {
    setInput({
      ...input,
      img: input.img.filter((img, i) => i !== index),
    });
    setActualImg(0);
  };



  let firstError = null;

  for (let propiedad in errors) {
    if (errors[propiedad] !== "") {
      firstError = `${errors[propiedad]}`;
      break;
    }
  }

  return (
    <div className="allContainer-form-product">
      <Link to="/" className="logo-container">
        <img src={logo} alt="logo"></img>
      </Link>
      <div className="container-form-product">
        <div className="textContainer">
          <h1>
            <Typewriter
              options={{
                strings: [
                  "Crea y vende en TukiMarket hoy mismo!",
                  "Analiza tus ventas y crece con nosotros!",
                ],
                autoStart: true,
                delay: 80,
                loop: true,
              }}
            />
          </h1>
        </div>
        <div className="formContainer">
          <form className="form" onSubmit={handleSubmit}>
            <div className="name-input-container">
              <input
                name="name"
                type="text"
                autoComplete="off"
                className={
                  input.name < 1
                    ? "input-name-product"
                    : "input-name-product-active"
                }
                onChange={handleChange}
                value={input.name}
              />
              <label className="label-name-product">Nombre del producto</label>
            </div>
            <div className="description-input-container">
              <textarea
                name="description"
                type="text"
                autoComplete="off"
                className={
                  input.description < 1
                    ? "input-description-product"
                    : "input-description-product-active"
                }
                onChange={handleChange}
                value={input.description}
              />
              <label className="label-description-product">
                Descripción del producto
              </label>
            </div>
            <div className="group-one">
              <div className="price-input-container">
                <input
                  name="price"
                  type="number"
                  autoComplete="off"
                  className={
                    input.price < 1
                      ? "input-price-product"
                      : "input-price-product-active"
                  }
                  onChange={handleChange}
                  value={input.price}
                />
                <label className="label-price-product">
                  Precio del producto
                </label>
              </div>
              <div className="stock-input-container">
                <input
                  name="stock"
                  type="number"
                  autoComplete="off"
                  className={
                    input.stock < 1
                      ? "input-stock-product"
                      : "input-stock-product-active"
                  }
                  onChange={handleChange}
                  value={input.stock}
                />
                <label className="label-stock-product">
                  Stock del producto
                </label>
              </div>
            </div>
            <div className="group-two">
              <div className="salePrice-check-container">
                <input
                  name="isOnSale"
                  type="checkbox"
                  autoComplete="off"
                  className="input-salePrice-check-product"
                  onChange={handleChange}
                  value={input.isOnSale}
                />
                <label className="label-salePrice-check-style-product">
                  {input.isOnSale && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style={{ fill: "rgba(255, 159, 28, 1)" }}
                    >
                      <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
                    </svg>
                  )}
                </label>
                <label className="label-salePrice-check-product">
                  ¿En oferta?
                </label>
              </div>
              {input.isOnSale && (
                <div className="salePrice-input-container">
                  <input
                    name="salePrice"
                    type="number"
                    min="1"
                    autoComplete="off"
                    className={
                      input.salePrice < 1
                        ? "input-salePrice-product"
                        : "input-salePrice-product-active"
                    }
                    onChange={handleChange}
                    value={input.salePrice}
                  />
                  <label className="label-salePrice-product">
                    Precio de oferta
                  </label>
                </div>
              )}
            </div>
            <div className="group-three">
              <div className="status-input-container">
                <select
                  name="status"
                  className="input-status-product"
                  onChange={handleChange}
                  value={input.status}
                >
                  <option value="Nuevo">Nuevo</option>
                  <option value="Usado">Usado</option>
                </select>
                <label className="label-status-product">
                  Estado del producto
                </label>
              </div>
              <div className="categories-input-container">
                <select
                  name="categories"
                  className="input-categories-product"
                  onChange={handleChange}
                  value={input.categories}
                >
                  {allCategories.map((category,index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <label className="label-categories-product">
                  Categoría del producto
                </label>
              </div>
            </div>
            {input.img.length > 1 && (
              <div className="all-img-product-container">
                {input.img.map((img, index) => (
                  <img key={index} src={img} alt="img" className="all-img-product" onClick={()=> setActualImg(index)}/>
                ))}
              </div>
            )}
            {input.img.length > 0 && (
              <div className="img-container">
                <img src={input.img[actualImg]} alt="img" className="img-product" />
                <button
                type="button"
                  onClick={() => handleDeleteImg(actualImg)}
                  className="button-delete-img"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ fill: "rgba(0, 0, 0, 1)" }}
                  >
                    <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                  </svg>
                </button>
              </div>
            )}
            <div className="input-img-product-container">
              <input
                name="img"
                type="file"
                id="img"
                accept="image/*"
                autoComplete="off"
                className="input-img-product"
                onChange={uploadImage}
              />
              <label htmlFor="img" className="input-img-style-product">
                Seleccione imagen/es del producto
              </label>
            </div>
            <div className="errors-container">
              {firstError && <p className="error">{firstError}</p>}
            </div>
            <button className="submit-product" type="submit">Publicar producto</button>
          </form>
        </div>
      </div>
    </div>
  );
}
