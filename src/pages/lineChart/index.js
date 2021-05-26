import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';


function LineChartParent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    regenerateData();
  }, []);

  function regenerateData() {
    const chartData = [];
    for (let i = 0; i < 20; i++) {
      const value = Math.floor(Math.random() * i + 3);
      chartData.push({
        label: i,
        value,
        tooltipContent: `<b>x: </b>${i}<br><b>y: </b>${value}`
      });
    }
    setData(chartData)
  }

  return (
    <div >
      <button onClick={regenerateData}>Change Data</button>
      <LineChart data={data} width={600} height={400} />
    </div>
  );
}

export default LineChartParent;