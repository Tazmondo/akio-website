import SideBar from "./SideBar";
import {useState} from 'react';
import Items from "./items/Items";
import AdminAccounts from "./accounts/AdminAccounts";
import Sales from "./Sales";



function AdminDashBoard() {
    const [adminPage, setPage] = useState('items');

    return (
        <div style = {{'display' : 'flex'}}>
            <SideBar setPage = {setPage}/>
            
            <div className = 'admin-content-wrapper'>
                {adminPage === 'items' ?
                    <Items />
                : adminPage === 'admins' &&
                    <AdminAccounts />
                }
            </div>
        </div>
     );
}

export default AdminDashBoard;