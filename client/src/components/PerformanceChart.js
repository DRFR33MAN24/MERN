import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export default class PerformanceChart extends Component {
  render() {
    // get all activity from cashout component passed as prop
    // construct data by filtering the activity array and counting

    const data = {
      labels: this.props.labels,
      datasets: [
        {
          label: "# Offers Completed",
          data: this.props.data,
          fill: false,
          backgroundColor: "rgb(255, 255, 255)",
          borderColor: "rgba(240, 173, 78, 1)"
        }
      ]
    };

    const options = {
      maintainAspectRatio: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };
    return (
      <div
        style={{
          position: "relative",
          margin: "auto",
          width: "60vw",
          height: "60%"
        }}
      >
        <div className="header">
          <h1 className="title">Performance</h1>
        </div>
        <Line width={800} height={300} data={data} options={options} />
      </div>
    );
  }
}
