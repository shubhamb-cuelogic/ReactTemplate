import React, { useEffect, useRef } from 'react'
import data from './BirthDeath_pop_sort.json';
import * as d3 from 'd3';

export default function ScatterPlot() {
    const ref = useRef(null);
    const margin = {
        top: 10, right: 100, bottom: 30, left: 60
    }

    const width = 550 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    useEffect(() => {
        draw()
    }, [])

    const draw = () => {
        const svg = d3.select(ref.current)
            // .attr('width', width + margin.left + margin.right)
            // .attr('height', height + margin.top + margin.bottom)
            .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)


        const x = d3.scaleLinear()
            .domain([0, 0])
            .range([0, width])

        svg.append('g')
            .attr('class', 'myXaxis')
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .attr("opacity", 0)
        //y-axis
        const y = d3.scaleLinear()
            .domain([d3.min(data, d => d.death_rate) * 0.9, d3.max(data, d => d.death_rate)])
            .range([height, 0])
            .nice()

        svg.append('g')
            .call(d3.axisLeft(y))

        //add Dots
        svg.append("g")
            .attr("stroke-width", 1)
            //.attr("transform", "translate(0," + width / 2 + ")")
            .selectAll("circle")
            .data(data)
            .join("circle")

            .attr("fill", d => d.death_rate >= 12 ? "red" : "green")
            .attr("opacity", 0.75)
            .attr("cx", d => x(d.birth_rate))
            .attr("cy", d => y(d.death_rate))
            .attr("r", d => 6)
            .append('title')
            .text(d => d.country)
        //.attr("fill",'white')

        x.domain([0, d3.max(data, d => d.birth_rate)])
        svg.select('.myXaxis')
            .transition()
            .duration(2000)
            .attr('opacity', '1')
            .delay(300)
            //.attr('x', width)
            //.attr('transform', `translate(${-0},${width-20})`)
            .call(d3.axisBottom(x))

        svg.selectAll('circle')
            .transition()
            .duration(2000)
            .delay(300)
            //.ease("linear")
            //.attr('transition',`translate(${0},${width})`)
            .attr("cx", d => x(d.birth_rate))
            .attr("cy", d => y(d.death_rate))
            .attr("stroke-dashoffset", 0);

        // function calcLiner(data, x, y, minX, minY) {
        //     let n = data.length;
        //     let pts = [];
        //     data.forEach((d, i) => {
        //         var obj = {};
        //         obj.x = d["birth_rate"];

        //         obj.y = d["death_rate"];

        //         obj.mult = obj.x * obj.y;
        //         pts.push(obj)
        //     })

        //     let sum = 0;
        //     let xSum = 0;
        //     let ySum = 0;
        //     let sumSq = 0;

        //     pts.forEach((pt) => {
        //         sum = sum + pt.mult;
        //         xSum = xSum + pt.x;
        //         ySum = ySum + pt.y;
        //         sumSq = sumSq + (pt.x * pt.x);
        //     })

        //     let a = sum * n;
        //     var b = xSum * ySum;
        //     let c = sumSq * n;
        //     let d = xSum * xSum;

        //     let m = (a - b) / (c - d);

        //     let e = ySum;

        //     let f = m * xSum;

        //     var b = (e - f) / n;


        //     return {
        //         ptA: {
        //             x: minX,
        //             y: m * minX + b
        //         },
        //         ptB: {
        //             y: minY,
        //             x: (minY - b) / m
        //         }
        //     }

        // }

        // var lg = calcLiner(data, "x", "y", d3.min(data, d => d.birth_rate) * 0.9, d3.min(data, d => d.death_rate) * 0.9);

        // svg.append('line')
        //     .attr('class', "regression")
        //     .attr("x1", x(lg.ptA.x))
        //     .attr('y1', y(lg.ptA.y))
        //     .attr('x2', x(lg.ptB.x))
        //     .attr('y2', y(lg.ptB.y))
        //     .attr('stroke', 'red')
        //     .attr('stroke-width', 2)
        const XaxisDat = data.map((d) => d.birth_rate);
        const Yaxisdata = data.map((d) => d.death_rate);
        let regression = leastSquares(XaxisDat, Yaxisdata)
        function leastSquares(XaxisData, Yaxisdata) {
            var ReduceAddition = function (prev, cur) { return prev + cur; };

            // finding the mean of Xaxis and Yaxis data
            var xBar = XaxisData.reduce(ReduceAddition) * 1.0 / XaxisData.length;
            var yBar = Yaxisdata.reduce(ReduceAddition) * 1.0 / Yaxisdata.length;

            var SquareXX = XaxisData.map(function (d) { return Math.pow(d - xBar, 2); })
                .reduce(ReduceAddition);

            var ssYY = Yaxisdata.map(function (d) { return Math.pow(d - yBar, 2); })
                .reduce(ReduceAddition);

            var MeanDiffXY = XaxisData.map(function (d, i) { return (d - xBar) * (Yaxisdata[i] - yBar); })
                .reduce(ReduceAddition);

            var slope = MeanDiffXY / SquareXX;
            var intercept = yBar - (xBar * slope);

            // returning regression function
            return function (x) {
                return x * slope + intercept
            }

        }

        const line = d3.line()
            .x(d => x(d.birth_rate))
            .y(d => y(regression(d.birth_rate)))

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line)
            .attr('stroke', 'red')
            .attr('stroke-width', 2)

        svg.append("circle").attr("cx", 50).attr("cy", 30).attr("r", 6).style("fill", "red")
        svg.append("circle").attr("cx", 50).attr("cy", 50).attr("r", 6).style("fill", "green")
        svg.append("text").attr("x", 70).attr("y", 30).text("Death Ratio").style("font-size", "15px").attr("alignment-baseline", "middle")
        svg.append("text").attr("x", 70).attr("y", 50).text("Birth Ratio").style("font-size", "15px").attr("alignment-baseline", "middle")

    }

    return (
        <div>
            <svg ref={ref}></svg>
        </div>
    )
}
