import LoginPage from './LoginPage';
import {useEffect, useState} from 'react';
import RequestHandler from '../request-handler/RequestHandler';
import LoadingIndicator from '../loading-indicator/LoadingIndicator';
import AdminDashBoard from './AdminDashboard';


function AdminPage() : JSX.Element{
    const [isLoggedIn, setLogInState] = useState(false);
    const [hasLoaded, setLoadingState] = useState(false);


    //attempt to fetch admin data from server as soon as page loads
    //if user has a valid session they will be redirected to the dashboard
    //if user does not have a valid session they will be redirected to the admin login page
    

    function checkSession() : void {
        RequestHandler.Get(`api/admin-page`)
            .then(checkSessionCallback);
    }
    
    
    function checkSessionCallback(response: {[x: string]: any}){
        console.log(response['success']);
        console.log(response['message']);

        if (response['success'] === true){
            setLogInState(true);
        }else{
            setLogInState(false);
        }

        setLoadingState(true);
    }


    useEffect(checkSession, []);


    return (
        <>
            {
                hasLoaded ? 
                    isLoggedIn ?
                        <AdminDashBoard />
                    : <LoginPage setLogInState = {setLogInState}/>
                : <LoadingIndicator />
            }
        </>
    );
}

export default AdminPage;