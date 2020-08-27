import React from 'react';
import './Header.css';
import Title from './Title/Title';
import OpenMenuBtn from "./OpenMenuBtn/OpenMenuBtn";
import SaveBtn from "./SaveBtn/SaveBtn";

const Header = ({onMenuBtnClick, onNotesBtnClick, onSaveBtnClick}) => {
    return (
        <header>
            <OpenMenuBtn onMenuBtnClick={onMenuBtnClick} />
            <Title onNotesBtnClick={onNotesBtnClick} />
            <SaveBtn onSaveBtnClick={onSaveBtnClick} />
        </header>
    )
}

export default Header;