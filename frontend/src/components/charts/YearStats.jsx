import Chart from "react-apexcharts";

const YearStats = () => {
  const options = {
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: [
        "YEAR 1",
        "YEAR 2",
        "YEAR 3",
        "YEAR 4"
      ],
    },
  };

  const series = [
    {
      name: "Score",
      data: [60, 50, 60, 40],
    },
  ];

  return (
    <>
      <h2 className='text-gray-600 text-sm'>
        Perfomance Distribution by Academin Year
      </h2>
      <Chart
        options={options}
        series={series}
        type='bar'
        width={500}
        height={320}
      />
    </>
  );
};

export default YearStats;
