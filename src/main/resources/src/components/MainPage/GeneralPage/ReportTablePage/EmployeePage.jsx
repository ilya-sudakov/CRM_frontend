import React, { useEffect, useState } from "react";
import SelectEmployee from "../../Dispatcher/Employees/SelectEmployee/SelectEmployee.jsx";
import Button from "../../../../utils/Form/Button/Button.jsx";
import EmployeeInfo from "./EmployeeInfo.jsx";
import ControlPanel from "../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import { formatDateString } from "../../../../utils/functions.jsx";
import useWorkReportByRange from "../../../../utils/hooks/useWorkReportByRange.js";

const getWeekDays = (date) => {
  let week = [];
  let curDate = new Date(date);

  for (let i = 1; i <= 7; i++) {
    const first = curDate.getDate() - curDate.getDay() + i;
    const day = new Date(curDate.setDate(first));
    week.push(day);
  }

  // console.log(curDate, week)
  return week;
};

const EmployeePage = ({ userContext, date }) => {
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(date);
  const [workData, isLoadingWorkData] = useWorkReportByRange(
    getWeekDays(selectedDate)
  );

  const handleEmployeeChange = (value, name, employee) => {
    return setSelectedInfo({
      employeeId: value,
      employeeName: name,
      employee: employee,
      worksId:
        workData
          .filter((item) => item.employee.id === value)
          .map((item) => {
            return item.workList.id;
          }) ?? [],
      works: workData.filter((item) => item.employee.id === value) ?? [],
    });
  };

  useEffect(() => {
    console.log(workData);

    if (selectedInfo !== null) {
      setSelectedInfo({
        ...selectedInfo,
        worksId:
          workData
            .filter((item) => item.employee.id === selectedInfo.employeeId)
            .map((item) => {
              return item.workList.id;
            }) ?? [],
        works:
          workData.filter(
            (item) => item.employee.id === selectedInfo.employeeId
          ) ?? [],
      });
    }
  }, [workData, selectedDate]);

  return (
    <>
      <ControlPanel
        styles={{ marginTop: "-5px" }}
        itemsCount={formatDateString(selectedDate)}
        buttons={
          <>
            <Button
              text="Пред. неделя"
              className="main-window__button main-window__button--inverted"
              inverted
              isLoading={isLoadingWorkData}
              onClick={() =>
                setSelectedDate((selectedDate) => {
                  const newDate = new Date(
                    new Date(selectedDate).setTime(
                      selectedDate.getTime() - 7 * 24 * 60 * 60 * 1000
                    )
                  );
                  return newDate;
                })
              }
            />
            <Button
              text="Тек. неделя"
              className="main-window__button main-window__button--inverted"
              inverted
              isLoading={isLoadingWorkData}
              onClick={() => setSelectedDate(new Date())}
            />
          </>
        }
      />
      <div className="employee-page">
        {!isLoadingWorkData ? (
          <SelectEmployee
            userHasAccess={userContext.userHasAccess}
            inputName="Выбор сотрудника"
            name="employee"
            handleEmployeeChange={handleEmployeeChange}
          />
        ) : (
          <Button
            text=""
            className="main-window__button"
            // inverted
            isLoading={true}
          />
        )}
        {selectedInfo !== null && !isLoadingWorkData ? (
          <EmployeeInfo selectedInfo={selectedInfo} date={selectedDate} />
        ) : null}
      </div>
    </>
  );
};

export default EmployeePage;
