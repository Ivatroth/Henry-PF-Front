import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./form.module.css";
import logo from "../../assets/Recurso 1.png";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./validacion";
import Footer from "../Footer/Footer";
import logoTukiDark from "../../assets/tuki-market-darks.jpg";
import { postForm } from "../../redux/actions";
import UserCreateError from "./UserCreateError/UserCreateError";
import UserCreateSuccesFull from "./UserCreateSuccesfull/UserCreateSuccesfull";
import axios from "axios";
import Swal from "sweetalert2";
import Typewriter  from "typewriter-effect";

const paisesAmerica = [
  "Antigua y Barbuda",
  "Argentina",
  "Bahamas",
  "Bolivia",
  "Brasil",
  "Canadá",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Dominica",
  "Ecuador",
  "El Salvador",
  "Estados Unidos",
  "Guatemala",
  "Honduras",
  "Jamaica",
  "México",
  "Nicaragua",
  "Panamá",
  "Paraguay",
  "Perú",
  "República Dominicana",
  "San Cristóbal y Nieves",
  "Santa Lucía",
  "Surinam",
  "Uruguay",
  "Venezuela",
];

function verificarObjeto(objeto) {
  for (let clave in objeto) {
    if (objeto[clave] !== "") {
      return false;
    }
  }
  return true;
}

