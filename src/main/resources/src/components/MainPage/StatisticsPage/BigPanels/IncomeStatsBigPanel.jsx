import React, { useState, useEffect } from "react";
import MoneyIcon from "../../../../../../../../assets/etc/bx-ruble.inline.svg";
import { months } from "../../../../utils/dataObjects";
import {
  addSpaceDelimiter,
  getRandomColor,
  getRandomNiceColor,
} from "../../../../utils/functions.jsx";
import {
  checkIfDateIsInRange,
  checkRequestsForSelectedMonth,
} from "../functions.js";
import RequestsList from "../Lists/RequestsList/RequestsList.jsx";
import BigPanel from "./BigPanel.jsx";
import BarChart from "../../../../utils/Charts/BarChart/BarChart.jsx";
import {
  tooltipLabelRubles,
  tooltipLabelPercent,
} from "../../../../utils/Charts/callbacks.js";

const IncomeStatsBigPanel = ({
  requests,
  currDate,
  timeText,
  getPrevData,
  loadData,
  curPeriod,
}) => {
  const [stats, setStats] = useState({
    category: "Доход",
    percentage: 0,
    value: null,
    linkTo: "/requests",
    chartName: "IncomeStatsBigPanel",
    isLoaded: false,
    timePeriod: timeText,
    difference: 0,
    curPeriod: curPeriod,
    currDate: currDate,
    renderIcon: () => <MoneyIcon className="panel__img panel__img--money" />,
  });

  const getFullYearData = (requests, currDate) => {
    let monthsIncome = [];
    const curYear = currDate.startDate.getFullYear();
    const curMonth = currDate.startDate.getMonth();
    for (let i = 0; i < 12; i++) {
      const newRequests = checkRequestsForSelectedMonth(
        requests,
        new Date(curYear, i, 1)
      );
      const totalIncome = newRequests.reduce(
        (prev, cur) => prev + Number.parseFloat(cur.sum ?? 0),
        0
      );

      console.log(curMonth);

      monthsIncome.push({
        value: totalIncome,
        label: months[i],
        color:
          curMonth === i
            ? "#B74F3B"
            : curMonth - 1 === i
            ? "#3BB7B6"
            : "#cccccc",
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
        new Date(curYear, i, 1)
      );

      const curMonthIncome = newRequests.reduce(
        (prev, cur) => prev + Number.parseFloat(cur.sum || 0),
        0
      );

      if (isFutureMonth(i)) {
        monthsIncome.push({
          value: 0,
          label: months[i],
          color: "#3e95cd",
        });
      } else {
        totalSum += curMonthIncome;
        monthsIncome.push({
          value: totalSum,
          label: months[i],
          color: "#3e95cd",
        });
      }
    }
    return monthsIncome;
  };

  const getIncomeByClients = (requests, currDate) => {
    let clients = {};

    const colors = [
      "#173635",
      "#1a4f4e",
      "#196a69",
      "#148685",
      "#00a3a2",
      "#50b2b1",
      "#79c2c0",
      "#9cd1cf",
      "#bee0df",
      "#def0ef",
    ];

    requests.map((request) => {
      const curId = request?.client?.id;

      if (curId && clients[curId] === undefined) {
        const filteredRequests = requests.filter(
          (item) => item.client?.id === curId
        );

        const dataset = getFullYearData(filteredRequests, currDate).map(
          (item) => item.value
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
    const newClients = Object.values(clients)
      .sort((a, b) => {
        const sumA = a.data.reduce((prev, cur) => prev + cur, 0);
        const sumB = b.data.reduce((prev, cur) => prev + cur, 0);
        if (sumA < sumB) return 1;
        if (sumA > sumB) return -1;
        return 0;
      })
      .splice(0, 10);

    return newClients.map((item, index) => {
      return { ...item, color: colors[index] };
    });
  };

  const getStats = (requests) => {
    setStats((stats) => ({
      ...stats,
      isLoaded: false,
    }));

    let curMonthIncome = 0;
    let prevMonthIncome = 0;

    //check prev month
    let temp = requests.filter((request) => {
      const date = new Date(request.date);
      const prevMonth = getPrevData(currDate.startDate);
      if (
        checkIfDateIsInRange(date, prevMonth.startDate, prevMonth.endDate) &&
        request.status === "Завершено"
      ) {
        prevMonthIncome += Number.parseFloat(request.sum || 0);
        return false;
      }
      if (request.status !== "Завершено") {
        return false;
      }
      return true;
    });

    //check cur month
    const filteredRequests = temp.filter((request) => {
      const date = new Date(request.date);
      if (
        checkIfDateIsInRange(date, currDate.startDate, currDate.endDate) &&
        request.status === "Завершено"
      ) {
        curMonthIncome += Number.parseFloat(request.sum || 0);
        return true;
      }
      return false;
    });

    const monthsIncome = getFullYearData(requests, currDate);
    const monthsAccumilationIncome = getFullYearAccumilationData(
      requests,
      currDate
    );
    const incomeByClients = getIncomeByClients(requests, currDate);

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      windowContent: (
        <RequestsList
          title="Заявки за выбранный период"
          data={filteredRequests}
          sortBy={{ curSort: "sum", sum: "desc" }}
          loadData={loadData}
        />
      ),
      windowCharts: (
        <>
          <BarChart
            data={monthsIncome}
            labels={months}
            options={{
              legend: { display: false },
              tooltips: {
                callbacks: {
                  label: (tooltipItem, data) =>
                    tooltipLabelRubles(tooltipItem, data),
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
            }}
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
              scales: {
                xAxes: { gridLines: { display: false } },
                yAxes: {
                  ticks: {
                    callback: (value) => `${addSpaceDelimiter(value)} ₽`,
                  },
                },
              },
              tooltips: {
                callbacks: {
                  label: (tooltipItem, data) =>
                    tooltipLabelRubles(tooltipItem, data),
                },
              },
              legend: { position: "right" },
            }}
          />
          <BarChart
            data={monthsAccumilationIncome}
            labels={months}
            options={{
              legend: { display: false },
              tooltips: {
                callbacks: {
                  label: (tooltipItem, data) =>
                    tooltipLabelRubles(tooltipItem, data),
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
            }}
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
          options={{
            legend: { display: false },
            tooltips: {
              callbacks: {
                label: (tooltipItem, data) =>
                  tooltipLabelRubles(tooltipItem, data),
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
          }}
          chartClassName="panel__chart"
          wrapperClassName="panel__chart-wrapper"
        />
      ),
      value: `${addSpaceDelimiter(
        Number.parseInt(Math.floor(curMonthIncome * 100) / 100)
      )} ₽`,
      prevValue: `${addSpaceDelimiter(
        Number.parseInt(Math.floor(prevMonthIncome * 100) / 100)
      )} ₽`,
      difference: curMonthIncome - prevMonthIncome,
      percentage:
        Math.floor(
          ((curMonthIncome - prevMonthIncome) /
            (prevMonthIncome === 0 ? 1 : prevMonthIncome)) *
            100 *
            100
        ) / 100,
    }));
  };

  //При первой загрузке
  useEffect(() => {
    console.log("first render");
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
