import SideBar from "./SideBar";
import {useState} from 'react';
import Items from "./Items";
import AdminAccounts from "./AdminAccounts";
import Sales from "./Sales";



function AdminDashBoard() {
    const [adminPage, setPage] = useState('items');

    return (
        <div style = {{'display' : 'flex'}}>
            <SideBar setPage = {setPage}/>
            
            <div className = 'admin-content-wrapper'>
                {adminPage === 'items' ?
                    <Items />
                : adminPage === 'admins' ?
                    <AdminAccounts />
                : adminPage === 'sales' && 
                    <Sales /> 
                }
            </div>
        </div>
     );
}

export default AdminDashBoard;