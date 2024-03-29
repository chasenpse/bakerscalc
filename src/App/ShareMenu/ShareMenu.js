import React, {useState} from 'react'
import {createPortal} from 'react-dom';
import './ShareMenu.css'
import ShareMenuOption from "./ShareMenuOption/ShareMenuOption";
import Overlay from "../Overlay/Overlay";
import genBBCode from "../../utils/genBBCode";
import genHTML from "../../utils/genHTML";
import ClipboardJS from "clipboard";

const ShareMenu = ({close, url, touched, data}) => {

    const [show, setShow] = useState(true);

    new ClipboardJS('#copyURL', {
        text: () => window.location.href,
    }).on('success', close)

    new ClipboardJS('#copyBBCode', {
        text: () => genBBCode(data),
    }).on('success', close)

    new ClipboardJS('#copyHTML', {
        text: () => genHTML(data),
    }).on('success', close)

    return createPortal(
        <>
            <div
                className={'shareMenu'}
                style={{
                    animationName: `${show ? "fadeIn, slideDown" : "fadeOut, slideUp"}`
                }}
                onAnimationEnd={show ? null : close}
            >
                <div className={'close'} onClick={()=>setShow(false)}>X</div>
                <div className={"title"}>Click to copy:</div>
                {
                    url && !touched ?
                    <div
                        id={"copyURL"}
                        className={"url"}
                    >
                        {url}
                    </div> : null
                }
                <ShareMenuOption
                    id={'copyBBCode'}
                    label={'BBCode'}
                />
                <ShareMenuOption
                    id={'copyHTML'}
                    label={'HTML'}
                />
            </div>
            <Overlay display={show} close={()=>setShow(false)} />
        </>,
        document.getElementById("portal")
    )
}

export default ShareMenu