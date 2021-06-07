import React, { useEffect, useRef, useState } from 'react'
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal, sankeyLeft, sankeyCenter, sankeyRight, sankeyJustify } from "d3-sankey";


let align = [sankeyCenter, sankeyRight, sankeyJustify, sankeyLeft];
const color = (value) => {
    return d3.interpolateRainbow(value);
}

export default function SankeyGradiant({ data }) {
    const ref = useRef(null);
    const [index, setIndex] = useState(0);

    const margin = {
        top: 1,
        right: 1,
        bottom: 6,
        left: 1
    }
    const duration = 250;
    const width = 960 - margin.left - margin.right
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
            top: 1,
            right: 1,
            bottom: 6,
            left: 1
        },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var formatNumber = d3.format(",.0f"),
            format = function (d) {
                return formatNumber(d) + " TWh";
            }


        const svg = d3.select(ref.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

        var div = d3.select('.bar-chart-container').append("div").attr("class", "barchart-toolTip");
        const defs = svg.append("defs");
        console.log(defs);
        const gradients = defs.selectAll("linearGradient")
            .data(links)
            .join("linearGradient")
            .attr("id", d => d.gradient.id)
        gradients.append("stop").attr("offset", 0.0).attr("stop-color", d => d.source.color);
        gradients.append("stop").attr("offset", 1.0).attr("stop-color", d => d.target.color);

        const view = svg.append("g")
            .classed("view", true)
            .attr("transform", `translate(${10}, ${10})`);

        const nodes1 = view.selectAll("rect.node")
            .data(nodes)
            .join("rect")
            .classed("node", true)
            .attr("id", d => `node-${d.index}`)
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => Math.max(1, d.y1 - d.y0))
            .attr("fill", d => d.color)
            .attr("opacity", 0.9)
            .call(d3.drag())
            .on('dragstart', () => this.parentNode.appendChild(this))
            .on('drag', dragmove)


        // nodes1.append("title").text(d => `${d.name}\n${format(d.value)}`);

        view.selectAll("text.node")
            .data(nodes)
            .join("text")
            .classed("node", true)
            .attr("x", d => d.x1)
            .attr("dx", 6)
            .attr("y", d => (d.y1 + d.y0) / 2)
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

        const links1 = view.selectAll("path.link")
            .data(links)
            .join("path")
            .classed("link", true)
            .attr("d", sankeyLinkHorizontal())
            .attr("stroke", "black")
            .attr("stroke-opacity", 0.1)
            .attr("stroke-width", d => Math.max(1, d.width))
            .attr("fill", "none");

        links1.append("title").text(d => `${d.source.name}  ${d.target.name}\n${format(d.value)}`);

        function setDash(link) {
            let el = view.select(`#${link.path.id}`);
            let length = el.node().getTotalLength();
            el.attr("stroke-dasharray", `${length} ${length}`)
                .attr("stroke-dashoffset", length);
        }

        const gradientLinks = view.selectAll("path.gradient-link")
            .data(links)
            .join("path")
            .classed("gradient-link", true)
            .attr("id", d => d.path.id)
            .attr("d", sankeyLinkHorizontal())
            .attr("stroke", d => d.gradient)
            .attr("stroke-opacity", 0)
            .attr("stroke-width", d => Math.max(1, d.width))
            .attr("fill", "none")
            .each(setDash);

        function branchAnimate(node) {
            let links = view.selectAll("path.gradient-link")
                .filter((link) => {
                    return node.sourceLinks.indexOf(link) !== -1;
                });
            let nextNodes = [];
            console.log(links);

            links.each((link) => {
                nextNodes.push(link.target);
            });

            links.attr("stroke-opacity", 0)
                .attr("stroke", node.color)
                .transition()
                .duration(duration)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0)
                .on("end", () => {
                    nextNodes.forEach((node) => {
                        branchAnimate(node);
                    });
                });
        }
        function branchClear() {
            gradientLinks.transition();
            gradientLinks.attr("stroke-opactiy", 0)
                .each(setDash);
        }

        nodes1.on("click", (e, d) => branchAnimate(d))
            .on("mouseover", function (d, i) {
                div.style("left", d.pageX + 10 + "px");
                div.style("top", d.pageY - 25 + "px");
                div.style("display", "inline-block");
                div.html((i.name) + "<br>" + (i.value) + "KWh");
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '.85')
            })
            .on("mouseout", () => {
                branchClear()
                div.style("display", "none");
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1');
            });

        function dragmove(event, d) {
            d3.select(this).attr("transform",
                "translate(" + (
                    d.x = Math.max(0, Math.min(width - d.dx, event.x))
                ) + "," + (
                    d.y = Math.max(0, Math.min(height - d.dy, event.y))
                ) + ")");
            sankey.relayout();
            links1.attr("d", gradientLinks);
        }

    }

    const { nodes, links } = sankey()
        .nodeAlign(sankeyCenter)
        .nodeWidth(15)
        .nodePadding(10)
        .extent([[1, 1], [width - 10, height - 15]])(data);;

    nodes.forEach((node) => {
        node.color = color(node.index / nodes.length);
    });





    links.forEach((link, index) => {
        link.gradient = { id: 'gradient-' + 100 + index }
        link.path = { id: 'path' + 1000 + index }
    });

    // console.log(nodes, links,align)

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
