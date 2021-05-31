import React from 'react'
import data from './data.json'
import SankeyGradiant from './SankeyGradiant';
export default function SankeyGradiantParent() {
    const dataset = data;
    return (
        <div className="main">
            <SankeyGradiant data={dataset} />
        </div>
    )
}
