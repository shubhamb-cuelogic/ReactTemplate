import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function PieChart(props) {

    const ref = useRef(null)
    useEffect(() => {


        // var data = [10,22,12,7,10,5];

        // // Selecting SVG using d3.select()
        // var svg = d3.select(ref.current);

        // let g = svg.append("g")
        //     .attr("transform", "translate(150,120)");

        // // Creating Pie generator
        // var pie = d3.pie();

        // // Creating arc
        // var arc = d3.arc()
        //     .innerRadius(0)
        //     .outerRadius(100);

        // // Grouping different arcs
        // var arcs = g.selectAll("arc")
        //     .data(pie(data))
        //     .enter()
        //     .append("g");

        // // Appending path 
        // arcs.append("path")
        //     .attr("fill", (data, i) => {
        //         let value = data.data;
        //         return d3.schemeSet3[i];
        //     })
        //     .attr("d", arc)
        //     .on('mouseout', function (d, i) {
        //         d3.select(this).transition()
        //             .duration('50')
        //             .attr('opacity', '1');
        //         // div.transition()
        //         //     .duration('50')
        //         //     .style("opacity", 0);

        //     })

        // arcs.append("text")
        //     .attr("transform", (d) => {
        //         return "translate(" +
        //             arc.centroid(d) + ")";
        //     })
        //     .text(function (d) {
        //         return d.data;
        //     });
        var dataset = {
            apples: [53245, 28479, 19697, 24037, 40245],
            oranges: [200, 200, 200, 200]
        };
    
        var width = 960,
          height = 500,
          radius = Math.min(width, height) / 2;
    
        var enterClockwise = {
            startAngle: 0,
            endAngle: 0
        };
    
        var enterAntiClockwise = {
            startAngle: Math.PI * 2,
            endAngle: Math.PI * 2
        };
    
        var color = d3.scaleOrdinal(d3.schemeCategory10);
    
        var pie = d3.pie()
          .sort(null);
    
        var arc = d3.arc()
          .innerRadius(radius - 100)
          .outerRadius(radius - 20);
    
        var svg = d3.select(ref.current)
             .attr('id', 'Donut-chart-render')
             .attr("width", '100%')
             .attr("height", '100%')
             .attr('viewBox', (-width / 2) + ' ' + (-height / 2) + ' ' + width + ' ' + height)
             .attr('preserveAspectRatio', 'xMinYMin')
    
        var path = svg.selectAll("path")
          .data(pie(dataset.apples))
          .enter().append("path")
            .attr("fill", function (d, i) { return color(i); })
            .attr("d", arc(enterClockwise))
            .each(function (d) {
                this._current = {
                    data: d.data,
                    value: d.value,
                    startAngle: enterClockwise.startAngle,
                    endAngle: enterClockwise.endAngle
                }
            })
            .text(d => (d.value));

    
        path.transition()
            .duration(750)
            .attrTween("d", arcTween);

    
        d3.selectAll("input").on("change", change);
    
        var timeout = setTimeout(function () {
            d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
        }, 2000);
    
        function change() {
            clearTimeout(timeout);
            path = path.data(pie(dataset[this.value]));
            path.enter().append("path")
                .attr("fill", function (d, i) {
                    return color(i);
                })
                .attr("d", arc(enterAntiClockwise))
                .each(function (d) {
                    this._current = {
                        data: d.data,
                        value: d.value,
                        startAngle: enterAntiClockwise.startAngle,
                        endAngle: enterAntiClockwise.endAngle
                    };
                }); // store the initial values
    
            path.exit()
                .transition()
                .duration(750)
                .attrTween('d', arcTweenOut)
                .remove() // now remove the exiting arcs
    
            path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
        }
    
        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function (t) {
                return arc(i(t));
            };
        }
        function arcTweenOut(a) {
            var i = d3.interpolate(this._current, { startAngle: Math.PI * 2, endAngle: Math.PI * 2, value: 0 });
            this._current = i(0);
            return function (t) {
                return arc(i(t));
            };
        }
    
    
        function type(d) {
            d.value = +d.value;
            return d;
        }
    
    }, [])

    return <svg ref={ref} width="800" height="400">
    </svg>;
}

export default PieChart;