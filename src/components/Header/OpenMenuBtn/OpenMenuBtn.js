import React from 'react'
import './OpenMenuBtn.css';

const OpenMenuBtn = ({onMenuBtnClick}) => {
    return(
        <button id="openMenuBtn" type={"button"} onClick={onMenuBtnClick}></button>
    );
}

export default OpenMenuBtn;