import React, { useState, useEffect } from "react";
import SmallPanel from "./SmallPanel.jsx";
import PlaylistIcon from "../../../../../../../../assets/sidemenu/play_list.inline.svg";
import { checkIfDateIsInRange, getPreviousMonthDates } from "../functions.js";

const RequestsQuantityPanel = ({ requests, currDate, timeText }) => {
  const [stats, setStats] = useState({
    category: "Заявки",
    percentage: 0,
    value: null,
    linkTo: "/requests",
    isLoaded: false,
    isLoading: false,
    timePeriod: timeText,
    difference: 0,
    renderIcon: () => (
      <PlaylistIcon className="panel__img panel__img--requests" />
    ),
  });

  const getRequestQuantityStats = (requests) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }));

    let curMonthQuantity = 0;
    let prevMonthQuantity = 0;

    //check prev month
    let temp = requests.filter((request) => {
      const date = new Date(request.date);
      const prevMonth = getPreviousMonthDates(currDate.startDate);
      if (checkIfDateIsInRange(date, prevMonth.startDate, prevMonth.endDate)) {
        prevMonthQuantity++;
        return false;
      }
      return true;
    });

    //check cur month
    temp.map((request) => {
      const date = new Date(request.date);
      if (checkIfDateIsInRange(date, currDate.startDate, currDate.endDate)) {
        curMonthQuantity++;
      }
    });

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      isLoading: false,
      value: curMonthQuantity,
      difference: curMonthQuantity - prevMonthQuantity,
      percentage:
        Math.floor(
          ((curMonthQuantity - prevMonthQuantity) / prevMonthQuantity) *
            100 *
            100
        ) / 100,
    }));
  };

  //При первой загрузке
  useEffect(() => {
    if (!stats.isLoaded && !stats.isLoading && requests.length > 1) {
      getRequestQuantityStats(requests);
    }
  }, [requests, stats]);

  //При обновлении тек. даты
  useEffect(() => {
    if (!stats.isLoading && requests.length > 1) {
      getRequestQuantityStats(requests);
    }
  }, [currDate]);

  return <SmallPanel {...stats} />;
};

export default RequestsQuantityPanel;
