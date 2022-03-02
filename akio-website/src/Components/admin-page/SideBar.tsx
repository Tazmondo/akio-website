import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';



function SideBar() {
    return (
        <div style = {{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor='#fff' backgroundColor='#333'>
                <CDBSidebarHeader prefix={<i className='fa fa-bars fa-large'></i>}>
                    {/* TODO: change to link component */}
                    <a href='/' className='text-decoration-none' style={{ color: 'inherit' }}>
                        Admin Dashboard
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className='sidebar-content'>
                    <CDBSidebarMenu>
                        <NavLink to = '/'>
                            <CDBSidebarMenuItem icon = 'columns'>Items</CDBSidebarMenuItem>
                        </NavLink>
                        
                        <NavLink to = '/profile'>
                            <CDBSidebarMenuItem icon = 'user'>Admin Profiles</CDBSidebarMenuItem>
                        </NavLink>
                        
                        <NavLink to = '/analytics'>
                            <CDBSidebarMenuItem icon = 'chart-line'>Sales</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter className = 'text-center mb-3'>
                    Akio
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
}

export default SideBar;