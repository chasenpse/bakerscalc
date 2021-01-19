import React from 'react'
import './CloseMenuBtn.css'

const CloseMenuBtn = ({onMenuBtnClick}) => {
    return(
        <button id="closeMenuBtn" type={"button"} onClick={onMenuBtnClick}></button>
    );
}

export default CloseMenuBtn;