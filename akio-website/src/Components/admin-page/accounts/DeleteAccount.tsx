import {useState, useEffect} from 'react';
import RequestHandler from '../../request-handler/RequestHandler';
import { CDBAlert } from 'cdbreact';

//TODO:
//Add loading to page while admin accounts are fetched
//Style admin info div 


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


    function deleteAdminCallback(response : any){
        toggleAlert(true);

        if (response.success){
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

        RequestHandler.Post('api/admins', headers).then(
            deleteAdminCallback
        )
    }


    useEffect(getAdmins, []);


    return (
        <div>
            {
                Object.entries(admins).map(([username, data]) => {
                        return (
                                <div className = 'col-sm-4 col-lg-4 col-xs-12 mt-4 text-center pt-5 admin-info-div'>
                                    <p className = 'mt-3 admin-info-text'>Username: {username}</p>

                                    <button className = 'text-center admin-border delete-button mt-3 mb-3' onClick = {() => deleteAdmin(username)}>
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