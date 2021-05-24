import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';


function LineChart(props) {
    const ref = useRef(null);
    const { data } = props;

    useEffect(() => {
        drawChart();
    }, [data]);

    useEffect(() => {
        window.addEventListener("resize", drawChart);
        drawChart();
        return () => window.removeEventListener("resize", drawChart)
    }, []);

    const drawChart = () => {
        d3.select('#container')
            .select('svg')
            .remove();
        d3.select('#container')
            .select('.tooltip')
            .remove();
        // Add logic to draw the chart here
        const margin = { top: 50, right: 10, bottom: 50, left: 20 };
        const yMinValue = d3.min(data, d => d.value);
        const yMaxValue = d3.max(data, d => d.value);
        const xMinValue = d3.min(data, d => d.label);
        const xMaxValue = d3.max(data, d => d.label);

        const svg = d3
            .select('#container')
            .append('svg')
        //     .select(ref.current)
        const bounds = ref.current ? svg.node().getBoundingClientRect() : { width: 0, height: 0 };
        const width = Math.abs(bounds.width);
        const height = Math.abs(bounds.height);


        svg
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);


        const xScale = d3
            .scaleLinear()
            .domain([xMinValue, xMaxValue])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .range([height, 0])
            .domain([0, yMaxValue]);

        const line = d3
            .line()
            .x(d => xScale(d.label))
            .y(d => yScale(d.value))
            .curve(d3.curveMonotoneX);

        svg
            .append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(0,${height})`)
            .call(
                d3.axisBottom(xScale)
                    .tickSize(-height)
                    .tickFormat(''),
            );
        svg
            .append('g')
            .attr('class', 'grid')
            .call(
                d3.axisLeft(yScale)
                    .tickSize(-width)
                    .tickFormat(''),
            );
        svg
            .append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom().scale(xScale).tickSize(15));
        svg
            .append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(yScale));
        svg
            .append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#f6c3d0')
            .attr('stroke-width', 4)
            .attr('class', 'line')
            .attr('d', line);

        const focus = svg
            .append('g')
            .attr('class', 'focus')
            .style('display', 'none');
        focus.append('circle').attr('r', 5).attr('class', 'circle');
        const tooltip = d3
            .select('#container')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        svg
            .append('rect')
            .attr('class', 'overlay')
            .attr('width', width)
            .attr('height', height)
            .style('opacity', 0)
            .on('mouseover', () => {
                focus.style('display', null);
            })
            .on('mouseout', () => {
                tooltip
                    .transition()
                    .duration(300)
                    .style('opacity', 0);
            })
            .on('mousemove', mousemove);

        function mousemove(event) {
            const bisect = d3.bisector(d => d.label).left;
            const xPos = d3.pointer(this)[0];
            const x0 = bisect(data, xScale.invert(xPos));
            const d0 = data[x0];
            // focus.attr(
            //     'transform',
            //     `translate(${xScale(d0.label)},${yScale(d0.value)})`,
            // );
            tooltip
                .transition()
                .duration(300)
                .style('opacity', 0.9);
            tooltip
                .html(d0.tooltipContent || d0.label)
                .style(
                    'transform',
                    `translate(${xScale(d0.label) + 30}px,${yScale(d0.value) - 30}px)`,
                );
        }
    }
    return <div ref={ref} id="container" style={{ width: '100%', height: '100%' }} />;
}

export default LineChart;