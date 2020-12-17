import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Chartjs from "chart.js";

const chartConfig = {
  responsive: true,
  maintainAspectRatio:
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth) > 500
      ? true
      : false,
  animation: {
    easing: "easeInOutCirc",
  },
  tooltips: {
    mode: "index",
  },
  scales: {
    yAxes: [
      {
        ticks: {
          display:
            (window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth) > 500
              ? true
              : true,
          min: 0,
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          display:
            (window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth) > 500
              ? true
              : false,
        },
        maxBarThickness: 80,
      },
    ],
  },
};

const BarChart = ({
  data = [],
  title = "",
  color = "#3e95cd",
  chartClassName = "",
  wrapperClassName = "",
}) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const updateDataset = (datasetIndex, newData) => {
    const labels = newData.map((d) => d.label);
    const values = newData.map((d) => d.value);
    chartInstance.data.datasets[datasetIndex].data = values;
    chartInstance.data.labels = labels;
    chartInstance.update();
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (chartInstance !== null) chartInstance.destroy();
      const newChartInstance = new Chartjs(chartContainer.current, {
        type: "bar",
        data: {
          labels: data.map((d) => d.label),
          datasets: [
            {
              label: title,
              data: data.map((d) => d.value),
              backgroundColor: color,
            },
          ],
        },
        options: chartConfig,
      });
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  useEffect(() => {
    if (chartContainer && chartContainer.current && chartInstance && data) {
      console.log(data);
      updateDataset(0, data);
    }
  }, [data]);

  return (
    <div className={wrapperClassName} style={{ width: "100%" }}>
      <canvas className={chartClassName} ref={chartContainer} />
    </div>
  );
};

export default BarChart;

BarChart.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  color: PropTypes.string,
};
