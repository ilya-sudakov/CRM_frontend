import PlaylistIcon from 'Assets/sidemenu/play_list.inline.svg';
import { checkIfDateIsInRange } from '../functions.js';
import RequestsList from '../Lists/RequestsList/RequestsList.jsx';
import useSmallStatPanel from 'Utils/hooks/statistics/useSmallStatPanel.js';

const ProductQuantityInRequest = ({
  requests,
  currDate,
  timeText,
  getPrevData,
}) => {
  const { smallPanel, setStats, updateStats } = useSmallStatPanel(
    {
      category: 'Среднее кол-во позиций в заказе',
      linkTo: '/requests',
      timePeriod: timeText,
      renderIcon: <PlaylistIcon className="panel__img panel__img--requests" />,
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
    let curMonthQuantity = 0;
    let prevMonthQuantity = 0;

    //check prev month
    let temp = requests.filter((request) => {
      const date = request.date;
      const prevMonth = getPrevData(currDate.startDate);
      if (checkIfDateIsInRange(date, prevMonth.startDate, prevMonth.endDate)) {
        prevMonthAverage += request.requestProducts.length;
        prevMonthQuantity++;
        return false;
      }
      return true;
    });

    const filteredRequests = temp.filter((request) => {
      const date = request.date;
      if (checkIfDateIsInRange(date, currDate.startDate, currDate.endDate)) {
        curMonthAverage += request.requestProducts.length;
        curMonthQuantity++;
        return true;
      }
      return false;
    });

    curMonthAverage =
      curMonthAverage / (curMonthQuantity !== 0 ? curMonthQuantity : 1);
    prevMonthAverage =
      prevMonthAverage / (prevMonthQuantity !== 0 ? prevMonthQuantity : 1);

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
    updateStats(prevMonthAverage, curMonthAverage);
  };

  return smallPanel;
};

export default ProductQuantityInRequest;
