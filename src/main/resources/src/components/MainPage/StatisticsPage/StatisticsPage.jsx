import React, { useEffect, useState } from "react";
import "./StatisticsPage.scss";

import { getRequests } from "../../../utils/RequestsAPI/Requests.jsx";
import { getStamp } from "../../../utils/RequestsAPI/Rigging/Stamp.jsx";
import { getRecordedWorkByDateRange } from "../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx";
import { formatDateStringNoDate } from "../../../utils/functions.jsx";
import { months } from "../../../utils/dataObjects.js";

import RequestsQuantityPanel from "./Panels/RequestsQuantityPanel.jsx";
import IncomeStatsPanel from "./Panels/IncomeStatsPanel.jsx";
import AverageSumStatsPanel from "./Panels/AverageSumStatsPanel.jsx";
import NewClientsStatsPanel from "./Panels/NewClientsStatsPanel.jsx";
import RequestsQuantityGraphPanel from "./Graphs/RequestsQuantityGraphPanel.jsx";
import ManagerEfficiencyGraphPanel from "./Graphs/ManagerEfficiencyGraphPanel.jsx";
import ManagerMoneyGraphPanel from "./Graphs/ManagerMoneyGraphPanel.jsx";
import RequestsAverageTimeCompletion from "./Panels/RequestsAverageTimeCompletionPanel.jsx";
import ProductQuantityInRequest from "./Panels/ProductQuantityInRequest.jsx";
import ClientTypeDistributionInRequests from "./Graphs/ClientTypeDistributionInRequests.jsx";
import RiggingItemsQuantityForType from "./Graphs/RiggingItemsQuantityForType.jsx";
import ProductQuantityProduced from "./Panels/ProductQuantityProduced.jsx";
import AverageProductQuantityProduced from "./Panels/AverageProductQuantityProduced.jsx";
import OnTimeRequestsDistribution from "./Panels/OnTimeRequestsDistribution.jsx";

import ControlPanel from "../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import useDraftsList from "../../../utils/hooks/useDraftsList";
import { getDaysArray, getMonthDates } from "./functions.js";

const StatisticsPage = () => {
  const [curPage, setCurPage] = useState("requests");

  const [curDate, setCurDate] = useState(new Date());

  const timePeriods = {
    month: {
      name: "Месяц",
      prevButton: {
        text: "Пред. месяц",
        onClick: () => {
          const newDate = new Date(
            new Date(curDate.startDate).setMonth(curDate.getMonth() - 1)
          );
          setCurDate({
            startDate: getMonthDates(newDate).startDate,
            endDate: getMonthDates(newDate).endDate,
          });
        },
      },
      nextButton: {
        text: "Тек. месяц",
        onClick: () => {
          setCurDate({
            startDate: getMonthDates(new Date()).startDate,
            endDate: getMonthDates(new Date()).endDate,
          });
        },
      },
      getDateList: () => getDaysArray(curDate.startDate, curDate.endDate),
      displayDates: () => curDate.startDate.getMonth(),
      initData: () =>
        setCurDate({
          startDate: getMonthDates(new Date()).startDate,
          endDate: getMonthDates(new Date()).endDate,
        }),
    },
  };

  const pages = {
    requests: () => <RequestsPage curDate={curDate} />,
    production: () => <ProductionPage curDate={curDate} />,
  };

  useEffect(() => {
    // console.log(curDate)
  }, [curDate]);

  return (
    <div className="statistics">
      <div className="main-window">
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Статистика</div>
          <div className="main-window__menu">
            <div
              className={`main-window__item ${
                curPage === "requests" ? "main-window__item--active" : ""
              }`}
              onClick={() => setCurPage("requests")}
            >
              Заказы
            </div>
            <div
              className={`main-window__item ${
                curPage === "production" ? "main-window__item--active" : ""
              }`}
              onClick={() => setCurPage("production")}
            >
              Производство
            </div>
          </div>
        </div>
        <ControlPanel
          buttons={
            <>
              <div
                className="main-window__button main-window__button--inverted"
                onClick={() =>
                  setCurDate((curDate) => new Date(curDate.setDate(0)))
                }
              >
                Пред. месяц
              </div>
              <div
                className="main-window__button main-window__button--inverted"
                onClick={() => setCurDate(new Date())}
              >
                {`${months[new Date().getMonth()]}`}
              </div>
            </>
          }
          itemsCount={`Выбранный период: ${formatDateStringNoDate(curDate)}`}
        />
        {pages[curPage]()}
      </div>
    </div>
  );
};

export default StatisticsPage;

const RequestsPage = ({ curDate }) => {
  const [requests, setRequests] = useState([]);
  const [requestsLoaded, setRequestsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadRequests = (signal) => {
    if (!requestsLoaded && !isLoading) {
      setIsLoading(true);
      getRequests(signal)
        .then((res) => res.json())
        .then((res) => {
          setRequestsLoaded(true);
          setRequests([...res]);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setRequestsLoaded(true);
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    loadRequests(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, []);

  return (
    <div className="statistics__page-wrapper">
      <div className="statistics__row">
        <RequestsQuantityPanel curDate={curDate} requests={requests} />
        <IncomeStatsPanel curDate={curDate} requests={requests} />
        <AverageSumStatsPanel curDate={curDate} requests={requests} />
        <RequestsAverageTimeCompletion curDate={curDate} requests={requests} />
      </div>
      <div className="statistics__row">
        <ManagerEfficiencyGraphPanel curDate={curDate} data={requests} />
        <ManagerMoneyGraphPanel curDate={curDate} data={requests} />
      </div>
      <div className="statistics__row">
        <NewClientsStatsPanel curDate={curDate} requests={requests} />
        <ProductQuantityInRequest curDate={curDate} requests={requests} />
        <OnTimeRequestsDistribution curDate={curDate} requests={requests} />
      </div>
      <div className="statistics__row">
        <RequestsQuantityGraphPanel curDate={curDate} data={requests} />
        <ClientTypeDistributionInRequests curDate={curDate} data={requests} />
      </div>
    </div>
  );
};

const ProductionPage = ({ curDate }) => {
  const { drafts, isLoadingDrafts } = useDraftsList();

  const [workData, setWorkData] = useState([]);

  const getDataForTwoWeeks = (signal) => {
    let curMonday = curDate;
    let prevMonday = curDate;

    prevMonday = new Date(
      prevMonday.setDate(
        prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7) - 7
      )
    );
    getRecordedWorkByDateRange(
      prevMonday.getDate(),
      prevMonday.getMonth() + 1,
      curMonday.getDate(),
      curMonday.getMonth() + 1,
      signal
    )
      .then((res) => res.json())
      .then((res) => {
        setWorkData([...res]);
      });
  };

  useEffect(() => {
    const abortController = new AbortController();
    getDataForTwoWeeks(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, [curDate]);

  return (
    <div className="statistics__page-wrapper">
      <div className="statistics__row">
        {/* <ProductQuantityProduced data={workData} curDate={curDate} />
        <AverageProductQuantityProduced data={workData} curDate={curDate} /> */}
      </div>
      <div className="statistics__row">
        <RiggingItemsQuantityForType data={drafts} />
      </div>
    </div>
  );
};
