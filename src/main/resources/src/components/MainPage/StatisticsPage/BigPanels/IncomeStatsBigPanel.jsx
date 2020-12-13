import React, { useState, useEffect } from "react";
import MoneyIcon from "../../../../../../../../assets/etc/bx-ruble.inline.svg";
import { months } from "../../../../utils/dataObjects";
import { addSpaceDelimiter } from "../../../../utils/functions.jsx";
import { createGraph, loadCanvas } from "../../../../utils/graphs";
import {
  checkIfDateIsInRange,
  checkRequestsForSelectedMonth,
} from "../functions.js";
import RequestsList from "../Lists/RequestsList/RequestsList.jsx";
import BigPanel from "./BigPanel.jsx";

const IncomeStatsBigPanel = ({ requests, currDate, timeText, getPrevData }) => {
  const [stats, setStats] = useState({
    category: "Доход",
    percentage: 0,
    value: null,
    linkTo: "/requests",
    chartName: "IncomeStatsBigPanel",
    isLoaded: false,
    isLoading: false,
    timePeriod: timeText,
    difference: 0,
    renderIcon: () => <MoneyIcon className="panel__img panel__img--money" />,
  });
  const [graph, setGraph] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [canvasLoaded, setCanvasLoaded] = useState(false);

  const getStats = (requests) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
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

    let monthsIncome = {};
    for (let i = 0; i < 12; i++) {
      const newRequests = checkRequestsForSelectedMonth(
        requests,
        new Date(currDate.startDate.getFullYear(), i, 1)
      );
      const totalIncome = newRequests.reduce(
        (prev, cur) => prev + Number.parseFloat(cur.sum || 0),
        0
      );
      monthsIncome = {
        ...monthsIncome,
        [months[i]]: totalIncome,
      };
    }

    setStats((stats) => ({
      ...stats,
      windowContent: (
        <RequestsList
          title="Заявки за выбранный период"
          data={filteredRequests}
          sortBy={{ name: ["sum"], type: "DESC" }}
        />
      ),
      value: `${addSpaceDelimiter(
        Math.floor(curMonthIncome * 100) / 100
      )} руб.`,
      difference: curMonthIncome - prevMonthIncome,
      percentage:
        Math.floor(
          ((curMonthIncome - prevMonthIncome) /
            (prevMonthIncome === 0 ? 1 : prevMonthIncome)) *
            100 *
            100
        ) / 100,
    }));
    renderGraph(monthsIncome);
  };

  const renderGraph = (dataset) => {
    if (!canvasLoaded) {
      setStats((stats) => ({
        ...stats,
        isLoaded: true,
        isLoading: false,
      }));
      loadCanvas(
        `panel__chart-wrapper--${stats.chartName}`,
        `panel__chart panel__chart--${stats.chartName}`
      );
    }

    setCanvasLoaded(true);
    const options = {
      type: "bar",
      data: {
        labels: Object.entries(dataset).map((item) => item[0]),
        datasets: [
          {
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#bbbbbb",
              "#bbbbbb",
              "#bbbbbb",
              "#bbbbbb",
              "#bbbbbb",
              "#bbbbbb",
              "#bbbbbb",
              "#bbbbbb",
            ],
            data: Object.entries(dataset).map((item) => item[1]),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio:
          (window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth) > 500
            ? true
            : false,
        animation: {
          easing: "easeInOutCirc",
        },
        tooltips: {
          mode: "index",
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
              },
              ticks: {
                display:
                  (window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth) > 500
                    ? false
                    : true,
                beginAtZero: true,
              },
              scaleLabel: {
                display: false,
                labelString: "Сумма - руб.",
                fontStyle: "italic",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                display:
                  (window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth) > 500
                    ? true
                    : false,
              },
              maxBarThickness: 80,
              scaleLabel: {
                display: false,
                labelString: "Месяц",
                fontStyle: "italic",
              },
            },
          ],
        },
      },
    };
    setTimeout(() => {
      setIsLoading(false);
      canvasLoaded && graph.destroy();
      setGraph(
        createGraph(
          options,
          document.getElementsByClassName(`panel__chart--${stats.chartName}`)[0]
        )
      );
    }, 150);
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

  return <BigPanel {...stats} />;
};

export default IncomeStatsBigPanel;
