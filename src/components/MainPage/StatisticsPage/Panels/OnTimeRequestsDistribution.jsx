import ClockIcon from 'Assets/etc/time.inline.svg';
import { dateDiffInDays } from 'Utils/functions.jsx';
import { checkIfDateIsInRange } from '../functions.js';
import RequestsList from '../Lists/RequestsList/RequestsList.jsx';
import useSmallStatPanel from 'Utils/hooks/statistics/useSmallStatPanel.js';

const OnTimeRequestsDistribution = ({
  requests,
  currDate,
  timeText,
  getPrevData,
}) => {
  const { smallPanel, setStats } = useSmallStatPanel(
    {
      category: 'Вовремя выполненные заказы',
      linkTo: '/requests',
      timePeriod: timeText,
      renderIcon: <ClockIcon className="panel__img panel__img--time" />,
    },
    requests,
    (requests) => getStats(requests),
    timeText,
    [currDate],
  );

  const filterRequests = (requests, currDate) => {
    let monthOnTime = 0;
    let monthAllQuantity = 0;
    requests.filter((request) => {
      const date = new Date(request.date);
      if (
        checkIfDateIsInRange(date, currDate.startDate, currDate.endDate) &&
        (request.status === 'Завершено' || request.status === 'Отгружено')
      ) {
        //если заказ отгружен вовремя
        if (
          Math.abs(
            dateDiffInDays(
              new Date(request.date),
              new Date(request.shippingDate),
            ),
          ) <= 7
        ) {
          monthOnTime++;
        }
        monthAllQuantity++;
        return false;
      }
      return true;
    });
    return [requests, monthOnTime, monthAllQuantity];
  };

  const getStats = (requests) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }));

    //check prev month
    const prevMonth = getPrevData(currDate.startDate);
    const [
      temp,
      prevMonthOnTimeQuantity,
      prevMonthAllQuantity,
    ] = filterRequests(requests, prevMonth);

    //check cur month
    const [
      filteredRequests,
      curMonthOnTimeQuantity,
      curMonthAllQuantity,
    ] = filterRequests(temp, currDate);

    //соотношение вовремя выпол. заказов в тек. месяце
    const curMonthValue =
      Math.floor(
        (curMonthOnTimeQuantity /
          (curMonthAllQuantity !== 0 ? curMonthAllQuantity : 1)) *
          100,
      ) / 100;

    //соотношение вовремя выпол. заказов в пред. месяце
    const prevMonthValue =
      Math.floor(
        (prevMonthOnTimeQuantity /
          (prevMonthAllQuantity !== 0 ? prevMonthAllQuantity : 1)) *
          100,
      ) / 100;

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
      value: `${Math.floor(curMonthValue * 100 * 100) / 100}%`,
      difference:
        Math.floor((curMonthValue - prevMonthValue) * 100 * 100) / 100,
      percentage:
        Math.floor(
          ((curMonthValue - prevMonthValue) /
            (prevMonthValue !== 0 ? prevMonthValue : 1)) *
            100 *
            100,
        ) / 100,
    }));
  };

  return smallPanel;
};

export default OnTimeRequestsDistribution;
