import { useEffect, useState } from 'react';
import SmallPanel from 'Components/MainPage/StatisticsPage/Panels/SmallPanel.jsx';
import { addSpaceDelimiter } from 'Utils/functions.jsx';

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
    !stats.isLoaded && data.length > 0 && getStats(data);
  }, [data, stats]);

  //При обновлении тек. даты
  useEffect(() => {
    setStats((stats) => {
      return { ...stats, timePeriod: newTimeText };
    });
    if (!stats.isLoading && data.length > 0) {
      getStats(data);
    }
  }, updates);

  const updateStats = (prevMonthData, curMonthData) => {
    return setStats((stats) => ({
      ...stats,
      isLoaded: true,
      isLoading: false,
      value: addSpaceDelimiter(Math.floor(curMonthData * 100) / 100),
      difference: curMonthData - prevMonthData,
      percentage:
        Math.floor(
          ((curMonthData - prevMonthData) /
            (prevMonthData === 0 ? 1 : prevMonthData)) *
            100 *
            100,
        ) / 100,
    }));
  };

  const smallPanel = <SmallPanel {...stats} />;

  return {
    setStats,
    updateStats,
    smallPanel,
  };
};

export default useSmallStatPanel;
