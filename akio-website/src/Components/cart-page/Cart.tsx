import {globalItemsContext} from "../item-context/ItemContext";
import React, {useContext} from 'react'


function Cart() {
    let itemContextGlobal = useContext(globalItemsContext);

    return (
        <div>
            <h1 className = 'text-center'>
                Cart
            </h1>

            {itemContextGlobal.cart.map((item) => {
                return (
                    <div className = 'text-center'>
                        <h1>
                            {item.name}
                        </h1>
                    </div>
                )
            })}
        </div>
    );
}

export default Cart;