import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";


function PaypalButon() {
    return (
        // @ts-ignore    
        <PayPalScriptProvider>
            <PayPalButtons style = {{ layout: "horizontal" }} 
                           createOrder = {(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: '19.22',
                                                        currency_code : 'GBP'
                                                    },
                                                },
                                            ],
                                        });
                                    }}
            />
        </PayPalScriptProvider>
    );
}

export default PaypalButon;