import NavBarItem from "./NavBarItem";
import Logo from "../../assets/logo.png";
import {useEffect, useState} from "react";
import RequestHandler from "../request-handler/RequestHandler";



function NavBar(): JSX.Element {
    const [admin, setAdmin] = useState(false)

    // Fetch admin status
    useEffect(() => {
        RequestHandler.Get('api/admin-page').then(res => setAdmin(res.success))
    }, [])

    return (
            <nav className = 'navbar navbar-expand-lg navbar-light'>
                <a className='navbar-brand' href='/'>
                    <img src = {Logo} width= '50' height = '45' className = 'd-inline-block align-top' alt=''></img>
                 </a>
            
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                
                <div className = 'collapse navbar-collapse' id = 'navbarNav'>
                    <ul className =' navbar-nav'>
                        <NavBarItem path = '/' name  = 'Home'/>
                        <NavBarItem path = '/shopping-page' name = 'Shop' />
                        <NavBarItem path = '/about-us' name = 'About Us' />
                        <NavBarItem path = '/sizes' name = 'Size Guide' />
                        <NavBarItem path = '/cart' name = 'Cart' />
                        {admin ? <NavBarItem path='/admin' name='Admin'/> : <></>}
                    </ul>
                </div>
            </nav>

    );
}

export default NavBar;
