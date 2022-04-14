import React, {useEffect, useState} from "react";
import Items from "../admin-page/items/Items";
import {ItemProps, CartItem} from "../item/Item";
import RequestHandler from "../request-handler/RequestHandler";



interface itemContextInterface {
    status: "fetching" | "success" | "failed",
    items: ItemProps[],
    itemNameMap: {[name: string]: ItemProps},
    cart: CartItem[], 
    cartTotal: number
}

const initialContext = {
    status: "fetching",
    items: [] as ItemProps[],
    itemNameMap: {},
    cart: [] as CartItem[], 
    cartTotal: 0
} as itemContextInterface




const globalItemsContext: React.Context<itemContextInterface> = React.createContext(initialContext)

function ItemContext(props) {
    const [localContext, setLocalContext] = useState(initialContext)
    
    function updateContext(){
        // Load cart data from local storage
        const localData = window.localStorage.getItem('cart');
        const cartData = localData != null ? JSON.parse(localData) : [];
        const cartTotal = cartData.map((item: CartItem) => item.item.price)
                                  .reduce((a: number, b: number) => {return a + b} , 0);

        
        RequestHandler.Get("api/items").then(res => {
            if (res.success) {
                setLocalContext({status: "success", items: Object.values(res.items), itemNameMap: res.items, cart: cartData, cartTotal: cartTotal})
            } else {
                setLocalContext({status: "failed", items: [], itemNameMap: {}, cart: cartData, cartTotal: cartTotal})
            }

        }).catch(
            reason => {
                console.error(reason)
                setLocalContext({status: "failed", items: [], itemNameMap: {}, cart: cartData, cartTotal: cartTotal})
            }
        )
    }


    useEffect(updateContext, []);

    return <globalItemsContext.Provider value={localContext}>
                {props.children}
           </globalItemsContext.Provider>
}

export default ItemContext
export {globalItemsContext}
