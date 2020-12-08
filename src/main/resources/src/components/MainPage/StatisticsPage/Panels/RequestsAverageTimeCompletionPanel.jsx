import React, { useState, useEffect } from "react";
import SmallPanel from "./SmallPanel.jsx";
import TimeIcon from "../../../../../../../../assets/etc/time.inline.svg";
import {
  dateDiffInDays,
  formatDateStringNoDate,
} from "../../../../utils/functions.jsx";
import { checkIfDateIsInRange, getPreviousMonthDates } from "../functions.js";

const RequestsAverageTimeCompletionPanel = ({
  requests,
  currDate,
  timeText,
}) => {
  const [stats, setStats] = useState({
    category: "Средняя прод. выполнения заказа",
    percentage: 0,
    value: null,
    linkTo: "/requests",
    isLoaded: false,
    isLoading: false,
    timePeriod: timeText,
    difference: 0,
    invertedStats: true,
    renderIcon: () => <TimeIcon className="panel__img panel__img--time" />,
  });

  const getStats = (requests) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }));

    let curMonthQuantity = 0;
    let prevMonthQuantity = 0;
    let curMonthAverage = 0;
    let prevMonthAverage = 0;

    //check prev month
    let temp = requests.filter((request) => {
      const date = new Date(request.date);
      const prevMonth = getPreviousMonthDates(currDate.startDate);
      if (
        checkIfDateIsInRange(date, prevMonth.startDate, prevMonth.endDate) &&
        request.status === "Завершено"
      ) {
        prevMonthAverage += dateDiffInDays(
          new Date(request.date),
          new Date(request.shippingDate || new Date())
        );
        prevMonthQuantity++;
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
        curMonthAverage += dateDiffInDays(
          new Date(request.date),
          new Date(request.shippingDate || new Date())
        );
        return curMonthQuantity++;
      }
    });

    curMonthAverage =
      curMonthAverage / (curMonthQuantity !== 0 ? curMonthQuantity : 1);
    prevMonthAverage =
      prevMonthAverage / (prevMonthQuantity !== 0 ? prevMonthQuantity : 1);

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      isLoading: false,
      value:
        Math.floor(curMonthAverage * 100) / 100 === 0
          ? "Нет данных"
          : `${Math.floor(curMonthAverage * 100) / 100} дн.`,
      difference:
        Math.floor(curMonthAverage * 100) / 100 === 0
          ? 0
          : curMonthAverage - prevMonthAverage,
      percentage:
        Math.floor(curMonthAverage * 100) / 100 === 0
          ? 0
          : Math.floor(
              ((curMonthAverage - prevMonthAverage) /
                (prevMonthAverage !== 0 ? prevMonthAverage : 1)) *
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

export default RequestsAverageTimeCompletionPanel;
