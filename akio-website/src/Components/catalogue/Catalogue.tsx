import React, {useContext} from "react";
import Item from "../item/Item";
import {globalItemsContext} from "../item-context/ItemContext";


// import HoodieFront from '../../assets/hoodie1front.png';
// import HoodieBack from '../../assets/hoodie1back.png';
// import ShirtFront from '../../assets/shirt1front.png';
// import ShirtBack from '../../assets/shirt1back.png';
// const mockItems = [
//     {
//         name: "Hoodie Placeholder",
//         frontImage: HoodieFront,
//         backImage: HoodieBack,
//         price: 1234,
//         stock: 3
//     },
//     {
//         name: "Shirt Placeholder",
//         frontImage: ShirtFront,
//         backImage: ShirtBack,
//         price: 321,
//         stock: 7
//     },
//     {
//         name: "Shirt Placeholder",
//         frontImage: ShirtFront,
//         backImage: ShirtBack,
//         price: 322,
//         stock: 7
//     },
//     {
//         name: "Shirt Placeholder",
//         frontImage: ShirtFront,
//         backImage: ShirtBack,
//         price: 323,
//         stock: 7
//     },
// ]


function Catalogue(): JSX.Element {
    const itemsContext = useContext(globalItemsContext)

    function getItemDivs() {
        if (itemsContext.status === "success") {
            return (
                itemsContext.items.map((item) => {
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
            )
        } else {
            return <></>
        }
    }

    return (
        <div className="container">
            <div className="row">
                {getItemDivs()}
            </div>
        </div>
    )
}

export default Catalogue