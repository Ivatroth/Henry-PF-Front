import React from "react";

const Options = (props) => {
  const options = [
    { text: "Hola", handler: props.actionProvider.handleHello, id: 1 },
    { text: "Cómo estás?", handler: props.actionProvider.greeting, id: 2 },
    {
      text: "¿Qué hace esta app?",
      handler: props.actionProvider.product,
      id: 3,
    },
    { text: "Métodos de envío", handler: props.actionProvider.shipping, id: 4 },
    {
      text: "No recibí mi producto",
      handler: props.actionProvider.errorShipping,
      id: 5,
    },
    { text: "Ver categorías", handler: props.actionProvider.categories, id: 6 },
    { text: "Modo oscuro", handler: props.actionProvider.dark, id: 7 },
  ];

  const optionsMarkup = options.map((option) => (
    <button className="options-button" key={option.id} onClick={option.handler}>
      {option.text}
    </button>
  ));

  return <div className="options-container">{optionsMarkup}</div>;
};

export default Options;
