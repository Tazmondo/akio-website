import React, {useEffect, useState} from "react";
import {ItemProps} from "../item/Item";
import RequestHandler from "../request-handler/RequestHandler";

// I have seriously 0 idea whether this is at all the right way of doing this

interface itemContextInterface {
    status: "fetching" | "success" | "failed",
    items: ItemProps[]
}

const initialContext = {
    status: "fetching",
    items: [] as ItemProps[]
} as itemContextInterface

const globalItemsContext: React.Context<itemContextInterface> = React.createContext(initialContext)

function ItemContext(props) {
    const [localContext, setLocalContext] = useState(initialContext)

    useEffect(() => {
        RequestHandler.Get("api/items").then(res => {
            console.log(res);
            if (res.success) {
                console.log("success")
                setLocalContext({status: "success", items: Object.values(res.items)})
                console.log(localContext);
            } else {
                console.log("failure");
                setLocalContext({status: "failed", items: []})
            }

        }).catch(
            reason => {
                console.error(reason)
                setLocalContext({status: "failed", items: []})
            }
        )
    }, [])

    return <globalItemsContext.Provider value={localContext}>
        {props.children}
    </globalItemsContext.Provider>
}

export default ItemContext
export {globalItemsContext}