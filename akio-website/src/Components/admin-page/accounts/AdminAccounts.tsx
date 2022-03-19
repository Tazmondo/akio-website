import {useState} from 'react';
import AddAccount from './AddAccount';
import DeleteAccount from './DeleteAccount';


function AdminAccounts() {
    const [action, setAction] = useState<string>('add');


    return (
        <div>
            <h1 className = 'text-center'>
                Admin Accounts
            </h1>

            <div className = 'item-buttons-div pt-5'>
                <button className = {`btn btn-${action === 'add' ? 'dark' : 'light'} btn-lg active`} 
                        onClick = {() => setAction('add')}>
                    Create
                </button>

                <button className = {`btn btn-${action === 'delete' ? 'dark' : 'light'} btn-lg active`}
                        onClick = {() => setAction('delete')}>
                    Delete
                </button>
            </div>


            {action === 'add' ?
                <AddAccount />
            :  
                <DeleteAccount />}
        </div>
    );
}

export default AdminAccounts;