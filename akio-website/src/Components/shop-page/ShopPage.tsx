import React from "react";
import Catalogue from "../catalogue/Catalogue";
import NavBar from "../navbar/NavBar";

function ShopPage(): JSX.Element {
    return (
        <div>
            <NavBar/>
            <Catalogue/>
        </div>
    )
}

export default ShopPage