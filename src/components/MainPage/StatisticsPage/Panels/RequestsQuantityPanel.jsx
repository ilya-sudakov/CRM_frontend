import PlaylistIcon from 'Assets/sidemenu/play_list.inline.svg';
import { checkIfDateIsInRange } from '../functions.js';
import RequestsList from '../Lists/RequestsList/RequestsList.jsx';
import useSmallStatPanel from 'Utils/hooks/statistics/useSmallStatPanel.js';

const RequestsQuantityPanel = ({
  requests,
  currDate,
  timeText,
  getPrevData,
}) => {
  const { smallPanel, setStats, updateStats } = useSmallStatPanel(
    {
      category: 'Заявки',
      linkTo: '/requests',
      timePeriod: timeText,
      renderIcon: <PlaylistIcon className="panel__img panel__img--requests" />,
    },
    requests,
    (requests) => getRequestQuantityStats(requests),
    timeText,
    [currDate],
  );

  const getRequestQuantityStats = (requests) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }));

    let curMonthQuantity = 0;
    let prevMonthQuantity = 0;

    //check prev month
    let temp = requests.filter((request) => {
      const date = new Date(request.date);
      const prevMonth = getPrevData(currDate.startDate);
      if (checkIfDateIsInRange(date, prevMonth.startDate, prevMonth.endDate)) {
        prevMonthQuantity++;
        return false;
      }
      return true;
    });

    //check cur month
    const filteredRequests = temp.filter((request) => {
      const date = new Date(request.date);
      if (checkIfDateIsInRange(date, currDate.startDate, currDate.endDate)) {
        curMonthQuantity++;
        return true;
      }
      return false;
    });

    updateStats(prevMonthQuantity, curMonthQuantity);
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
  };

  return smallPanel;
};

export default RequestsQuantityPanel;
