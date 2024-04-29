import React, { useState } from 'react';
import * as XLSX from 'xlsx';

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import DataTable from './components/DataTable';

Chart.register(CategoryScale);


export default function App() {
  var [chartData, setChartData] = useState(null);
  var [precentageData, setPercentageData] = useState(null);

  const [chartType, setChartType] = useState('line'); // Initial chart type

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value); // Update chart type based on user selection
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      console.log(data)
      const months = Object.keys(data[0]).slice(1).map(x=>x.split(' ')[0]);
      const datasets = new Array();
      const datasets_percentage = new Array();
      
      for( const x of data){
        const [featureName, ...values] = Object.values(x);
        
        datasets.push({
          label : featureName,
          data: values
        });

        // percentage change
        const percentgeChange = values.map((value, index)=>{
          const prevValue = values[index-1];
          return ((value-prevValue)/prevValue)*100;
        });
        
        percentgeChange[0] = 0
      
        datasets_percentage.push({
          label : featureName,
          data: percentgeChange
        });
      }

      chartData = {
        labels: months,
        datasets: datasets
      }

      precentageData = {
        labels: months,
        datasets: datasets_percentage
      }


      console.log(chartData);
      console.log(precentageData);


      setChartData(chartData);
      setPercentageData(precentageData);

    };

    reader.readAsBinaryString(file);

  };

  const chartComponents = {
    line: <LineChart chartData={chartData} />,
    linep: <LineChart chartData={precentageData} />,
    bar: <BarChart chartData={chartData}/>,
    pie: <PieChart chartData={chartData} />,
  };
  
  const selectChart = (
    <div className="relative h-10 w-72 m-10 min-w-[200px]">
    <select
      onChange={handleChartTypeChange}
      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
          <option value="line">Line Chart</option>
          <option value="linep">Line Percentage Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
    </select>
    <label
      className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
      Select Chart
    </label>
    </div>
  );


  return (
    <>
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
    <input onChange={handleFileChange}  
      class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
    </input>
      {!chartData && (
        <p>Please upload a file to load chart data.</p>
      )}
      <div>
        {chartData && <DataTable chartData={chartData}/>}
      </div>
      {chartData &&
        <div>

          <div>
          {selectChart}
          </div>
          <div  className='grid grid-cols-2 gap-2'>

            {chartComponents[chartType]}
          </div>

          {/* { <div className='grid grid-cols-2 gap-2'>
            <LineChart chartData={chartData}/>
            <LineChart chartData={precentageData}/>
            <BarChart chartData={chartData}/>
            <PieChart chartData={chartData}/>
          </div> } */}
        </div>
      }
    </>
  );
}

