import React, { useState, useEffect } from "react";
import SmallPanel from "./SmallPanel.jsx";
import PlaylistIcon from "../../../../../../../../assets/sidemenu/play_list.inline.svg";
import { checkIfDateIsInRange } from "../functions.js";
import RequestsList from "../Lists/RequestsList/RequestsList.jsx";

const RequestsQuantityPanel = ({
  requests,
  currDate,
  timeText,
  getPrevData,
}) => {
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
      const prevMonth = getPrevData(currDate.startDate);
      if (checkIfDateIsInRange(date, prevMonth.startDate, prevMonth.endDate)) {
        prevMonthQuantity++;
        return false;
      }
      return true;
    });

    //check cur month
    let tempMonth = [];
    temp.map((request) => {
      const date = new Date(request.date);
      if (checkIfDateIsInRange(date, currDate.startDate, currDate.endDate)) {
        curMonthQuantity++;
        tempMonth.push(request);
      }
    });

    setStats((stats) => ({
      ...stats,
      windowContent: (
        <RequestsList
          title="Заявки за выбранный период"
          data={tempMonth}
          sortBy={{ name: ["sum"], type: "DESC" }}
        />
      ),
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
    setStats((stats) => {
      return { ...stats, timePeriod: timeText };
    });
    if (!stats.isLoading && requests.length > 1) {
      getRequestQuantityStats(requests);
    }
  }, [currDate, timeText]);

  return <SmallPanel {...stats} />;
};

export default RequestsQuantityPanel;
