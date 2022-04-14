import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";


function PaypalButon({price} : {price: string}) {
    return (
        // @ts-ignore    
        <PayPalScriptProvider>
            <PayPalButtons createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: price,
                                                        currency_code : 'USD'
                                                    },
                                                },
                                            ],
                                        });
                                    }}/>
        </PayPalScriptProvider>
    );
}

export default PaypalButon;