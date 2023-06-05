import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import paypal from '../../assets/paypal.png'

function Paypal() {

    //! NO PROBAR CON SUS DATOS REALES PORQUE PODRIA GENERARLES UN COBRO REAL!!!!!!

    //! VER EL MANEJO DE MONEDA, Y COMO AGREGAR EN AMOUNT EL MONTO AUTOMATICAMENTE 
    //! https://www.currencyconverterapi.com O https://www.exchangerate-api.com => APIS PARA CONVERSION DE MONEDAS

    //? EMAIL ID PARA PRUEBA DE PAGO: sb-asjrj25998351@personal.example.com
    //? CONTRASEÑA DE PRUEBA PARA EL PAGO: @Z8qpk_]
    

    const currency = 'USD';
    const amount = '150';
    return (
        <div className='paypal'>
            <h1>Prueba pago PayPal</h1>
            <img
                height="300"
                src={paypal}
                alt='logo_paypal'
            />
            <p>
                <span className='price'>${amount}</span>
            </p>
            <PayPalScriptProvider options={{ "client-id": "AYnGi5Q7vB4KoDDomMYaUBRv6T0h05oPsHOIBx6AE-JSP7JwyP6On7Ldvvk_DmNzar_QbSAMmf2IKuTJ" }}>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount, //! NO TOCAR ESTAS LINEAS O SE CRASHEA EL COMPONENTE
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function (details) {
                            // mensaje que muestra la compra aprobada
                            alert(
                                `Pago realizado por ${details.payer.name.given_name} de $${amount}`
                            )
                        });
                    }}
                />
            </PayPalScriptProvider>
        </div>
    );
}

export default Paypal;
