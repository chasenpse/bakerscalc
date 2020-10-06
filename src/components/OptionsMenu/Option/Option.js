import React from 'react';
import './Option.css'

const Option = ({id, label, value, group, type, data, visible, onOptionChange}) => {

    const updateOption = (e) => {
        onOptionChange(id, type, e.target.value);
    }

    if (visible) {
        switch (type) {
            case 'input':
                return (
                    <div className={"option input"}>
                        <span className={"option__label"}>{label}</span>
                        <span className={"option__value"}>
                            <input inputMode="decimal" type={"number"} min={0} defaultValue={value} onChange={updateOption} />
                        </span>
                    </div>
                );
            case 'select':
                return (
                    <div className={"option select"}>
                        <span className={"option__label"}>{label}</span>
                        <span className={"option__value"}>
                            <select value={value} onChange={updateOption}>
                                {data.map((v,i)=>{
                                    return (<option key={i} defaultValue={v}>{v}</option>);
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

