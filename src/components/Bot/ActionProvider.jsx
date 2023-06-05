import React from "react";
import { useDispatch } from "react-redux";
import { darkMode } from "../../redux/actions";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const dispatch = useDispatch();
  const handleDog = () => {
    const botMessage = createChatBotMessage("Ten tu perrito!", {
      widget: "dogPicture",
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleHello = () => {
    const botMessage = createChatBotMessage("Bienvenido a TukiMarket");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const greeting = () => {
    const botMessage = createChatBotMessage(
      "Muy bien, espero que tu tengas un maravilloso Tuki día!"
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const home = () => {
    const botMessage = createChatBotMessage("Vamos a la Home");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    setTimeout(() => {
      window.location.href = "http://localhost:5173/";
    }, 1500)
    };
  const product = () => {
    const botMessage = createChatBotMessage(
      "Te provee de todo lo que Tuki necesites"
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const shipping = () => {
    const botMessage = createChatBotMessage(
      "Tienes que coordinar con tu Tuki vendendor!!"
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const errorShipping = () => {
    const botMessage = createChatBotMessage(
      "Escribenos un Tuki mensaje a este correo: tukimarket@gmail.com"
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const categories = () => {
    const botMessage = createChatBotMessage("Vamos a las categorías");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    setTimeout(() => {
      window.location.href = "http://localhost:5173/categories";
    }, 1500);
    const handleHello = () => {
      const botMessage = createChatBotMessage("Bienvenido a TukiMarket");
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
  };
  const contact = () => {
    const botMessage = createChatBotMessage("Vamos al contacto");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    setTimeout(() => {
      window.location.href = "http://localhost:5173/contact";
    }, 1500);
    const handleHello = () => {
      const botMessage = createChatBotMessage("Bienvenido a TukiMarket");
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
  };
  const dark = () => {
    const botMessage = createChatBotMessage("Disfruta el Modo oscuro");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    setTimeout(() => {
      dispatch(darkMode(true));
    }, 1000);
  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            greeting,
            handleDog,
            product,
            shipping,
            errorShipping,
            categories,
            dark,
            contact,
            home
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
