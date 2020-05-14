import React from 'react';
import './Header.css';
import Title from './Title/Title';

const Header = () => {
    return (
        <header>
            <button id="openMenuBtn" type={"button"}>open</button>
            <Title />
            <button id="saveBtn" type={"button"}>save</button>
        </header>
    )
}

export default Header;