import React from 'react'
import './OpenMenuBtn.css';

const OpenMenuBtn = ({handler}) => {
    return(
        <button id="openMenuBtn" type={"button"} onClick={handler}></button>
    );
}

export default OpenMenuBtn;