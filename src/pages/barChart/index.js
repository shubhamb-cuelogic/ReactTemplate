import React, { Component } from "react";
import Radio from "@material-ui/core/Radio";
import BarChart from "./BarChart";
const usData = [
    {
        year: 2010,
        value: 2.56,
    },
    {
        year: 2011,
        value: 1.55,
    },
    {
        year: 2012,
        value: 2.25,
    },
    {
        year: 2013,
        value: 1.84,
    },
    {
        year: 2014,
        value: 2.45,
    },
    {
        year: 2015,
        value: 2.88,
    },
    {
        year: 2016,
        value: 1.57,
    },
    {
        year: 2017,
        value: 2.22,
    },
    {
        year: 2018,
        value: 3.18,
    },
    {
        year: 2019,
        value: 2.33,
    },
];

const japanData = [
    {
        year: 2010,
        value: 4.19,
    },
    {
        year: 2011,
        value: 0.12,
    },
    {
        year: 2012,
        value: 1.5,
    },
    {
        year: 2013,
        value: 2.0,
    },
    {
        year: 2014,
        value: 0.37,
    },
    {
        year: 2015,
        value: 1.22,
    },
    {
        year: 2016,
        value: 0.52,
    },
    {
        year: 2017,
        value: 2.17,
    },
    {
        year: 2018,
        value: 0.32,
    },
    {
        year: 2019,
        value: 0.65,
    },
];

const data = {
    USData: usData,
    JapanData: japanData,
};

class BarChartParent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: "US",
        };
    }

    handleChange = (e) => {
        this.setState({ selectedValue: e.target.value });
    };

    render() {
        const { selectedValue } = this.state;
        return (
            <React.Fragment>
                <BarChart
                    width={800}
                    height={550}
                    data={
                        this.state.selectedValue === "US" ? data.USData : data.JapanData
                    }
                    yAxisTitle={`${this.state.selectedValue} GDP growth`}
                />
                <div style={{ marginLeft: "calc(100% - 950px" }}>
                    <Radio
                        checked={selectedValue === "US"}
                        onChange={this.handleChange}
                        value="US"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "US" }}
                    />
          US
          <Radio
                        checked={selectedValue === "Japan"}
                        onChange={this.handleChange}
                        value="Japan"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "Japan" }}
                    />
          Japan
        </div>
            </React.Fragment>
        );
    }
}

export default BarChartParent;