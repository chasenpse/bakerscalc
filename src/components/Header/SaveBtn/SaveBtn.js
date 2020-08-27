import React from 'react'
import './SaveBtn.css'

const SaveBtn = ({onSaveBtnClick}) => {
    return(
        <button id="saveBtn" type={"button"} onClick={onSaveBtnClick}></button>
    );
}

export default SaveBtn;