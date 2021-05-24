import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";

export default function Responcive() {
  const [data, setData] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
   // const response = await fetch("/data.json");
    setData([
        { "y": "1.67" },
        { "y": "4.2" },
        { "y": "3.8" },
        { "y": "8.1" },
        { "y": "5.3" },
        { "y": "7.2" },
        { "y": "9.1" },
        { "y": "1.8" },
        { "y": "0.2" },
        { "y": "6.4" },
        { "y": "10.0" },
        { "y": "7.6" },
        { "y": "8.2" },
        { "y": "8.1" },
        { "y": "4.1" },
        { "y": "9.2" },
        { "y": "3.7" },
        { "y": "2.4" },
        { "y": "9.9" },
        { "y": "2.8" }
      ]);
  };

  return (
    <div className="App">
      <LineChart data={data} />
    </div>
  );
}
