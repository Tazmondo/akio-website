import {useState} from 'react';


function AdminAccounts() {
    const [operation, setOperation] = useState('add');

    return (
        <div>
            <h1 className = 'text-center'>
                Admin Accounts
            </h1>

            <div className = 'item-buttons-div'>
                <button className = {`mt-5 mr-3 admin-border admin-button ${operation === 'add' && 'selected'}`} 
                        onClick = {() => setOperation('add')}>
                    Create Admin
                </button>

                <button className = {`mt-5 mr-3 admin-border admin-button ${operation === 'delete' && 'selected'}`} 
                        onClick = {() => setOperation('delete')}>
                    Delete Admin
                </button>
            </div>
        </div>
    );
}

export default AdminAccounts;