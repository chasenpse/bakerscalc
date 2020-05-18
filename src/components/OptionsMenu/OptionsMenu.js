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
                    <div className={"options-list"}>
                        {
                            options.map((option, i) => {
                                return (
                                    <Option
                                        key={'option-' + i}
                                        id={option.id}
                                        label={option.label}
                                        value={option.value}
                                        group={option.group}
                                        visible={option.visible}
                                    />
                                )
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