import React, { useEffect, useState } from "react";
import "./StatisticsPage.scss";

import { getRequests } from "../../../utils/RequestsAPI/Requests.jsx";
import { getStamp } from "../../../utils/RequestsAPI/Rigging/Stamp.jsx";
import { getRecordedWorkByDateRange } from "../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx";
import { formatDateStringNoYear } from "../../../utils/functions.jsx";
import { months } from "../../../utils/dataObjects.js";

import RequestsQuantityPanel from "./Panels/RequestsQuantityPanel.jsx";
import IncomeStatsPanel from "./Panels/IncomeStatsPanel.jsx";
import AverageSumStatsPanel from "./Panels/AverageSumStatsPanel.jsx";
import NewClientsStatsPanel from "./Panels/NewClientsStatsPanel.jsx";
import NewOldClientsStatsPanel from "./Panels/NewOldClientsStatsPanel.jsx";
import ManagerEfficiencyGraphPanel from "./Graphs/ManagerEfficiencyGraphPanel.jsx";
import ManagerMoneyGraphPanel from "./Graphs/ManagerMoneyGraphPanel.jsx";
import RequestsAverageTimeCompletion from "./Panels/RequestsAverageTimeCompletionPanel.jsx";
import ProductQuantityInRequest from "./Panels/ProductQuantityInRequest.jsx";
import ClientTypeDistributionInRequests from "./Graphs/ClientTypeDistributionInRequests.jsx";
import RiggingItemsQuantityForType from "./Graphs/RiggingItemsQuantityForType.jsx";
import ProductQuantityProduced from "./Panels/ProductQuantityProduced.jsx";
import AverageProductQuantityProduced from "./Panels/AverageProductQuantityProduced.jsx";
import OnTimeRequestsDistribution from "./Panels/OnTimeRequestsDistribution.jsx";
import IncomeStatsBigPanel from "./BigPanels/IncomeStatsBigPanel.jsx";

import ControlPanel from "../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import useDraftsList from "../../../utils/hooks/useDraftsList";
import {
  getDaysArray,
  getPreviousMonthDates,
  getPreviousWeekDays,
  getPreviousQuarterDates,
  getPreviousYearDates,
} from "./functions.js";

const StatisticsPage = () => {
  const [curPage, setCurPage] = useState("requests");

  const [curDate, setCurDate] = useState(new Date());
  const [curPeriod, setCurPeriod] = useState("month");
  const [currDate, setCurrDate] = useState({
    startDate: getPreviousMonthDates(new Date(), "current").startDate,
    endDate: getPreviousMonthDates(new Date(), "current").endDate,
  });

  const timePeriod = {
    month: {
      name: "Месяц",
      prevButton: {
        text: "Пред. месяц",
        onClick: () =>
          setCurrDate({
            startDate: getPreviousMonthDates(currDate.startDate).startDate,
            endDate: getPreviousMonthDates(currDate.startDate).endDate,
          }),
      },
      nextButton: {
        text: `${months[new Date().getMonth()]}`,
        onClick: () =>
          setCurrDate({
            startDate: getPreviousMonthDates(new Date(), "current").startDate,
            endDate: getPreviousMonthDates(new Date(), "current").endDate,
          }),
      },
      getDateList: () => getDaysArray(currDate.startDate, currDate.endDate),
      displayDates: () => currDate.startDate.getMonth(),
      initData: () =>
        setCurrDate({
          startDate: getPreviousMonthDates(new Date(), "current").startDate,
          endDate: getPreviousMonthDates(new Date(), "current").endDate,
        }),
      timeTextSmallPanel: "От прошлого месяца",
      timeTextGraphPanel: months[currDate.startDate.getMonth()],
      itemsCount: `${months[currDate.startDate.getMonth()]}`,
      getPrevData: (date, value) => getPreviousMonthDates(date, value),
    },
    week: {
      name: "Неделя",
      prevButton: {
        text: "Пред. неделя",
        onClick: () =>
          setCurrDate({
            startDate: getPreviousWeekDays(currDate.startDate).startDate,
            endDate: getPreviousWeekDays(currDate.startDate).endDate,
          }),
      },
      nextButton: {
        text: "Тек. неделя",
        onClick: () =>
          setCurrDate({
            startDate: getPreviousWeekDays(new Date(), "current").startDate,
            endDate: getPreviousWeekDays(new Date(), "current").endDate,
          }),
      },
      getDateList: () => getDaysArray(currDate.startDate, currDate.endDate),
      displayDates: () => currDate.startDate.getMonth(),
      initData: () =>
        setCurrDate({
          startDate: getPreviousWeekDays(new Date(), "current").startDate,
          endDate: getPreviousWeekDays(new Date(), "current").endDate,
        }),
      timeTextSmallPanel: "От прошлой недели",
      timeTextGraphPanel: `${formatDateStringNoYear(
        currDate.startDate
      )} - ${formatDateStringNoYear(currDate.endDate)}`,
      itemsCount: `${formatDateStringNoYear(
        currDate.startDate
      )} - ${formatDateStringNoYear(currDate.endDate)}`,
      getPrevData: (date, value) => getPreviousWeekDays(date, value),
    },
    quarter: {
      name: "Квартал",
      prevButton: {
        text: "Пред. квартал",
        onClick: () =>
          setCurrDate({
            startDate: getPreviousQuarterDates(currDate.startDate).startDate,
            endDate: getPreviousQuarterDates(currDate.startDate).endDate,
          }),
      },
      nextButton: {
        text: "Тек. квартал",
        onClick: () =>
          setCurrDate({
            startDate: getPreviousQuarterDates(new Date(), "current").startDate,
            endDate: getPreviousQuarterDates(new Date(), "current").endDate,
          }),
      },
      getDateList: () => getDaysArray(currDate.startDate, currDate.endDate),
      displayDates: () => currDate.startDate.getMonth(),
      initData: () =>
        setCurrDate({
          startDate: getPreviousQuarterDates(new Date(), "current").startDate,
          endDate: getPreviousQuarterDates(new Date(), "current").endDate,
        }),
      timeTextSmallPanel: "От прошлого квартала",
      timeTextGraphPanel: `${formatDateStringNoYear(
        currDate.startDate
      )} - ${formatDateStringNoYear(currDate.endDate)}`,
      itemsCount: `${formatDateStringNoYear(
        currDate.startDate
      )} - ${formatDateStringNoYear(currDate.endDate)}`,
      getPrevData: (date, value) => getPreviousQuarterDates(date, value),
    },
    year: {
      name: "Год",
      prevButton: {
        text: "Пред. год",
        onClick: () =>
          setCurrDate({
            startDate: getPreviousYearDates(currDate.startDate).startDate,
            endDate: getPreviousYearDates(currDate.startDate).endDate,
          }),
      },
      nextButton: {
        text: "Тек. год",
        onClick: () =>
          setCurrDate({
            startDate: getPreviousYearDates(new Date(), "current").startDate,
            endDate: getPreviousYearDates(new Date(), "current").endDate,
          }),
      },
      getDateList: () => getDaysArray(currDate.startDate, currDate.endDate),
      displayDates: () => currDate.startDate.getMonth(),
      initData: () =>
        setCurrDate({
          startDate: getPreviousYearDates(new Date(), "current").startDate,
          endDate: getPreviousYearDates(new Date(), "current").endDate,
        }),
      timeTextSmallPanel: "От прошлого года",
      timeTextGraphPanel: currDate.startDate.getFullYear(),
      itemsCount: currDate.startDate.getFullYear(),
      getPrevData: (date, value) => getPreviousYearDates(date, value),
    },
  };

  const pages = {
    requests: () => (
      <RequestsPage currDate={currDate} timePeriod={timePeriod[curPeriod]} />
    ),
    production: () => (
      <ProductionPage curDate={curDate} timePeriod={timePeriod[curPeriod]} />
    ),
  };

  useEffect(() => {}, [currDate]);

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
              <select
                className="main-window__select"
                onChange={({ target }) => {
                  setCurPeriod(target.value);
                  timePeriod[target.value].initData();
                }}
              >
                <option value="month">Месяц</option>
                <option value="week">Неделя</option>
                <option value="quarter">Квартал</option>
                <option value="year">Год</option>
              </select>
              <div
                className="main-window__button main-window__button--inverted"
                onClick={() => timePeriod[curPeriod].prevButton.onClick()}
              >
                {timePeriod[curPeriod].prevButton.text}
              </div>
              <div
                className="main-window__button main-window__button--inverted"
                onClick={() => timePeriod[curPeriod].nextButton.onClick()}
              >
                {timePeriod[curPeriod].nextButton.text}
              </div>
            </>
          }
          itemsCount={timePeriod[curPeriod].itemsCount}
        />
        {pages[curPage]()}
      </div>
    </div>
  );
};

