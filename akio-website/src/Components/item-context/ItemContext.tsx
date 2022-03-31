import React, {useEffect, useState} from "react";
import Items from "../admin-page/items/Items";
import {ItemProps} from "../item/Item";
import RequestHandler from "../request-handler/RequestHandler";


interface itemContextInterface {
    status: "fetching" | "success" | "failed",
    items: ItemProps[],
    itemNameMap: {[name: string]: ItemProps},
    cart: ItemProps[], 
    cartTotal: number
}

const initialContext = {
    status: "fetching",
    items: [] as ItemProps[],
    itemNameMap: {},
    cart: [] as ItemProps[], 
    cartTotal: 0
} as itemContextInterface




const globalItemsContext: React.Context<itemContextInterface> = React.createContext(initialContext)

function ItemContext(props) {
    const [localContext, setLocalContext] = useState(initialContext)
    
    function updateContext(){
        // Load cart data from local storage
        const localData = window.localStorage.getItem('cart');
        const cartData = localData != null ? JSON.parse(localData) : [];
        let cartTotal = 0;

        if (cartData.length > 0){
             cartData.forEach(item => {
                 cartTotal += item.price                 
             });
        }
        
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
