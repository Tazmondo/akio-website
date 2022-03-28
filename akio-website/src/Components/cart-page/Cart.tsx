import {globalItemsContext} from "../item-context/ItemContext";
import NavBar from "../navbar/NavBar";
import React, {useContext, useState, useEffect} from 'react';
import Item, {ItemProps} from "../item/Item";

// TODO store cart data in local storage



function Cart() {
    let itemContextGlobal = useContext(globalItemsContext);
    const [totalPrice, setPrice] = useState<number>(0);


    function calculatePrice(){
        let totalPricePence: number = 0;
        
        itemContextGlobal.cart.forEach((item) => {
            totalPricePence += item.price
        });

        setPrice(totalPricePence);
    }


    function removeItem(item : ItemProps){
        const cartItems: ItemProps[] = itemContextGlobal.cart
        cartItems.splice(cartItems.indexOf(item), 1);

        // update local storage when item is deleted
        window.localStorage.setItem('cart', JSON.stringify(cartItems));
        calculatePrice();
    }



    useEffect(calculatePrice, []);



    return (
        <div>
            <NavBar />
            <h1 className = 'text-center'>
                Cart
            </h1>

            {/* finish styles */}
            <div className = 'mt-5 text-center'>
                {itemContextGlobal.cart.map((item) => {
                    return (
                        <div className = 'text-center mt-3 ml-5' style = {{width: '15rem'}}>
                            {/* stop clicks */}
                            <Item name={item.name} frontImageUrl={item.frontImageUrl} backImageUrl={item.backImageUrl} price={item.price} sizes={[]} />
                            
                            <button className = 'btn btn-warning' onClick = {() => removeItem(item)}>
                                Remove item
                            </button>
                        </div>


                    )
                })}
            </div>

            <div className = 'text-center'>
                <button className = 'btn btn-success btn-block mt-5 display-3'>
                    <p className = 'display-6 pt-2'>
                        Pay £{totalPrice / 100}
                    </p>
                </button>
            </div>
        </div>
    );
}

export default Cart;