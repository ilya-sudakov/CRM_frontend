import ClientIcon from 'Assets/sidemenu/client.inline.svg';
import { checkIfDateIsInRange } from '../functions.js';
import RequestsList from '../Lists/RequestsList/RequestsList.jsx';
import useBarChart from 'Utils/hooks/statistics/useBarChartStatPanel';
import { getStatsticsGraphWidgetOptions } from './functions.js';

const ClientTypeDistributionInRequests = ({ data, currDate, timeText }) => {
  const { graphPanel, setIsLoading, setStats, renderGraph } = useBarChart(
    {
      category: 'Типы клиентов по заказам',
      chartName: 'client-type-distribution-graph',
      timePeriod: timeText,
      renderIcon: <ClientIcon className="panel__img panel__img--money" />,
    },
    data,
    (data) => getStats(data),
    timeText,
    [currDate],
  );

  const getStats = (data) => {
    setIsLoading(true);
    let clientTypes = {
      Активные: 0,
      Потенциальные: 0,
      'В разработке': 0,
    };
    const filteredRequests = data.filter((request) => {
      if (
        checkIfDateIsInRange(
          request.date,
          currDate.startDate,
          currDate.endDate,
        ) &&
        request.client !== null &&
        clientTypes[request.client.clientType] !== undefined
      ) {
        clientTypes = {
          ...clientTypes,
          [request.client.clientType]:
            clientTypes[request.client.clientType] + 1,
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
          data={filteredRequests}
          sortBy={{ curSort: 'sum', sum: 'desc' }}
        />
      ),
    }));

    const options = getStatsticsGraphWidgetOptions(clientTypes);
    renderGraph(options);
  };

  return graphPanel;
};

export default ClientTypeDistributionInRequests;
