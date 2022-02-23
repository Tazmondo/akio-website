import NavBarItem from "./NavBarItem";
import Logo from "../../assets/logo.png";



function NavBar(): JSX.Element {
    return (
        <div>
            <nav className = 'navbar navbar-expand-lg navbar-light  bg-light'>
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
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;