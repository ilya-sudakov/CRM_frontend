import MoneyIcon from 'Assets/etc/bx-ruble.inline.svg';
import { addSpaceDelimiter } from 'Utils/functions.jsx';
import { checkIfDateIsInRange } from '../functions.js';
import RequestsList from '../Lists/RequestsList/RequestsList.jsx';
import useSmallStatPanel from 'Utils/hooks/statistics/useSmallStatPanel.js';

const AverageSumStatsPanel = ({
  requests,
  currDate,
  timeText,
  getPrevData,
}) => {
  const { smallPanel, setStats } = useSmallStatPanel(
    {
      category: 'Средняя сумма заказа',
      linkTo: '/requests',
      timePeriod: timeText,
      renderIcon: <MoneyIcon className="panel__img panel__img--money" />,
    },
    requests,
    (requests) => getStats(requests),
    timeText,
    [currDate],
  );

  const filterRequests = (requests, curDate) => {
    let monthLength = 0;
    let averageMonth = 0;
    const data = requests.filter((request) => {
      const date = new Date(request.date);
      if (
        checkIfDateIsInRange(date, curDate.startDate, curDate.endDate) &&
        request.status === 'Завершено'
      ) {
        monthLength++;
        averageMonth += Number.parseFloat(request.sum || 0);
        return false;
      }
      if (request.status !== 'Завершено') {
        return false;
      }
      return true;
    });
    return [data, monthLength, averageMonth];
  };

  const getStats = (requests) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }));

    const prevMonth = getPrevData(currDate.startDate);

    //check prev data
    let [temp, prevMonthLength, prevMonthAverage] = filterRequests(
      requests,
      prevMonth,
    );
    //check cur data
    let [filteredRequests, curMonthLength, curMonthAverage] = filterRequests(
      temp,
      currDate,
    );

    curMonthAverage =
      curMonthAverage / (curMonthLength !== 0 ? curMonthLength : 1);
    prevMonthAverage =
      prevMonthAverage / (prevMonthLength !== 0 ? prevMonthLength : 1);

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
      value: `${addSpaceDelimiter(Math.floor(curMonthAverage * 100) / 100)} ₽`,
      difference: curMonthAverage - prevMonthAverage,
      percentage:
        Math.floor(
          ((curMonthAverage - prevMonthAverage) /
            (prevMonthAverage === 0 ? 1 : prevMonthAverage)) *
            100 *
            100,
        ) / 100,
    }));
  };

  return smallPanel;
};

export default AverageSumStatsPanel;
