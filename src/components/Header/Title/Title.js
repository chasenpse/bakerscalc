import React from 'react';
import './Title.css';
// import updateInputWidth from 'update-input-width';

const Title = ({onNotesBtnClick}) => {
    // const el = document.getElementById("formulaTitle");
    return (
        <input className="title" id="formulaTitle" type={"text"} placeholder={"Untitled Formula"} />
    )
}

export default Title;