import React from "react";

// Is this the right way to do this?
// It looks neater than putting it in the function definition at least
// But u need to rewrite all the parameters again in the function definition
//
// Also should we have hover to see back of clothing?
type ItemProps = {
    name: string,
    image: string,
    price: number,
    stock: number
}

function Item({name, image, price, stock} : ItemProps) {
    // TODO - needs css

    return <div>
        <img src={image} alt={name}/>
        <p>{name}</p>
        <p>{price}</p>
        <p>{stock}</p>
    </div>
}

export { Item };
export type { ItemProps };
