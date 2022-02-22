import React from "react";

function priceIntToString(price: number) {
    return `£${price / 100}`
}


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

function Item({name, image, price, stock} : ItemProps): JSX.Element {
    // TODO - needs css adjustments and out of stock indicator

    return (
        <a href={`/items/${name}`} className="text-reset text-decoration-none">
            <div className="card text-center">
                <img src={image} alt={name} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <h6 className="card-subtitle text-muted mb-2">{priceIntToString(price)}</h6>
                </div>
            </div>
        </a>
    )
}

export { Item };
export type { ItemProps };
