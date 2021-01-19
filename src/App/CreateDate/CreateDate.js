import React from 'react';
import './CreateDate.css';

const CreateDate = ({ date }) => {
    const t = new Date(date);
    const stamp = new Date(t.getTime() - 1000 * 60 * t.getTimezoneOffset());
    return date ? <div className={"create-date"}>{`Created ${stamp.toLocaleString()}`}</div> : <div className={"create-date"} />;
}

export default CreateDate;