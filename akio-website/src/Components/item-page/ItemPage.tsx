import React, {useContext} from 'react'
import {useParams} from "react-router-dom";
import {globalItemsContext} from "../item-context/ItemContext";
import ItemThumb from '../item/ItemThumb'
import NavBar from "../navbar/NavBar";
import {dashToSpace, priceIntToString} from "../Globals";


// TODO: style size option drop down
// look for more flexible alternative
// finish cart page


function ItemPage(): JSX.Element {
    let params = useParams()
    let itemContextGlobal = useContext(globalItemsContext);
    let itemContext = itemContextGlobal.itemNameMap

    let item = itemContext[dashToSpace(params.name as string)]

    let content = <>You should not see this text!</>

    if (itemContextGlobal.status !== "fetching") {
        if (item !== undefined || itemContextGlobal.status === "failed") {
            content = <div className="container">
                <div className="row gx-5">
                    <div className="col-12 col-md-6">
                        <ItemThumb backImage={item.frontImageUrl} frontImage={item.backImageUrl} name={item.name}/>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className = 'text-center'>
                            <h2 className = 'display-3'>{item.name}</h2>
                            <h3 className = 'text-muted'>{priceIntToString(item.price)}</h3>
                            

                            <div className = 'mt-4'>
                                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                    <input type="hidden" name="cmd" value="_s-xclick" />
                                    <input type="hidden" name="hosted_button_id" value="H2GNRZBN364AA" />
                                    <input type="hidden" name="on0" value="Sizing" />
                                    
                                    <p style = {{fontSize: '1.2em'}}>Select size</p>
                                    
                                    <select name="os0">
                                        <option value="Small">Small £40.00 GBP</option>
                                        <option value="Medium">Medium £40.00 GBP</option>
                                        <option value="Large">Large £40.00 GBP</option>
                                    </select>
                                    
                                    <input type="hidden" name="currency_code" value="GBP"></input>

                                    <button className = 'btn btn-light btn-block mt-5' name = 'submit'>
                                        Buy Now
                                    </button>
                                    
                                    <img alt=""  src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif" width="1" height="1"></img>
                                </form>
                            </div>


                            <div>
                                <button className = 'btn btn-primary btn-block' style = {{display: 'inline-block'}}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        } else {
            content = <div className="alert alert-danger" role="alert">
                Error, item not found!
            </div>
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
