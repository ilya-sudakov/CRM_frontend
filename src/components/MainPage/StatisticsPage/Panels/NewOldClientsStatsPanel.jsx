import { useState, useEffect } from 'react';
import SmallPanel from './SmallPanel.jsx';
import ClientsIcon from '../../../../../assets/sidemenu/client.inline.svg';
import { addSpaceDelimiter } from '../../../../utils/functions.jsx';
import { checkIfDateIsInRange } from '../functions.js';
import RequestsList from '../Lists/RequestsList/RequestsList.jsx';

const NewOldClientsStatsPanel = ({
  requests,
  currDate,
  timeText,
  getPrevData,
}) => {
  const [stats, setStats] = useState({
    category: 'Старые новые клиенты',
    percentage: 0,
    value: null,
    linkTo: '/clients/categories',
    isLoaded: false,
    isLoading: false,
    timePeriod: timeText,
    difference: 0,
    renderIcon: () => <ClientsIcon className="panel__img panel__img--money" />,
  });

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

    //find new clients from prev month
    const filteredRequests = requests.filter((request) => {
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
    const filteredRequestsNew = filteredRequests.filter((request) => {
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

export default NewOldClientsStatsPanel;
