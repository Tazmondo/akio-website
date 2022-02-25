import {useEffect, useState} from 'react';
import Globals from '../Globals';
import RequestHandler from '../request-handler/RequestHandler';


function AdminPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    useEffect(loginRequest, []);


    function loginRequest() : void{
        if (username === '' || password === ''){
            // TODO: Display error message
            return;
        }
    
        const headers = {
            'username' : username, 
            'password' : password
        };
    
        RequestHandler.Post(`${Globals.apiUrl}/api/login`, headers, loginCallback);
    
    }


    function loginCallback() : void {
    }

 

    return ( 
        <div>
            <h1 className = 'text-center'>
                Admin Login
            </h1>

            <div className = 'input-div'>
                <input type = 'text' 
                       id = 'username' 
                       className = 'input-element text-center' 
                       placeholder = 'Username'
                       onChange = {event => setUsername(event.target.value)}>
                </input>

                <input type = 'text' 
                       id = 'password' 
                       className = 'input-element text-center' 
                       placeholder = 'Password'
                       onChange = {event => setPassword(event.target.value)}>
                </input>
                
                <button className = 'login-button text-center mt-5' onClick = {loginRequest}>
                    <p>
                        Login
                    </p>
                </button>
            </div>
        </div>
    );
}

export default AdminPage;