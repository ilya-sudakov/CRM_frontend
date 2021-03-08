import MoneyIcon from 'Assets/etc/bx-ruble.inline.svg';
import { checkIfDateIsInRange } from '../functions.js';
import RequestsList from '../Lists/RequestsList/RequestsList.jsx';
import useBarChart from 'Utils/hooks/statistics/useBarChartStatPanel';
import { getStatsticsGraphWidgetOptions } from './functions.js';

const ManagerMoneyGraphPanel = ({ data, currDate, timeText }) => {
  const { graphPanel, setIsLoading, setStats, renderGraph } = useBarChart(
    {
      category: 'Статистика по менеджерам (доходы)',
      chartName: 'manager-money-graph',
      timePeriod: timeText,
      renderIcon: <MoneyIcon className="panel__img panel__img--list" />,
    },
    data,
    (data) => getStats(data),
    timeText,
    [currDate],
  );

  const getStats = (data) => {
    setIsLoading(true);
    let managers = {};
    const filteredRequests = data.filter((request) => {
      if (
        checkIfDateIsInRange(
          request.date,
          currDate.startDate,
          currDate.endDate,
        ) &&
        request.status === 'Завершено'
      ) {
        managers = {
          ...managers,
          [request.responsible]:
            managers[request.responsible] !== undefined
              ? managers[request.responsible] +
                Number.parseFloat(request.sum || 0)
              : request.sum || 0,
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
    const options = getStatsticsGraphWidgetOptions(managers);
    renderGraph(options);
  };

  return graphPanel;
};

export default ManagerMoneyGraphPanel;
