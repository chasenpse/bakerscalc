import React from 'react'
import './ShareBtn.css'

const ShareBtn = ({onShareBtnClick}) => {
    return(
        <button id="shareBtn" type={"button"} onClick={onShareBtnClick} />
    );
}

export default ShareBtn;