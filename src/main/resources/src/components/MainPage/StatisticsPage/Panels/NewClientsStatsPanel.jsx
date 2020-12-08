import React, { useState, useEffect } from "react";
import SmallPanel from "./SmallPanel.jsx";
import ClientsIcon from "../../../../../../../../assets/sidemenu/client.inline.svg";
import {
  addSpaceDelimiter,
  formatDateString,
  formatDateStringNoDate,
} from "../../../../utils/functions.jsx";

const NewClientsStatsPanel = ({ requests, curDate }) => {
  const [stats, setStats] = useState({
    category: "Новые клиенты",
    percentage: 0,
    value: null,
    linkTo: "/clients/categories",
    isLoaded: false,
    isLoading: false,
    timePeriod: "От прошлого месяца",
    difference: 0,
    renderIcon: () => <ClientsIcon className="panel__img panel__img--money" />,
  });

  const getStats = (requests, curDate = new Date()) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }));

    let clients = {};
    //filter all clients except once from cur and prev month
    const curMonth = formatDateStringNoDate(curDate);
    const oneMonthAgo = formatDateStringNoDate(new Date(curDate).setDate(0));

    let prevMonthNewClients = 0;
    let curMonthNewClients = 0;

    requests.filter((request) => {
      if (
        request.client !== null &&
        formatDateStringNoDate(request.date) !== oneMonthAgo &&
        formatDateStringNoDate(request.date) !== curMonth &&
        formatDateStringNoDate(request.date) < curMonth &&
        clients[request.client.id] === undefined
      ) {
        clients = {
          ...clients,
          [request.client.id]: "",
        };
        return false;
      }
      return true;
    });

    //find new clients from prev month
    requests.filter((request) => {
      if (
        request.client !== null &&
        formatDateStringNoDate(request.date) === oneMonthAgo &&
        clients[request.client.id] === undefined
      ) {
        prevMonthNewClients++;
        clients = {
          ...clients,
          [request.client.id]: "",
        };
        return false;
      }
      if (request.client === null) {
        return false;
      }
      return true;
    });

    //find new clients from cur month
    requests.map((request) => {
      if (
        request.client !== null &&
        formatDateStringNoDate(request.date) === curMonth &&
        clients[request.client.id] === undefined
      ) {
        curMonthNewClients++;
        clients = {
          ...clients,
          [request.client.id]: "",
        };
      }
    });

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      isLoading: false,
      value: addSpaceDelimiter(Math.floor(curMonthNewClients * 100) / 100),
      difference: curMonthNewClients - prevMonthNewClients,
      percentage:
        Math.floor(
          ((curMonthNewClients - prevMonthNewClients) /
            (prevMonthNewClients === 0 ? 1 : prevMonthNewClients)) *
            100 *
            100
        ) / 100,
    }));
  };

  //При первой загрузке
  useEffect(() => {
    !stats.isLoaded && requests.length > 1 && getStats(requests, curDate);
  }, [requests, stats]);

  //При обновлении тек. даты
  useEffect(() => {
    if (!stats.isLoading && requests.length > 1) {
      getStats(requests, curDate);
    }
  }, [curDate]);

  return <SmallPanel {...stats} />;
};

export default NewClientsStatsPanel;
