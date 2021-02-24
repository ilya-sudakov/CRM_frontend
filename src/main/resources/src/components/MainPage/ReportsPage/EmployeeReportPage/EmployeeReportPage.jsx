import React, { useContext, useEffect, useState } from "react";
import SelectEmployee from "../../Dispatcher/Employees/SelectEmployee/SelectEmployee.jsx";
import Button from "../../../../utils/Form/Button/Button.jsx";
// import EmployeeInfoPanel from "./EmployeeInfo.jsx";
import EmployeeInfoPanel from "../../GeneralPage/ReportTablePage/EmployeeInfo/EmployeeInfo.jsx";
import ControlPanel from "../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import { formatDateString } from "../../../../utils/functions.jsx";
import useWorkReportByRange from "../../../../utils/hooks/useWorkReportByRange.js";
import UserContext from "../../../../App.js";
import "./EmployeeReportPage.scss";
import { months } from "../../../../utils/dataObjects.js";
import {
  getWeekDays,
  getPreviousMonthDates,
  getPreviousQuarterDates,
  getDaysArray,
} from "./functions.js";

const EmployeeReportPage = () => {
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState({
    startDate: getWeekDays(new Date()).startDate,
    endDate: getWeekDays(new Date()).endDate,
  });
  const [curPeriod, setCurPeriod] = useState("week");
  const userContext = useContext(UserContext);

  const handleEmployeeChange = (value, name, employee) => {
    return setSelectedInfo({
      employeeId: value,
      employeeName: name,
      employee: employee,
      worksId:
        workData
          .filter((item) => item.employee.id === value)
          .map((item) => {
            return item.id;
          }) ?? [],
      works: workData.filter((item) => item.employee.id === value) ?? [],
    });
  };

  const timePeriods = {
    week: {
      name: "Неделя",
      prevButton: {
        text: "Пред. неделя",
        onClick: () =>
          setSelectedDate((selectedDate) => {
            const newDate = new Date(
              new Date(selectedDate.startDate).setTime(
                selectedDate.startDate.getTime() - 7 * 24 * 60 * 60 * 1000
              )
            );
            return {
              startDate: newDate,
              endDate: getWeekDays(newDate).endDate,
            };
          }),
      },
      nextButton: {
        text: "Тек. неделя",
        onClick: () =>
          setSelectedDate({
            startDate: getWeekDays(new Date()).startDate,
            endDate: getWeekDays(new Date()).endDate,
          }),
      },
      getDateList: () =>
        getDaysArray(selectedDate.startDate, selectedDate.endDate),
      displayDates: () =>
        `${formatDateString(selectedDate.startDate)} - ${formatDateString(
          selectedDate.endDate
        )}`,
      initData: () =>
        setSelectedDate({
          startDate: getWeekDays(new Date()).startDate,
          endDate: getWeekDays(new Date()).endDate,
        }),
    },
    month: {
      name: "Месяц",
      prevButton: {
        text: "Пред. месяц",
        onClick: () =>
          setSelectedDate((selectedDate) => {
            return {
              startDate: getPreviousMonthDates(selectedDate.startDate)
                .startDate,
              endDate: getPreviousMonthDates(selectedDate.startDate).endDate,
            };
          }),
      },
      nextButton: {
        text: "Тек. месяц",
        onClick: () =>
          setSelectedDate({
            startDate: getPreviousMonthDates(new Date(), "current").startDate,
            endDate: getPreviousMonthDates(new Date(), "current").endDate,
          }),
      },
      getDateList: () =>
        getDaysArray(selectedDate.startDate, selectedDate.endDate),
      displayDates: () => months[selectedDate.startDate.getMonth()],
      initData: () =>
        setSelectedDate({
          startDate: getPreviousMonthDates(new Date(), "current").startDate,
          endDate: getPreviousMonthDates(new Date(), "current").endDate,
        }),
    },
    quarter: {
      name: "Квартал",
      prevButton: {
        text: "Пред. квартал",
        onClick: () =>
          setSelectedDate((selectedDate) => {
            return {
              startDate: getPreviousQuarterDates(selectedDate.endDate)
                .startDate,
              endDate: getPreviousQuarterDates(selectedDate.endDate).endDate,
            };
          }),
      },
      nextButton: {
        text: "Тек. квартал",
        onClick: () =>
          setSelectedDate({
            startDate: getPreviousQuarterDates(new Date(), "current").startDate,
            endDate: getPreviousQuarterDates(new Date(), "current").endDate,
          }),
      },
      getDateList: () =>
        getDaysArray(selectedDate.startDate, selectedDate.endDate),
      displayDates: () =>
        `${formatDateString(selectedDate.startDate)} - ${formatDateString(
          selectedDate.endDate
        )}`,
      initData: () =>
        setSelectedDate({
          startDate: getPreviousQuarterDates(new Date(), "current").startDate,
          endDate: getPreviousQuarterDates(new Date(), "current").endDate,
        }),
    },
  };

  const [workData, isLoadingWorkData] = useWorkReportByRange(
    timePeriods[curPeriod].getDateList()
  );

  useEffect(() => {
    // console.log(workData);

    if (selectedInfo !== null) {
      setSelectedInfo({
        ...selectedInfo,
        worksId:
          workData
            .filter((item) => item.employee.id === selectedInfo.employeeId)
            .map((item) => {
              return item.id;
            }) ?? [],
        works:
          workData.filter(
            (item) => item.employee.id === selectedInfo.employeeId
          ) ?? [],
      });
    }
  }, [workData, selectedDate]);

  return (
    <div className="employee-page">
      <div className="main-window">
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Отчет сотрудника</div>
        </div>
        <ControlPanel
          styles={{ marginTop: "-5px" }}
          itemsCount={timePeriods[curPeriod].displayDates()}
          buttons={
            <>
              <select
                className="main-window__select"
                onChange={({ target }) => {
                  setCurPeriod(target.value);
                  timePeriods[target.value].initData();
                }}
              >
                <option value="week">Неделя</option>
                <option value="month">Месяц</option>
                <option value="quarter">Квартал</option>
              </select>
              <Button
                text={timePeriods[curPeriod].prevButton.text}
                className="main-window__button main-window__button--inverted"
                inverted
                isLoading={isLoadingWorkData}
                onClick={timePeriods[curPeriod].prevButton.onClick}
              />
              <Button
                text={timePeriods[curPeriod].nextButton.text}
                className="main-window__button main-window__button--inverted"
                inverted
                isLoading={isLoadingWorkData}
                onClick={timePeriods[curPeriod].nextButton.onClick}
              />
            </>
          }
        />
        {!isLoadingWorkData ? (
          <div className="main-form">
            <SelectEmployee
              userHasAccess={userContext.userHasAccess}
              inputName="Выбор сотрудника"
              name="employee"
              handleEmployeeChange={handleEmployeeChange}
            />
          </div>
        ) : (
          <Button
            text="Идет загрузка"
            className="main-window__button employee-page__button--loading"
            isLoading={true}
          />
        )}
        {selectedInfo !== null && !isLoadingWorkData ? (
          <EmployeeInfoPanel
            selectedInfo={selectedInfo}
            dates={timePeriods[curPeriod].getDateList()}
          />
        ) : null}
      </div>
    </div>
  );
};

export default EmployeeReportPage;
