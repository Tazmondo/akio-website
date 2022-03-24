import React, {useContext} from "react";
import Item from "../item/Item";
import {globalItemsContext} from "../item-context/ItemContext";



function Catalogue(): JSX.Element {
    const itemsContext = useContext(globalItemsContext)

    function getItemDivs() {
        if (itemsContext.status === "success") {
            return (
                itemsContext.items.map((item) => {
                    return <div className=" col-sm-6 col-lg-4 col-xs-12 mt-4">
                        <Item
                            name={item.name}
                            frontImageUrl={item.frontImageUrl}
                            backImageUrl={item.backImageUrl}
                            price={item.price}
                            sizes={item.sizes}
                            key={`${item.name}${item.frontImageUrl}${item.price}`}/>
                    </div> // key parameter stops a warning
                })
            )
        } else { // TODO: show error
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
