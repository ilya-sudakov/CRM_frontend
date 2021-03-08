import { useEffect, useState } from 'react';
import { createGraph, loadCanvas } from 'Utils/graphs.js';
import GraphPanel from 'Components/MainPage/StatisticsPage/Graphs/GraphPanel.jsx';

const useBarChart = (
  defaultStats = {},
  data = [],
  getStats = () => {},
  newTimeText = '',
  updates = [],
) => {
  const [graph, setGraph] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const [stats, setStats] = useState({
    isLoaded: false,
    chartName: 'manager-money-graph',
    ...defaultStats,
  });

  //При первом рендере
  useEffect(() => {
    !stats.isLoaded && data.length > 0 && getStats(data);
  }, [data, stats]);

  //При обновлении тек. даты
  useEffect(() => {
    if (!isLoading && data.length > 0) {
      setCanvasLoaded(false);
      setStats((stats) => ({
        ...stats,
        timePeriod: newTimeText,
      }));
      graph.destroy();
      getStats(data);
    }
  }, updates);

  const renderGraph = (options) => {
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

  const graphPanel = <GraphPanel {...stats} />;

  return {
    setStats,
    graphPanel,
    renderGraph,
    setIsLoading,
  };
};

export default useBarChart;
