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

  const getStats = (requests) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }));

    let curMonthOnTimeQuantity = 0;
    let curMonthAllQuantity = 0;
    let prevMonthOnTimeQuantity = 0;
    let prevMonthAllQuantity = 0;

    //check prev month
    let temp = requests.filter((request) => {
      const date = new Date(request.date);
      const prevMonth = getPrevData(currDate.startDate);
      if (
        checkIfDateIsInRange(date, prevMonth.startDate, prevMonth.endDate) &&
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
          prevMonthOnTimeQuantity++;
        }
        prevMonthAllQuantity++;
        return false;
      }
      return true;
    });

    //check cur month
    const filteredRequests = temp.filter((request) => {
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
          curMonthOnTimeQuantity++;
        }
        curMonthAllQuantity++;
        return true;
      }
      return false;
    });

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
