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
                Admin Panel
            </h1>


            <div className = 'input-div'>
                <input type = 'text' id = 'username' className = 'input-element'></input>
                <input type = 'text' id = 'password' className = 'input-element'></input>
            </div>
        </div>
    );
}

export default AdminPage;