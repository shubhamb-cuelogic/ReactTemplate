import * as d3 from "d3";
import React, { useRef, useEffect, useState } from "react";
import { Button } from 'semantic-ui-react'
const duration = 500;
function BarChart({ width, height, data, yAxisTitle }) {
  const ref = useRef();
  const margin = {
    top: 60,
    bottom: 60,
    left: 60,
    right: 100,
  };



  useEffect(() => {
    draw();
  }, [data]);

  const draw = () => {
    const node = d3.select(ref.current);

    const innerWidth = Math.abs(width - margin.left - margin.right);
    const innerHeight = Math.abs(height - margin.top - margin.bottom);
    var div = d3.select('.bar-chart-container').append("div").attr("class", "barchart-toolTip");
    node
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.year))
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([innerHeight, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select(ref.current);
    const chart = svg.select("g");

    chart
      .selectAll(".bar")
      .data(data)
      .join((enter) =>
        enter
          .append("rect")
          .classed("bar", true)
          .attr("y", (d) => yScale(0))
          .attr("height", 0)
          .on("mouseover", function (d, i) {
            div.style("left", d.pageX + 10 + "px");
            div.style("top", d.pageY - 25 + "px");
            div.style("display", "inline-block");
            div.html((i.year) + "<br>" + (i.value) + "%");
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
      )
      .attr("x", (d) => xScale(d.year))
      .style("fill", (d, i) => colorScale(i))
      .attr("width", (d) => xScale.bandwidth() - 10)
      .transition()
      .duration(duration)
      .delay((d, i) => (i * duration) / 10)
      .attr("height", (d) => innerHeight - yScale(d.value))
      .attr("y", (d) => yScale(d.value))



    chart
      .selectAll(".bar-label")
      .data(data)
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
      .attr("x", (d) => xScale(d.year) + xScale.bandwidth() / 2)
      .text((d) => d.value)
      .transition()
      .duration(duration)
      .delay((d, i) => (i * duration) / 10)
      .attr("opacity", 1)
      .attr("y", (d) => yScale(d.value));



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
      .transition()
      .duration(duration)
      .call(yAxis);

    chart
      .selectAll(".x-axis-title")
      .data(["Year"])
      .join("text")
      .classed("x-axis-title", true)
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 60)
      .attr("fill", "#000")
      .style("font-size", "20px")
      .style("text-anchor", "middle")
      .text((d) => d);

    chart
      .selectAll(".y-axis-title")
      .data([yAxisTitle])
      .join("text")
      .classed("y-axis-title", true)
      .attr("x", 0)
      .attr("y", 0)
      .attr("transform", `translate(-50, ${innerHeight / 2}) rotate(-90)`)
      .attr("fill", "#000")
      .style("font-size", "20px")
      .style("text-anchor", "middle")
      .text((d) => d);

    var legend = node.selectAll(".legend")
      .data(data)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
      .attr("x", width - 40)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d, i) => colorScale(i));

    legend.append("text")
      .attr("x", width - 10)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function (d) { return d.year; });
  };

  return (
    <div className="bar-chart-container">
      <svg viewBox={'0 0 ' + width + ' ' + height} style={{ width: '100%', height: '100%' }} ref={ref}></svg>
    </div>
  );
}

export default BarChart;