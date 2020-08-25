import React from 'react';
import './Option.css'

const Option = ({id, label, value, group, type, data, visible}) => {
    if (visible) {
        switch (type) {
            case 'input':
                return (
                    <div className={"option input"}>
                        <span className={"option__label"}>{label}</span>
                        <span className={"option__value"}>
                            <input type={"input"} value={value} />
                        </span>
                    </div>
                );
            case 'select':
                return (
                    <div className={"option select"}>
                        <span className={"option__label"}>{label}</span>
                        <span className={"option__value"}>
                            <select>
                                {data.map(v=>{
                                    if (v==={value}) {
                                        return (<option value={v} selected={"selected"}>{v}</option>);
                                    } else {
                                        return (<option value={v}>{v}</option>);
                                    }
                                })}
                            </select>
                    </span>
                    </div>
                );
            default:
                return null;
        }
    } else {
        return null;
    }
}

export default Option;

