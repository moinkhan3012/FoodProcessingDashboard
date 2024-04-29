import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
function PieChart({ chartData }) {

    const {labels, datasets} = chartData

    console.log(labels, datasets)
    const [selectedDataset, setSelectedDataset] = useState(0); // Initialize selected label to the first label

    const handleSelectChange = (e) => {
        setSelectedDataset(e.target.value); // Update selected label when user makes a selection
    };

    const select = (
 
        <select id="select_type" 
        value={selectedDataset} 
        class="block border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
        onChange={handleSelectChange}>
            {   
                datasets.map((item, index) => (
                    <option key={index} value={index}>{item.label}</option>
                ))
            }
        </select>
    );

    
    return (
    <>

        <div className="chart-container">
            {select}
            {console.log(datasets)}
            {console.log(selectedDataset)}
            <Pie
            data={{
                labels: labels,
                datasets: [{
                    label: datasets[selectedDataset].label,
                    data: datasets[selectedDataset].data
                    }]
                }}
                options={{
                    interaction: {
                        mode: "index",
                        intersect: false,
                    },
                    // aspectRatio: 1,
                    // maintainAspectRatio: false,
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
                            text: "Pie Chart for Factory environmental Data"
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
  
  export default PieChart;