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


    // fix page reload glitch
    useEffect(calculatePrice, []);



    return (
        <div>
            <NavBar />
            <h1 className = 'text-center'>
                Cart
            </h1>


            <div>
                {itemContextGlobal.cart.map((item) => {
                    return (
                        <div className = 'col-sm-6 col-lg-4 col-xs-12 mt-4' style = {{display: 'inline-block', width: '20rem'}}>
                            <Item name={item.name} 
                                  frontImageUrl={item.frontImageUrl} 
                                  backImageUrl={item.backImageUrl} 
                                  price={item.price} 
                                  sizes={item.sizes} 
                                  isClickable={false}
                            />
                            
                            <button className = 'btn btn-block btn-danger' onClick = {() => removeItem(item)}>
                                Remove item
                            </button>
                        </div>
                    )
                })}
            </div>
            

            {totalPrice > 0 ?
                <div className = 'text-center pt-3'>
                    <button className = 'btn btn-success btn-block mt-5 display-3'>
                        <p className = 'display-6 pt-2'>
                            Pay £{totalPrice / 100}
                        </p>
                    </button>
                </div>
            
            : <div>
                <h1 className = 'display-6 text-center mt-5 pt-5'>
                    The cart is empty. Go fill it up!
                </h1>
              </div>
            }
        </div>
    );
}

export default Cart;