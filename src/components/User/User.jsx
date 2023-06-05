import React, { useEffect } from 'react';
import SearchBar from "../Nav/nav";
import Footer from "../Footer/Footer";
import { Link, Navigate, useNavigate } from "react-router-dom";
import editUser from '../../assets/editUser.png'
import defaultPicture from '../../assets/user.png'

function User() {
    const [activeButton, setActiveButton] = React.useState('Perfil');

    useEffect(() => {
        const currentPath = window.location.pathname.split('/').pop();
        if (currentPath === 'user') {
            setActiveButton('Perfil');
        } else {
        }
    }, []);

    //! LOCAL STORAGE
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const roll = localStorage.getItem('roll');
    const image = localStorage.getItem('image');
    const picture = localStorage.getItem('picture') //! REVISAR


    //! ESTILOS EXTRAS
    const activeIndicatorStyle = {
        position: 'absolute',
        right: '372px', 
        left: '-6px', 
        top: '-4%',
        height: '108%',
        width: '5px',
        backgroundColor: 'orange'
    };
    const background = {
        background: '#DAE3E7',
        height: '100vh',
        width: '100vw'
    };
    const card = {
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.4) 0px 12px 24px -4px',
        borderRadius: '8px',
        border: '0.1px solid rgb(241, 241, 249)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const cardBody = {
        width: '100%',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
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
    const linkColorProfile = {
        color: "black",
        textDecoration: "none",
        fontSize: "16px",
    };
    const perfilButtonStyle = {
        width: '100%',
        textAlign: 'left',
        padding: '0',
        margin: '0',
        borderRadius: '0',
        position: 'relative'
    };
    const subtitleButton = {
        textAlign: "left"
    };
    const titleButton = {
        textAlign: "left",
        fontSize: "24px"
    };

    const pictureUser = {
        maxWidth: '150px',
        position: 'relative',
        top: '5%',
        borderRadius: '50%',
    }
  


    return (
        <div style={background}>
            <SearchBar />
            <br />
            <br />
            <div className="row row-cols-1 row-cols-md-3 g-5 px-3" style={{ paddingTop: '150px' }}>
                <div className="col">
                <div className='container-fluid' style={links}>
                        <Link to="/" style={linkColorHome}>
                            Hogar &gt; &nbsp;
                        </Link>
                        <Link to="/user" style={linkColorAccount}>
                            Mi cuenta &gt; &nbsp;
                        </Link>
                        <Link to="/user" style={linkColorProfile}>
                            Perfil
                        </Link>
                    </div>
                    <div className="card h-100 bg-light bg-gradient" style={card}>
                        <div className="card-body" style={cardBody}>
                            <h5 className="card-title" style={titleButton}>Mi cuenta:</h5>
                            <button
                                type="button"
                                className={`btn btn-light btn-lg ${activeButton === 'Perfil' ? 'active' : ''}`}
                                style={perfilButtonStyle}
                                id="perfil-btn"
                            >
                                <span style={activeIndicatorStyle}></span>
                                <Link to="/user" style={linkColor}>
                                    Perfil
                                </Link>
                            </button>
                            <button
                                type="button"
                                className={`btn btn-light btn-lg ${activeButton === 'Pedidos' ? 'active' : ''}`}
                                style={perfilButtonStyle}
                                id="perfil-btn"
                            >   
                                <Link to="/user/orders" style={linkColor}>
                                    Pedidos
                                </Link>
                            </button>
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
                            <button
                                type="button"
                                className={`btn btn-light btn-lg ${activeButton === 'Pagos' ? 'active' : ''}`}
                                style={perfilButtonStyle}
                                id="perfil-btn"
                            >
                                <Link to="/user/payment" style={linkColor}>
                                    Pagos
                                </Link>
                            </button>
                            <button
                                type="button"
                                className={`btn btn-light btn-lg ${activeButton === 'Centro de ayuda' ? 'active' : ''}`}
                                style={perfilButtonStyle}
                                id="perfil-btn"
                            >
                                <Link to="/contact" style={linkColor}>
                                    Centro de ayuda
                                </Link>
                            </button>
                            {(roll === 'SELLER' || roll === 'SUPERADMIN' || roll === 'ADMIN') && (
                                <button
                                    type="button"
                                    className={`btn btn-light btn-lg ${activeButton === 'Mis publicaciones' ? 'active' : ''}`}
                                    style={perfilButtonStyle}
                                    id="perfil-btn"
                                >
                                    <Link to="/ProductSale" style={linkColor}>
                                        Mis publicaciones
                                    </Link>
                                </button>
                            )}
                        </div>
                        <div className="card-footer" style={cardBody}>
                            <small className="text-body-light">TukiMarket 🐸</small>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100 bg-light bg-gradient" style={card}>
                        <img src={picture || defaultPicture} style={pictureUser}/>
                        <div className="card-body" style={cardBody}>
                            
                            <h5 className="card-title">{username}</h5>
                            <p className="card-text text-center mb-0">{email}</p>
                            <p className="card-text text-center mb-0">Tipo de usuario: {roll}</p>
                        </div>
                        <div className="card-footer" style={cardBody}>
                            <small className="text-body-light">TukiMarket 🐸</small>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100 bg-light bg-gradient" style={card}>
                        <div className="card-body" style={cardBody}>
                            <div className="row align-items-center">
                                <div className="col">
                                    <h5 className="card-title" style={subtitleButton}>Nombre:</h5>
                                </div>
                                <div className="col">
                                <button style={{border: "none", background: "none", padding: "0"}}>
                                    <p className="card-text text-left"><img src={editUser} alt="edit_data_user"   style={{height: "20px", marginLeft: "-80px"}} />&nbsp;&nbsp;&nbsp;&nbsp;{username}</p>
                                </button>
                                </div>
                            </div>
                            <div className="border-top border-dark" />
                            <div className="row align-items-center">
                                <div className="col">
                                    <h5 className="card-title" style={subtitleButton}>Email: </h5>
                                </div>
                                <div className="col">
                                <button style={{border: "none", background: "none", padding: "0"}}>
                                    <p className="card-text text-left"><img src={editUser} alt="edit_data_user"   style={{height: "20px", marginLeft: "-80px"}} />&nbsp;&nbsp;&nbsp;&nbsp;{email}</p>
                                </button>
                                </div>
                            </div>
                            <div className="border-top border-dark" />
                            <div className="row align-items-center">
                                <div className="col">
                                    <h5 className="card-title" style={subtitleButton}>Celular:</h5>
                                </div>
                                <div className="col">
                                <button style={{border: "none", background: "none", padding: "0"}}>
                                    <p className="card-text text-left"><img src={editUser} alt="edit_data_user"   style={{height: "20px", marginLeft: "-80px"}} />&nbsp;&nbsp;&nbsp;&nbsp;+56978245686</p>
                                </button>
                                </div>
                            </div>
                            <div className="border-top border-dark" />
                            <div className="row align-items-center">
                                <div className="col">
                                    <h5 className="card-title" style={subtitleButton}>Dirección:</h5>
                                </div>
                                <div className="col">
                                <button style={{border: "none", background: "none", padding: "0"}}>
                                    <p className="card-text text-left"><img src={editUser} alt="edit_data_user"   style={{height: "20px", marginLeft: "-80px"}} />&nbsp;&nbsp;&nbsp;&nbsp;Calle 123, París</p>
                                </button>
                                </div>
                            </div>
                            <div className="border-top border-dark" />
                        </div>
                        <div className="card-footer" style={cardBody}>
                            <small className="text-body-light">TukiMarket 🐸</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;