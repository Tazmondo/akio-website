import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';


type sideBarProps = {
    setPage: Function
}


function SideBar({setPage} : sideBarProps) {
    return (
        <div style = {{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor='#fff' backgroundColor = '#333'>
                <CDBSidebarHeader prefix={<i className = 'fa fa-bars fa-large'></i>}>
                    <p>Admin Dashboard</p>
                </CDBSidebarHeader>

                <CDBSidebarContent className='sidebar-content'>
                    <CDBSidebarMenu>
                        <CDBSidebarMenuItem icon = 'columns' onClick = {() => setPage('items')}>Items</CDBSidebarMenuItem>
                        <CDBSidebarMenuItem icon = 'user' onClick = {() => setPage('admins')}>Admin Accounts</CDBSidebarMenuItem>
                        <CDBSidebarMenuItem icon='chart-line' onClick = {() => setPage('sales')}>Sales</CDBSidebarMenuItem>
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
