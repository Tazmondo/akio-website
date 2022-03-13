import React, {useContext} from 'react'
import {useParams} from "react-router-dom";
import {globalItemsContext} from "../item-context/ItemContext";
import ItemThumb from '../item/ItemThumb'
import NavBar from "../navbar/NavBar";
import {dashToSpace, priceIntToString} from "../Globals";

function ItemPage(): JSX.Element {
    let params = useParams()
    let itemContextGlobal = useContext(globalItemsContext);
    let itemContext = itemContextGlobal.itemNameMap

    let item = itemContext[dashToSpace(params.name as string)]

    let content = <>You should not see this text!</>

    if (itemContextGlobal.status !== "fetching") {
        if (item !== undefined || itemContextGlobal.status === "failed") {
            content = <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <ItemThumb backImage={item.frontImageUrl} frontImage={item.backImageUrl} name={item.name}/>
                    </div>
                    <div className="col-12 col-md-6">
                        <h2>{item.name}</h2>
                        <h3>{priceIntToString(item.price)}</h3>
                        <p>I'm a button!</p>
                    </div>
                </div>
            </div>
        } else {
            content = <div className="alert alert-danger" role="alert">
                Error, item not found!
            </div>
        }
    } else {
        // todo: return a placeholder until items are fetched
        content = <div className="alert alert-warning" role="alert">
            Fetching item...
        </div>
    }

    return <div>
        <NavBar/>
        {content}
    </div>
}

export default ItemPage
