import React from 'react'
import * as d3 from "d3";

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const Path = d3.select("Path")
//     .attr("fill", (d, i) => colorScale(i))
// console.log(Path)

const Arc = ({ arcData }) => {
    const [rediusAdd, setRediousAdd] = React.useState(0);

    const mouseOver = () => {
        setRediousAdd(15)
    }
    const mouseOut = () => {
        setRediousAdd(0)
    }

    const arc = d3.arc()
        .innerRadius(15+ rediusAdd)
        .outerRadius(105 + rediusAdd);
    return <path stroke="black" cursor="pointer" fill={d3.schemeSet3[arcData.data.index]} d={arc(arcData)} onMouseOver={mouseOver} onMouseOut={mouseOut} />
}


export default function DrillDownPieChart({ data, x, y }) {
    const pie = d3.pie().value(d => d.value)

    return (
        <g transform={`translate(${x},${y})`}>
            {pie(data).map(d => (
                <Arc arcData={d} key={d.index} />
            ))}
        </g>
    )
}
