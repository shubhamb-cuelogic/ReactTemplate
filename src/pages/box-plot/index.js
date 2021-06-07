import React, { useEffect, useRef } from 'react'
import data from './data.json'
import * as d3 from 'd3';

export default function BoxPlot() {

    const bins = d3.bin()
        .thresholds(10)
        .value(d => d.carat)
        (data)
        .map(bin => {
            bin.sort((a, b) => a.price - b.price);
            const values = bin.map(d => d.price);
            const min = values[0];
            const max = values[values.length - 1];
            const q1 = d3.quantile(values, 0.25);
            const q2 = d3.quantile(values, 0.50);
            const q3 = d3.quantile(values, 0.75);
            const iqr = q3 - q1; // interquartile range
            const r0 = Math.max(min, q1 - iqr * 1.5);
            const r1 = Math.min(max, q3 + iqr * 1.5);
            bin.quartiles = [q1, q2, q3];
            bin.range = [r0, r1];
            bin.outliers = bin.filter(v => v.y < r0 || v.y > r1); // TODO
            return bin;
        })
    console.log(data, bins)

    const ref = useRef(null);
    const margin = {
        top: 10, right: 100, bottom: 30, left: 60
    }

    const width = 900 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
        //     .append('g')
        //     .attr('transform', `translate(${margin.left},${margin.top})`)

        // const x = d3.scaleLinear()
        //     .domain([d3.min(bins, d => d.x0), d3.max(bins, d => d.x1)])
        //     .range([0, width]);

        // svg.append('g')
        //     .attr("transform", "translate(0," + 350 + ")")
        //     .call(d3.axisBottom(x))
        //     .attr('fill', 'red')


        // const y = d3.scaleLinear()
        //     .domain([d3.min(bins, d => d.range[0]), d3.max(bins, d => d.range[1])])
        //     .nice()
        //     .range([height, 0])

        // svg.append('g')
        //     .call(d3.axisLeft(y))
        const x = d3.scaleLinear()
            .domain([d3.min(bins, d => d.x0), d3.max(bins, d => d.x1)])
            .rangeRound([margin.left, width - margin.right])
            

        const y = d3.scaleLinear()
            .domain([d3.min(bins, d => d.range[0]), d3.max(bins, d => d.range[1])]).nice()
            .range([height - margin.bottom, margin.top])
        

        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null, "s"))
            .call(g => g.select(".domain").remove())

        const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(15).tickSizeOuter(0))

        const g = svg.append("g")
            .selectAll("g")
            .data(bins)
            .join("g");
        g.append("path")
            .attr("stroke", "currentColor")
            .attr("d", d => `
        M${x((d.x0 + d.x1) / 2)},${y(d.range[1])}
        V${y(d.range[0])}
      `);

        g.append("path")
            .attr("fill", "#ddd")
            .attr("d", d => `
        M${x(d.x0) + 1},${y(d.quartiles[2])}
        H${x(d.x1)}
        V${y(d.quartiles[0])}
        H${x(d.x0) + 1}
        Z
      `);

        g.append("path")
            .attr("stroke", "currentColor")
            .attr("stroke-width", 2)
            .attr("d", d => `
        M${x(d.x0) + 1},${y(d.quartiles[1])}
        H${x(d.x1)}
      `);

        g.append("g")
            .attr("fill", "currentColor")
            .attr("fill-opacity", 0.2)
            .attr("stroke", "none")
            .attr("transform", d => `translate(${x((d.x0 + d.x1) / 2)},0)`)
            .selectAll("circle")
            .data(d => d.outliers)
            .join("circle")
            .attr("r", 2)
            .attr("cx", () => (Math.random() - 0.5) * 4)
            .attr("cy", d => y(d.y));

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);


    })
    return (
        <div>
            <svg ref={ref}></svg>
        </div>
    )
}
