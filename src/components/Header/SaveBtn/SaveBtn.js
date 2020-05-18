import React from 'react'
import './SaveBtn.css'

const SaveBtn = ({handler}) => {
    return(
        <button id="saveBtn" type={"button"} onClick={handler}></button>
    );
}

export default SaveBtn;