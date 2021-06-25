import React, { useEffect, useRef, useState } from 'react'
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal, sankeyLeft, sankeyCenter, sankeyRight, sankeyJustify, } from "d3-sankey";


let align = [sankeyCenter, sankeyRight, sankeyJustify, sankeyLeft];
const color = (value) => {
    return d3.interpolateRainbow(value);
}

export default function Sankey({ data }) {
    const ref = useRef(null);
    const [index, setIndex] = useState(0);
    let updated = [];
    let types = ["Search", "Social Media", "Brand.com", "Product Page", "Retailer", "Conversions"];

    const getYLocation = (type) => {
        let total = 450;
        let value = total / types.length;
        let sum = 0;
        let setIndex = 0;
        updated = types.map((ty, index) => {
            sum = index === 0 ? 0 : value + sum;
            if (ty === type) setIndex = index
            return sum + 30
        })
        console.log(updated)
        return setIndex
    }


    const margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    }
    const duration = 250;
    const width = 800 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom;

    const formatNumber = d3.format(",.0f"),
        format = function (d) {
            return formatNumber(d) + " TWh";
        }

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    useEffect(() => {
        draw()
    }, [])

    const draw = () => {
        var margin = {
            top: 10,
            right: 100,
            bottom: 10,
            left: 50
        },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var formatNumber = d3.format(",.0f"),
            format = function (d) {
                return formatNumber(d) + " TWh";
            }


        const svg = d3.select(ref.current)
            .attr('viewBox', `0 0 ${width} ${height}`)
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)

        var div = d3.select('.bar-chart-container').append("div").attr("class", "barchart-toolTip");
        const defs = svg.append("defs");
        // const gradients = defs.selectAll("linearGradient")
        //     .data(links)
        //     .join("linearGradient")
        //     .attr("id", d => d.gradient.id)
        // gradients.append("stop").attr("offset", 0.0).attr("stop-color", d => d.source.color);
        // gradients.append("stop").attr("offset", 1.0).attr("stop-color", d => d.target.color);

        const view = svg.append("g")
            .classed("view", true)
            .attr("transform", `translate(${100}, ${10})`);

        const view2 = svg.append('g')
            .attr("transform", `translate(${0}, ${10})`);

        const nodes1 = view.selectAll('circle.node')
            .data(nodes)
            .join("circle")
            .attr("fill", d => d.color)
            .transition()
            .delay(200)
            .attr("opacity", 0)
            .attr("cx", d => (d.x0 + d.x1) / 2)
            .attr("cy", function (d) {
                return updated[getYLocation(d.type)]
            })
            .attr("r", d => Math.max(5, d.y1 - d.y0) / 10)
            .transition()
            .delay(200)
            .attr("opacity", 1)
            .attr("cx", d => (d.x0 + d.x1) / 2)
            .attr("cy", function (d) {
                return updated[getYLocation(d.type)]
            })
            .attr("r", d => Math.max(5, d.y1 - d.y0) / 10)


        view2.selectAll("text.pointer")
            .data(types)
            .join("text")
            .classed("pointer", true)
            .attr('opacity', 0)
            .attr("x", 0)
            .attr("y", (d) => updated[getYLocation(d)])
            //.attr("dy", (d) => yScale.bandwidth() / 2)
            .transition()
            .duration(2000)
            .delay((d, i) => (i * 2000) / 10)
            .attr('opacity', 1)
            .text((d) => `${d}`)

        view.selectAll("text.node")
            .data(nodes)
            .join("text")
            .classed("node", true)
            .attr("x", d => d.x1)
            .attr("dx", 6)
            .attr("y", (d, i) => i === 0 ? updated[4] : updated[getYLocation(d.type)])
            .attr("dy", "0.35em")
            .attr("fill", "black")
            .attr("text-anchor", "start")
            .attr("font-size", 10)
            .attr("font-family", "Arial, sans-serif")
            .text(d => d.name)
            .filter(d => d.x1 > width / 2)
            .attr("x", d => d.x0)
            .attr("dx", -6)
            .attr("text-anchor", "end");



        function link(d) {
            var curvature = .6;
            var x0 = (d.source.x0 + d.source.x1) / 2,
                x1 = (d.target.x1 + d.target.x0) / 2,
                xi = d3.interpolateNumber(x0, x1),
                x2 = xi(curvature),
                x3 = xi(1 - curvature),
                y0 = updated[getYLocation(d.source.type)],
                y1 = updated[getYLocation(d.target.type)]

            return "M" + x0 + "," + y0
                + "C" + x2 + "," + y0
                + " " + x3 + "," + y1
                + " " + x1 + "," + y1
                + "L" + x1 + "," + (y1)
                + "C" + x3 + "," + (y1)
                + " " + x2 + "," + (y0)
                + " " + x0 + "," + (y0)
                + "L" + x0 + "," + y0;
        }
        const links1 = view.selectAll("path.link")
            .data(links)
            .join("path")
            .classed("link", true)
            //.attr("id", d => console.log(d))
            .attr("d", d => link(d))
            .attr("stroke", d => 'green')
            .attr("stroke-opacity", 1)
            .attr("stroke-width", d => Math.sqrt(Math.max(1, d.width)))
            .attr("fill", "red")



        links1.append("title").text(d => `${d.source.name}  ${d.target.name}\n${format(d.value)}`);

        links1
            .data(links)
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .transition()
                    .attr('opacity', '2')
                    .attr('fill', 'red')
                    .attr('stroke', 'gold')
            })
            .on("mouseout", () => {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1');
            });

        // nodes1.on("click", (e, d) => branchAnimate(d))
        //     .on("mouseover", function (d, i) {
        //         div.style("left", d.pageX + 10 + "px");
        //         div.style("top", d.pageY - 25 + "px");
        //         div.style("display", "inline-block");
        //         div.html((i.name) + "<br>" + (i.value) + "KWh");
        //         d3.select(this).transition()
        //             .duration('50')
        //             .attr('opacity', '.85')
        //     })
        //     .on("mouseout", () => {
        //         branchClear()
        //         div.style("display", "none");
        //         d3.select(this).transition()
        //             .duration('50')
        //             .attr('opacity', '1');
        //     });
    }

    const { nodes, links } = sankey()
        //.nodeAlign(sankeyCenter)
        .nodeWidth(20)
        .nodePadding(10)
        .extent([[1, 1], [width - 100, height - 30]])(data);;

    nodes.forEach((node) => {
        node.color = color(node.index / nodes.length);
    });

    links.forEach((link, index) => {
        link.gradient = { id: 'gradient-' + 100 + index }
        link.path = { id: 'path' + 1000 + index }

    });
    console.log(nodes, links)

    return (
        <div className="bar-chart-container">
            {/* <select  onChange={(e) => setIndex(e.target.value)}>
                <option value={0}>select</option>
                <option value={1}>Center</option>
                <option value={2}>Left</option>
                <option value={3}>Right</option>
                <option value={0}>Justify</option>
            </select> */}
            <svg viewBox={'0 0 ' + width + ' ' + height} ref={ref}></svg>
        </div>
    )
}
