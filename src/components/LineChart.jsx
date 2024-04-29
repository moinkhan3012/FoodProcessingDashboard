import React from "react";
import { Line } from "react-chartjs-2";


function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
            interaction: {
              mode: "index",
              intersect: false,
            },
          
          responsive: true,
          plugins: {
            tooltips: {
              mode: 'index',
              intersect: false,
            },
            hover: {
              mode: 'nearest',
              intersect: true
            },        
            title: {
              display: true,
              text: "Line chart for Factory environmental  Data"
            },
            legend: {
              display: true
            }
            
          }
        }}
      />
    </div>
  );
}

export default LineChart;