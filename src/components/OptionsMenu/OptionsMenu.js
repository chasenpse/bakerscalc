import React from 'react';
import Option from "./Option/Option";
import './OptionsMenu.css'
import CloseMenuBtn from "./CloseMenuBtn/CloseMenuBtn";

const OptionsMenu = ({options, visible, onMenuBtnClick}) => {
    switch(visible) {
        case true:
            return (
                <div className={"overlay"}>
                    <CloseMenuBtn handler={onMenuBtnClick} />
                    <h1>BakersCalc</h1>
                    <div className={"options-list"}>
                        {
                            options.map((option, i) => {
                                if (option.type === 'input') {
                                    return (
                                        <Option
                                            key={'option-' + i}
                                            id={option.id}
                                            label={option.label}
                                            value={option.value}
                                            group={option.group}
                                            type={option.type}
                                            visible={option.visible}
                                        />
                                    )
                                } else if (option.type === 'select') {
                                    return (
                                        <Option
                                            key={'option-' + i}
                                            id={option.id}
                                            label={option.label}
                                            value={option.value}
                                            group={option.group}
                                            type={option.type}
                                            data={option.data}
                                            visible={option.visible}
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