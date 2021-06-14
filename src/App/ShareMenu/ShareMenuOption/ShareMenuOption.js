import React from 'react'
import './ShareMenuOption.css'

const ShareMenuOption = ({id, label, onClick}) =>
    <div id={id} className={'shareMenuOption'} onClick={onClick}>
        {label}
    </div>

export default ShareMenuOption