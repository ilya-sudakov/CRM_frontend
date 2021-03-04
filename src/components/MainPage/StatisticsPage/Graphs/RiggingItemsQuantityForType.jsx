import { useState, useEffect } from 'react';
import GraphPanel from './GraphPanel.jsx';
import WrenchIcon from '../../../../../assets/sidemenu/wrench.inline.svg';
import { createGraph, loadCanvas } from '../../../../utils/graphs.js';
import { checkRiggingTypesInputs } from '../../Dispatcher/Rigging/RiggingComponents/rigsVariables.js';

const RiggingItemsQuantityForType = ({ data }) => {
  const [graph, setGraph] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [canvasLoaded, setCanvasLoaded] = useState(false);

  const [stats, setStats] = useState({
    category: 'Кол-во деталей оснастки в производстве',
    isLoaded: false,
    chartName: 'rigging-items-quantity-graph',
    timePeriod: 'За все время',
    renderIcon: <WrenchIcon className="panel__img panel__img--wrench" />,
  });

  const [statuses, setStatuses] = useState({
    cuttingDimensions: {
      name: 'Распил/Габариты',
      previous: null,
      data: 0,
    },
    milling: {
      name: 'Фрезеровка/Точение',
      previous: 'cuttingDimensions',
      data: 0,
    },
    harding: {
      name: 'Закалка',
      previous: 'milling',
      data: 0,
    },
    grinding: {
      name: 'Шлифовка',
      previous: 'harding',
      data: 0,
    },
    erosion: {
      name: 'Эрозия',
      previous: 'grinding',
      data: 0,
    },
  });

  const getStats = (data) => {
    setIsLoading(true);
    let newStatuses = statuses;
    Object.entries(statuses).map((status) => {
      // console.log(status)
      let temp = 0;
      temp = data.filter((draft) => {
        if (
          (draft[status[0]] === '' || draft[status[0]] === null) &&
          checkRiggingTypesInputs(draft, status[0])
        ) {
          return true;
        }
        return false;
      }).length;

      return (newStatuses = {
        ...newStatuses,
        [status[0]]: {
          ...newStatuses[status[0]],
          data: temp,
        },
      });
    });
    setStatuses({ ...newStatuses });
    setIsLoading(false);
    renderGraph(newStatuses);
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
        labels: Object.entries(dataset).map((item) => item[1].name),
        datasets: [
          {
            // label: 'Population (millions)',
            backgroundColor: [
              '#3e95cd',
              '#8e5ea2',
              '#3cba9f',
              '#e8c3b9',
              '#c45850',
            ],
            data: Object.entries(dataset).map((item) => item[1].data),
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
      setIsLoading(false);
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

  useEffect(() => {
    // console.log(statuses)
    if (stats.isLoaded || data.length === 0 || isLoading) {
      return;
    }
    getStats(data);
  }, [data, stats, statuses]);

  return <GraphPanel {...stats} />;
};

export default RiggingItemsQuantityForType;
