import {useEffect, useState} from 'react';
import AddAccount from './AddAccount';
import DeleteAccount from './DeleteAccount';


function AdminAccounts() {
    const [action, setAction] = useState<string>('add');


    return (
        <div>
            <h1 className = 'text-center'>
                Admin Accounts
            </h1>

            <div className = 'item-buttons-div'>
                <button className = {`mt-5 mr-3 admin-border admin-button ${action === 'add' && 'selected'}`} 
                        onClick = {() => setAction('add')}>
                    Create Admin
                </button>

                <button className = {`mt-5 mr-3 admin-border admin-button ${action === 'delete' && 'selected'}`} 
                        onClick = {() => setAction('delete')}>
                    Delete Admin
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