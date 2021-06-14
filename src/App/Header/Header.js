import React from 'react';
import './Header.css';
import Title from './Title/Title';
import OpenMenuBtn from "./OpenMenuBtn/OpenMenuBtn";
import SaveBtn from "./SaveBtn/SaveBtn";
import ShareBtn from "./ShareBtn/ShareBtn";

const Header = ({onMenuBtnClick, handleTitleUpdate, onSaveBtnClick, onShareBtnClick, title}) => {
    return (
        <header>
            <div className={"headerBtnContainer"}>
                <OpenMenuBtn onMenuBtnClick={onMenuBtnClick} />
            </div>
            <Title title={title} handleTitleUpdate={handleTitleUpdate} />
            <div className={"headerBtnContainer"}>
                <ShareBtn onShareBtnClick={onShareBtnClick} />
                <SaveBtn onSaveBtnClick={onSaveBtnClick} />
            </div>
        </header>
    )
}

export default Header;