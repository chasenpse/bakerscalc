import React, {useState} from 'react';
import Option from "./Option/Option";
import './OptionsMenu.css'
import CloseMenuBtn from "./CloseMenuBtn/CloseMenuBtn";
import Footer from "./Footer/Footer";
import Overlay from "../Overlay/Overlay";

const OptionsMenu = ({options, onMenuBtnClick, onOptionChange}) => {
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

    const [show, setShow] = useState(true);

    return (
        <>
            <div
                className={"options-container"}
                style={{
                    animationName: `${show ? "fadeIn" : "fadeOut"}`
                }}
                onAnimationEnd={show ? null : onMenuBtnClick}
            >
                <CloseMenuBtn  onMenuBtnClick={()=>setShow(false)} />
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
                                    tooltip={option[1].tooltip}
                                />
                            )
                        })
                    }
                </div>
                <Footer />
            </div>
            <Overlay display={show} close={()=>setShow(false)} />
        </>
    )
}

export default OptionsMenu;