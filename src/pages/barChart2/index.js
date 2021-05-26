import React, { Component } from 'react'
import * as d3 from 'd3';


const duration = 500;
export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.dataset = [100, 200, 300, 400, 500]
        this.width=750;
        this.height=550;
    }

    componentDidMount() {
        this.draw()
    }
    
    draw = () => {
        let size = 500;
        const margin = {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50,
        };

      
        const node = d3.select(this.myRef.current);
        
        const innerWidth = this.width - margin.left - margin.right;
        const innerHeight = this.height - margin.top - margin.bottom;

        node
            .attr('width', this.width)
            .attr('height',this.height)
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .append("g");

        const xScale = d3
            .scaleBand()
            .domain(this.dataset.map(d => d))
            .range([0, innerWidth]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(this.dataset, (d) => d)])
            .range([innerHeight, 0])

        const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

        const svg = d3.select(this.myRef.current)
        const chart = svg.select("g");


        chart.selectAll('.bar')
            .data(this.dataset)
            .join((enter) =>
                enter
                    .append('rect')
                    .classed("bar", true)
                    //.transition()
                    .attr("y", (d) => yScale(0))
                    .attr("height", 0)
                //.attr("opacity", 0)
            )
            .attr('x', (d, i) => xScale(d))
            .style("fill", (d, i) => colorScale(i))
            .attr('y', d => yScale(d))
            .attr('width', (d) => xScale.bandwidth())
            .attr('height', (d) => innerHeight - yScale(d))
            .transition()
            .duration(duration)
            //.attr("opacity", 1)
            .delay((d, i) => (i * duration) / 10)
        // .attr("transform", `translate(-50,${innerHeight / 2}) rotate(0)`)
        chart
            .selectAll(".bar-label")
            .data(this.dataset)
            .join((enter) =>
                enter
                    .append("text")
                    .classed("bar-label", true)
                    .attr("text-anchor", "middle")
                    .attr("dx", 0)
                    .attr("y", yScale(0))
                    .attr("dy", -6)
                    .attr("opacity", 0)
            )
            .attr("x", (d) => xScale(d) + xScale.bandwidth() / 2)
            .text((d) => d)
            .transition()
            .duration(duration)
            .delay((d, i) => (i * duration) / 10)
            .attr("opacity", 1)
            .attr("y", (d) => yScale(d));


        const xAxis = d3.axisBottom().scale(xScale);

        chart
            .selectAll(".x.axis")
            .data([null])
            .join("g")
            .classed("x axis", true)
            .attr("transform", `translate(0,${innerHeight})`)
            .transition()
            .duration(duration)
            .call(xAxis);

        const yAxis = d3.axisLeft().ticks(5).scale(yScale);

        chart
            .selectAll(".y.axis")
            .data([null])
            .join("g")
            .classed("y axis", true)
            .attr("transform", "translate(0,0)")
            //.transition()
            // .duration(duration)
            .attr("opacity", 1)
            .call(yAxis);

        chart
            .selectAll(".x-axis-title")
            .data(["y-axis-title"])
            .join("text")
            .classed("x-axis-title", true)
            .attr("x", innerWidth / 2)
            .attr('y', innerHeight + 60)
            .attr("fill", "#000")
            .style("font-size", "20px")
            .style("text-anchor", "middle")
            .attr("transform", `translate(-50,${innerHeight / 2}) rotate(-90)`)
            .text((d) => d);

        chart
            .selectAll(".y-axis-title")
            .data(["yaxis"])
            .join("text")
            .classed("y-axis-title", true)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(-50,${innerHeight / 2}) rotate(-90)`)
            .attr("fill", "#000")
            .style("font-size", "20px")
            .style("text-anchor", "middle")
            .text((d) => d);
        // svg.selectAll('text')
        //     .data(this.dataset)
        //     .enter()
        //     .append('text')
        //     .text((d) => d)
        //     .attr('x', (d, i) => 5 + i * (rect_width + 25))
        //     .attr('y', d => size - d - 10)


    }

    render() {
        return (
            <div className="barchart-container" >
                <svg viewBox={'0 0 ' + this.width + ' ' + this.height} style={{ width: '100%', height: '100%' }} ref={this.myRef}></svg>
            </div>
        );
    }
}
