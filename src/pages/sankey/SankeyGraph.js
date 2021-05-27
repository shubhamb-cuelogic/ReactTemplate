import React, { useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";
import chroma from "chroma-js";

const size = {
    width: 700,
    height: 600
};
const SankeyNode = ({ name, x0, x1, y0, y1, color }) => (
    <>
        <rect class="node" x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={color}>
            <title>{name}</title>
        </rect>
        <text
            x={x0 < size.width / 2 ? x1 + 6 : x0 - 6}
            y={(y1 + y0) / 2}
            style={{
                fill: d3.scaleOrdinal(d3.schemeCategory10),
                alignmentBaseline: "middle",
                fontSize: 9,
                textAnchor: x0 < size.width / 2 ? "start" : "end",
                pointerEvents: "none",
                userSelect: "none"
            }}
        >{name}
        </text>
    </>
)

const SankeyLink = ({ link, color }) => {


    return (
        < path
            className="link"
            d={sankeyLinkHorizontal()(link)
            }
            style={{
                fill: "none",
                strokeOpacity: ".3",
                stroke: color,
                strokeWidth: Math.max(1, link.width)
            }}
        >
            <title>{link.value}</title>
        </path>
    )
};

const SankeyGraph = ({ data, width, height }) => {
    const { nodes, links } = sankey()
        .nodeWidth(15)
        .nodePadding(10)
        .extent([[1, 1], [width - 10, height - 15]])(data);
    const color = chroma.scale("Set3").classes(nodes.length);
    const colorScale = d3
        .scaleLinear()
        .domain([0, nodes.length])
        .range([0, 1]);

    return (
        <g style={{ mixBlendMode: "multiply", margin: 20, padding: 20 }}>
            {nodes.map((node, i) => (
                <SankeyNode
                    {...node}
                    color={color(colorScale(i)).hex()}
                    key={node.name}
                />
            ))}
            {links.map((link, i) => (
                <SankeyLink
                    key={link.name}
                    link={link}
                    color={color(colorScale(link.source.index)).hex()}
                />
            ))}
        </g>
    );
};

export default SankeyGraph;
