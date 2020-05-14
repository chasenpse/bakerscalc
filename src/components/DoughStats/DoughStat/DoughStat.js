import React from 'react';

const DoughStat = ({title, value, units}) => {
    return (
        <div className={"dough-stat"}>
            <div className={"dough-stat__title"}>{title}</div>
            <div className={"dough-stat__value"}>{value}<span className={"dough-stat__units"}>{units}</span></div>
        </div>
    )
}

export default DoughStat;