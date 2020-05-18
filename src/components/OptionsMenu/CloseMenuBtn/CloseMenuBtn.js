import React from 'react'
import './CloseMenuBtn.css'

const CloseMenuBtn = ({handler}) => {
    return(
        <button id="closeMenuBtn" type={"button"} onClick={handler}></button>
    );
}

export default CloseMenuBtn;