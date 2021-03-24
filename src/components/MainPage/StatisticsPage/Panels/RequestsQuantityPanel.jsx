import PlaylistIcon from 'Assets/sidemenu/play_list.inline.svg';
import RequestsList from '../Lists/RequestsList/RequestsList.jsx';
import useSmallStatPanel from 'Utils/hooks/statistics/useSmallStatPanel.js';
import { getRequestQuantityStats } from '../functions';

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
    (requests) => getRequests(requests),
    timeText,
    [currDate],
  );

  const getRequests = (requests) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }));
    const prevMonth = getPrevData(currDate.startDate);
    const [prevMonthQuantity, curMonthQuantity, data] = getRequestQuantityStats(
      requests,
      currDate,
      prevMonth,
    );
    updateStats(prevMonthQuantity, curMonthQuantity);
    setStats((stats) => ({
      ...stats,
      windowContent: (
        <RequestsList
          title="Заявки за выбранный период"
          data={data}
          sortBy={{ curSort: 'sum', sum: 'desc' }}
        />
      ),
    }));
  };

  return smallPanel;
};

export default RequestsQuantityPanel;
