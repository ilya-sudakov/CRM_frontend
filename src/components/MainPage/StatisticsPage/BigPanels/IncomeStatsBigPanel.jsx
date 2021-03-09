import { useState, useEffect } from 'react';
import MoneyIcon from 'Assets/etc/bx-ruble.inline.svg';
import { months } from 'Utils/dataObjects';
import { addSpaceDelimiter, getRandomNiceColor } from 'Utils/functions.jsx';
import {
  checkIfDateIsInRange,
  checkRequestsForSelectedMonth,
} from '../functions.js';
import RequestsList from '../Lists/RequestsList/RequestsList.jsx';
import BigPanel from './BigPanel.jsx';
import BarChart from 'Utils/Charts/BarChart/BarChart.jsx';
import { tooltipLabelRubles } from 'Utils/Charts/callbacks.js';

const IncomeStatsBigPanel = ({
  requests,
  currDate,
  timeText,
  getPrevData,
  loadData,
  curPeriod,
}) => {
  const [stats, setStats] = useState({
    category: 'Доход',
    percentage: 0,
    value: null,
    linkTo: '/requests',
    chartName: 'IncomeStatsBigPanel',
    isLoaded: false,
    timePeriod: timeText,
    difference: 0,
    curPeriod: curPeriod,
    currDate: currDate,
    renderIcon: <MoneyIcon className="panel__img panel__img--money" />,
  });

  const filterRequests = (requests, currDate, keepOld = true) => {
    let monthIncome = 0;
    const data = requests.filter((request) => {
      const date = new Date(request.date);
      if (
        checkIfDateIsInRange(date, currDate.startDate, currDate.endDate) &&
        request.status === 'Завершено'
      ) {
        monthIncome += Number.parseFloat(request.sum || 0);
        return !keepOld;
      }
      if (request.status !== 'Завершено') {
        return false;
      }
      return keepOld;
    });

    return [data, monthIncome];
  };

  const getFullYearData = (requests, currDate) => {
    let monthsIncome = [];
    const curYear = currDate.startDate.getFullYear();
    const curMonth = currDate.startDate.getMonth();
    for (let i = 0; i < 12; i++) {
      const newRequests = checkRequestsForSelectedMonth(
        requests,
        new Date(curYear, i, 1),
      );
      const totalIncome = newRequests.reduce(
        (prev, cur) => prev + Number.parseFloat(cur.sum ?? 0),
        0,
      );
      const color =
        curMonth === i ? '#B74F3B' : curMonth - 1 === i ? '#3BB7B6' : '#cccccc';
      monthsIncome.push({
        value: totalIncome,
        label: months[i],
        color: color,
      });
    }
    return monthsIncome;
  };

  const getFullYearAccumilationData = (requests, currDate) => {
    let monthsIncome = [];
    let totalSum = 0;
    const curYear = currDate.startDate.getFullYear();
    const isFutureMonth = (curMonth) =>
      curYear === new Date().getFullYear() && curMonth > new Date().getMonth();
    for (let i = 0; i < 12; i++) {
      const newRequests = checkRequestsForSelectedMonth(
        requests,
        new Date(curYear, i, 1),
      );
      const curMonthIncome = newRequests.reduce(
        (prev, cur) => prev + Number.parseFloat(cur.sum || 0),
        0,
      );
      if (isFutureMonth(i)) totalSum += curMonthIncome;
      monthsIncome.push({
        value: isFutureMonth(i) ? 0 : totalSum,
        label: months[i],
        color: '#3e95cd',
      });
    }
    return monthsIncome;
  };

  const colors = [
    '#F1B5CB',
    '#E88EED',
    '#CC3F0C',
    '#9A6D38',
    '#33673B',
    '#DB8A74',
    '#444054',
    '#FFB7FF',
    '#3B8EA5',
    '#F4C3C2',
    '#2D728F',
    '#F3DAD8',
    '#D6D9CE',
  ];

  const getIncomeByClients = (requests, currDate) => {
    let clients = {};
    requests.map((request) => {
      const curId = request?.client?.id;
      if (curId && clients[curId] === undefined) {
        const filteredRequests = requests.filter(
          (item) => item.client?.id === curId,
        );
        const dataset = getFullYearData(filteredRequests, currDate).map(
          (item) => item.value,
        );
        //dont account for requests w/ sum of 0
        if (dataset.reduce((prev, cur) => prev + cur, 0) === 0) return;
        return (clients = {
          ...clients,
          [curId]: {
            data: dataset,
            label: request.client.name,
            color: getRandomNiceColor(),
          },
        });
      }
    });
    //pick only 10 clients who provided most income
    let topIds = {};
    const newClients = Object.values(clients)
      .sort((a, b) => {
        const sumA = a.data.reduce((prev, cur) => prev + cur, 0);
        const sumB = b.data.reduce((prev, cur) => prev + cur, 0);
        if (sumA < sumB) return 1;
        if (sumA > sumB) return -1;
        return 0;
      })
      .splice(0, 10);
    newClients.map((item) => (topIds = { ...topIds, [item.label]: '' }));

    //get income for the rest of the clients outside of top 10
    let restOfClientsDataset = [];
    months.map((item, index) => {
      const curYear = currDate.startDate.getFullYear();
      const newRequests = checkRequestsForSelectedMonth(
        requests.filter(
          (request) =>
            request?.client?.name &&
            topIds[request?.client?.name] === undefined,
        ),
        new Date(curYear, index, 1),
      );
      const sum = newRequests.reduce(
        (prev, cur) => prev + Number.parseFloat(cur.sum ?? 0),
        0,
      );
      return restOfClientsDataset.push(sum);
    });
    return [
      ...newClients.map((item, index) => {
        return { ...item, color: colors[index] };
      }),
      {
        data: restOfClientsDataset,
        label: 'Остальные',
        color: '#CCCCCC',
      },
    ];
  };

  const getStats = (requests) => {
    setStats((stats) => ({
      ...stats,
      isLoaded: false,
    }));

    //check prev month
    const prevMonth = getPrevData(currDate.startDate);
    let [temp, prevMonthIncome] = filterRequests(requests, prevMonth);
    //check cur month
    let [filteredRequests, curMonthIncome] = filterRequests(
      temp,
      currDate,
      false,
    );

    const monthsIncome = getFullYearData(requests, currDate);
    const monthsAccumilationIncome = getFullYearAccumilationData(
      requests,
      currDate,
    );
    const incomeByClients = getIncomeByClients(requests, currDate);
    const defaultOptions = {
      legend: { display: false },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => tooltipLabelRubles(tooltipItem, data),
        },
      },
      scales: {
        xAxes: { gridLines: { display: false } },
        yAxes: {
          ticks: {
            callback: (value) => `${addSpaceDelimiter(value)} ₽`,
          },
        },
      },
    };

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      windowContent: (
        <RequestsList
          title="Заявки за выбранный период"
          data={filteredRequests}
          sortBy={{ curSort: 'sum', sum: 'desc' }}
          loadData={loadData}
        />
      ),
      windowCharts: (
        <>
          <BarChart
            data={monthsIncome}
            labels={months}
            options={defaultOptions}
            color="#3e95cd"
            chartClassName="panel__chart"
            wrapperClassName="panel__chart-wrapper"
            title="Доход за год"
          />
          <BarChart
            data={incomeByClients}
            labels={months}
            chartClassName="panel__chart"
            wrapperClassName="panel__chart-wrapper"
            title="Доход за год (по клиентам)"
            isStacked={true}
            options={{
              ...defaultOptions,
              legend: { position: 'right' },
            }}
          />
          <BarChart
            data={monthsAccumilationIncome}
            labels={months}
            options={defaultOptions}
            chartClassName="panel__chart"
            wrapperClassName="panel__chart-wrapper"
            title="График накопления"
          />
        </>
      ),
      content: (
        <BarChart
          data={monthsIncome}
          labels={months}
          options={defaultOptions}
          chartClassName="panel__chart"
          wrapperClassName="panel__chart-wrapper"
        />
      ),
      value: `${addSpaceDelimiter(
        Number.parseInt(Math.floor(curMonthIncome * 100) / 100),
      )} ₽`,
      prevValue: `${addSpaceDelimiter(
        Number.parseInt(Math.floor(prevMonthIncome * 100) / 100),
      )} ₽`,
      difference: curMonthIncome - prevMonthIncome,
      percentage:
        Math.floor(
          ((curMonthIncome - prevMonthIncome) /
            (prevMonthIncome === 0 ? 1 : prevMonthIncome)) *
            100 *
            100,
        ) / 100,
    }));
  };

  //При первой загрузке
  useEffect(() => {
    !stats.isLoaded && requests.length > 1 && getStats(requests);
  }, [requests]);

  //При обновлении тек. даты
  useEffect(() => {
    if (stats.isLoaded && requests.length > 1) {
      setStats((stats) => ({
        ...stats,
        timePeriod: timeText,
        curPeriod: curPeriod,
        currDate: currDate,
      }));
      getStats(requests);
    }
  }, [currDate]);

  return <BigPanel {...stats} />;
};

export default IncomeStatsBigPanel;
