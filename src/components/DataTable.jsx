import { data } from 'autoprefixer';
import React from 'react';

export default function DataTable({ chartData }) {
    console.log(chartData)
    const {labels, datasets} = chartData
    console.log(datasets)
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
            <th
              key="Type"
              scope="col"
              className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Type
            </th>

          {labels.map((key) => (
            <th
              key={key}
              scope="col"
              className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {datasets.map((row, rowIndex) => (
          <tr key={rowIndex}>
              <td
                key={0}
                className="px-2 py-2 whitespace-nowrap text-sm text-gray-900"
              >
                {row.label}
              </td>
            {row.data.map((value, columnIndex) => (
              <td
                key={columnIndex+1}
                className="px-2 py-2 whitespace-nowrap text-sm text-gray-900"
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

