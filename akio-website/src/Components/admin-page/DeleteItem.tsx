import {useContext} from 'react';
import Item, { ItemProps } from '../item/Item';
import {globalItemsContext} from '../item-context/ItemContext';
import RequestHandler from '../request-handler/RequestHandler';

// TODO: 
// => Add pop up when item is deleted
// => Update global context


function deleteItemCallback(response : any){
    if (response.success){
        alert('item deleted successfully');
    }else{
        alert(response.message);
    }
}


function deleteItem(item: ItemProps){
    const targetItem = {
        'name' : item.name,
        'stock' : item.stock, 
        'frontImageUrl' : item.frontImageUrl, 
        'backImageUrl' : item.backImageUrl,
        'price' : item.price
    }

    RequestHandler.Post('api/items', 
                        {'items' : [targetItem], 
                         'operation' : 'DELETE'
                        }).then(deleteItemCallback);
}



function DeleteItem() {
    const itemsContext = useContext(globalItemsContext);

    return (
        <div>
            {itemsContext.items.map((item) => {
                return (
                    <div className=" col-sm-4 col-lg-4 col-xs-12 mt-4 text-center pt-5" style = {{display : 'inline-block'}}>
                        <Item
                            name={item.name}
                            frontImageUrl={item.frontImageUrl}
                            backImageUrl={item.backImageUrl}
                            price={item.price}
                            stock={item.stock}
                            key={`${item.name}${item.frontImageUrl}${item.price}`}
                        />

                        <button className = 'text-center admin-border delete-button mt-3 mb-3'
                                onClick = {() => deleteItem(item)}>
                            Delete
                        </button>        
                    </div>
                )
            })}
        </div>
    );
}

export default DeleteItem;