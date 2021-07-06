import React from 'react'
import './Overlay.css'

const Overlay = ({display, close}) => {
    return <div
        className={"overlay"}
        style={{
            animationName: `${display ? "fadeIn" : "fadeOut"}`
        }}
        onClick={close}
    />
}

export default Overlay;