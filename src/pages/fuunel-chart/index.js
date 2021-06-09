import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3';
import ReactDOM from "react-dom";

export default function FunnelChart() {
    const ref = useRef(null)
    const [index, setIndex] = useState(0);

    const dataset = [
        [
            { Stage: "Orignal", Amount: 1000, step: 1 },
            { Stage: "Qualified Prospects", Amount: 525, step: 2 },
            { Stage: "Needs Analysis", Amount: 200, step: 3 },
            { Stage: "Price quotes", Amount: 150, step: 4 },
            { Stage: "Negotiations", Amount: 20, step: 5 },
            { Stage: "Closed Sales", Amount: 10, step: 6 },

        ],
        [
            { Stage: "Open Source", Amount: 600, step: 1 },
            { Stage: "Process", Amount: 325, step: 2 },
            { Stage: "Good updates", Amount: 200, step: 3 },
            { Stage: "price upgrade", Amount: 50, step: 4 },
            { Stage: "Value Changes", Amount: 20, step: 5 },
            { Stage: "sell products", Amount: 1, step: 6 },
        ]
    ];




    const width = 800
    const height = 450
    const margin = { top: 30, right: 200, bottom: 30, left: 200 }
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const fullWidth = width + margin.left + margin.right + 200;
    const fullHeight = height + margin.top + margin.bottom;
    useEffect(() => {
        //d3.select(ref.current).remove();
        const domain = d3.extent(dataset[index].map(metric => metric.Amount));
        const xValues = dataset[index].map(metric => metric.Amount);
        const xScale = d3.scaleLog();//scaleLinear
        const range = [100, width];
        var div = d3.select('.bar-chart-container').append("div").attr("class", "barchart-toolTip");
        xScale.range(range);
        xScale.domain(domain);


        const domainY = dataset[index].map(metric => metric.Stage);
        const yValues = domainY;
        const yScale = d3.scaleBand();
        yScale.padding(0);
        const axisRange = [0, height];

        yScale.range(axisRange);
        yScale.domain(domainY);
        yScale.padding(0);

        const trapezoidGenerator = function trapezoidGenerator(xScale, xValues, yScale, yValues) {
            let trapezoidStart = 0;
            return xValues.map((value, index) => {
                const currentXValue = value;
                const nextXValue = index === xValues.length - 1 ? xScale.domain()[0] : xValues[index + 1];
                const longBaseLength = xScale(currentXValue);
                const shortBaseLength = xScale(nextXValue);
                const skew = (longBaseLength - shortBaseLength) / 2;
                const height = yScale.bandwidth();

                const x0 = trapezoidStart;
                const x1 = x0 + longBaseLength;
                const x2 = x1 - skew;
                const x3 = x0 + skew;

                const currentY = yScale(yValues[index]);

                const y0 = currentY + 60;
                const y1 = y0;
                const y2 = currentY + height;
                const y3 = y2;

                const lines = d3
                    .line()
                    .x(({ x }) => x)
                    .y(({ y }) => y);

                const pointsPath = lines([
                    {
                        x: x0,
                        y: y0
                    },
                    {
                        x: x1,
                        y: y1
                    },
                    {
                        x: x2,
                        y: y2
                    },
                    {
                        x: x3,
                        y: y3
                    }
                ]);

                trapezoidStart = x3;

                return {
                    pointsPath
                };
            });
        };


        const points = trapezoidGenerator(xScale, xValues, yScale, yValues);

        const trapezoidShape = d3
            .select(ref.current)
            .attr("viewBox", `0 0 ${fullWidth} ${fullHeight}`);
        //.attr('fill', 'hotpink')
        //.attr("transform", `translate(, 0)`)
        // trapezoidShape
        //     .selectAll('path')
        //     .data(points)
        //     .join('path')
        //     .attr('d', ({ pointsPath }) => pointsPath)
        //     .attr('fill','red')
        const chart = trapezoidShape.append("g")
            .classed("chart", true)
            .attr("transform", `translate(${fullWidth / 2}, 0)`)
            .style('background-color', 'red')


        const bars = chart.selectAll("rect.bar")
            .data(dataset[index])
            .join('rect')
            .classed("bar", true)
            .attr("fill", "darkblue")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", (d) => xScale(d.Amount))
            .attr('opacity', 0)
            .attr("transform", (d) => `translate(${-(xScale(d.Amount) / 2 + 20)}, 0)`)


        bars
            .data(dataset[index])
            .on('mouseover', function (event, d) {
                div.style("left", event.pageX + 30 + "px");
                div.style("top", event.pageY - 35 + "px");
                div.style("display", "inline-block");
                div.html((d.Stage) + "<br>" + (d.Amount) + "%");
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '.65')
            })
            .on("mouseout", function (d) {
                div.style("display", "none");
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1');
            })
            .on('click', () => setIndex(1))
            .transition()
            .attr("y", (d) => yScale(d.Stage))
            .attr("height", (d) => yScale.bandwidth() - 18)
            .duration(1000)
            .attr('opacity', 1)
            .delay((d, i) => (i * 1000) / 10)

        //.attr("transform", `translate(700, 0)`)
        const paths = trapezoidShape
            .selectAll('path')
            .data(points)
            .join('path')
            .attr('d', ({ pointsPath }) => pointsPath)
            .attr('fill', '#ADD8E6')
            .attr('opacity', 0)
        //.attr("transform", (d) => `translate(${(xScale(d.Amount) / 2)}, 0)`)

        paths
            .data(dataset[index])
            .attr("transform", `translate(280, 0)`)
            .transition()
            .duration(2000)
            .attr('opacity', 1)
            .delay((d, i) => (i * 2000) / 10)

        const labels = chart.selectAll("text.label")
            .data(dataset[index])
            .join("text")
            .classed("label", true)
            .transition()
            .attr('opacity', 0)
            .transition()
            .duration(1000)
            .attr('opacity', 1)
            .delay((d, i) => (i * 1000) / 10)
            .attr("y", (d) => yScale(d.Stage))
            .attr("dy", yScale.bandwidth() / 2)
            .attr("fill", "white")
            .style("font", "14px times")
            .attr("text-anchor", "middle")
            .text((d, i) => i !== 5 ? `${d.Stage} (${d.Amount})` : d.Amount)

        trapezoidShape.selectAll("text.pointer")
            .data(dataset[index])
            .join("text")
            .classed("pointer", true)
            .attr("x", 0)
            .attr("y", (d) => yScale(d.Stage))
            .attr("dy", (d) => yScale.bandwidth() / 2)
            .text((d) => `${d.Stage}`)
        //  trapezoidShape.enter().append("svg")
    }, [index])

    return (
        <div className="bar-chart-container">
            <svg ref={ref}></svg>
        </div>
    )
}


