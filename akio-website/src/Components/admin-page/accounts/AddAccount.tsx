import {useState} from 'react';
import RequestHandler from '../../request-handler/RequestHandler';
import { CDBAlert } from 'cdbreact';



function AddAccount() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showAlert, toggleAlert] = useState<boolean>(false);
    const [alertMessage, setMessage] = useState<string>('');
    const [isSuccess, toggleSuccess] = useState<boolean>(false);


    function createAccountCallback(response : any){
        toggleAlert(true);

        if (response.success){
            setMessage('Successfully created admin account');
            toggleSuccess(true);
        }else{
            setMessage(response.message);
            toggleSuccess(false);
        }

        window.scrollTo(0,document.body.scrollHeight);
        setTimeout(() => toggleAlert(false), 3000);
    }


    function createAccount(){
        if (username.length < 4 || password.length < 7){
            toggleAlert(true);
            setMessage('Enter at least 4 characters for the username and 7 characters for the password')

            window.scrollTo(0,document.body.scrollHeight);
            setTimeout(() => toggleAlert(false), 3000);

            return false;
        }


        const headers = {
                            'operation' : 'ADD', 
                            'username' : username, 
                            'password' : password
                        }   
        
        RequestHandler.Post('api/admins', headers).then(
            createAccountCallback
        );
    }


    return (
        <div>
            <div className = 'text-center mt-5 pt-5'>
                <ul className = 'p-0'>
                    <li>
                        <input className = 'admin-border item-input mt-3'
                               type = 'text'
                               id = 'username'
                               placeholder = 'Username'
                               onChange = {event => setUsername(event.target.value)}>
                        </input>
                    </li>

                    <li>
                        <input className = 'admin-border item-input mt-3'
                               type = 'password'
                               id = 'password'
                               placeholder = 'Password'
                               onChange = {event => setPassword(event.target.value)}>
                        </input>
                    </li>

                    <li>
                        <button className = 'mt-5 admin-border submit-add-item-button'
                                onClick = {createAccount}>
                            Create
                        </button>
                    </li>
                </ul>

                <div className = 'mt-5'>
                    {showAlert &&
                            <CDBAlert color = {isSuccess ? 'success' : 'danger'}>
                                {alertMessage}
                            </CDBAlert>
                    }
                </div>
            </div>
        </div>

    );
}

export default AddAccount;