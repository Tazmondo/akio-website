import React from 'react';
import {ReactComponent as IgLogo} from './iglogo.svg'

function SocialMedia() {
    return (
        <div className="social-media">
            <a id="instagram" href="https://instagram.com/akiostreetwear?utm_medium=copy_link" target="_blank">
                <IgLogo/>
            </a>
        </div>
    )
}

export default SocialMedia;