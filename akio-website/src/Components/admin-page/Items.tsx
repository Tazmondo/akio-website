import {useState} from 'react';
import AddItem from './AddItem';
import DeleteItem from './DeleteItem';


function Items() {
    const [action, setAction] = useState('');
    
    return (
        <div>
            <h1 className = 'text-center'>
                Items
            </h1>

            <div className = 'item-buttons-div'>
                <button className = {`mt-5 mr-3 admin-button ${action === 'add' && 'selected'}`} onClick = {() => setAction('add')}>
                    Add Item
                </button>


                <button className = {`mt-5 admin-button ${action === 'delete' && 'selected'}`} onClick = {() => setAction('delete')}>
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
