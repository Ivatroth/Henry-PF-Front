import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const PaymentOptions = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const totalDeCompra = useSelector((state) => state.totalDeCompra)

  const handlePaymentSelect = (payment) => {
    setSelectedPayment(payment);
  };

  const handlePaymentSubmit = () => {
    if (selectedPayment) {
      // Lógica para realizar el pago
      alert(`Pago realizado con ${selectedPayment}`);
    } else {
      alert('Selecciona un medio de pago');
    }
  };

  const handleBackToCart = () => {
    // Lógica para volver al carrito
    alert('Volver al carrito');
  };

  return (
    <div>
      <h1>Elige tu medio de pago:</h1>
      <div>
        <div onClick={() => handlePaymentSelect('MercadoPago')}>
          <h2>MErcado PAgo</h2>
        </div>
        <div onClick={() => handlePaymentSelect('PayPal')}>
            <h2>PayPAl</h2>
        </div>
      </div>
      <div>
        <button onClick={handleBackToCart}>Volver al carrito</button>
        <button onClick={handlePaymentSubmit}>Pagar</button>
      </div>
    </div>
  );
};

export default PaymentOptions;