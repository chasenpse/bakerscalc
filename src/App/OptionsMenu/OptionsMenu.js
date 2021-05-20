import React from 'react';
import Option from "./Option/Option";
import './OptionsMenu.css'
import CloseMenuBtn from "./CloseMenuBtn/CloseMenuBtn";

const OptionsMenu = ({options, visible, onMenuBtnClick, onOptionChange}) => {
    const getOptions = options => {
        const orderedOptions = Object.entries(options).sort((a,b) => a[1].position-b[1].position);
        return orderedOptions.filter(o => {
            if (o[1].group === 'global') {
                return true;
            } else if (o[1].group === options.calcMode.value) {
                if (!o[1].subgroup) {
                    return true;
                } else if (o[1].subgroup === options.panShape.value) {
                    return true;
                }
            }
            return false;
        });
    }

    switch(visible) {
        case true:

            return (
                <div className={"overlay"}>
                    <div className={"options-container"}>
                        <CloseMenuBtn  onMenuBtnClick={onMenuBtnClick} />
                        <h1>BakersCalc</h1>
                        <div className={"options-list"}>
                            {
                                getOptions(options).map((option) => {
                                        return (
                                            <Option
                                                key={option[0]}
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