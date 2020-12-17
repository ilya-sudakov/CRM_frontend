import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Chartjs from "chart.js";
import "./BarChart.scss";

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
};

const BarChart = ({
  data = [],
  labels = [],
  title = "",
  color = "#3e95cd",
  chartClassName = "",
  wrapperClassName = "",
  isStacked = false,
  options = {},
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
        type:
          (window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth) > 500
            ? "bar"
            : "horizontalBar",
        data: {
          labels: labels,
          datasets: isStacked
            ? Object.values(data).map((d) => {
                return {
                  label: d.label,
                  data: d.data,
                  backgroundColor: d.color,
                };
              })
            : [
                {
                  label: title,
                  data: data.map((d) => d.value),
                  backgroundColor: color,
                },
              ],
        },
        options: {
          ...chartConfig,
          legend: {
            position: options?.legend?.position ?? "top",
          },
          scales: {
            yAxes: [
              {
                stacked: isStacked,
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
                stacked: isStacked,
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
        },
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
    <div className="bar-chart">
      {title && <div className="main-window__title">{title}</div>}
      <div className={wrapperClassName} style={{ width: "100%" }}>
        <canvas className={chartClassName} ref={chartContainer} />
      </div>
    </div>
  );
};

export default BarChart;

BarChart.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  labels: PropTypes.array,
  isStacked: PropTypes.bool,
  chartClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  color: PropTypes.string,
  options: PropTypes.object,
};
