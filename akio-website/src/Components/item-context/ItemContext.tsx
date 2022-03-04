import React, {useEffect, useState} from "react";
import {ItemProps} from "../item/Item";
import RequestHandler from "../request-handler/RequestHandler";

// I have seriously 0 idea whether this is at all the right way of doing this

interface itemContextInterface {
    status: "fetching" | "success" | "failed",
    items: ItemProps[]
    itemNameMap: {[name: string]: ItemProps}
}

const initialContext = {
    status: "fetching",
    items: [] as ItemProps[],
    itemNameMap: {}
} as itemContextInterface

const globalItemsContext: React.Context<itemContextInterface> = React.createContext(initialContext)

function ItemContext(props) {
    const [localContext, setLocalContext] = useState(initialContext)

    useEffect(() => {
        RequestHandler.Get("api/items").then(res => {
            if (res.success) {
                setLocalContext({status: "success", items: Object.values(res.items), itemNameMap: res.items})
            } else {
                setLocalContext({status: "failed", items: [], itemNameMap: {}})
            }

        }).catch(
            reason => {
                console.error(reason)
                setLocalContext({status: "failed", items: [], itemNameMap: {}})
            }
        )
    }, [])

    return <globalItemsContext.Provider value={localContext}>
        {props.children}
    </globalItemsContext.Provider>
}

export default ItemContext
export {globalItemsContext}