import './StatisticsWidget.scss';
import Widget from '../Widget/Widget.jsx';
import { useCallback, useEffect, useState } from 'react';
import {
  getRequestQuantityStats,
  getPreviousWeekDays,
  getDifferenceInPercentages,
} from '../../StatisticsPage/functions';
import useRequestsData from 'Utils/hooks/useRequestsData';
import PlaceholderLoading from 'Utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';

const StatisticsWidget = () => {
  const { requests, isLoading } = useRequestsData();
  const [statistics, setStatistics] = useState([]);

  const getRequestsQuantity = useCallback(
    (prevDate, curDate) => {
      if (requests.length === 0) return null;
      const [prevPeriodQuantity, curPeriodQuantity] = getRequestQuantityStats(
        requests,
        {
          startDate: curDate.startDate,
          endDate: curDate.endDate,
        },
        {
          startDate: prevDate.startDate,
          endDate: prevDate.endDate,
        },
      );
      return {
        name: 'Заказы',
        prevPeriod: {
          name: 'Прошлая неделя',
          value: `${prevPeriodQuantity} зкз`,
        },
        curPeriod: { name: 'Эта неделя', value: `${curPeriodQuantity} зкз` },
        difference: getDifferenceInPercentages(
          prevPeriodQuantity,
          curPeriodQuantity,
        ),
      };
    },
    [requests],
  );

  useEffect(() => {
    const curDate = getPreviousWeekDays(new Date(), 'current');
    const prevDate = getPreviousWeekDays(new Date());
    const reqsQuantity = getRequestsQuantity(prevDate, curDate);
    reqsQuantity !== null &&
      setStatistics((statistics) => [...statistics, reqsQuantity]);
  }, [requests]);

  return (
    <Widget
      className="statistics-widget"
      title="Статистика"
      miniWidget
      linkTo={{
        address: '/statistics',
        text: 'Перейти',
      }}
      content={<StatisticsList statistics={statistics} isLoading={isLoading} />}
    />
  );
};

export default StatisticsWidget;

const StatisticsList = ({ statistics, isLoading }) => {
  return (
    <div className="statistics-widget__list">
      {isLoading ? (
        <PlaceholderLoading />
      ) : (
        statistics.map(({ name, prevPeriod, curPeriod, difference }) => (
          <div key={name} className="statistics-widget__item">
            <div className="list__item list__item--name">{name}</div>
            <div className="list__item list__item--period">
              <span>{prevPeriod.name}</span>
              <span>vs.</span>
              <span>{curPeriod.name}</span>
            </div>
            <div className="list__item list__item--value">
              {prevPeriod.value}
            </div>
            <div className="list__item list__item--value">
              {curPeriod.value}
            </div>
            <div
              className={`list__item list__item--difference list__item--${
                difference >= 0 ? 'positive' : 'negative'
              }`}
            >{`${difference}%`}</div>
          </div>
        ))
      )}
    </div>
  );
};
