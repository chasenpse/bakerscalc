import React from 'react';
import './DoughStat.css';

const DoughStat = ({title, value, units, precision}) => {
    return (
        <div className={"dough-stat"}>
            <div className={"dough-stat__title"}>{title}</div>
            <div className={"dough-stat__value"}>{Number(value.toFixed(precision))}<span className={"dough-stat__units"}>{units}</span></div>
        </div>
    )
}

export default DoughStat;