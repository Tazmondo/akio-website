import {useState, useEffect} from 'react';
import RequestHandler from '../../request-handler/RequestHandler';
import { CDBAlert } from 'cdbreact';


function DeleteAccount() {
    const [admins, setAdmins] = useState({});
    const [showAlert, toggleAlert] = useState<boolean>(false);
    const [alertMessage, setMessage] = useState<string>('');
    const [isSuccess, toggleSuccess] = useState<boolean>(false);


    function getAdminsCallback(response : any){
        if (response.success){
            setAdmins(response.admins);
        }else{
            console.log(response.error);
        }
    }


    function getAdmins(){
        RequestHandler.Get('api/admins').then(
            getAdminsCallback
        )
    }


    function deleteAdminCallback(response : any, username : string){
        toggleAlert(true);

        if (response.success){
            //update local context
            delete admins[username];
            setAdmins(admins);

            toggleSuccess(true);
            setMessage('Account deleted successfully');
        }else{
            toggleSuccess(false);
            setMessage(response.message);
        }

        //update admins
        getAdmins();

        window.scrollTo(0, document.body.scrollHeight);
        setTimeout(() => toggleAlert(false), 3000);
    }

    
    function deleteAdmin(username : string){
        const headers = {
            'operation' : 'DELETE',
            'username' : username
        }

        RequestHandler.Post('api/admins', headers)
            .then((response) => {
                deleteAdminCallback(response, username);
            }
                           
        )
    }


    useEffect(getAdmins, []);


    return (
        <div className = 'mt-5'>
            {
                Object.entries(admins).map(([username, data]) => {
                        return (
                                <div className = 'text-center pt-3 mt-1 admin-info-div' key={username}>
                                    <p className = 'admin-info-text mt-2 text-center'>Username: {username}</p>

                                    <button className = 'btn btn-lg btn-danger mb-3 text-center' onClick = {() => deleteAdmin(username)}>
                                        Delete
                                    </button>
                                </div>
                        );
                    }
                )
            }

            <div className = 'text-center'>
                {showAlert && 
                    <CDBAlert color = {isSuccess ? 'success' : 'danger'} className = 'mt-3'>
                        {alertMessage}
                    </CDBAlert>
                }
            </div>
        </div>
    );
}

export default DeleteAccount;
