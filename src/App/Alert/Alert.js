import React, {useState} from 'react'
import './Alert.css'
import {createPortal} from 'react-dom';

const Alert = ({text, dismiss}) => {
    const [exit, setExit] = useState(false);
    return createPortal(
        <div
            className={`alert ${exit ? "dismiss" : null}`}
            onClick={()=>setExit(true)}
        >
            {text}
        </div>, document.getElementById("portal"))
}

export default Alert;