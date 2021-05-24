import React from 'react';
import * as d3 from "d3";
import faker from 'faker';
import DrillDownPieChart from './DrillDownPieChart'
import './DrillDownPieChart.css';


export default function DrillDownpieChartParent() {
    const generateData = (level) => {
        const n = d3.randomUniform(1, 10)();
        return d3.range(n).map((i) => ({
            value: Math.abs(d3.randomNormal()()),
            id:`${level}-${i}`,
            level,
            index:i,
            name:faker.internet.userName(),
            children: level > 0 ? generateData(level - 1) : []
        }
        )
        )
    }
    const data = generateData(3);
     
    return (
        <svg width="500" height="400">
            <DrillDownPieChart data={data} x={250} y={250} />
        </svg>
    )
}
