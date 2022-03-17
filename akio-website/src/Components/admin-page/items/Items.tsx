import {useState} from 'react';
import AddItem from './AddItem';
import DeleteItem from './DeleteItem';


function Items() {
    const [action, setAction] = useState('add');
    
    return (
        <div>
            <h1 className = 'text-center'>
                Items
            </h1>

            <div className = 'item-buttons-div pt-5'>
                <button className = {`btn btn-${action === 'add' ? 'dark' : 'light'} btn-lg active`}
                        onClick = {() => setAction('add')}>
                    Add Item
                </button>


                <button className = {`btn btn-${action === 'delete' ? 'dark' : 'light'} btn-lg active`} 
                        onClick = {() => setAction('delete')}>
                    Delete Item
                </button>
            </div>


            {
                action === 'add' ?
                    <AddItem />
                : action === 'delete' && 
                    <DeleteItem />
            }
        </div>
    );
}

export default Items;
