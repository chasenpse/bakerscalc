import React from 'react';
import './Option.css'

const Option = ({id, label, value, group, type, visible}) => {
    if (visible) {
        return (
            <div className={"option"}>
                {label}:
            </div>
        );
    } else {
        return null;
    }
}

export default Option;

