import React, {useEffect, useState} from "react";
import Items from "../admin-page/items/Items";
import {ItemProps} from "../item/Item";
import RequestHandler from "../request-handler/RequestHandler";

// I have seriously 0 idea whether this is at all the right way of doing this

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
        const item = [{name : 'test', frontImageUrl: '/', backImageUrl: '/', price: 10000, sizes: [{size: 1, stock: 50}]}];
        setLocalContext({status: 'success', items : item, itemNameMap : {test : item[0]}, cart: []});
        // RequestHandler.Get("api/items").then(res => {
        //     if (res.success) {
        //         setLocalContext({status: "success", items: Object.values(res.items), itemNameMap: res.items, cart: []})
        //     } else {
        //         setLocalContext({status: "failed", items: [], itemNameMap: {}, cart: []})
        //     }

        // }).catch(
        //     reason => {
        //         console.error(reason)
        //         setLocalContext({status: "failed", items: [], itemNameMap: {}, cart: []})
        //     }
        // )
    }

    useEffect(updateContext, []);

    return <globalItemsContext.Provider value={localContext}>
        {props.children}
    </globalItemsContext.Provider>
}

export default ItemContext
export {globalItemsContext}
