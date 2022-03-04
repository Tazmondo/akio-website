import React, {useContext} from 'react'
import {useParams} from "react-router-dom";
import {globalItemsContext} from "../item-context/ItemContext";

function ItemPage(): JSX.Element {
    let params = useParams()
    let itemContextGlobal = useContext(globalItemsContext);
    let itemContext = itemContextGlobal.itemNameMap
    let item = itemContext[params.name as string]

    if (itemContextGlobal.status !== "fetching") {
        if (item !== undefined || itemContextGlobal.status === "failed") {
            return <div className="container">
                <div className="row">
                    <h1>{item.name}</h1>
                </div>
            </div>
        } else {
            return <div className="alert alert-danger" role="alert">
                Error, item not found!
            </div>
        }
    } else {
        // todo: return a placeholder until items are fetched
        return <div className="alert alert-warning" role="alert">
            Fetching item...
        </div>    }
}

export default ItemPage