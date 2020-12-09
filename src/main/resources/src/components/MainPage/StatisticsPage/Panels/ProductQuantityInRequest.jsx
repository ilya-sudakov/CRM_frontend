import React, { useState, useEffect } from "react";
import SmallPanel from "./SmallPanel.jsx";
import PlaylistIcon from "../../../../../../../../assets/sidemenu/play_list.inline.svg";
import { checkIfDateIsInRange } from "../functions.js";
import RequestsList from "../Lists/RequestsList/RequestsList.jsx";

const ProductQuantityInRequest = ({
  requests,
  currDate,
  timeText,
  getPrevData,
}) => {
  const [stats, setStats] = useState({
    category: "Среднее кол-во позиций в заказе",
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

  const getStats = (requests) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }));

    let curMonthAverage = 0;
    let prevMonthAverage = 0;
    let curMonthQuantity = 0;
    let prevMonthQuantity = 0;

    //check prev month
    let temp = requests.filter((request) => {
      const date = request.date;
      const prevMonth = getPrevData(currDate.startDate);
      if (checkIfDateIsInRange(date, prevMonth.startDate, prevMonth.endDate)) {
        prevMonthAverage += request.requestProducts.length;
        prevMonthQuantity++;
        return false;
      }
      return true;
    });

    const filteredRequests = temp.filter((request) => {
      const date = request.date;
      if (checkIfDateIsInRange(date, currDate.startDate, currDate.endDate)) {
        curMonthAverage += request.requestProducts.length;
        curMonthQuantity++;
        return true;
      }
      return false;
    });

    curMonthAverage =
      curMonthAverage / (curMonthQuantity !== 0 ? curMonthQuantity : 1);
    prevMonthAverage =
      prevMonthAverage / (prevMonthQuantity !== 0 ? prevMonthQuantity : 1);

    setStats((stats) => ({
      ...stats,
      windowContent: (
        <RequestsList
          title="Заявки за выбранный период"
          data={filteredRequests}
          sortBy={{ name: ["sum"], type: "DESC" }}
        />
      ),
      isLoaded: true,
      isLoading: false,
      value: Math.floor(curMonthAverage * 100) / 100,
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
    setStats((stats) => {
      return { ...stats, timePeriod: timeText };
    });
    if (!stats.isLoading && requests.length > 1) {
      getStats(requests);
    }
  }, [currDate]);

  return <SmallPanel {...stats} />;
};

export default ProductQuantityInRequest;
