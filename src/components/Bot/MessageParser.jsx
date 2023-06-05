import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.toLowerCase().includes("hola")) {
      actions.handleHello();
    }
    if (
      message.toLowerCase().includes("como estas") ||
      message.toLowerCase().includes("como estas?") ||
      message.toLowerCase().includes("¿como estas?")
    ) {
      actions.greeting();
    }
    if (
      message.toLowerCase().includes("que hace esta app") ||
      message.toLowerCase().includes("que hace esta app?") ||
      message.toLowerCase().includes("¿que hace esta app?")
    ) {
      actions.product();
    }
    if (message.toLowerCase().includes("metodos de envio")) {
      actions.shipping();
    }
    if (
      message.toLowerCase().includes("no recibi mi producto") ||
      message.toLowerCase().includes("no recibí mi producto")
    ) {
      actions.errorShipping();
    }
    if (message.toLowerCase().includes("perro")) {
      actions.handleDog();
    }
    if (
      message.toLowerCase().includes("categorias de la pagina") ||
      message.toLowerCase().includes("categorías de la página") ||
      message.toLowerCase().includes("categorías de la pagina") ||
      message.toLowerCase().includes("categorias de la página") ||
      message.toLowerCase().includes("categoría de productos") ||
      message.toLowerCase().includes("categoría de productos") ||
      message.toLowerCase().includes("categorias") ||
      message.toLowerCase().includes("categorías")
    ) {
      actions.categories();
    }
    if (
      message.toLowerCase().includes("home") ||
      message.toLowerCase().includes("llevame al inicio") || 
      message.toLowerCase().includes("llévame al inicio") ||
      message.toLowerCase().includes("llevame a la home") ||
      message.toLowerCase().includes("llévame a la home") ||
      message.toLowerCase().includes("hogar") ||
      message.toLowerCase().includes("inicio")
    ) {
      actions.home();
    }
    if (message.toLowerCase().includes("contacto")) {
      actions.contact();
    }
    if (
      message.toLowerCase().includes("modo oscuro") ||
      message.toLowerCase().includes("Modo oscuro") ||
      message.toLowerCase().includes("Modo Oscuro")
    ) {
      actions.dark();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
