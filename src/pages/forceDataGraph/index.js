import React from 'react';
import data from './data.json';
import ForceGraph from './ForceGraph';
 

function ForceGraphParent() {

  return (
    <div className="App">
      Force Graph Example
      <ForceGraph  data={data} />
    </div>
  );
}

export default ForceGraphParent;