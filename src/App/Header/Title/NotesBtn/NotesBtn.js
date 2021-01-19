import React from 'react'
import './NotesBtn.css'

const NotesBtn = ({onNotesBtnClick}) => {
    return(
        <button id="notesBtn" type={"button"} onClick={onNotesBtnClick} />
    );
}

export default NotesBtn;