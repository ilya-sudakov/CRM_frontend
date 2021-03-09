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

  const getStats = (requests) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }));

    let curMonthAverage = 0;
    let prevMonthAverage = 0;
    let prevMonthLength = 0;
    let curMonthLength = 0;

    //check prev data
    let temp = requests.filter((request) => {
      const date = new Date(request.date);
      const prevMonth = getPrevData(currDate.startDate);
      if (
        checkIfDateIsInRange(date, prevMonth.startDate, prevMonth.endDate) &&
        request.status === 'Завершено'
      ) {
        prevMonthLength++;
        prevMonthAverage += Number.parseFloat(request.sum || 0);
        return false;
      }
      if (request.status !== 'Завершено') {
        return false;
      }
      return true;
    });

    const filteredRequests = temp.filter((request) => {
      const date = new Date(request.date);
      if (
        checkIfDateIsInRange(date, currDate.startDate, currDate.endDate) &&
        request.status === 'Завершено'
      ) {
        curMonthLength++;
        curMonthAverage += Number.parseFloat(request.sum || 0);
        return true;
      }
      return false;
    });

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
