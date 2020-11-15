import React from 'react';
import './DoughStatsList.css';
import DoughStat from './DoughStat/DoughStat';

const DoughStatsList = ({ data, units, precision }) => {
    const { totalWeight, ballWeight, totalPercent, totalFlour, hydration } = data;
    return (
        <div className={"dough-stats"}>
            <DoughStat title={"total weight"} value={totalWeight} units={units} precision={precision} />
            <DoughStat title={"ball weight"} value={ballWeight} units={units} precision={precision} />
            <DoughStat title={"total percent"} value={totalPercent} units={"%"} precision={precision} />
            <DoughStat title={"total flour"} value={totalFlour} units={"%"} precision={precision} />
            <DoughStat title={"hydration"} value={hydration} units={"%"} precision={precision} />
        </div>
    )
}

export default DoughStatsList;