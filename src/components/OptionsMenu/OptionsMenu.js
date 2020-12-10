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
                    <div className={"options-container"}>
                        <CloseMenuBtn  onMenuBtnClick={onMenuBtnClick} />
                        <h1>BakersCalc</h1>
                        <div className={"options-list"}>
                            {
                                orderedOptions.map((option, i) => {
                                    if (option[1].group === 'global' || option[1].group === options.calcMode.value) {
                                        return (
                                            <Option
                                                key={i}
                                                id={option[0]}
                                                label={option[1].label}
                                                value={option[1].value}
                                                data={option[1].data || null}
                                                type={option[1].type}
                                                min={option[1].min || 0}
                                                step={option[1].step || 1}
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
                </div>
            )
        default:
            return null;
    }
}

export default OptionsMenu;