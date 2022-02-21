import React from "react";

// Is this the right way to do this?
// It looks neater than putting it in the function definition at least
type ItemProps = {
    name: string,
    image: string,
    price: number,
    stock: number
}

function Item({name, image, price, stock} : ItemProps) {
    // TODO
}