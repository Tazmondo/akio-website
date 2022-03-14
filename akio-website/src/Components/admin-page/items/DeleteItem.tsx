import {useContext, useState} from 'react';
import Item, { ItemProps } from '../../item/Item';
import { CDBAlert } from 'cdbreact';
import {globalItemsContext} from '../../item-context/ItemContext';
import RequestHandler from '../../request-handler/RequestHandler';

// TODO: 
// => Add pop up when item is deleted
// => Update global context




function DeleteItem() {
    const itemsContext = useContext(globalItemsContext);
    const [showAlert, toggleAlert] = useState<boolean>(false);
    const [alertMessage, toggleMessage]  = useState<string>('');
    const [isSuccess, toggleSuccess] = useState<boolean>(false);


    function deleteItemCallback(response : any){
        toggleAlert(true);

        if (response.success){
            toggleSuccess(true);
            toggleMessage('Item deleted successfuly');
        }else{
            toggleSuccess(false);
            toggleMessage(response.message);
        }

        window.scrollTo(0, document.body.scrollHeight);
        setTimeout(() => toggleAlert(false), 3000);
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
    

    return (
        <div>
            {itemsContext.items.map((item) => {
                return (
                    <div className = 'col-sm-4 col-lg-4 col-xs-12 mt-4 text-center pt-5' style = {{display : 'inline-block'}}>
                        <Item
                            name={item.name}
                            frontImageUrl={item.frontImageUrl}
                            backImageUrl={item.backImageUrl}
                            price={item.price}
                            stock={item.stock}
                            key={`${item.name}${item.frontImageUrl}${item.price}`}
                        />

                        <button className = 'text-center btn btn-danger btn-lg btn-block mt-1'
                                onClick = {() => deleteItem(item)}>
                            Delete
                        </button>        
                    </div>
                )
            })}

            {showAlert && 
                <CDBAlert color = {isSuccess ? 'success' : 'danger'}
                          className = 'mt-3'>
                    {alertMessage}
                </CDBAlert>
            }
        </div>
    );
}

export default DeleteItem;