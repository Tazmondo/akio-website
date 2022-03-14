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

            <div style = {{width: '80vw'}} className = 'text-center input-div'>
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
                            onClick = {loginRequest}>
                                Login
                    </button>
            </div>    
        </div>
    );
}

export default AdminPage;