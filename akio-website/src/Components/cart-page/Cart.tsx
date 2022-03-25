import {globalItemsContext} from "../item-context/ItemContext";
import NavBar from "../navbar/NavBar";
import React, {useContext} from 'react'

// TODO store cart data in local storage

function Cart() {
    let itemContextGlobal = useContext(globalItemsContext);

    return (
        <div>
            <NavBar />
            <h1 className = 'text-center'>
                Cart
            </h1>

            {
                itemContextGlobal.cart.map((item) => {
                   return (<div className = 'text-center mt-5'>
                            <p>{item.name}</p>
                          </div>)
                })
            }
        </div>
    );
}

export default Cart;