import React, {useState} from "react";
import {AiOutlineSwap} from "react-icons/ai";
import ShirtFront from '../../assets/shirt1front.png';
import ShirtBack from '../../assets/shirt1back.png';

function ItemThumb({backImage, frontImage, name}: { backImage: string, frontImage: string, name: string }) {
    backImage = backImage || ShirtBack
    frontImage = frontImage || ShirtFront

    const [imageUrl, setUrl] = useState(frontImage);
    const [front, setFront] = useState(true)

    function toggle(e) {
        setFront(prevState => !prevState)

        front ? setUrl(frontImage) : setUrl(backImage)
        e.stopPropagation() // Stop from switching pages
    }

    return <div>
        <img src={imageUrl}
                alt={name}
                className="card-img-top"
                onMouseOver={(e) => {
                    setUrl(backImage)
                }}
                onMouseOut={(e) => {
                    setUrl(frontImage)
                }}>
        </img>
        <AiOutlineSwap className="d-lg-none" onClick={toggle} style={{position: "absolute", top: "0", right: "0"}}/>
    </div>
}

export default ItemThumb