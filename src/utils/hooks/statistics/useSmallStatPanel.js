import { useEffect, useState } from 'react';
import SmallPanel from 'Components/MainPage/StatisticsPage/Panels/SmallPanel.jsx';

const useSmallStatPanel = (
  defaultStats = {},
  data = [],
  getStats = () => {},
  newTimeText = '',
  updates = [],
) => {
  const [stats, setStats] = useState({
    percentage: 0,
    value: null,
    linkTo: '/',
    isLoaded: false,
    isLoading: false,
    difference: 0,
    ...defaultStats,
  });

  //При первой загрузке
  useEffect(() => {
    !stats.isLoaded && data.length > 1 && getStats(data);
  }, [data, stats]);

  //При обновлении тек. даты
  useEffect(() => {
    setStats((stats) => {
      return { ...stats, timePeriod: newTimeText };
    });
    if (!stats.isLoading && data.length > 1) {
      getStats(data);
    }
  }, updates);

  const smallPanel = <SmallPanel {...stats} />;

  return {
    setStats,
    smallPanel,
  };
};

export default useSmallStatPanel;
