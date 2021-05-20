import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function PieChart(props) {

    const ref = useRef(null)
    useEffect(() => {


        var data = [10,22,12,7,10,5];

        // Selecting SVG using d3.select()
        var svg = d3.select(ref.current);

        let g = svg.append("g")
            .attr("transform", "translate(150,120)");

        // Creating Pie generator
        var pie = d3.pie();

        // Creating arc
        var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(100);

        // Grouping different arcs
        var arcs = g.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g");

        // Appending path 
        arcs.append("path")
            .attr("fill", (data, i) => {
                let value = data.data;
                return d3.schemeSet3[i];
            })
            .attr("d", arc)
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1');
                // div.transition()
                //     .duration('50')
                //     .style("opacity", 0);

            })

        arcs.append("text")
            .attr("transform", (d) => {
                return "translate(" +
                    arc.centroid(d) + ")";
            })
            .text(function (d) {
                return d.data;
            });
    }, [])

    return <svg ref={ref} width="800" height="400">
    </svg>;
}

export default PieChart;