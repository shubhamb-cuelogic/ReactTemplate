import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3';
export default function StickeyForceGraph({ data }) {
    const ref = useRef(null);
    const width = 600;
    const height = 550;
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    useEffect(() => {
        draw()
    }, [])

    const draw = () => {
        const svg = d3.select(ref.current)
            .attr('viewBox', [0, 0, width, height]);

        //yield(svg.node());
        const link = svg.append('g')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .selectAll('.link')
            .data(data.links)
            .join('line')
            .classed('link', true)
            .attr('stroke-width', d => Math.sqrt(d.value));

        const node = svg.append('g')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1.5)
            .selectAll('.node')
            .data(data.nodes)
            .join('circle')
            .attr('r', 10)
            .classed('node', true)
            .classed('fixed', d => d.fx !== undefined)
            .attr('fill', (d, i) => colorScale(i));

        const simulation = d3.forceSimulation()
            .nodes(data.nodes)
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('link', d3.forceLink(data.links))
            .on('tick', tick)

        const drag = d3
            .drag()
            .on('start', dragStart)
            .on('drag', dragged)

        node.call(drag).on('click', click)

        node.append('title')
            .text(d => d.index)

        function tick() {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);
            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
        }
        function click(event, d) {
            delete d.fx;
            delete d.fy;
            d3.select(this).classed('fixed', false);
            simulation.alpha(1).restart();
        }
        function dragStart() {
            d3.select(this).classed('fixed', true);
        }

        function dragged(event, d) {
            d.fx = clamp(event.x, 0, width)
            d.fy = clamp(event.y, 0, height)
            simulation.alpha(1).restart()
        }


    }

    const clamp = (x, lo, hi) => {
        return x < lo ? lo : x > hi ? hi : x
    }
    
      

    return (
        <div>
            <svg ref={ref}></svg>
        </div>
    )
}
