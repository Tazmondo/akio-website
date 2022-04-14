import {globalItemsContext} from "../item-context/ItemContext";
import NavBar from "../navbar/NavBar";
import React, {useContext} from 'react';
import Item, {CartItem} from "../item/Item";
import { paypalPriceString, priceIntToString } from "../Globals";
import PaypalButon from "../item-page/PayPalButton";



function Cart() {
    let itemContextGlobal = useContext(globalItemsContext);
    const totalPrice = itemContextGlobal.cartTotal;


    function removeItem(item : CartItem){
        const cartItems: CartItem[] = itemContextGlobal.cart
        cartItems.splice(cartItems.indexOf(item), 1);
        itemContextGlobal.cartTotal -= item.item.price

        // update local storage when item is deleted
        window.localStorage.setItem('cart', JSON.stringify(cartItems));
    }


    return (
        <div>
            <NavBar />
            <h1 className = 'text-center'>
                Cart - {priceIntToString(totalPrice)}
            </h1>


            <div>
                {itemContextGlobal.cart.map((item) => {
                    return (
                        <div className = 'col-sm-6 col-lg-4 col-xs-12 mt-4' style = {{display: 'inline-block', width: '20rem'}}>
                            <Item name={item.item.name} 
                                  frontImageUrl={item.item.frontImageUrl} 
                                  backImageUrl={item.item.backImageUrl} 
                                  price={item.item.price} 
                                  sizes={item.item.sizes} 
                                  isClickable={false}
                            />

                            <p className = 'text-center'>{item.size}</p>
                            <button className = 'btn btn-block btn-danger' onClick = {() => removeItem(item)}>
                                Remove item
                            </button>
                        </div>
                    )
                })}
            </div>
            

            {itemContextGlobal.cart.length > 0 ?
                <div className = 'text-center pt-3'>
                    <PaypalButon price = {paypalPriceString(totalPrice)}/>
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