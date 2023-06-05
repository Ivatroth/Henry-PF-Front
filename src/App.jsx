import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import FormRegister from "./components/form/form";
import CategoriesProduct from "./components/CategoriesProduct/CategoriesProduct";
import Categories from "./components/Categories/Categories";
import Detail from "./components/Detail/Detail";
import FormUserLogin from "./components/formUserLogin/formUserLogin";
import FormCreateProducs from "./components/formCreateProduct/formCreateProduct";
import Paypal from "./components/PayPal/Paypal";
import About from "./components/About/About";
import "./App.css";
import CarBuy from "./components/CarBuy/carBuy";
//Para el bot
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./components/Bot/Config";
import ActionProvider from "./components/Bot/ActionProvider";
import MessageParser from "./components/Bot/MessageParser";
import bubble from "../src/assets/bubblechat.png";
import SearchProduct from "./components/SearchProduct/SearchProduct";
import { useDispatch, useSelector } from "react-redux";
import Contact from "./components/Contact/Contact";
import { checkSesion, closeSesion } from "./redux/actions";
import PaymentOptions from "./components/ComponenteDePago/pago";
import { Toaster } from "sonner";
import PruebaGoogle from "./components/prueba/PruebaGoogle";
import User from "./components/User/User";
import Order from "./components/User/Order";
import Payment from "./components/User/Payment";
import History from "./components/Record/record";
import ProductSale from "./components/ProductSale/ProductSale";
import Dashboard from "./components/Dashboard/Dashboard";
import FormCreateAdmin from "./components/FormCreateAdmin/FormCreateAdmin";
import UserAdmin from "./components/UserAdmin/UserAdmin";
import UpdateProduct from "./components/User/Update";

function App() {
  const [visible, setVisible] = useState(false);
  const darkModes = useSelector((state) => state.darkModes);
  const roll = localStorage.getItem("roll");

  const toggleVisibility = () => {
    setVisible(!visible);
    const bubbleChat = document.querySelector(".bubble_chat");
    if (visible) {
      bubbleChat.style.display = "block";
    } else {
      bubbleChat.style.display = "none";
    }
  };
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "16px",
          },
        }}
        richColors
      />
      <img src={bubble} alt="bubblechat" className="bubble_chat" />
      <span className={darkModes ? "chat_with_dark" : "chat_with"}>
        Chatea <br />
        Conmigo!!
      </span>
      <button className="tuki_chat" onClick={toggleVisibility}>
        🐸
      </button>

      {visible && (
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          placeholderText="Escribeme un Tuki mensaje!!"
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formRegister" element={<FormRegister />} />
        <Route path="/formLogin" element={<FormUserLogin />} />
        <Route path="/categories/:name" element={<CategoriesProduct />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Search/:name" element={<SearchProduct />} />
        <Route path="/formCreateProduct" element={<FormCreateProducs />} />
        <Route path="/about" element={<About />} />
        <Route path="/paypal" element={<Paypal />} />
        <Route path="/carroBuy" element={<CarBuy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/buy" element={<PaymentOptions />} />
        <Route path="/loginGoogle" element={<PruebaGoogle />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/orders" element={<Order />} />
        <Route path="/user/payment" element={<Payment />} />
        <Route path="/shoppinghistory" element={<History />} />
        <Route path="/ProductSale" element={<ProductSale />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        {roll === "SUPERADMIN" && (
          <Route path="/admin/createAdmin" element={<FormCreateAdmin />} />
        )}
        <Route path="/admin/users" element={<UserAdmin />} />
        <Route path="/user/update" element={<UpdateProduct />} />
      </Routes>
    </>
  );
}
export default App;
