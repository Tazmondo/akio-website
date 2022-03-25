import React, {useContext} from 'react'
import {useParams} from "react-router-dom";
import {globalItemsContext} from "../item-context/ItemContext";
import ItemThumb from '../item/ItemThumb'
import NavBar from "../navbar/NavBar";
import {dashToSpace, priceIntToString} from "../Globals";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {useNavigate} from 'react-router-dom';


// TODO: style size option drop down
// look for more flexible alternative
// finish cart page


function ItemPage(): JSX.Element {
    let params = useParams()
    let itemContextGlobal = useContext(globalItemsContext);
    let itemContext = itemContextGlobal.itemNameMap;
    let item = itemContext[dashToSpace(params.name as string)];
    let content = <>You should not see this text!</>;
    let navigate = useNavigate();


    
    function addToCart(){
        itemContextGlobal.cart.push(item);
        navigate('/shopping-page');
    }



    if (itemContextGlobal.status !== "fetching") {
        if (item !== undefined || itemContextGlobal.status === "failed") {
            content = <div className="container">
                <div className="row gx-5">
                    <div className="col-12 col-md-6">
                        <ItemThumb backImage={item.frontImageUrl} frontImage={item.backImageUrl} name={item.name}/>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className = 'text-center'>
                            <h2 className = 'display-3'>{item.name}</h2>
                            <h3 className = 'text-muted'>{priceIntToString(item.price)}</h3>
                            

                            <PayPalScriptProvider options={{ "client-id": "JWNRASGZL573C", currency : 'USD', intent : 'capture'}}>
                                <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: item.price as unknown as string,
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                />
                            </PayPalScriptProvider>

                            <div>
                                <button className = 'btn btn-primary btn-block' style = {{display: 'inline-block'}} onClick = {addToCart}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        } else {
            content = <div className="alert alert-danger" role="alert">
                Error, item not found!
            </div>
        }
    } else {
        // todo: return a placeholder until items are fetched
        content = <div className="alert alert-warning" role="alert">
            Fetching item...
        </div>
    }

    return <div>
        <NavBar/>
        {content}
    </div>
}

export default ItemPage
