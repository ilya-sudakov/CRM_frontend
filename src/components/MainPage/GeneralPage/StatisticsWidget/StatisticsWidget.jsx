import './StatisticsWidget.scss';
import Widget from '../Widget/Widget.jsx';
import { useCallback, useEffect, useState } from 'react';
import {
  getRequestQuantityStats,
  getPreviousWeekDays,
  getDifferenceInPercentages,
  getRequestIncomeStats,
} from '../../StatisticsPage/functions';
import { getPreviousMonthDates } from 'Utils/helpers/time.js';
import useRequestsData from 'Utils/hooks/useRequestsData';
import PlaceholderLoading from 'Utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';

const StatisticsWidget = () => {
  const { requests, isLoading } = useRequestsData();
  const [statistics, setStatistics] = useState([]);

  const getRequestsQuantity = useCallback(
    (prevDate, curDate, periods) => {
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
          name: periods.prevPeriod,
          value: `${prevPeriodQuantity} зкз`,
        },
        curPeriod: {
          name: periods.curPeriod,
          value: `${curPeriodQuantity} зкз`,
        },
        difference: getDifferenceInPercentages(
          prevPeriodQuantity,
          curPeriodQuantity,
        ),
      };
    },
    [requests],
  );

  const getRequestsIncome = useCallback(
    (prevDate, curDate, periods) => {
      if (requests.length === 0) return null;
      const [prevPeriodQuantity, curPeriodQuantity] = getRequestIncomeStats(
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
        name: 'Доход',
        prevPeriod: {
          name: periods.prevPeriod,
          value: `${prevPeriodQuantity} ₽`,
        },
        curPeriod: {
          name: periods.curPeriod,
          value: `${curPeriodQuantity} ₽`,
        },
        difference: getDifferenceInPercentages(
          prevPeriodQuantity,
          curPeriodQuantity,
        ),
      };
    },
    [requests],
  );

  const getAllStats = () => {
    let statsList = [];
    const curDateWeek = getPreviousWeekDays(new Date(), 'current');
    const prevDateWeek = getPreviousWeekDays(new Date());
    const curDateMonth = getPreviousMonthDates(new Date(), 'current');
    const prevDateMonth = getPreviousMonthDates(new Date());
    statsList.push(
      getRequestsQuantity(prevDateWeek, curDateWeek, {
        prevPeriod: 'Пред. неделя',
        curPeriod: 'Тек. неделя',
      }),
    );
    statsList.push(
      getRequestsQuantity(prevDateMonth, curDateMonth, {
        prevPeriod: 'Пред. месяц',
        curPeriod: 'Тек. месяц',
      }),
    );
    statsList.push(
      getRequestsIncome(prevDateMonth, curDateMonth, {
        prevPeriod: 'Пред. месяц',
        curPeriod: 'Тек. месяц',
      }),
    );
    setStatistics((statistics) => [
      ...statistics,
      ...statsList.filter((stat) => stat !== null && stat),
    ]);
  };

  useEffect(() => {
    if (requests.length === 0) return;
    getAllStats();
  }, [requests]);

  return (
    <Widget
      className="statistics-widget"
      title="Статистика"
      subTitle="Эта неделя"
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
