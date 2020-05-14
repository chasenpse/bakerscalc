import React from 'react';
import './DoughStats.css';
import DoughStat from './DoughStat/DoughStat';

const DoughStats = ({ data, units }) => {
    const { totalWeight, ballWeight, totalPercent, hydration } = data;
    return (
        <div className={"dough-stats"}>
            <DoughStat title={"total weight"} value={totalWeight} units={units} />
            <DoughStat title={"ball weight"} value={ballWeight} units={units} />
            <DoughStat title={"total percent"} value={totalPercent} units={units} />
            <DoughStat title={"hydration"} value={hydration} units={units} />
        </div>
    )
}

export default DoughStats;