export default function FormRegister() {
  const dispatch = useDispatch();
  const darkModes = useSelector((state) => state.darkModes);
  const userCreateError = useSelector((state) => state.userCreateError);
  const userCreateSuccesfull = useSelector((state) => state.userCreateSuccesfull);
  const navigate = useNavigate()

  useEffect(() => {


    if (userCreateError) {
      Swal.fire({
        icon: 'error',
        title: 'Algo salio mal',
        text: userCreateError,
        confirmButtonText: 'Revisar',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({ type: "CLEAN_USER_ERROR" })
        }
      })
    }


    if (userCreateSuccesfull) {
      setInput({
        email: "",
        name: "",
        lastName: "",
        nickname: "",
        birthDate: "",
        password: "",
        passwordRepit: "",
        street: "",
        number: "",
        address: "",
      });
    }

    if (userCreateSuccesfull) {
      Swal.fire({
        icon: 'success',
        title: 'Usuario creado!',
        text: userCreateSuccesfull,
        confirmButtonText: 'Iniciar sesion',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({ type: "CLEAN_USER_CREATE" })
          navigate('/formLogin')
        }
      })
    }
    
  }, [userCreateSuccesfull, userCreateError]);


  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    lastName: "",
    nickname: "",
    birthDate: "",
    password: "",
    passwordRepit: "",
    street: "",
    number: "",
    picture: "",
  });
  const [input, setInput] = useState({
    email: "",
    name: "",
    lastName: "",
    nickname: "",
    birthDate: "",
    password: "",
    passwordRepit: "",
    street: "",
    number: "",
    country: "",
    city: "",
    address: "",
  });

  const handleChange = (e) => {
    if (
      e.target.name === "street" ||
      e.target.name === "number" ||
      e.target.name === "country" ||
      e.target.name === "city"
    ) {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
        address: `${input.country}, ${input.city}, ${input.street} ${input.number} `,
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
    Validation(
      { ...input, [e.target.name]: e.target.value },
      setErrors,
      errors,
      e
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificar = verificarObjeto(errors);
    if (verificar) {
      dispatch(postForm(input));
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
      picture: file.secure_url,
    });
    setLoading(false);
  };

  const handleDelete = () => {
    setInput({
      ...input,
      picture: "",
    });
  };


  const messages = ["Bienvenido a Tuki Market!", "Disfruta de tu compra!"]

  return (
    <div className={darkModes ? styles.allFormDark : styles.allForm}>
      <Link to="/">
        <img
          src={darkModes ? logoTukiDark : logo}
          style={{ width: "320px" }}
          alt=""
          className={darkModes ? styles.tukimarkdark : styles.tukimark}
        />
      </Link>
        <div className={darkModes ? styles.divDark : styles.div}>
          <div className={styles.welcomeDiv}>
            <h1 className={styles.welcomeTitle}><Typewriter options={{
              strings: messages,
              autoStart: true,
              delay: 80,
              loop: true,
            }} /></h1>
          </div>
          <div className={styles.divFormContainer}>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className={styles.divForm}
              action="/create"
              method="POST"
            >
              <div class={styles.inputEmailUserContainer}>
                <input
                  autoComplete="off"
                  type="text"
                  name="email"
                  id="email-input"
                  className={
                    input.email < 1
                      ? styles.inputEmail
                      : styles.inputEmailActive
                  }
                  value={input.email}
                  onChange={handleChange}
                />
                <label for="email-input" className={styles.inputLabel}>
                  Email
                </label>
                {errors.email && input.email.length > 3 && (
                  <p className={styles.error}>{errors.email}</p>
                )}
              </div>
              <div className={styles.nameGroup}>
                <div className={styles.firstNameInputContainer}>
                  <input
                    autoComplete="off"
                    type="text"
                    name="name"
                    id="name-input"
                    className={
                      input.name < 1 ? styles.inputName : styles.inputNameActive
                    }
                    value={input.name}
                    onChange={handleChange}
                  />
                  <label for="name-input" className={styles.inputLabel}>
                    Nombre
                  </label>
                  {errors.name && <p className={styles.error}>{errors.name}</p>}
                </div>
                <div className={styles.lastNameInputContainer}>
                  <input
                    autoComplete="off"
                    type="text"
                    name="lastName"
                    id="lastName-input"
                    className={
                      input.lastName < 1
                        ? styles.inputLastName
                        : styles.inputLastNameActive
                    }
                    value={input.lastName}
                    onChange={handleChange}
                  />
                  <label for="lastName-input" className={styles.inputLabel}>
                    Apellido
                  </label>
                  {errors.lastName && (
                    <p className={styles.error}>{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div className={styles.secondGroup}>
                <div className={styles.usernameInputContainer}>
                  <input
                    autoComplete="off"
                    type="text"
                    name="nickname"
                    id="username-input"
                    className={
                      input.nickname < 1
                        ? styles.inputUsername
                        : styles.inputUsernameActive
                    }
                    value={input.nickname}
                    onChange={handleChange}
                  />
                  <label for="username-input" className={styles.inputLabel}>
                    Nombre de usuario
                  </label>
                  {errors.nickname && (
                    <p className={styles.error}>{errors.nickname}</p>
                  )}
                </div>
                <div className={styles.birthDateInputContainer}>
                  <input
                    autoComplete="off"
                    type="date"
                    name="birthDate"
                    id="birthDate-input"
                    className={
                      input.birthDate < 1
                        ? styles.inputBirthDate
                        : styles.inputBirthDateActive
                    }
                    value={input.birthDate}
                    onChange={handleChange}
                  />
                  <label
                    for="birthDate-input"
                    className={styles.inputLabelBirth}
                  >
                    Fecha de nacimiento
                  </label>
                  {errors.birthDate && (
                    <p className={styles.error}>{errors.birthDate}</p>
                  )}
                </div>
              </div>
              <div className={styles.thirdGroup}>
                <div className={styles.passwordInputContainer}>
                  <input
                    autoComplete="off"
                    type="password"
                    name="password"
                    id="password-input"
                    className={
                      input.password < 1
                        ? styles.inputPassword
                        : styles.inputPasswordActive
                    }
                    value={input.password}
                    onChange={handleChange}
                  />
                  <label for="password-input" className={styles.inputLabel}>
                    Contraseña
                  </label>
                  {errors.password && (
                    <p className={styles.error}>{errors.password}</p>
                  )}
                </div>
                <div className={styles.passwordRepitInputContainer}>
                  <input
                    autoComplete="off"
                    type="password"
                    name="passwordRepit"
                    id="passwordRepit-input"
                    className={
                      input.passwordRepit < 1
                        ? styles.inputPasswordRepit
                        : styles.inputPasswordRepitActive
                    }
                    value={input.passwordRepit}
                    onChange={handleChange}
                  />
                  <label
                    for="passwordRepit-input"
                    className={styles.inputLabel}
                  >
                    Repetir contraseña
                  </label>
                  {errors.passwordRepit && (
                    <p className={styles.error}>{errors.passwordRepit}</p>
                  )}
                </div>
              </div>
              <div className={styles.fourthGroup}>
                <div className={styles.countryInputContainer}>
                  <select
                    name="country"
                    onChange={handleChange}
                    className={styles.selectCountry}
                    defaultValue="Seleccionar Pais"
                  >
                    <option value="Seleccionar Pais" disabled selected hidden>
                      Seleccionar Pais
                    </option>
                    {paisesAmerica.map((p, index) => (
                      <option
                        className={styles.optionsCountry}
                        key={index}
                        value={p}
                      >
                        {p}
                      </option>
                    ))}
                  </select>
                  <label for="country-input" className={styles.countryLabel}>
                    País
                  </label>
                </div>
                <div className={styles.cityInputContainer}>
                  <input
                    autoComplete="off"
                    type="text"
                    name="city"
                    id="city-input"
                    className={
                      input.city < 1 ? styles.inputCity : styles.inputCityActive
                    }
                    value={input.city}
                    onChange={handleChange}
                  />
                  <label for="city-input" className={styles.inputLabel}>
                    Ciudad/Provincia
                  </label>
                </div>
              </div>
              <div className={styles.fifthGroup}>
                <div className={styles.streetInputContainer}>
                  <input
                    autoComplete="off"
                    type="text"
                    name="street"
                    id="street-input"
                    className={
                      input.street < 1
                        ? styles.inputStreet
                        : styles.inputStreetActive
                    }
                    value={input.street}
                    onChange={handleChange}
                  />
                  <label for="street-input" className={styles.inputLabel}>
                    Calle
                  </label>
                </div>
                <div className={styles.numberInputContainer}>
                  <input
                    autoComplete="off"
                    type="text"
                    name="number"
                    id="number-input"
                    className={
                      input.number < 1
                        ? styles.inputNumber
                        : styles.inputNumberActive
                    }
                    value={input.number}
                    onChange={handleChange}
                  />
                  <label for="number-input" className={styles.inputLabel}>
                    Número
                  </label>
                </div>
              </div>
              {
              !input.picture &&
                <div className={styles.fileInputContainer}>
                <input
                  autoComplete="off"
                  type="file"
                  name="file"
                  id="file-input"
                  accept="image/jpeg, image/png"
                  className={styles.inputFile}
                  onChange={uploadImage}
                />
                <label for="file-input" className={styles.inputLabelFile}>
                  Seleccionar foto de perfil (opcional)
                </label>
              </div>
              }
              {input.picture && <div className={styles.pictureContainer}>
              <img className={styles.profilePicture} src={input.picture}></img>
              <button onClick={handleDelete} className={styles.buttonDeletePicture}>X</button>
              </div>}
              
              <button className={styles.submitButton} onClick={handleSubmit}>Registrarme</button>
            </form>
        </div>
          <span className={styles.alReadyRegister}>Ya tienes cuenta? <Link className={styles.toLogin} to="/formLogin">Iniciar sesión</Link></span>
      </div>
    </div>
  );
}
