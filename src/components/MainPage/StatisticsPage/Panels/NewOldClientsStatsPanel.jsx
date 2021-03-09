import ClientsIcon from 'Assets/sidemenu/client.inline.svg';
import RequestsList from '../Lists/RequestsList/RequestsList.jsx';
import useSmallStatPanel from 'Utils/hooks/statistics/useSmallStatPanel.js';
import { statisticsFindNewClients } from './functions.js';

const NewOldClientsStatsPanel = ({
  requests,
  currDate,
  timeText,
  getPrevData,
}) => {
  const { smallPanel, setStats, updateStats } = useSmallStatPanel(
    {
      category: 'Старые новые клиенты',
      linkTo: '/clients/categories',
      timePeriod: timeText,
      renderIcon: <ClientsIcon className="panel__img panel__img--money" />,
    },
    requests,
    (data) => getStats(data),
    timeText,
    [currDate],
  );

  const getStats = (requests) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }));

    let clients = {};
    const prevMonth = getPrevData(currDate.startDate);

    //filter all clients except once from cur and prev month
    const [filteredRequests, prevMonthNewClients] = statisticsFindNewClients(
      requests,
      clients,
      prevMonth,
    );
    const [filteredRequestsNew, curMonthNewClients] = statisticsFindNewClients(
      filteredRequests,
      clients,
      currDate,
      false,
    );

    setStats((stats) => ({
      ...stats,
      windowContent: (
        <RequestsList
          title="Заявки за выбранный период"
          data={filteredRequestsNew}
          sortBy={{ curSort: 'sum', sum: 'desc' }}
        />
      ),
    }));
    updateStats(prevMonthNewClients, curMonthNewClients);
  };

  return smallPanel;
};

export default NewOldClientsStatsPanel;
