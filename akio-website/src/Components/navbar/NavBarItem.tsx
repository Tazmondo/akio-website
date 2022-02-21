import React from 'react';

type NavBarItemProps = {
    path : string, 
    name : string
};


function NavBarItem({path, name} : NavBarItemProps): JSX.Element{
    return (
        <li className = {`nav-item ${window.location.pathname === path && 'active'}`}>
            <a className='nav-link' href = {path}>{name} {window.location.pathname === path && <span className='sr-only'>(current)</span>}</a>
        </li>
    );
}

export default NavBarItem;