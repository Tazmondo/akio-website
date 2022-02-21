import React, {useEffect, useState} from "react";
import {Item, ItemProps} from "../item/Item";
import HoodieBack from '../../assets/hoodie1back.png'
import ShirtFront from '../../assets/shirt1front.png'

const mockItems = [
    {
        name: "Hoodie Placeholder",
        image: HoodieBack,
        price: 1234,
        stock: 3
    },
    {
        name: "Shirt Placeholder",
        image: ShirtFront,
        price: 321,
        stock: 7
    },
]

function fetchInventory():  ItemProps[]{
    // Todo

    return mockItems
}

function Catalogue() {
    const [items, setItems] = useState([] as ItemProps[])


    useEffect(() => {
        setItems(fetchInventory())
    }, [])     // This will run once

    return <div className="container">
        <div className="row">
            {
                items.map((item) => {
                        return <div className=" col-sm-6 col-lg-4 col-xs-12 ">
                            <Item
                                name={item.name}
                                image={item.image}
                                price={item.price}
                                stock={item.stock}
                                key={`${item.name}${item.image}${item.price}`}/>
                        </div> // key parameter stops a warning
                    }
                )}
        </div>
    </div>
}

export default Catalogue