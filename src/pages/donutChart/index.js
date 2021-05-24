import React, { useRef, useState } from 'react'
import * as d3 from 'd3';
import { create } from 'yup/lib/Reference';

export default function PiChart() {

    const [outer, setOuter] = useState(200)
    const generateData = (value, length = 5) =>
        d3.range(length).map((item, index) => ({
            date: index,
            value: value === null || value === undefined ? Math.random() * 100 : value
        }));

    const [dataSet, setData] = useState(generateData());

    const changeData = () => {
        setData(generateData());
    };

    var width = 960,
        height = 450,
        radius = Math.min(width, height) / 2;

    const ref = useRef(null);
    const createPie = d3
        .pie()
        .value(d => d.value)
        .sort(null);


    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const format = d3.format(".2f");

    // .domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
    // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    React.useEffect(() => {
        drawPieChart()
    }, [dataSet])
    const drawPieChart = () => {
        const data = createPie(dataSet);
        const group = d3.select(ref.current);

         
        const createArc = d3
            .arc()
            .innerRadius(radius-100)
            .outerRadius(radius-20)
        const groupWithData = group.selectAll("g.arc").data(data);

        groupWithData.exit().remove();

        const groupWithUpdate = groupWithData
            .enter()
            .append("g")
            .attr("class", "arc")


        const path = groupWithUpdate
            .append("path")
            .merge(groupWithData.select("path.arc"));

        path
            .attr("class", "arc")
            .attr("d", createArc)
            .attr("fill", (d, i) => colors(i))
            .on('mouseover', function (d, i) {
                setOuter(240);
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '.85');
                // div.transition()
                //     .duration(50)
                //     .style("opacity", 1);
                //     let num = (Math.round((d.value / d.data.all) * 100)).toString() + '%';
                //     div.html(num)
                //         .style("left", (d3.event.pageX + 10) + "px")
                //         .style("top", (d3.event.pageY - 15) + "px");
            })
            .on('mouseout', function (d, i) {
                setOuter(200)
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1');
                // div.transition()
                //     .duration('50')
                //     .style("opacity", 0);

            })
            .transition().delay(function (d, i) { return i * 10; }).duration(200)
            .attrTween('d', function (d) {
                var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
                return function (t) {
                    d.endAngle = i(t);
                    return createArc(d);
                }
            })
        const text = groupWithUpdate
            .append("text")
            .merge(groupWithData.select("text"));

        text
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("transform", d => `translate(${createArc.centroid(d)})`)
            .style("fill", "white")
            .style("font-size", 10)
            .text(d => format(d.value))

    }
    return (
        <>
            <div></div>
            <button onClick={changeData}>Change</button>
            <svg width="100%" height="100%" viewBox={(-width / 4) + ' ' + (-height / 10) + ' ' + width + ' ' + height}>
                <g
                    ref={ref}
                    transform={`translate(${200} ${200})`}
                />
            </svg>
        </>
    )
}
