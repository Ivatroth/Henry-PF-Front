import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css'; 
import logo from "../../assets/Recurso 1.png";
import { Link, useNavigate } from "react-router-dom";


const Contact = () => {


    const refForm = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

    const serviceId = 'service_dt7qvd9';
    const templateId = 'template_7cj14i7';
    const apikey = 'p7TxsLapQc5uOGrQ1';

    emailjs
        .sendForm(serviceId, templateId, refForm.current, apikey)
        .then((result) => {
            console.log(result.text);                
        alert('Tu email fue enviado!'); // Mostrar la alerta de confirmación
        })
        .catch((error) => console.log(error));
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };
    
return (
    <div className="contact-container">
        <Link to={"/"}>
        <img
        className='logo'
        src={ logo}
        />
        </Link>
        <form className="contact-form" ref={refForm} action="" onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
            <div>
                <h2 className='title'>Contáctanos</h2>
                <p className='title'>Rellena el formulario</p>
            </div>
            <fieldset>
                <label className='subtitles' htmlFor="username">Nombre</label>
                <input name="username" type="text" placeholder="Escribe tu nombre" required />
            </fieldset>
            <fieldset>
                <label className="symbol-require" htmlFor="email">
                    Email
                </label>
                <input name="email" type="email" placeholder="Escribe tu email" id="email" required />
            </fieldset>
            <fieldset>
                <label className='subtitles' htmlFor="message">Mensaje</label>
                <textarea maxLength="1000" placeholder="Escribe tu mensaje" name="message" id="message" required />
            </fieldset>
            <button type="submit">Enviar</button>
        </form>
    </div>
    );
};

export default Contact;
