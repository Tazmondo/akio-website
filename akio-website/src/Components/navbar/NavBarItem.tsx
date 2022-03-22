import React from 'react';
import {Link} from 'react-router-dom'
import {BsFillCartFill} from 'react-icons/bs';

type NavBarItemProps = {
    path : string, 
    name : string, 
};


function NavBarItem({path, name} : NavBarItemProps): JSX.Element{
    return (
        <li className = {`nav-item ${window.location.pathname === path && 'active'}`}>
            <Link className = 'nav-link' to = {path}>
                {name}
                {window.location.pathname === path && <span className='sr-only'>(current)</span>}
            </Link>
        </li>
    );
}

export default NavBarItem;