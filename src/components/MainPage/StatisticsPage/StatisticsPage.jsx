import React, { useEffect, useState } from "react";
import "./StatisticsPage.scss";
import { formatDateStringNoYear } from "../../../utils/functions.jsx";
import { months } from "../../../utils/dataObjects.js";

import ControlPanel from "../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import {
  getDaysArray,
  getPreviousMonthDates,
  getPreviousWeekDays,
  getPreviousQuarterDates,
  getPreviousYearDates,
} from "./functions.js";
import useTitleHeader from "../../../utils/hooks/uiComponents/useTitleHeader.js";
import ProductionPage from "./Pages/ProductionPage.jsx";
import RequestsPage from "./Pages/RequestsPage.jsx";

const StatisticsPage = () => {
  const [curPeriod, setCurPeriod] = useState("month");
  const { titleHeader, curPage } = useTitleHeader(
    "Статистика",
    [
      { pageTitle: "Заявки", pageName: "requests" },
      { pageTitle: "Производство", pageName: "production" },
    ],
    "requests"
  );
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
        text: "Тек. месяц",
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
      <ProductionPage curDate={new Date()} timePeriod={timePeriod[curPeriod]} />
    ),
  };

  useEffect(() => {}, [currDate]);

  return (
    <div className="statistics">
      <div className="main-window">
        {titleHeader}
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
