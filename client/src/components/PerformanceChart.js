import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export default class PerformanceChart extends Component {
  render() {
    const data = {
      labels: ["1", "2", "3", "4", "5", "6"],
      datasets: [
        {
          label: "# Offers Completed",
          data: [12, 19, 3, 5, 2, 3],
          fill: false,
          backgroundColor: "rgb(255, 255, 255)",
          borderColor: "rgba(240, 173, 78, 1)"
        }
      ]
    };

    const options = {
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
      <div>
        <div className="header">
          <h1 className="title">Performance</h1>
        </div>
        <Line data={data} options={options} />
      </div>
    );
  }
}
