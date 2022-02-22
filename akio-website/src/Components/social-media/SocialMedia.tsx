import React from 'react';
import {ReactComponent as IgLogo} from './iglogo.svg'

// Use CSS instead? styling is fairly light so probably neater to leave it here
const iconStyle = {marginLeft: "8px"}

function SocialMedia(): JSX.Element {
    return (
        <div className="social-media position-fixed d-flex justify-content-end" style={{right: "20px", bottom:"16px"}}>
            <a id="instagram" href="https://instagram.com/akiostreetwear?utm_medium=copy_link" target="_blank" style={iconStyle}>
                <IgLogo/>
            </a>
        </div>
    )
}

export default SocialMedia;