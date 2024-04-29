import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function BarChart({ chartData }) {
    return (
    <>
    <div className="chart-container">

        <Bar
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
                        text: "Bar Chart for Factory environmental Data"
                    },
                    legend: {
                        display: true
                    }
                    
                }
            }}
            />
        </div>
      </>
    );
  }
  
  export default BarChart;