export default StatisticsPage;

const RequestsPage = ({ currDate, timePeriod }) => {
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
        <IncomeStatsBigPanel
          currDate={currDate}
          requests={requests}
          timeText={timePeriod.timeTextSmallPanel}
          getPrevData={timePeriod.getPrevData}
        />
        <RequestsQuantityPanel
          currDate={currDate}
          requests={requests}
          timeText={timePeriod.timeTextSmallPanel}
          getPrevData={timePeriod.getPrevData}
        />
        <OnTimeRequestsDistribution
          currDate={currDate}
          requests={requests}
          timeText={timePeriod.timeTextSmallPanel}
          getPrevData={timePeriod.getPrevData}
        />
      </div>
      <div className="statistics__row statistics__row--full">
        <NewClientsStatsPanel
          currDate={currDate}
          requests={requests}
          timeText={timePeriod.timeTextSmallPanel}
          getPrevData={timePeriod.getPrevData}
        />
        <NewOldClientsStatsPanel
          currDate={currDate}
          requests={requests}
          timeText={timePeriod.timeTextSmallPanel}
          getPrevData={timePeriod.getPrevData}
        />
      </div>
      <div className="statistics__row">
        <ManagerEfficiencyGraphPanel
          currDate={currDate}
          data={requests}
          timeText={timePeriod.timeTextGraphPanel}
        />
        <ManagerMoneyGraphPanel
          currDate={currDate}
          data={requests}
          timeText={timePeriod.timeTextGraphPanel}
        />
      </div>
      <div className="statistics__row statistics__row--full">
        <ProductQuantityInRequest
          currDate={currDate}
          requests={requests}
          timeText={timePeriod.timeTextSmallPanel}
          getPrevData={timePeriod.getPrevData}
        />
        <AverageSumStatsPanel
          currDate={currDate}
          requests={requests}
          timeText={timePeriod.timeTextSmallPanel}
          getPrevData={timePeriod.getPrevData}
        />
        <RequestsAverageTimeCompletion
          currDate={currDate}
          requests={requests}
          timeText={timePeriod.timeTextSmallPanel}
          getPrevData={timePeriod.getPrevData}
        />
      </div>
      <div className="statistics__row">
        <ClientTypeDistributionInRequests
          currDate={currDate}
          data={requests}
          timeText={timePeriod.timeTextGraphPanel}
        />
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
