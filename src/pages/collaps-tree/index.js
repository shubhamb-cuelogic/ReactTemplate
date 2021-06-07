import React from 'react'
import data from './data.json'
import TreeGraph from './TreeGraph'
export default function TreeGraphParent() {
    return (
        <div>
            <TreeGraph data={data} />
        </div>
    )
}
