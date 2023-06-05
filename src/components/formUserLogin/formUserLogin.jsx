import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Validation from "./validation";
import { checkExpiration, postLogin } from "../../redux/actions";
import styles from "./formLogin.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Recurso 1.png";
import logoTukiDark from "../../assets/tuki-market-darks.jpg";
import Swal from "sweetalert2";

const verificarFormulario = (errores) => {
  let respuesta = true;
  for (let clave in errores) {
    if (errores[clave] !== "") {
      respuesta = false;
    }
  }
  return respuesta;
};

export default function FormUserLogin() {
  const userLogin = useSelector((state) => state.userLogin);
  const loginError = useSelector((state) => state.loginError);

  const dispatch = useDispatch();
  const darkModes = useSelector((state) => state.darkModes);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    nickname: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    nickname: "",
    password: "",
  });

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      dispatch(checkExpiration());
    }

    if (loginError) {
      Swal.fire({
        icon: "error",
        title: "Ocurrio un error",
        text: `${loginError}`,
        confirmButtonText: "Revisar"
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({ type: "CLEAN_LOGIN_ERROR" });
        }
      });
      
    }


    if (userLogin) {
      navigate("/");
    }
  }, [userLogin, navigate, loginError, dispatch]);

  const handleChange = (e) => {
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
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const verificar = verificarFormulario(errors);
    if (verificar && input.nickname && input.password) {
      dispatch(postLogin(input));
    } else {
      Swal.fire({
        icon: "error",
        title: "Ocurrio un error",
        text: "Verifique los datos ingresados",
        confirmButtonText: "Revisar"
      });
    }
  };
  const googleHandle = () => {
    window.open("https://tuki-server.onrender.com/auth/google", "_self");

    const urlParams = new URLSearchParams(window.location.search);
    const token = decodeURIComponent(urlParams.get("token"));
    const email = decodeURIComponent(urlParams.get("email"));
    const nickname = decodeURIComponent(urlParams.get("nickname"));
    const roll = decodeURIComponent(urlParams.get("roll"));

    // Utilizar los datos decodificados
    console.log("Token:", token);
    console.log("Email:", email);
    console.log("Nickname:", nickname);
    console.log("Roll:", roll);

    // Guardar los datos en el localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("nickname", nickname);
  };
  if (userLogin) {
    return navigate("/");
  }

  return (
    <div className={darkModes ? styles.containerDark : styles.container}>
      <Link to={"/"}>
        <img
          src={darkModes ? logoTukiDark : logo}
          alt="logo"
          style={{ width: "340px" }}
          className={darkModes ? styles.logoDark : styles.logo}
        />
      </Link>
      <div className={darkModes ? styles.divDark : styles.div}>
        <h2 className={styles.loginTitle}>Login</h2>
        <form
          action="/login"
          method="POST"
          onSubmit={(e) => handleSubmit(e)}
          className={styles.divForm}
        >
          <div className={styles.divAlreadyRegister}>
            <div class={styles.inputUserContainer}>
              <input autoComplete="non" type="text" name="nickname" id="username-input" className={input.nickname < 1 ? styles.inputUsername : styles.inputUserActive} value={input.nickname} onChange={handleChange}/>
              <label for="username-input" className={styles.inputLabel}>
                Nombre de usuario
              </label>
            {<span className={styles.errors}>{errors.nickname}</span>}
            </div>
          </div>

          <div className={styles.divAlreadyRegister}>
          <div class={styles.inputUserPasswordContainer}>
              <input type="password" name="password" id="password-input" className={input.password < 1 ? styles.inputPasswordLogin : styles.inputPasswordActiveLogin} value={input.password} onChange={handleChange}/>
              <label for="password-input" className={styles.inputLabel}>
                Contraseña
              </label>
            {<span className={styles.errors}>{errors.password}</span>}
            </div>
          </div>
          <div className={styles.divAlreadyRegister}>
            <button className={styles.buttonHome}>Ingresar</button>
          </div>
        </form>
        <button className={styles.googleButton} onClick={googleHandle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            style={{ fill: "rgba(66, 133, 244, 1)" }}
          >
            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
          </svg>
          Continuar con Google
        </button>
        <span className={styles.userNoRegister} >No tienes cuenta? <Link to='/formRegister' className={styles.toRegister}>Registrate</Link></span>
      </div>
    </div>
  );
}
