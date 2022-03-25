import {globalItemsContext} from "../item-context/ItemContext";
import React, {useContext, useState, useEffect} from 'react';
import {ItemProps} from "../item/Item";


function Cart() {
    let itemContextGlobal = useContext(globalItemsContext);
    const [totalPrice, setPrice] = useState<Number>(0);


    function calculatePrice(){
        let totalPricePence: int = 0;
        
        temContextGlobal.cart.forEach((item) => {
            totalPricePence += item.price
        });

        setPrice(totalPricePence);
    }


    function removeItem(item : ItemProps){
        const cartItems: ItemProps[] = itemContext.cart
        cartItems.splice(cartItems.indexOf(item), 1);

        // update local storage when item is deleted
        window.localStorage.setItem('cart', JSON.stringify(cartItems));
        calculatePrice();
    }



    useEffect(calculatePrice, []);



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

                            <div>
                                <button onClick = {() => removeItem(item)}>
                                    Remove Item
                                </button>
                            </div>
                        </h1>
                    </div>
                )
            })}

            <div>
                <p>Total: {totalPrice / 100}</p>
                <button>
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default Cart;