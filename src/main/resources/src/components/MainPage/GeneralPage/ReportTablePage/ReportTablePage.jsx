import React, { useEffect, useState, useContext } from "react";
import "./ReportTablePage.scss";
import { getRecordedWorkByMonth } from "../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx";
import UserContext from "../../../../App.js";
import FloatingPlus from "../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx";
import SummaryPage from "./SummaryPage.jsx";

const getMonthDates = (curDate) => {
  //Получаем массив с датами месяца
  let dates = [];
  for (
    let i = 1;
    i <
    new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate() + 1;
    i++
  )
    dates.push(i);

  return dates;
};

const ReportTablePage = (props) => {
  const [date, setDate] = useState(new Date());
  const [workshops, setWorkshops] = useState([
    { name: "ЦехЛЭМЗ", allowedRoles: ["ROLE_ADMIN", "ROLE_LEMZ"] },
    { name: "ЦехЛиговский", allowedRoles: ["ROLE_ADMIN", "ROLE_LIGOVSKIY"] },
    { name: "ЦехЛепсари", allowedRoles: ["ROLE_ADMIN", "ROLE_LEPSARI"] },
    {
      name: "Офис",
      allowedRoles: ["ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_MANAGER"],
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [excelIsLoading, setExcelIsLoading] = useState(false);
  const [dates, setDates] = useState([]);
  const [workList, setWorkList] = useState({});
  const [showWindow, setShowWindow] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const userContext = useContext(UserContext);
  const [curPage, setCurPage] = useState("summary"); //Текущая страница

  const getAllEmployeesWorkData = (date, signal) => {
    setIsLoading(true);
    let curDate = date;

    let dates = getMonthDates(curDate);
    setDates([...dates]);

    let employeesWorkList = {}; //Массив работ для каждого сотрудника за месяц

    return (
      getRecordedWorkByMonth(curDate.getMonth() + 1, signal)
        .then((res) => res.json())
        //Создаем объект с работами сотрудников, в которых их id - поля объекта,
        //это помогает  для избегания излишних циклов
        .then((res) =>
          res.map(
            (workItem) =>
              (employeesWorkList = Object.assign({
                ...employeesWorkList,
                [workItem.employee.id]: {
                  employee: workItem.employee,
                  workArray: [
                    ...(employeesWorkList[workItem.employee.id] !== undefined
                      ? employeesWorkList[workItem.employee.id].workArray
                      : []),
                    {
                      workId: workItem.id,
                      workControlProduct: workItem.workControlProduct,
                      partsWorks: workItem.partsWorks,
                      workList: workItem.workList,
                      day: workItem.day,
                      month: workItem.month,
                      year: workItem.year,
                      hours: workItem.hours,
                    },
                  ],
                },
              }))
          )
        )
        .then(() => {
          //Объединяем работы за одни и те же дни
          let newWorkList = employeesWorkList;
          Object.values(employeesWorkList).map((item) => {
            item.workArray.map((workItem) => {
              const prevWorks =
                newWorkList[item.employee.id].works === undefined ||
                newWorkList[item.employee.id]?.works[workItem.day] === undefined
                  ? []
                  : newWorkList[item.employee.id].works[workItem.day];

              newWorkList = Object.assign({
                ...newWorkList,
                [item.employee.id]: {
                  ...newWorkList[item.employee.id],
                  works: {
                    ...newWorkList[item.employee.id].works,
                    [workItem.day]: [
                      ...prevWorks,
                      {
                        workId: workItem.workId,
                        workControlProduct: workItem.workControlProduct,
                        partsWorks: workItem.partsWorks,
                        workList: workItem.workList,
                        day: workItem.day,
                        month: workItem.month,
                        year: workItem.year,
                        hours: workItem.hours,
                      },
                    ],
                  },
                },
              });
            });
          });
          // console.log('newnewnew: ', newWorkList)
          return (employeesWorkList = newWorkList);
        })
        .then(() => {
          //Заполняем дни, которых нет в сводке
          let newWorkList = employeesWorkList;
          Object.values(employeesWorkList).map((item) => {
            dates.map((date) => {
              if (item.works[date] === undefined) {
                //Проверка, есть ли уже учтенная работа за этот день
                newWorkList = Object.assign({
                  ...newWorkList,
                  [item.employee.id]: {
                    ...newWorkList[item.employee.id],
                    works: {
                      ...newWorkList[item.employee.id].works,
                      [date]: { day: date, hours: 0 },
                    },
                  },
                });
              }
            });
          });
          console.log(newWorkList);
          setIsLoading(false);
          return setWorkList({ ...newWorkList });
        })
    );
  };

  useEffect(() => {
    document.title = "Табель";
    let abortController = new AbortController();
    getAllEmployeesWorkData(date, abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, [date]);

  const pages = {
    summary: (
      <SummaryPage
        setSearchQuery={setSearchQuery}
        isLoading={isLoading}
        excelIsLoading={excelIsLoading}
        setExcelIsLoading={setExcelIsLoading}
        date={date}
        setDate={setDate}
        showWindow={showWindow}
        setShowWindow={setShowWindow}
        selectedInfo={selectedInfo}
        dates={dates}
        workList={workList}
        setSelectedInfo={setSelectedInfo}
        searchQuery={searchQuery}
        userContext={userContext}
      />
    ),
  };

  return (
    <div className="report-table-page">
      <div className="main-window">
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Табель</div>
          <div className="main-window__menu">
            <div
              className={
                curPage === "summary"
                  ? "main-window__item--active main-window__item"
                  : "main-window__item"
              }
              onClick={() => setCurPage("summary")}
            >
              Все сотрудники
            </div>
          </div>
        </div>
        <FloatingPlus
          linkTo="/work-management/record-time/new"
          visibility={["ROLE_ADMIN", "ROLE_DISPATCHER"]}
        />
        {pages[curPage]}
      </div>
    </div>
  );
};

export default ReportTablePage;
