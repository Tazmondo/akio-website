import React, {useContext, useState} from 'react'
import {useParams} from "react-router-dom";
import {globalItemsContext} from "../item-context/ItemContext";
import ItemThumb from '../item/ItemThumb'
import NavBar from "../navbar/NavBar";
import {dashToSpace, paypalPriceString, priceIntToString} from "../Globals";
import {useNavigate} from 'react-router-dom';
import PaypalButon from './PayPalButton';
import {SIZEINTSTRING} from "../item/Item";


function ItemPage(): JSX.Element {
    let params = useParams()
    let itemContextGlobal = useContext(globalItemsContext);
    let itemContext = itemContextGlobal.itemNameMap;
    let item = itemContext[dashToSpace(params.name as string)];
    let content = <>You should not see this text!</>;
    let navigate = useNavigate();


    let sizes = item?.sizes
        .filter(value => value.stock > 0)
        .map(value => value.size)

    const [selectedSize, setSize] = useState<string>(SIZEINTSTRING[sizes[0]]);

    function addToCart() { // TODO update so it adds item size as well
        itemContextGlobal.cart.push({item: item, size: selectedSize});
        window.localStorage.setItem('cart', JSON.stringify(itemContextGlobal.cart)); // store cart data in local storage so it is persistent 
        navigate('/shopping-page');
    }


    if (itemContextGlobal.status !== "fetching") {
        if (item !== undefined && sizes.length > 0) {
            content = <div className="container">
                <div className="row gx-5">
                    <div className="col-12 col-md-6">
                        <ItemThumb backImage={item.frontImageUrl} frontImage={item.backImageUrl} name={item.name}/>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className='text-center'>
                            <h2 className='display-3'>{item.name}</h2>
                            <h3 className='text-muted'>{priceIntToString(item.price)}</h3>


                            <div className="form-group">
                                <select className ="custom-select"
                                        onChange = {(event) => setSize(event.target.value)}>
                                    {
                                        sizes.map(sizeInt => <option key={sizeInt}>{SIZEINTSTRING[sizeInt]}</option>)
                                    }
                                </select>
                            </div>

                            <div>
                                <button className='btn btn-primary btn-block' style={{display: 'inline-block'}}
                                        onClick={addToCart}>
                                    Add to Cart
                                </button>
                            </div>

                            <div className = 'mt-5 pt-5'>
                                <p style = {{fontSize: '1.5rem', color: '#0d6efd'}}>Buy Now</p>
                                <PaypalButon price = {paypalPriceString(item.price)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        } else {
            if (itemContextGlobal.status === "failed") {
                content = <div className="alert alert-danger" role="alert">
                    Error, could not fetch item from server!
                </div>
            } else {
                if (item === undefined) {
                    content = <div className="alert alert-danger" role="alert">
                        Error, item not found!
                    </div>
                } else {
                    content = <div className="alert alert-danger" role="alert">
                        Error, item has no valid sizes! Please contact Taran or Pedro.
                    </div>
                }
            }
        }
    } else {
        // todo: return a placeholder until items are fetched
        content = <div className="alert alert-warning" role="alert">
            Fetching item...
        </div>
    }

    return <div>
        <NavBar/>
        {content}
    </div>
}

export default ItemPage
