import {useEffect, useState} from 'react';
import RequestHandler from '../request-handler/RequestHandler';

type AdminPageProps = {
    setLogInState: Function;
};


function AdminPage({setLogInState} : AdminPageProps): JSX.Element{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    function loginRequest() : void{
        if (username === '' || password === ''){
            // TODO: Display error message
            return;
        }
    
        const headers = {
            'username' : username, 
            'password' : password
        };
        
        RequestHandler.Post(`api/login`, headers)
            .then(loginCallback);
    }


    function loginCallback(response : any) : void {
        if (response.success){
            setLogInState(true);
        }else{
            //TODO: show error message
            console.log(response.message);
        }
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

                <input type = 'password' 
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