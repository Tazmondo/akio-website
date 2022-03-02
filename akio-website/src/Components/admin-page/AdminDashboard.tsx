import SideBar from "./SideBar";
import {useState} from 'react';
import Items from "./Items";
import AdminAccounts from "./AdminAccounts";
import Sales from "./Sales";



function AdminDashBoard() {
    const [adminPage, setPage] = useState('items');

    return (
        <div>
            <SideBar setPage = {setPage}/>

            <div style = {{'background' : '#ddc192'}} className = 'admin-content-wrapper'>
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