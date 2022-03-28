import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";


function PaypalButon() {
    return (
        // @ts-ignore    
        <PayPalScriptProvider>
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
    );
}

export default PaypalButon;