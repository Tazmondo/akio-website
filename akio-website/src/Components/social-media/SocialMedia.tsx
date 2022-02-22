import React from 'react';
import {ReactComponent as IgLogo} from './iglogo.svg'

function SocialMedia(): JSX.Element {
    return (
        <div className="social-media position-absolute d-flex justify-content-end" style={{right: "24px", bottom:"24px"}}>
            <a id="instagram" href="https://instagram.com/akiostreetwear?utm_medium=copy_link" target="_blank">
                <IgLogo/>
            </a>
        </div>
    )
}

export default SocialMedia;