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
            <div style = {{width: '60vw'}} className = 'text-center input-div'>
                <form>
                    <div className='form-group'>
                        <label htmlFor ='username' className = 'description-text'>Username</label>

                        <div className = 'mt-4 mb-4'>
                            <input type = 'text' 
                                id = 'username'
                                className = 'form-control text-center' 
                                placeholder ='Enter Username' 
                                style = {{width: '40vw', display: 'inline-block'}}
                                onChange = {event => setUsername(event.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className = 'form-group'>
                        <label htmlFor = 'password' className = 'description-text'>Password</label>
                        
                        <div className = 'mt-4 mb-4'>
                            <input type = 'password' 
                                className = 'form-control text-center' 
                                id = 'password' 
                                placeholder = 'Enter Password' 
                                style = {{width: '40vw', display: 'inline-block'}}
                                onChange = {event => setPassword(event.target.value)}
                            />
                        </div>
                    </div>

                    <button type = 'button' 
                            className = 'btn btn-dark btn-lg mt-5' 
                            style = {{width: '50vw'}}
                            onClick = {createAccount}>
                                Create Account
                    </button>
                </form>
            </div>

            <div className = 'mt-5'>
                {showAlert &&
                            <CDBAlert color = {isSuccess ? 'success' : 'danger'} className = 'text-center'>
                                {alertMessage}
                            </CDBAlert>
                }
            </div>
        </div>    
    );
}

export default AddAccount;