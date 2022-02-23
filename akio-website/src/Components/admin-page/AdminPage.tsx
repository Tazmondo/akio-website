import {useEffect} from 'react';


function loginRequest(){
    {}
}



function AdminPage(){
    
    useEffect(loginRequest, []);
    //allows them to access the database when the website is deployed

    return ( 
        <div>
            <h1 className = 'text-center'>
                Admin Panel
            </h1>
        </div>
    );
}

export default AdminPage;