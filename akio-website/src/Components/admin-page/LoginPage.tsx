import {useEffect} from 'react';


function loginRequest(){
    //post
    //username
    //password
}



function AdminPage(){
    useEffect(loginRequest, []);
    //allows them to access the database when the website is deployed

    return ( 
        <div>
            <h1 className = 'text-center'>
                Admin Login
            </h1>


            <div className = 'input-div'>
                <input type = 'text' id = 'username' className = 'input-element text-center' placeholder = 'Username'></input>
                <input type = 'text' id = 'password' className = 'input-element text-center' placeholder = 'Password'></input>
                
                <button className = 'login-button text-center mt-5'>
                    <p>
                        Login
                    </p>
                </button>
            </div>

        </div>
    );
}

export default AdminPage;