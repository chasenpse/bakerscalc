import React from 'react';
import './Title.css';
import NotesBtn from './NotesBtn/NotesBtn';
// import updateInputWidth from 'update-input-width';

const Title = ({onNotesBtnClick}) => {
    // const el = document.getElementById("formulaTitle");
    return (
        <div className={"title"}>
            <input id="formulaTitle" type={"text"} placeholder={"Untitled Formula"} />
            <NotesBtn onNotesBtnClick={onNotesBtnClick} />
        </div>
    )
}

export default Title;