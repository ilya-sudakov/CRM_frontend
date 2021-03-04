import { useState, useEffect } from 'react';
import GraphPanel from './GraphPanel.jsx';
import EmployeeIcon from '../../../../../assets/sidemenu/employee.inline.svg';
import { createGraph, loadCanvas } from '../../../../utils/graphs.js';
import { checkIfDateIsInRange } from '../functions.js';
import RequestsList from '../Lists/RequestsList/RequestsList.jsx';

const ManagerEfficiencyGraphPanel = ({ data, currDate, timeText }) => {
  const [graph, setGraph] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const [stats, setStats] = useState({
    category: 'Статистика по менеджерам (заказы)',
    isLoaded: false,
    chartName: 'manager-efficiency-graph',
    timePeriod: timeText,
    renderIcon: <EmployeeIcon className="panel__img panel__img--employee" />,
  });

  const getStats = (data) => {
    let managers = {};
    const filteredRequests = data.filter((request) => {
      if (
        checkIfDateIsInRange(request.date, currDate.startDate, currDate.endDate)
      ) {
        managers = {
          ...managers,
          [request.responsible]:
            managers[request.responsible] !== undefined
              ? managers[request.responsible] + 1
              : 1,
        };
        return true;
      }
      return false;
    });
    // console.log(managers)
    setStats((stats) => ({
      ...stats,
      windowContent: (
        <RequestsList
          title="Заявки за выбранный период"
          data={filteredRequests}
          sortBy={{ curSort: 'sum', sum: 'desc' }}
        />
      ),
    }));
    renderGraph(managers);
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
      type: 'pie',
      data: {
        labels: Object.entries(dataset).map((item) => item[0]),
        datasets: [
          {
            // label: 'Population (millions)',
            backgroundColor: [
              '#3e95cd',
              '#8e5ea2',
              '#3cba9f',
              '#e8c3b9',
              '#c45850',
              '#bbbbbb',
              '#bbbbbb',
              '#bbbbbb',
            ],
            data: Object.entries(dataset).map((item) => item[1]),
          },
        ],
      },
      options: {
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
        tooltips: {
          mode: 'index',
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
    !stats.isLoaded && data.length > 0 && getStats(data);
  }, [data, stats]);

  //При обновлении тек. даты
  useEffect(() => {
    if (!stats.isLoading && data.length > 0) {
      setCanvasLoaded(false);
      setStats((stats) => ({
        ...stats,
        timePeriod: timeText,
      }));
      graph.destroy();
      getStats(data);
    }
  }, [currDate]);

  return <GraphPanel {...stats} />;
};

export default ManagerEfficiencyGraphPanel;
