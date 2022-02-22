import React from 'react';
import { AiFillInstagram } from "react-icons/ai"


// Use CSS instead? styling is fairly light so probably neater to leave it here
const iconStyle = {marginLeft: "8px", color: 'red'}
const iconColourStyle = {color :   "linear-gradient(blue, red)"}

function SocialMedia(): JSX.Element {
    return (
        <div className="social-media position-fixed d-flex justify-content-end" style={{right: "20px", bottom:"16px"}}>
            <a className="text-reset" id="instagram" href="https://instagram.com/akiostreetwear?utm_medium=copy_link" target="_blank" style={iconStyle}>
                <AiFillInstagram className = 'social-media-icon' color = "white" />
            </a>

        </div>
    )
}

export default SocialMedia;