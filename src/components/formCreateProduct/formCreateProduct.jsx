import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { getCategories } from "../../redux/actions";
import styles from "./form.module.css";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./validacion";
import { postCreate } from "../../redux/actions";
import { FormGroup, Input } from "reactstrap";
import axios from "axios";
import logo from "../../assets/Recurso 1.png";
import logoTukiDark from "../../assets/tuki-market-darks.jpg";

function verificarObjeto(objeto) {
  for (let clave in objeto) {
    if (objeto[clave] !== "") {
      console.log(objeto);
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

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    isOnSale: false,
    salePrice: "0",
    email: "",
    status: "",
    categories: "",
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
    if (verificar) {
      dispatch(postCreate(input));
      setInput({
        name: "",
        description: "",
        price: "",
        stock: "",
        isOnSale: false,
        salePrice: "0",
        email: "",
        status: "",
        categories: "",
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
      alert("producto creado con exito");
      navigate("/");
    } else {
      alert("Completa correctamente los campos");
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

  return (
    <div className={darkModes ? styles.containerdark : styles.container}>
      <Link to={"/"}>
        <img
          src={darkModes ? logoTukiDark : logo}
          alt="logo"
          style={{ width: "340px" }}
          className={darkModes ? styles.logoDark : styles.logo}
        />
      </Link>
      <div className={darkModes ? styles.divDark : styles.div}>
        <span className={styles.register}>Ingresa tu producto</span>
        <form
          action="/create"
          method="POST"
          className={styles.divForm}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className={styles.inputName}>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Nombre del producto"
              className={styles.inputMail}
            />
            {<span className={styles.errors}>{errors.name}</span>}
          </div>

          <div className={styles.description}>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              placeholder="Descripción"
              className={styles.inputMail}
            />
            {<span className={styles.errors}>{errors.description}</span>}
          </div>

          <div className={styles.emailInputs}>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              className={styles.inputMail}
            />
            {<span className={styles.errors}>{errors.email}</span>}
          </div>

          <div className={styles.emailInputs}>
            <input
              type="text"
              name="price"
              onChange={handleChange}
              placeholder="Precio"
              className={styles.inputMail}
            />
            {<span className={styles.errors}>{errors.price}</span>}
          </div>

          <div className={styles.emailInputs}>
            <input
              type="text"
              name="stock"
              onChange={handleChange}
              placeholder="Stock"
              className={styles.inputMail}
            />
            {<span className={styles.errors}>{errors.stock}</span>}
          </div>

          <label className={styles.options} for="myCheckbox" htmlFor="isOnSale">
            ¿Está en oferta?
          </label>
          <input
            id="myCheckbox"
            type="checkbox"
            name="isOnSale"
            onChange={handleChange}
            className={styles.chek}
          />

          <input
            type="text"
            name="salePrice"
            placeholder="Precio Oferta"
            onChange={handleChange}
            className={styles.inputMail}
            style={{ display: input.isOnSale ? "block" : "none" }}
          />
          {
            <span
              className={styles.errors}
              style={{ display: input.isOnSale ? "block" : "none" }}
            >
              {input.isOnSale === "none"
                ? setErrors({ ...errors, salePrice: "" })
                : errors.salePrice}
            </span>
          }
          <label className={styles.options} htmlFor="">
            Estado del producto:
          </label>
          <select
            defaultValue="Estado"
            name="status"
            id=""
            onChange={handleChange}
          >
            <option value="Estado">Seleccionar Estado</option>
            <option value="USADO">Usado</option>
            <option value="NUEVO">Nuevo</option>
          </select>
          {<span className={styles.errors}>{errors.status}</span>}

          <label className={styles.options} htmlFor="">
            Categorías:{" "}
          </label>
          <select
            defaultValue="Categorias"
            name="categories"
            id=""
            onChange={handleChange}
          >
            <option value="Categorias">Seleccionar Categorias</option>
            {allCategories?.map((e, index) => (
              <option key={index} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
          {<span className={styles.errors}>{errors.categories}</span>}

          <FormGroup>
            <Input
              type="file"
              name="img"
              placeholder="Sube foto aqui"
              onChange={uploadImage}
            />
            {loading ? (
              <label htmlFor="">Loading Image</label>
            ) : (
              input.img.map((i, index) => (
                <img key={index} src={i} style={{ width: "300px" }} />
              ))
            )}
            {<span className={styles.errors}>{errors.img}</span>}
          </FormGroup>

          <button className={styles.buttonHome}>Crea tu producto</button>
          <button className={styles.buttonHome}>
            <Link to="/" className={styles.link}>
              Home
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
}
