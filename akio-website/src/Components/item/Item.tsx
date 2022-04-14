import React from "react";
import ItemThumb from "./ItemThumb";
import {Link} from 'react-router-dom'
import {priceIntToString, spaceToDash} from "../Globals";
import { JsxChild } from "typescript";

export const SIZEINTSTRING = {
    0: "Small",
    1: "Medium",
    2: "Large"
}

export const SIZESTRINGINT = {
    "Small": 0,
    "Medium": 1,
    "Large": 2
}

export type CartItem = {
    item: ItemProps, 
    chosenSize: string
} 

export type ItemSizes = {
    size: number,
    stock: number
};

export type ItemProps = {
    name: string,
    frontImageUrl: string,
    backImageUrl: string,
    price: number,
    isClickable: boolean 
    sizes: ItemSizes[], 
};


export type CartItem = {
    item: ItemProps, 
    size: string
};


export default function Item({name, frontImageUrl, backImageUrl, price, isClickable}: ItemProps): JSX.Element {
    // TODO - needs css adjustments and out of stock indicator
    let body  = <div className="card text-center">
                    <ItemThumb backImage={backImageUrl} frontImage={frontImageUrl} name={name}/>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <h6 className="card-subtitle text-muted mb-2">{priceIntToString(price)}</h6>
                    </div>
                </div>;
            
    return (
        <div>
            {isClickable ? 
                <Link to={`/items/${spaceToDash(name)}`} className="text-reset text-decoration-none">
                    {body}
                </Link>
            
            : <div>
                {body}
              </div>
            }
        </div>
    )
}
