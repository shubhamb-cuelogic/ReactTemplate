import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3';
export default function ForceGraph({ data }) {
    const ref = useRef();
    const width = 700;
    const height = 550;


    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    useEffect(() => {
        //data.links.map(d => console.log(Object.create(d)))
        draw();

    }, [data])
    const draw = () => {
        function drag(simulation) {

            function dragstarted(event) {
                if (event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }
            function dragged(event) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }
            function dragended(event) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }

            return d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended)
        }


        const links = data.links.map(d => Object.create(d));
        const nodes = data.nodes.map(d => Object.create(d));

        const simulation = d3.forceSimulation(data.nodes)
            .force("link", d3.forceLink(data.links).id(d => d.id))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 2, height / 2))

        const svg = d3.select(ref.current)
            .attr("viewBox", [0, 0, width, height]);


        const link = svg.append('g')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .selectAll('line')
            .data(data.links)
            .join('line')
            .attr('stroke-width', d => Math.sqrt(d.value));

        const node = svg.append('g')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.5)
            .selectAll('circle')
            .data(data.nodes)
            .join('circle')
            .attr('r', 5)
            .attr('fill', (d, i) => colorScale(d.group))
            
            node
            .call(drag(simulation))
             

        node.append('title')
            .text(d => d.id)

        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
        })

       // invalidation.then(() => simulation.stop());

    }


    return (
        <div>
            <svg ref={ref}></svg>
        </div>
    )
}
