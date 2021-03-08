import { useState } from 'react';
import WrenchIcon from 'Assets/sidemenu/wrench.inline.svg';
import { checkRiggingTypesInputs } from '../../Dispatcher/Rigging/RiggingComponents/rigsVariables.js';
import { getStatsticsGraphWidgetOptions } from './functions.js';
import useBarChart from 'Utils/hooks/statistics/useBarChartStatPanel';

const RiggingItemsQuantityForType = ({ data }) => {
  const { graphPanel, setIsLoading, renderGraph } = useBarChart(
    {
      category: 'Кол-во деталей оснастки в производстве',
      chartName: 'rigging-items-quantity-graph',
      timePeriod: 'За все время',
      renderIcon: <WrenchIcon className="panel__img panel__img--wrench" />,
    },
    data,
    (data) => getStats(data),
    'За все время',
  );
  const [statuses, setStatuses] = useState({
    cuttingDimensions: {
      name: 'Распил/Габариты',
      previous: null,
      data: 0,
    },
    milling: {
      name: 'Фрезеровка/Точение',
      previous: 'cuttingDimensions',
      data: 0,
    },
    harding: {
      name: 'Закалка',
      previous: 'milling',
      data: 0,
    },
    grinding: {
      name: 'Шлифовка',
      previous: 'harding',
      data: 0,
    },
    erosion: {
      name: 'Эрозия',
      previous: 'grinding',
      data: 0,
    },
  });

  const getStats = (data) => {
    setIsLoading(true);
    let newStatuses = statuses;
    Object.entries(statuses).map((status) => {
      let temp = 0;
      temp = data.filter((draft) => {
        if (
          (draft[status[0]] === '' || draft[status[0]] === null) &&
          checkRiggingTypesInputs(draft, status[0])
        ) {
          return true;
        }
        return false;
      }).length;

      return (newStatuses = {
        ...newStatuses,
        [status[0]]: {
          ...newStatuses[status[0]],
          data: temp,
        },
      });
    });
    setStatuses({ ...newStatuses });

    const options = getStatsticsGraphWidgetOptions(newStatuses);
    renderGraph(options);
  };

  return graphPanel;
};

export default RiggingItemsQuantityForType;
