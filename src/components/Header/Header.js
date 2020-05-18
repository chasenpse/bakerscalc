import React from 'react';
import './Header.css';
import Title from './Title/Title';
import OpenMenuBtn from "./OpenMenuBtn/OpenMenuBtn";
import SaveBtn from "./SaveBtn/SaveBtn";

const Header = ({onMenuBtnClick, onNotesBtnClick, onSaveBtnClick}) => {
    return (
        <header>
            <OpenMenuBtn handler={onMenuBtnClick} />
            <Title onNotesBtnClick={onNotesBtnClick} />
            <SaveBtn />
        </header>
    )
}

export default Header;