import React, { useState } from "react";
import style from "./FormUpdateProduct.module.css";
import Validation from "./Validation";
import { useDispatch, useSelector } from "react-redux";
import { createAdmin } from "../../redux/actions";
import Swal from "sweetalert2";
import axios from "axios";
import { FormGroup, Input } from "reactstrap";

export default function FormUpdateProduct({ value }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const email = window.localStorage.getItem("email");

  console.log(value);

  // const allAdmins = useSelector((state) => state.allAdmins);

  const [form, setForm] = useState({
    name: value?.col1,
    stock: value?.col2,
    description: value?.col3,
    price: value?.col4,
    status: value?.col5,
    img: value?.col6,
    salePrice: value?.col7,
    isOnSale: value?.col8,
    deleteLogic: value?.col9,
  });

  const [errors, setErrors] = useState({
    name: "",
    stock: "",
    description: "",
    price: "",
    status: "",
    img: "",
    salePrice: "",
    isOnSale: "",
    deleteLogic: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });

    setErrors(
      Validation({ ...form, [property]: value }, errors, setErrors, event)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !errors?.name &&
      !errors?.stock &&
      !errors?.description &&
      !errors?.price &&
      !errors?.status &&
      !errors?.salePrice
    ) {
      handleUpdateProduct();
      Swal.fire(
        "Actualizado!",
        "Has actualizado el producto correctamente.",
        "success"
      );
      window.location.reload();
    } else {
      Swal.fire({
        title: "Introduzca los datos Correctamente",
        icon: "error",
      });
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(
        `https://tuki-server.onrender.com/product/${value.col0}`,
        form
      );
    } catch (error) {
      console.error(error.response.data);
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
    setForm({
      ...form,
      img: file.secure_url,
    });
    setLoading(false);
  };

  return (
    <div className={style.Allform}>
      <form onSubmit={handleSubmit} className={style.FormAdmin}>
        <h1>Actualizar Producto</h1>
        <div className={style.formContainer}>
          <div className={style.NameLast}>
            <div>
              <p htmlFor="">Nombre</p>
              <input
                className={style.right}
                type="text"
                name="name"
                onChange={handleChange}
                defaultValue={value?.col1}
              ></input>
              <span>{errors?.name}</span>
            </div>
            <div>
              <p htmlFor="">Stock</p>
              <input
                type="text"
                name="stock"
                defaultValue={value?.col2}
                onChange={handleChange}
              />
              <span>{errors?.stock}</span>
            </div>
          </div>
          <div className={style.adreessDate}>
            <div>
              <p htmlFor="">Precio</p>
              <input
                className={style.right}
                defaultValue={value?.col4}
                type="text"
                name="price"
                onChange={handleChange}
              />
              <span>{errors?.price}</span>
            </div>
            <div>
              <p htmlFor="">Descripcion</p>
              <input
                type="text"
                name="description"
                defaultValue={value?.col3}
                onChange={handleChange}
              />
              <span>{errors?.description}</span>
            </div>
          </div>
          <div className={style.adreessDate}>
            <div>
              <p htmlFor="">Esta en oferta?</p>
              <select
                name="isOnSale"
                onChange={handleChange}
                defaultValue={"SELECCIONAR"}
                id=""
              >
                <option value="SELECCIONAR">SELECCIONAR</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <p htmlFor="">Estado</p>
              <select
                name="deleteLogic"
                onChange={handleChange}
                defaultValue={"SELECCIONAR"}
                id=""
              >
                <option value="SELECCIONAR">SELECCIONAR</option>
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
              <span>{errors?.deleteLogic}</span>
            </div>
          </div>
          <div className={style.adreessDate}>
            <div>
              <p htmlFor="">Estado</p>
              <select
                name="status"
                onChange={handleChange}
                defaultValue={"Seleccionar"}
                id=""
              >
                <option value="SELECCIONAR">SELECCIONAR</option>
                <option value="NUEVO">NUEVO</option>
                <option value="USADO">USADO</option>
              </select>
              <p>{errors?.status}</p>
            </div>
            <div>
              <p htmlFor="">Precio de oferta</p>
              <input
                className={style.right}
                type="text"
                name="salePrice"
                onChange={handleChange}
                defaultValue={value?.col7}
              />
              <p>{errors?.salePrice}</p>
            </div>
          </div>
          <div>
            <p>Imagen</p>
            <div>
              <FormGroup>
                <Input
                  type="file"
                  name="img"
                  placeholder="Sube de perfil"
                  style={{ width: "100%" }}
                  accept="image/jpeg, image/jpg, image/webp, image/bmp, image/tiff, image/svg+xml"
                  onChange={uploadImage}
                />
                {loading ? (
                  <label htmlFor="">Loading Image</label>
                ) : (
                  <img
                    src={value?.col6[0]}
                    style={{
                      width: "200px",
                      marginTop: "12px",
                      borderRadius: "10px",
                    }}
                  />
                )}
              </FormGroup>
            </div>
          </div>
          <button type="submit">Actualizar</button>
        </div>
      </form>
    </div>
  );
}
