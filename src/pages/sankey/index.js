import React from "react";

import * as d3 from "d3";
import data from './data.json';
import SankeyGraph from "./SankeyGraph";

class SankeyParent extends React.Component {
  state = { data: null, width: 0, height: 0 };
  svgRef = React.createRef();

  componentDidMount() {

    this.setState({ data })

    this.measureSVG();

  }



  measureSVG = () => {
    const { width, height } = this.svgRef.current.getBoundingClientRect();

    this.setState({
      width,
      height
    });
  };

  render() {
    const { data, width, height } = this.state;

    return (
      <div className="App">
        <h1>Sankey diagram</h1>
        <svg viewBox={`0 0 ${800} ${500}`} ref={this.svgRef}>
          {data && (
            <SankeyGraph data={data} width={800} height={500} />
          )}
        </svg>
      </div>
    );
  }
}
export default SankeyParent
