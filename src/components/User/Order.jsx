import React, { useEffect } from 'react';
import SearchBar from "../Nav/nav";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { shoppinghistory } from "../../redux/actions";
import styles from "./order.module.css";
import { sendReviews , getVentas} from '../../redux/actions';
import { Toaster, toast } from 'sonner'
import { useNavigate } from "react-router-dom";


function Order() {
    const [activeButton, setActiveButton] = React.useState('Pedido');
    const dispatch = useDispatch();
    const userData = localStorage.getItem('email');
    const history = useSelector((state) => state.history);
    const location = useLocation();
    const completo = history?.filter((order) => order.status === 'ENTREGADO')
    const enviado = history?.filter((order) => order.status === "ENVIADO")
    const pendiente = history?.filter((order) => order.status === "PENDIENTE")
    const totalPendientes = pendiente?.reduce((total, order) => {
        return total + order.detailOrders.length;
      }, 0);
    const totalEnviados = enviado?.reduce((total, order) => {
        return total + order.detailOrders.length;
      }, 0);
    const totalCompletos = completo?.reduce((total, order) => {
        return total + order.detailOrders.length;
      }, 0);

    const [status, setStatus] = React.useState({
        status: 'TODO',
    });
    const [reviews, setReviews] = React.useState(false);
    const [review, setReview] = React.useState({
        id: '',
        idProduc: '',
        email: userData,
        rating: null,
        descripcion: '',
    });
    const roll = localStorage.getItem('roll');

    useEffect(() => {
        const currentPath = location.pathname.split('/').pop();
        if (currentPath === 'user') {
            setActiveButton('Perfil');
        } else if (currentPath === 'orders') {
            setActiveButton('Pedidos');
        } else {
            setActiveButton('Pedido');
        }
    }, [location.pathname]);
    useEffect(() => {
        if (userData) {
            dispatch(shoppinghistory(userData));
        }
    }, [dispatch, userData]);
    

     //! FUNCIONES
    const closeReviews = () => {
        setReview({
            id: '',
            idProduc: '',
            email: userData,
            rating: null,
            descripcion: '',
        })
        setReviews(false)
    }
    const handleChange = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value,
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendReviews(review))
        setReview({
            id: '',
            idProduc: '',
            email: userData,
            rating: null,
            descripcion: '',
        })
        toast.success(`Se envio la reseña correctamente , gracias`), {
        }
        setReviews(false)
    };
    const handleStatus = (e) => {
        setStatus({
            status: e.target.name,
        })
    }
    const onReviews = (eId, id) => {
        setReviews(true)
        setReview({
            ...review,
            id: id,
            idProduc: eId,
        })
    }
    const navigate = useNavigate();
    const handleNavigate = (id) => {
        navigate(`/Detail/${id}`);
    }


    //! ESTILOS EXTRAS
    const background = {
        background: '#DAE3E7',
        minHeight: '100vh',
        width: '100vw'
    };
    const cardShadow = {
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.4) 0px 12px 24px -4px',
        borderRadius: '8px',
        border: '0.1px solid rgb(241, 241, 249)'
    };

    const cardHeight = {
        height: "50%",
        width: "75%",
    };
    const cardContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '30px',
        paddingRight: '30px',
        paddingTop: '150px',
        marginBottom: '30px',
    };
    const firstCard = {
        width: "300px",
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.4) 0px 12px 24px -4px',
        borderRadius: '8px',
        border: '0.1px solid rgb(241, 241, 249)'
    };
    const lastCard = {
        width: "75%"
    };
    const links = {
        marginTop: "-25px",
    };
    const linkColor = {
        color: "black",
        textDecoration: "none",
    };
    const linkColorHome = {
        color: "black",
        textDecoration: "none",
        fontSize: "13px",
        opacity: "0.7"
    };
    const linkColorAccount = {
        color: "black",
        textDecoration: "none",
        fontSize: "13px",
        opacity: "0.7"
    };
    const linkColorOrder = {
        color: "black",
        textDecoration: "none",
        fontSize: "16px",
    };
    const perfilButtonStyle = {
        width: '100%',
        textAlign: 'left',
        padding: '0',
        margin: '0',
        borderRadius: '0'
    };
    const products = {
        paddingTop: "-1vw",
        width: "75%"
    };
    const titleButton = {
        textAlign: "left",
        fontSize: "24px"
    };
    const subtitleButton = {
        textAlign: "left"
    };

    return (
        <div style={background} >
            {reviews ? (
                <div className={`${styles.overlay}`}>
                    <button className={styles.closebButton} onClick={() => closeReviews()}>❌</button>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label htmlFor="descripcion" >Deja una Reseña: </label>
                        </div>
                        <div>
                            <textarea
                                name="descripcion"
                                onChange={handleChange}
                                className={styles.descriptionInput}
                            ></textarea>
                        </div>
                        <div className={styles.rating}>
                            <input
                                type="radio"
                                id="star5"
                                name="rating"
                                value="5"
                                onChange={handleChange}
                            />
                            <label htmlFor="star5"></label>
                            <input
                                type="radio"
                                id="star4"
                                name="rating"
                                value="4"
                                onChange={handleChange}
                            />
                            <label htmlFor="star4"></label>
                            <input
                                type="radio"
                                id="star3"
                                name="rating"
                                value="3"
                                onChange={handleChange}
                            />
                            <label htmlFor="star3"></label>
                            <input
                                type="radio"
                                id="star2"
                                name="rating"
                                value="2"
                                onChange={handleChange}
                            />
                            <label htmlFor="star2"></label>
                            <input
                                type="radio"
                                id="star1"
                                name="rating"
                                value="1"
                                onChange={handleChange}
                            />
                            <label htmlFor="star1"></label>
                        </div>
                        <div>
                            <button type="submit" className={styles.submitButton}>Enviar reseña</button>
                        </div>
                    </form>
                </div>) : <></>}
            <SearchBar />
            <br />
            <br />
            <div className="row row-cols-1 row-cols-md-5 g-5" style={cardContainerStyle}>
                <div className="col">
                    <div className='container-fluid' style={links}>
                        <Link to="/" style={linkColorHome}>
                            Hogar &gt; &nbsp;
                        </Link>
                        <Link to="/user" style={linkColorAccount}>
                            Mi cuenta &gt; &nbsp;
                        </Link>
                        <Link to="/user/orders" style={linkColorOrder}>
                            Pedidos
                        </Link>
                    </div>
                    <div className="card h-100 bg-light bg-gradient" style={firstCard}>
                        <div className="card-body">
                            <h5 className="card-title " style={titleButton}>Mi cuenta:</h5>
                            <Link to="/user" style={linkColor}>
                                <button
                                    type="button"
                                    className={`btn btn-light btn-lg ${activeButton === 'Perfil' ? 'active' : ''}`}
                                    style={perfilButtonStyle}
                                    id="perfil-btn"
                                >
                                    Perfil
                                </button>
                            </Link>
                            <Link to="/user/orders" style={linkColor}>
                                <button
                                    type="button"
                                    className={`btn btn-light btn-lg ${activeButton === 'Pedidos' ? 'active' : ''}`}
                                    style={perfilButtonStyle}
                                    id="perfil-btn"
                                >
                                    Pedidos
                                </button>
                            </Link>
                            {(roll === 'SELLER' || roll === 'SUPERADMIN' || roll === 'ADMIN') && (
                            <Link to="/user/update" style={linkColor}>
                                <button
                                    type="button"
                                    className={`btn btn-light btn-lg ${activeButton === 'Vendidos' ? 'active' : ''}`}
                                    style={perfilButtonStyle}
                                    id="perfil-btn"
                                >
                                    Vendidos
                                </button>
                            </Link>)}
                            <Link to="/user/payment" style={linkColor}>
                                <button
                                    type="button"
                                    className={`btn btn-light btn-lg ${activeButton === 'Pagos' ? 'active' : ''}`}
                                    style={perfilButtonStyle}
                                    id="perfil-btn"
                                >
                                    Pagos
                                </button>
                            </Link>
                            <Link to="/contact" style={linkColor}>
                                <button
                                    type="button"
                                    className={`btn btn-light btn-lg ${activeButton === 'Centro de ayuda' ? 'active' : ''}`}
                                    style={perfilButtonStyle}
                                    id="perfil-btn"
                                >
                                    Centro de ayuda
                                </button>
                            </Link>
                            {(roll === 'SELLER' || roll === 'SUPERADMIN' || roll === 'ADMIN') && (
                            <Link to="/ProductSale" style={linkColor}>
                                <button
                                    type="button"
                                    className={`btn btn-light btn-lg ${activeButton === 'Mis publicaciones' ? 'active' : ''}`}
                                    style={perfilButtonStyle}
                                    id="perfil-btn"
                                >
                                    Mis publicaciones
                                </button>
                            </Link>)}
                        </div>
                        <div className="card-footer">
                            <small className="text-body-light">TukiMarket 🐸</small>
                        </div>
                    </div>
                </div>
                <div className="col" style={cardHeight}>
                    <div className="card h-100 bg-light bg-gradient" style={cardShadow}>
                        <div className="card-body">
                            <ul className="nav nav-pills nav-fill">
                                <li className="nav-item">

                                    {status.status === 'TODO' ? <a className="nav-link active" style={linkColor} aria-current="page" href="#" name='TODO' onClick={(e) => handleStatus(e)}>Todo</a> :
                                        <a className="nav-link " style={linkColor} aria-current="page" href="#" name='TODO' onClick={(e) => handleStatus(e)}>Todo</a>}
                                </li>
                                <li className="nav-item">
                                    {status.status === 'PENDIENTE' ? <a className="nav-link active" href="#" style={linkColor} name='PENDIENTE' onClick={(e) => handleStatus(e)}>Procesando ({totalPendientes})</a> :
                                        <a className="nav-link " href="#" style={linkColor} name='PENDIENTE' onClick={(e) => handleStatus(e)}>Procesando({totalPendientes})</a>}
                                </li>
                                <li className="nav-item">
                                    {status.status === 'ENVIADO' ?
                                        <a className="nav-link active" href="#" style={linkColor} name='ENVIADO' onClick={(e) => handleStatus(e)}>Enviado ({totalEnviados})</a> :
                                        <a className="nav-link" href="#" style={linkColor} name='ENVIADO' onClick={(e) => handleStatus(e)}>Enviado ({totalEnviados})</a>
                                    }
                                </li>
                                <li className="nav-item">
                                    {status.status === 'ENTREGADO' ?
                                        <a className="nav-link active" href="#" style={linkColor} name='ENTREGADO' onClick={(e) => handleStatus(e)}>Completado ({totalCompletos})</a> :
                                        <a className="nav-link" href="#" style={linkColor} name='ENTREGADO' onClick={(e) => handleStatus(e)}>Completado ({totalCompletos})</a>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                    {status.status === "TODO" ? <div className="card h-100 bg-light bg-gradient" style={cardShadow}>
                        <div className="card-body">
                            <h2>Compras realizadas por el usuario:</h2>
                            {history ? (
                                <>
                                    {history.map((el) => el.detailOrders.map((e) => (
                                        <div key={`${el.id}-${e.productId}`} className={styles.divCompra} >
                                            <div onClick={() => handleNavigate(e.product.id)}>
                                                <h3>{`Item: ${e.product.name}`}</h3>
                                                <h4>{`Precio: $${e.purchaseprice}`}</h4>
                                                <h4>{`Status: ${el.status}`}</h4>
                                                <h4>{`Fecha de compra: ${el.orderDate}`}</h4>
                                            </div>
                                            <div className={styles.divImg}>
                                                <button onClick={() => onReviews(e.product.id, el.id)} className={styles.reviewsButton}>Reviews</button>
                                                <img src={e.product.img} style={{ width: "200px" }} alt="Product" />
                                            </div>
                                        </div>
                                    )))
                                    }
                                </>
                            ) : (
                                <h3>Todavía no has realizado compras.</h3>
                            )}
                        </div>
                        <div className="card-footer">
                                <small className="text-body-light">TukiMarket 🐸</small>
                            </div>
                    </div> : ''}
                    {status.status === "PENDIENTE" ? <div className="card h-100 bg-light bg-gradient" style={cardShadow}>

                        <div className="card-body">
                            <h2>Compras en preparacion:</h2>
                            {history ? (
                                <>
                                    {pendiente.map((el) => el.detailOrders.map((e) => (
                                        <div key={`${el.id}-${e.productId}`} className={styles.divCompra} >
                                            <div onClick={() => handleNavigate(e.product.id)}>
                                                <h3>{`Item: ${e.product.name}`}</h3>
                                                <h4>{`Precio: $${e.purchaseprice}`}</h4>
                                                <h4>{`Status: ${el.status}`}</h4>
                                                <h4>{`Fecha de compra: ${el.orderDate}`}</h4>
                                            </div>
                                            <div className={styles.divImg}>
                                                <button onClick={() => onReviews(e.product.id, el.id)} className={styles.reviewsButton}>Reviews</button>
                                                <img src={e.product.img} style={{ width: "200px" }} alt="Product" />
                                            </div>
                                        </div>
                                    )))
                                    }
                                </>
                            ) : (
                                <h3>No tienes compras en preparacion.</h3>
                            )}
                        </div>
                        <div className="card-footer">
                                <small className="text-body-light">TukiMarket 🐸</small>
                            </div>
                    </div> : ''}
                    {status.status === "ENVIADO" ? <div className="card h-100 bg-light bg-gradient" style={cardShadow}>

                        <div className="card-body">
                            <h2>Compras enviadas:</h2>
                            {history ? (
                                <>
                                    {enviado.map((el) => el.detailOrders.map((e) => (
                                        <div key={`${el.id}-${e.productId}`} className={styles.divCompra} >
                                            <div onClick={() => handleNavigate(e.product.id)}>
                                                <h3>{`Item: ${e.product.name}`}</h3>
                                                <h4>{`Precio: $${e.purchaseprice}`}</h4>
                                                <h4>{`Status: ${el.status}`}</h4>
                                                <h4>{`Fecha de compra: ${el.orderDate}`}</h4>
                                            </div>
                                            <div className={styles.divImg}>
                                                <button onClick={() => onReviews(e.product.id, el.id)} className={styles.reviewsButton}>Reviews</button>
                                                <img src={e.product.img} style={{ width: "200px" }} alt="Product" />
                                            </div>
                                        </div>
                                    )))
                                    }
                                </>
                            ) : (
                                <h3>No tienes compras en envio.</h3>
                            )}
                        </div>
                        <div className="card-footer">
                                <small className="text-body-light">TukiMarket 🐸</small>
                            </div>
                    </div> : ''}
                    {status.status === "ENTREGADO" ? <div className="card h-100 bg-light bg-gradient" style={cardShadow}>
                        <div className="card-body ">
                            <h2>Compras Completadas:</h2>
                            {history ? (
                                <>
                                    {completo.map((el) => el.detailOrders.map((e) => (
                                        <div key={`${el.id}-${e.productId}`} className={styles.divCompra} >
                                            <div onClick={() => handleNavigate(e.product.id)}>
                                                <h3>{`Item: ${e.product.name}`}</h3>
                                                <h4>{`Precio: $${e.purchaseprice}`}</h4>
                                                <h4>{`Status: ${el.status}`}</h4>
                                                <h4>{`Fecha de compra: ${el.orderDate}`}</h4>
                                            </div>
                                            <div className={styles.divImg}>
                                                <button onClick={() => onReviews(e.product.id, el.id)} className={styles.reviewsButton}>Reviews</button>
                                                <img src={e.product.img} style={{ width: "200px" }} alt="Product" />
                                            </div>
                                        </div>
                                    )))
                                    }
                                </>
                            ) : (
                                <h3>No hay compras registradas en su usuario.</h3>
                            )}
                        </div>
                        <div className="card-footer">
                                <small className="text-body-light">TukiMarket 🐸</small>
                            </div>
                    </div> : ''}
                </div>
            </div>
        </div>
    );
}

export default Order;