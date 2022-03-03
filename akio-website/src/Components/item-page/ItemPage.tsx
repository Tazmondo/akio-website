import React, {useContext} from 'react'
import {useParams} from "react-router-dom";
import {globalItemsContext} from "../item-context/ItemContext";

function ItemPage(): JSX.Element {
    let params = useParams()
    let itemContext = useContext(globalItemsContext).itemNameMap
    let item = itemContext[params.name as string]

    return <div className="container">
        <div className="row">
            <h1>{item.name}</h1>
        </div>
    </div>
}

export default ItemPage