import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3';

const data = [
    { name: "Product Revenue", value: 420000, start: 0, end: 420000, class: "positive" },
    { name: "Services Revenue", value: 210000, start: 420000, end: 630000, class: "positive" },
    { name: "Fixed Costs", value: -170000, start: 630000, end: 460000, class: "negative" },
    { name: "Variable Costs", value: -140000, start: 460000, end: 320000, class: "negative" },
    { name: "Total", end: 320000, start: 0, class: "total" }
]
const duration=1000;
export default function WaterFall() {
    const ref = useRef(null);
    const margin = {
        top: 10, right: 100, bottom: 30, left: 60
    }
    const width = 750
    const height = 400

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);


    useEffect(() => {
        var div = d3.select('.bar-chart-container').append("div").attr("class", "barchart-toolTip");
        const innerWidth = Math.abs(width - margin.left - margin.right);
        const innerHeight = Math.abs(height - margin.top - margin.bottom);

        const x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, innerWidth]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data.map(d => d.end))])
            .range([innerHeight, 0])
            .nice()

        const svg = d3.select(ref.current)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)


        svg.append('g')
            .attr("class", "x axis")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x))

        svg.append('g')
            .attr("class", "y axis")
            .call(d3.axisLeft(y))

        const chart = svg.select('g');

        const bar = svg
            .selectAll('.bar')
            .data(data)
            .enter().append("g")
            .attr("class", function (d) { return "bar " + d.class })
            .attr("transform", function (d) { return "translate(" + (x(d.name)) + ",0)"; });

        bar
            .append('rect')
            ///.attr('x', d => x(d.name))
            .style("fill", (d, i) => colorScale(i))
            .attr('width', d => x.bandwidth() / 2)
            .attr('height', d => 0)
            .attr('y', innerHeight)
            .attr('transform', `translate(${x.bandwidth() / 4},${0})`)
            .transition()
            .duration(duration)
            .delay((d, i) => (i * duration) / 10)
            .attr('y', d => y(Math.max(d.end, d.start)))
            .attr('height', d => Math.abs(y(d.start) - y(d.end)))


        bar
            .on("mouseover", function (d, i) {
                div.style("left", d.pageX + 10 + "px");
                div.style("top", d.pageY - 25 + "px");
                div.style("display", "inline-block");
                div.html((i.name) + "<br>" + (i.value ? i.value : i.end));
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '.85')
            })
            .on("mouseout", function (d) {
                div.style("display", "none");
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1');
            })


        bar
            .append('text')
            .transition()
            .attr('y', innerHeight)
            .attr('text-anchor', 'middle')
            .attr('x', x.bandwidth() / 2)
            .transition()
            .duration(duration)
            .delay((d, i) => (i * duration) / 10)
            .attr('y', d => y(d.end) - 10)
            .attr('x', d => x.bandwidth() / 2)
            .attr('text-anchor', 'middle')
            //.attr('transform', `translate(${x.bandwidth() / 4},${0})`)
            .attr('dy', '0.34em')
            .text(d => d.end - d.start)


        bar
            .filter(d => d.class !== 'total')
            .style("stroke-dasharray", ("3, 3"))
            .append('line')
            .attr('fill', 'red')
            .attr('class', 'connector')
            .transition()
            .attr('x1', x.bandwidth() / 2 + x.bandwidth() / 4)
            .attr('y1', d => innerHeight)
            .attr('stroke', 'black')
            .attr('x2', x.bandwidth() + x.bandwidth() / 4)
            .attr('y2', d => innerHeight)
            .transition()
            .duration(duration)
            .delay((d, i) => (i * duration) / 10)
            .attr('x1', x.bandwidth() / 2 + x.bandwidth() / 4)
            .attr('y1', d => y(d.end))
            .attr('stroke', 'black')
            .attr('x2', x.bandwidth() + x.bandwidth() / 4)
            .attr('y2', d => y(d.end))


        // const xAxis = d3.axisBottom()
        //     .scale(x)

        // chart
        //     // .selectAll('x.axis')

        //     // .data([null])
        //     // .join('g')
        //     // .classed("x axis", true)
        //     // .attr("transform", `translate(0,${innerHeight})`)
        //     .call(xAxis);

        // const yAxis = d3.axisBottom().ticks(5).scale(y);
        // chart
        //     .selectAll()
        //     .data([null])
        //     .join('g')
        //     .classed("y axis", true)
        //     .call(yAxis)


        // var margin = { top: 20, right: 30, bottom: 30, left: 40 },
        //     width = 960 - margin.left - margin.right,
        //     height = 500 - margin.top - margin.bottom,
        //     padding = 0.3;

        // var x = d3.scaleBand()
        //     .range([0, width])



        // var y = d3.scaleLinear()
        //     .range([height, 0]);

        // var xAxis = d3.axisBottom().scale(x)

        // var yAxis = d3.axisLeft().scale(y)


        // var chart = d3.select(ref.current)
        //     .attr("width", width + margin.left + margin.right)
        //     .attr("height", height + margin.top + margin.bottom)
        //     .append("g")
        //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // x.domain(data.map((d) => d.name));
        // y.domain([0, d3.max(data.map(d => d.end))])

        // chart.append("g")
        //     .attr("class", "x axis")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(xAxis);

        // chart.append("g")
        //     .attr("class", "y axis")
        //     .call(yAxis);

        // var bar = chart.selectAll(".bar")
        //     .data(data)
        //     .enter().append("g")
        //     .attr("class", function (d) { return "bar " + d.class })
        //     .attr("transform", function (d) { return "translate(" + x(d.name) + ",0)"; });

        // bar.append("rect")
        //     .attr("y", function (d) { return y(Math.max(d.start, d.end)); })
        //     .attr("height", function (d) { return Math.abs(y(d.start) - y(d.end)); })
        //     .attr("width", x.bandwidth());

    }, [])

    return (
        <div className="bar-chart-container">
            <svg ref={ref}></svg>
        </div>
    )
}
