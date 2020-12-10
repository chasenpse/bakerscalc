import React from 'react';
import './Header.css';
import Title from './Title/Title';
import OpenMenuBtn from "./OpenMenuBtn/OpenMenuBtn";
import SaveBtn from "./SaveBtn/SaveBtn";

const Header = ({onMenuBtnClick, handleTitleUpdate, onSaveBtnClick, title}) => {
    return (
        <header>
            <OpenMenuBtn onMenuBtnClick={onMenuBtnClick} />
            <Title title={title} handleTitleUpdate={handleTitleUpdate} />
            <SaveBtn onSaveBtnClick={onSaveBtnClick} />
        </header>
    )
}

export default Header;