import { useState, useEffect, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logoCarro from "../../assets/cart-alt-regular-24.png";
import logoUser from "../../assets/user-regular-24.png";
import logoUserWhite from "../../assets/user-white-regular-24.png";
import logoSearch from "../../assets/search-alt-regular-24.png";
import logo from "../../assets/Recurso 1.png";
import logoTukiDark from "../../assets/tuki-market-darks.jpg";
import logoWhite from "../../assets/cart-white-alt-regular-24.png";
import { getProductByName, darkMode, closeSesion } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./searchBar.module.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function SearchBar({ view }) {
  const carrito = useSelector((state) => state.carrito);
  const darkModes = useSelector((state) => state?.darkModes);
  const userLogin = useSelector((state) => state.userLogin);
  const userData = useSelector((state) => state.userData);
  const [name, setName] = useState("");
  const [viewMenu, setViewMenu] = useState(false);
  const [productsSearch, setProductsSearch] = useState([]); //para el buscador
  const [matched, setMatched] = useState([]); //para el buscador
  const [displayResults, setDisplayResults] = useState(false); //para el buscador
  const inputRef = useRef(null);
  const searchDisplayRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  const roll = localStorage.getItem("roll");

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(`https://tuki-server.onrender.com/product`);
      setProductsSearch(response.data);
    }
    getProducts();
    function handleClickOutside(event) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        searchDisplayRef.current &&
        !searchDisplayRef.current.contains(event.target)
      ) {
        setDisplayResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleInput(e) {
    setName(e.target.value);
    setMatched(
      productsSearch.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setDisplayResults(name.length >= 3 && matched.length > 1);
  }

  function handleSubmit() {
    dispatch(getProductByName(name));
    setName("");
    navigate(`/Search/${name}`);
    window.sessionStorage.removeItem("filtroNombre");
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }

  function handleChange() {
    dispatch(darkMode(!darkModes));
  }

  useEffect(() => {
    let body = document.body;
    darkModes
      ? body.classList.add("dark-theme")
      : body.classList.remove("dark-theme");
  },[roll]);

  const handleMenu = () => {
    setViewMenu(!viewMenu);
  };

  const handleSession = () => {
    Swal.fire({
      title: "¿Estas seguro que quieres cerrar sesión?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Cerrar Sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
        dispatch(closeSesion());
        Swal.fire(
          "Espero verte pronto!",
          "Tu cuenta fue cerrda con exito.",
          "success"
        );
      }
    });
  };

  const buttonsUnlogin = () => {
    return (
      <div>
        <button className={styles.buttonLogin}>
          <Link to="/formLogin" className={styles.linkMenu}>
            Iniciar Sesión
          </Link>
          <span className={styles.span1}>|</span>
          <Link to="/formRegister" className={styles.link}>
            Registrarse
          </Link>
        </button>
      </div>
    );
  };

  const buttonsLogin = () => {
    return (
      <div>
        <div className={styles.buttonLogin}>
          <Link to="/formCreateProduct" className={styles.link}>
            Publicar un producto
          </Link>
          {(roll === "ADMIN" || roll === "SUPERADMIN") && (
            <Link to="/admin/dashboard" className={styles.link}>
              Admin
            </Link>
          )}
        </div>
      </div>
    );
  };

  const handleSearchItem = (id) => {
    navigate(`/Detail/${id}`);
  };

  const searchDisplay = () => {
    return (
      <div ref={searchDisplayRef} className={styles.searchDisplay}>
        {matched.map((product, index) => (
          <option
            onClick={() => handleSearchItem(product.id)}
            className={styles.searchItems}
            key={index}
          >
            {product.name}
          </option>
        ))}
      </div>
    );
  };

  return (
    <div className={darkModes ? styles.divSearchBar_dark : styles.divSearchBar}>
      <div className={styles.logoContainer}>
        <Link className={styles.logo} to="/">
          <img
            className={darkModes ? styles.logoImgdark : styles.logoImg}
            src={darkModes ? logoTukiDark : logo}
            alt="TukiMarket"
          />
        </Link>
      </div>
      {view ? (
        <div className={styles.divInput}>
          <input
            ref={inputRef}
            type="search"
            value={name}
            placeholder="¿Que vas a llevar hoy?"
            onChange={(e) => handleInput(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            className={styles.input}
          />

          <button onClick={handleSubmit} className={styles.buttonSerch}>
            <img src={logoSearch} className={styles.img} />
          </button>
          {displayResults ? searchDisplay() : null}
        </div>
      ) : null}

      <div className={darkModes ? styles.divUserDark : styles.divUser}>
        {roll ? buttonsLogin() : buttonsUnlogin()}
        <button className={styles.button}>
          <Link to="/carroBuy">
            <img
              src={darkModes ? logoWhite : logoCarro}
              className={styles.img2}
            />
          </Link>
          <span className={darkModes ? styles.count_dark : styles.count}>
            {carrito.length}
          </span>
        </button>
        <button className={styles.button}>
          <button onClick={handleMenu} className={styles.button}>
            <img
              src={darkModes ? logoUserWhite : logoUser}
              className={styles.img2}
            />
          </button>
        </button>
        <div className={viewMenu ? styles.menuUser : styles.menuUserHidden}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              style={{
                fill: darkModes ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)",
              }}
            >
              <path d="M12 2A10.13 10.13 0 0 0 2 12a10 10 0 0 0 4 7.92V20h.1a9.7 9.7 0 0 0 11.8 0h.1v-.08A10 10 0 0 0 22 12 10.13 10.13 0 0 0 12 2zM8.07 18.93A3 3 0 0 1 11 16.57h2a3 3 0 0 1 2.93 2.36 7.75 7.75 0 0 1-7.86 0zm9.54-1.29A5 5 0 0 0 13 14.57h-2a5 5 0 0 0-4.61 3.07A8 8 0 0 1 4 12a8.1 8.1 0 0 1 8-8 8.1 8.1 0 0 1 8 8 8 8 0 0 1-2.39 5.64z"></path>
              <path d="M12 6a3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4zm0 6a1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2z"></path>
            </svg>
            {(roll === "USER"  ||
              roll === "SELLER"  ||
              roll === "SUPERADMIN"  ||
              roll === "ADMIN") && (
              <Link to="/user" className={styles.linkMenu}>
                {username ? username : "Perfil"}
              </Link>
            )}
            {!roll && (
              <Link to="/formLogin" className={styles.linkMenu}>
                Iniciar sesión
              </Link>
            )}
          </div>
          <div>
            <span className={styles.themeTitle}>Change Themes</span>
            {darkModes ? (
              <div className="button-container">
                <button onClick={handleChange}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ fill: "rgba(0, 0, 0, 1)" }}
                  >
                    <path d="M16 6H8c-3.296 0-5.982 2.682-6 5.986v.042A6.01 6.01 0 0 0 8 18h8c3.309 0 6-2.691 6-6s-2.691-6-6-6zm0 9c-1.627 0-3-1.373-3-3s1.373-3 3-3 3 1.373 3 3-1.373 3-3 3z"></path>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="button-container">
                <button onClick={handleChange}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ fill: "rgba(0, 0, 0, 1)" }}
                  >
                    <path d="M8 9c-1.628 0-3 1.372-3 3s1.372 3 3 3 3-1.372 3-3-1.372-3-3-3z"></path>
                    <path d="M16 6H8c-3.3 0-5.989 2.689-6 6v.016A6.01 6.01 0 0 0 8 18h8a6.01 6.01 0 0 0 6-5.994V12c-.009-3.309-2.699-6-6-6zm0 10H8a4.006 4.006 0 0 1-4-3.99C4.004 9.799 5.798 8 8 8h8c2.202 0 3.996 1.799 4 4.006A4.007 4.007 0 0 1 16 16zm4-3.984.443-.004.557.004h-1z"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div>
            {userLogin && (
              <button onClick={handleSession} className={styles.logoutButton}>
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
