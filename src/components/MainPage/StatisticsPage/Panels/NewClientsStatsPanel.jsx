import ClientsIcon from 'Assets/sidemenu/client.inline.svg';
import { addSpaceDelimiter } from 'Utils/functions.jsx';
import { checkIfDateIsInRange } from '../functions.js';
import RequestsList from '../Lists/RequestsList/RequestsList.jsx';
import useSmallStatPanel from 'Utils/hooks/statistics/useSmallStatPanel.js';

const NewClientsStatsPanel = ({
  requests,
  currDate,
  timeText,
  getPrevData,
}) => {
  const { smallPanel, setStats } = useSmallStatPanel(
    {
      category: 'Новые клиенты',
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
    //filter all clients except once from cur and prev month

    let prevMonthNewClients = 0;
    let curMonthNewClients = 0;
    const prevMonth = getPrevData(currDate.startDate);

    const filteredRequests = requests.filter((request) => {
      if (
        request.client !== null &&
        !checkIfDateIsInRange(
          request.date,
          prevMonth.startDate,
          prevMonth.endDate,
        ) &&
        !checkIfDateIsInRange(
          request.date,
          currDate.startDate,
          currDate.endDate,
        ) &&
        clients[request.client.id] === undefined
      ) {
        clients = {
          ...clients,
          [request.client.id]: '',
        };
        return false;
      }
      return true;
    });

    //find new clients from prev month
    filteredRequests.filter((request) => {
      if (
        request.client !== null &&
        checkIfDateIsInRange(
          request.date,
          prevMonth.startDate,
          prevMonth.endDate,
        ) &&
        clients[request.client.id] === undefined
      ) {
        prevMonthNewClients++;
        clients = {
          ...clients,
          [request.client.id]: '',
        };
        return false;
      }
      if (request.client === null) {
        return false;
      }
      return true;
    });

    //find new clients from cur month
    const filteredRequestsNew = requests.filter((request) => {
      if (
        request.client !== null &&
        checkIfDateIsInRange(
          request.date,
          currDate.startDate,
          currDate.endDate,
        ) &&
        clients[request.client.id] === undefined
      ) {
        curMonthNewClients++;
        clients = {
          ...clients,
          [request.client.id]: '',
        };
        return true;
      }
      return false;
    });

    setStats((stats) => ({
      ...stats,
      windowContent: (
        <RequestsList
          title="Заявки за выбранный период"
          data={filteredRequestsNew}
          sortBy={{ curSort: 'sum', sum: 'desc' }}
        />
      ),
      isLoaded: true,
      isLoading: false,
      value: addSpaceDelimiter(Math.floor(curMonthNewClients * 100) / 100),
      difference: curMonthNewClients - prevMonthNewClients,
      percentage:
        Math.floor(
          ((curMonthNewClients - prevMonthNewClients) /
            (prevMonthNewClients === 0 ? 1 : prevMonthNewClients)) *
            100 *
            100,
        ) / 100,
    }));
  };

  return smallPanel;
};

export default NewClientsStatsPanel;
