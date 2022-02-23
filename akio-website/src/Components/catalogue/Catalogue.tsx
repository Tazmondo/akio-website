import React, {useEffect, useState} from "react";
import {Item, ItemProps} from "../item/Item";
import HoodieFront from '../../assets/hoodie1front.png';
import HoodieBack from '../../assets/hoodie1back.png';
import ShirtFront from '../../assets/shirt1front.png';
import ShirtBack from '../../assets/shirt1back.png';


const mockItems = [
    {
        name: "Hoodie Placeholder",
        frontImage: HoodieFront,
        backImage: HoodieBack,
        price: 1234,
        stock: 3
    },
    {
        name: "Shirt Placeholder",
        frontImage: ShirtFront,
        backImage: ShirtBack,
        price: 321,
        stock: 7
    },
    {
        name: "Shirt Placeholder",
        frontImage: ShirtFront,
        backImage: ShirtBack,
        price: 321,
        stock: 7
    },
    {
        name: "Shirt Placeholder",
        frontImage: ShirtFront,
        backImage: ShirtBack,
        price: 321,
        stock: 7
    },
]



function fetchInventory():  ItemProps[]{
    // Todo

    return mockItems
}


function Catalogue(): JSX.Element {
    const [items, setItems] = useState([] as ItemProps[])


    useEffect(() => {
        setItems(fetchInventory())
    }, [])     // This will run once

    return (
        <div className="container">
            <div className="row">
                {
                    items.map((item) => {
                        return <div className=" col-sm-6 col-lg-4 col-xs-12 mt-4">
                            <Item 
                                name={item.name}
                                frontImage={item.frontImage}
                                backImage={item.backImage}
                                price={item.price}
                                stock={item.stock}
                                key={`${item.name}${item.frontImage}${item.price}`}/>
                        </div> // key parameter stops a warning
                    })
                }
            </div>
        </div>
    )
}

export default Catalogue