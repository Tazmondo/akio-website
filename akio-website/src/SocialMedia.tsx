import React from 'react';
import {ReactComponent as IgLogo} from './resources/iglogo.svg'

function socialMedia() {
    return (
        <div className="social-media">
            <a id="instagram" href="https://instagram.com/akiostreetwear?utm_medium=copy_link" target="_blank">
                <IgLogo/>
            </a>
        </div>
    )
}

export default socialMedia;