import React, {useEffect, useState} from "react";
import Items from "../admin-page/items/Items";
import {ItemProps} from "../item/Item";
import RequestHandler from "../request-handler/RequestHandler";



interface itemContextInterface {
    status: "fetching" | "success" | "failed",
    items: ItemProps[],
    itemNameMap: {[name: string]: ItemProps},
    cart: ItemProps[]
}

const initialContext = {
    status: "fetching",
    items: [] as ItemProps[],
    itemNameMap: {},
    cart: [] as ItemProps[]
} as itemContextInterface




const globalItemsContext: React.Context<itemContextInterface> = React.createContext(initialContext)

function ItemContext(props) {
    const [localContext, setLocalContext] = useState(initialContext)
    
    function updateContext(){
        // Load cart data from local storage
        const localData = window.localStorage.getItem('cart');
        const cartData = JSON.parse(localData != null ? localData : '{}');
        
        RequestHandler.Get("api/items").then(res => {
            if (res.success) {
                setLocalContext({status: "success", items: Object.values(res.items), itemNameMap: res.items, cart: cartData})
            } else {
                setLocalContext({status: "failed", items: [], itemNameMap: {}, cart: cartData})
            }

        }).catch(
            reason => {
                console.error(reason)
                setLocalContext({status: "failed", items: [], itemNameMap: {}, cart: cartData})
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
