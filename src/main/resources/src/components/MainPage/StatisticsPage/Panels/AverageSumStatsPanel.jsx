import React, { useState, useEffect } from "react";
import SmallPanel from "./SmallPanel.jsx";
import MoneyIcon from "../../../../../../../../assets/etc/bx-ruble.inline.svg";
import {
  addSpaceDelimiter,
  formatDateStringNoDate,
} from "../../../../utils/functions.jsx";
import { checkIfDateIsInRange } from "../functions.js";

const AverageSumStatsPanel = ({
  requests,
  currDate,
  timeText,
  getPrevData,
}) => {
  const [stats, setStats] = useState({
    category: "Средняя сумма заказа",
    percentage: 0,
    value: null,
    linkTo: "/requests",
    isLoaded: false,
    isLoading: false,
    timePeriod: timeText,
    difference: 0,
    renderIcon: () => <MoneyIcon className="panel__img panel__img--money" />,
  });

  const getStats = (requests) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }));

    let curMonthAverage = 0;
    let prevMonthAverage = 0;
    let prevMonthLength = 0;
    let curMonthLength = 0;

    //check prev data
    let temp = requests.filter((request) => {
      const date = new Date(request.date);
      const prevMonth = getPrevData(currDate.startDate);
      if (
        checkIfDateIsInRange(date, prevMonth.startDate, prevMonth.endDate) &&
        request.status === "Завершено"
      ) {
        prevMonthLength++;
        prevMonthAverage += Number.parseFloat(request.sum || 0);
        return false;
      }
      if (request.status !== "Завершено") {
        return false;
      }
      return true;
    });

    temp.map((request) => {
      const date = new Date(request.date);
      if (
        checkIfDateIsInRange(date, currDate.startDate, currDate.endDate) &&
        request.status === "Завершено"
      ) {
        curMonthLength++;
        curMonthAverage += Number.parseFloat(request.sum || 0);
      }
    });

    curMonthAverage =
      curMonthAverage / (curMonthLength !== 0 ? curMonthLength : 1);
    prevMonthAverage =
      prevMonthAverage / (prevMonthLength !== 0 ? prevMonthLength : 1);

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      isLoading: false,
      value: `${addSpaceDelimiter(
        Math.floor(curMonthAverage * 100) / 100
      )} руб.`,
      difference: curMonthAverage - prevMonthAverage,
      percentage:
        Math.floor(
          ((curMonthAverage - prevMonthAverage) /
            (prevMonthAverage === 0 ? 1 : prevMonthAverage)) *
            100 *
            100
        ) / 100,
    }));
  };

  //При первой загрузке
  useEffect(() => {
    !stats.isLoaded && requests.length > 1 && getStats(requests);
  }, [requests, stats]);

  //При обновлении тек. даты
  useEffect(() => {
    if (!stats.isLoading && requests.length > 1) {
      getStats(requests);
    }
  }, [currDate]);

  return <SmallPanel {...stats} />;
};

export default AverageSumStatsPanel;
