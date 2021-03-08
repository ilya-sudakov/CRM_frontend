import EmployeeIcon from 'Assets/sidemenu/employee.inline.svg';
import { checkIfDateIsInRange } from '../functions.js';
import RequestsList from '../Lists/RequestsList/RequestsList.jsx';
import { getStatsticsGraphWidgetOptions } from './functions.js';
import useBarChart from 'Utils/hooks/statistics/useBarChartStatPanel';

const ManagerEfficiencyGraphPanel = ({ data, currDate, timeText }) => {
  const { graphPanel, setIsLoading, setStats, renderGraph } = useBarChart(
    {
      category: 'Статистика по менеджерам (заказы)',
      chartName: 'manager-efficiency-graph',
      timePeriod: timeText,
      renderIcon: <EmployeeIcon className="panel__img panel__img--employee" />,
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
        checkIfDateIsInRange(request.date, currDate.startDate, currDate.endDate)
      ) {
        managers = {
          ...managers,
          [request.responsible]:
            managers[request.responsible] !== undefined
              ? managers[request.responsible] + 1
              : 1,
        };
        return true;
      }
      return false;
    });
    // console.log(managers)
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
    renderGraph(getStatsticsGraphWidgetOptions(managers));
  };

  return graphPanel;
};

export default ManagerEfficiencyGraphPanel;
