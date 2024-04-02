import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const GradesPieChart  = () => {
  const [series] = useState([8, 10, 4, 2, 5]);

  const chartOptions = {
    chart: {
      width: 570,
    },
    labels: [
      "A",
      "B",
      "C",
      "D",
      "E"
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
            type: "pie",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div id='chart'>
      <h2 className='text-gray-600 text-sm'>
        Perfomance Distribution Based on Grades
      </h2>
      <ReactApexChart
        options={chartOptions}
        series={series}
        type='pie'
        width={400}
        height={400}
        className='usage-chart'
      />
    </div>
  );
};

export default GradesPieChart;