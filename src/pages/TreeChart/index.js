import React from 'react'
import * as d3 from 'd3';
import data from './data.json'
import { zoom } from 'd3';
export default function TreeComponent() {
    const ref = React.useRef(null);


    React.useEffect(() => {
        const svg = d3.select(ref.current);
        const margin = { top: 0, right: 50, bottom: 0, left: 50 }
        const innerWidth = 700 - margin.left - margin.right;
        const innerHeight = 500 - margin.top - margin.bottom;
        const treeLayout = d3.tree()
            .size([innerHeight, innerWidth]);

        const g = svg
            .attr('width', 800)
            .attr('height', 600)
            .append('g')
            .attr('transform', 'translate(`${margin.left},${margin.top}`)')

        svg.call(d3.zoom().on('zoom', (event) => {
            g.attr('transform', event.transform)
        }))
        // svg.append('rect')
        //     .attr('width', 750)
        //     .attr('height', 550)
        //     .attr('rx', 40)


        // d3.json(data)
        //     .then((data) => {
        const root = d3.hierarchy(data);
        const links = treeLayout(root).links();
        const linkPathGenerator = d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x);

        g.selectAll('path').data(links)
            .enter().append('path')
            .style('fill', 'none')
            .style('stroke', 'rgb(157 165 193 / 4)')
            .attr('class', 'link')
            .attr('d', linkPathGenerator);
        // })
        g.selectAll('text')
            .data(root.descendants())
            .enter()
            .append('text')
            .attr('x', d => d.y)
            .attr('y', d => d.x)
            .attr('dy', '0.32em')
            .text('text-anchor', d => d.children ? 'middle' : 'start')
            .attr('font-size', d => 3.1 - d.depth + 'em')
            .style('text-shadow', '-1px -1px 3px black')
            .text(d => d.data.data.id)

    }, [])


    return (
        <div>
            <svg ref={ref} width="800" height="600"></svg>
        </div>
    )
}
