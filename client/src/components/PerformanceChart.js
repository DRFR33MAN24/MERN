import React, { Component } from "react";

export default class PerformanceChart extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1 className="title">Line Chart</h1>
          <div className="links">
            <a
              className="btn btn-gh"
              href="https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js"
            >
              Github Source
            </a>
          </div>
        </div>
        <Line data={data} options={options} />
      </div>
    );
  }
}
