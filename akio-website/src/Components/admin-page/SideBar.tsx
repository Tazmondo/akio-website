import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBBtn
} from 'cdbreact';
import RequestHandler from '../request-handler/RequestHandler';
import {useNavigate} from 'react-router-dom';


type sideBarProps = {
    setPage: Function
}


function SideBar({setPage} : sideBarProps) {
    const navigate = useNavigate();

    function logoutCallback(response : any){
        console.log(response.success);

        if (response.success){
            navigate('/');
        }
    }

    function logout(){
        RequestHandler.Get('api/logout').then(
            logoutCallback
        )
    }

    function home() {
        navigate('/')
    }

    return (
        <div style = {{ display: 'flex', minHeight: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor='#fff' backgroundColor = '#333'>
                <CDBSidebarHeader prefix={<i className = 'fa fa-bars fa-large'></i>}>
                    <p>Admin Dashboard</p>
                </CDBSidebarHeader>

                <CDBSidebarContent className='sidebar-content'>
                    <CDBSidebarMenu>
                        <CDBSidebarMenuItem icon = 'columns' onClick = {() => setPage('items')}>Items</CDBSidebarMenuItem>
                        <CDBSidebarMenuItem icon = 'user' onClick = {() => setPage('admins')}>Admin Accounts</CDBSidebarMenuItem>
                    </CDBSidebarMenu>

                    <CDBSidebarMenu>
                        <CDBSidebarMenuItem icon = 'arrow-right' onClick = {home}>Back to homepage</CDBSidebarMenuItem>
                        <CDBSidebarMenuItem icon = 'arrow-right' onClick = {logout}>Log Out</CDBSidebarMenuItem>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter className = 'text-center mb-3'>

                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
}

export default SideBar;
