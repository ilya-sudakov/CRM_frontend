import { useState, useEffect } from 'react';
import GraphPanel from './GraphPanel.jsx';
import ListIcon from 'Assets/sidemenu/list.inline.svg';
import { months } from 'Utils/dataObjects';
import { formatDateString } from 'Utils/functions.jsx';
import { createGraph, loadCanvas } from 'Utils/graphs.js';

const RequestsQuantityGraphPanel = ({ data, curDate }) => {
  const [graph, setGraph] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const [stats, setStats] = useState({
    category: 'Заказы',
    isLoaded: false,
    chartName: 'income-graph',
    timePeriod: `${months[curDate.getMonth() - 1]} - ${
      months[curDate.getMonth()]
    }`,
    renderIcon: <ListIcon className="panel__img panel__img--list" />,
  });

  const getStats = (data, curDate = new Date()) => {
    let curMonthData = [];
    let prevMonthData = [];
    let dates = [];
    for (
      let i = 1;
      i <= new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate();
      i++
    ) {
      dates.push(i);
    }
    dates.map((item) => {
      const curMonthDate = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        item,
      );
      const prevDate = new Date(
        curDate.getFullYear(),
        curDate.getMonth() - 1,
        item,
      );

      let curSum = 0;
      let prevSum = 0;
      data.map((request) => {
        if (formatDateString(request.date) === formatDateString(curMonthDate)) {
          return curSum++;
        }
        if (formatDateString(request.date) === formatDateString(prevDate)) {
          return prevSum++;
        }
      });
      curMonthData.push(curSum);
      prevMonthData.push(prevSum);
    });
    let dataset = {
      labels: dates,
      datasets: [
        {
          data: prevMonthData,
          label: months[curDate.getMonth() - 1],
          borderColor: '#3e95cd',
          backgroundColor: 'rgba(62, 149, 205, 0.2)',
        },
        {
          data: curMonthData,
          label: months[curDate.getMonth()],
          borderColor: '#8e5ea2',
          backgroundColor: 'rgba(142, 94, 162, 0.2)',
        },
      ],
    };
    renderGraph(dataset);
  };

  const renderGraph = (dataset) => {
    if (!canvasLoaded) {
      setStats((stats) => ({
        ...stats,
        isLoaded: true,
      }));
      loadCanvas(
        `panel__chart-wrapper--${stats.chartName}`,
        `panel__chart panel__chart--${stats.chartName}`,
      );
    }

    setCanvasLoaded(true);
    const options = {
      type: 'line',
      data: dataset,
      options: {
        elements: {
          line: {
            tension: 0.5,
          },
        },
        cornerRadius: 2.5,
        fullCornerRadius: false,
        responsive: true,
        maintainAspectRatio:
          (window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth) > 500
            ? true
            : false,
        animation: {
          easing: 'easeInOutCirc',
        },
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
          },
        },
        tooltips: {
          mode: 'index',
        },

        scales: {
          yAxes: [
            {
              // display: false,
              gridLines: {
                display: false,
              },
              ticks: {
                // display: false,
              },
            },
          ],
          xAxes: [
            {
              // display: false,
              gridLines: {
                display: false,
              },
              ticks: {
                // display: false,
              },
            },
          ],
        },
      },
    };
    setTimeout(() => {
      // setIsLoading(false);
      canvasLoaded && graph.destroy();
      setGraph(
        createGraph(
          options,
          document.getElementsByClassName(
            `panel__chart--${stats.chartName}`,
          )[0],
        ),
      );
    }, 150);
  };

  //При первом рендере
  useEffect(() => {
    !stats.isLoaded && data.length > 1 && getStats(data, curDate);
  }, [data, stats]);

  //При обновлении тек. даты
  useEffect(() => {
    if (!stats.isLoading && data.length > 0) {
      setCanvasLoaded(false);
      setStats((stats) => ({
        ...stats,
        timePeriod: `${months[curDate.getMonth() - 1]} - ${
          months[curDate.getMonth()]
        }`,
      }));
      graph.destroy();
      getStats(data, curDate);
    }
  }, [curDate]);

  return <GraphPanel {...stats} />;
};

export default RequestsQuantityGraphPanel;
