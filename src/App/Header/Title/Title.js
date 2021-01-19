import React from 'react';
import './Title.css';

const Title = ({title, handleTitleUpdate}) => {
    return (
        <input className="title" id="formulaTitle" type={"text"} value={title} placeholder={"Untitled Formula"} onChange={e=>handleTitleUpdate(e.target.value)} />
    )
}

export default Title;