import React from 'react'
import {ItemProps} from "../item/Item";

function ItemPage({name, frontImageUrl, backImageUrl, price, stock} : ItemProps): JSX.Element {


    return <div className="container">
        <div className="row">
            <h1>{name}</h1>
        </div>
    </div>
}

export default ItemPage