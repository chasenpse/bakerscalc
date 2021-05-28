import React from 'react';
import {createPortal} from 'react-dom';
import './Tooltip.css'

const Tooltip = ({open, x, y, children}) => {
    if (!open) return null;
    return createPortal(
        <div
            className={"tooltip__copy"}
            style={{
              left: x,
              top: y,
            }}
        >
            {children}
        </div>,
        document.getElementById("portal")
    )
}

export default Tooltip;