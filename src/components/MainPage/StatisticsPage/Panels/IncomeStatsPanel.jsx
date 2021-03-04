import { useState, useEffect } from 'react';
import SmallPanel from './SmallPanel.jsx';
import MoneyIcon from 'Assets/etc/bx-ruble.inline.svg';
import { addSpaceDelimiter } from 'Utils/functions.jsx';
import { checkIfDateIsInRange } from '../functions.js';
import RequestsList from '../Lists/RequestsList/RequestsList.jsx';

const IncomeStatsPanel = ({ requests, currDate, timeText, getPrevData }) => {
  const [stats, setStats] = useState({
    category: 'Доход',
    percentage: 0,
    value: null,
    linkTo: '/requests',
    isLoaded: false,
    isLoading: false,
    timePeriod: timeText,
    difference: 0,
    renderIcon: <MoneyIcon className="panel__img panel__img--money" />,
  });

  const getStats = (requests) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }));

    let curMonthIncome = 0;
    let prevMonthIncome = 0;

    //check prev month
    let temp = requests.filter((request) => {
      const date = new Date(request.date);
      const prevMonth = getPrevData(currDate.startDate);
      if (
        checkIfDateIsInRange(date, prevMonth.startDate, prevMonth.endDate) &&
        request.status === 'Завершено'
      ) {
        prevMonthIncome += Number.parseFloat(request.sum || 0);
        return false;
      }
      if (request.status !== 'Завершено') {
        return false;
      }
      return true;
    });

    //check cur month
    const filteredRequests = temp.filter((request) => {
      const date = new Date(request.date);
      if (
        checkIfDateIsInRange(date, currDate.startDate, currDate.endDate) &&
        request.status === 'Завершено'
      ) {
        curMonthIncome += Number.parseFloat(request.sum || 0);
        return true;
      }
      return false;
    });

    setStats((stats) => ({
      ...stats,
      windowContent: (
        <RequestsList
          title="Заявки за выбранный период"
          data={filteredRequests}
          sortBy={{ curSort: 'sum', sum: 'desc' }}
        />
      ),
      isLoaded: true,
      isLoading: false,
      value: `${addSpaceDelimiter(
        Math.floor(curMonthIncome * 100) / 100,
      )} руб.`,
      difference: curMonthIncome - prevMonthIncome,
      percentage:
        Math.floor(
          ((curMonthIncome - prevMonthIncome) /
            (prevMonthIncome === 0 ? 1 : prevMonthIncome)) *
            100 *
            100,
        ) / 100,
    }));
  };

  //При первой загрузке
  useEffect(() => {
    !stats.isLoaded && requests.length > 1 && getStats(requests);
  }, [requests, stats]);

  //При обновлении тек. даты
  useEffect(() => {
    setStats((stats) => {
      return { ...stats, timePeriod: timeText };
    });
    if (!stats.isLoading && requests.length > 1) {
      getStats(requests);
    }
  }, [currDate]);

  return <SmallPanel {...stats} />;
};

export default IncomeStatsPanel;
