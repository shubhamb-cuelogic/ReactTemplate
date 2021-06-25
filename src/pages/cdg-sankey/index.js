import React from 'react'
import data from './data.json'
import Sankey from './Sankey';
export default function SankeyParent() {
    const dataset = data;
    return (
        <div className="main">
            <Sankey data={dataset} />
        </div>
    )
}
