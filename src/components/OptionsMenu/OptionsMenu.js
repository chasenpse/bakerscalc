import React from 'react';
import Option from "./Option/Option";
import './OptionsMenu.css'
import CloseMenuBtn from "./CloseMenuBtn/CloseMenuBtn";

const OptionsMenu = ({options, visible, onMenuBtnClick, onOptionChange}) => {
    switch(visible) {
        case true:
            const orderedOptions = Object.entries(options).sort((a,b) => a[1].position-b[1].position);
            return (
                <div className={"overlay"}>
                    <CloseMenuBtn onMenuBtnClick={onMenuBtnClick} />
                    <h1>BakersCalc</h1>
                    <div className={"options-list"}>
                        {
                            orderedOptions.map((option, i) => {
                                if (option[1].type === 'input') {
                                    return (
                                        <Option
                                            key={i}
                                            id={option[0]}
                                            label={option[1].label}
                                            value={option[1].value}
                                            group={option[1].group}
                                            type={option[1].type}
                                            visible={option[1].visible}
                                            onOptionChange={onOptionChange}
                                        />
                                    )
                                } else if (option[1].type === 'select') {
                                    return (
                                        <Option
                                            key={i}
                                            id={option[0]}
                                            label={option[1].label}
                                            value={option[1].value}
                                            group={option[1].group}
                                            type={option[1].type}
                                            data={option[1].data}
                                            visible={option[1].visible}
                                            onOptionChange={onOptionChange}
                                        />
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }
                    </div>
                </div>
            )
        default:
            return null;
    }
}

export default OptionsMenu;