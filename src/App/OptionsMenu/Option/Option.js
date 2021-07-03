import React, {useState} from 'react';
import './Option.css'
import Tooltip from "../Tooltip/Tooltip";

const Option = ({id, label, value, type, min, step, data, onOptionChange, tooltip}) => {

    const [tt,setTt] = useState(false)
    const [x,setX] = useState(false)
    const [y,setY] = useState(false)

    const updateOption = (e) => {
        onOptionChange(id, type, e.target.value);
    }

    const handleTooltip = (e) => {
        setX(e.pageX - 100)
        setY(e.pageY + 16)
        setTt(tooltip);
    }

    const genTooltip = () => {
        return (
            <span className={"option__tooltip"}>
                <span
                    className={"tooltip__icon"}
                    onMouseMove={e=>handleTooltip(e)}
                    onMouseOut={()=>setTt(false)}
                >?</span>
                <Tooltip open={tt} x={x} y={y}>
                    { tooltip.map((t,i)=><p key={`tt-${i}`}>{t}</p>) }
                </Tooltip>
            </span>
        )
    }

    switch (type) {
        case 'input':
            return (
                <div className={"option input"}>
                    <span className={"option__label"}>{label}</span>
                    { tooltip ? genTooltip() : null }
                    <span className={"option__value"}>
                            <input
                                inputMode="decimal"
                                className={step === 1 ? "small" : null}
                                type={"number"}
                                min={min}
                                step={step}
                                defaultValue={value}
                                onChange={updateOption}
                            />
                        </span>
                </div>
            );
        case 'select':
            return (
                <div className={"option select"}>
                    <span className={"option__label"}>{label}</span>
                    { tooltip ? genTooltip() : null }
                    <span className={"option__value"}>
                            <select value={value} onChange={updateOption}>
                                {data.map((v,i)=><option key={i} defaultValue={v}>{v}</option>)}
                            </select>
                    </span>
                </div>
            );
        default:
            return null;
    }
}

export default Option;

