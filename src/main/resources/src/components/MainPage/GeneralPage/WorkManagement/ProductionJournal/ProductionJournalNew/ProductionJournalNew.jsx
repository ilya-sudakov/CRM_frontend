import React, { useEffect, useState } from "react";
import useEmployeesList from "../../../../../../utils/hooks/useEmployeesList.js";
import SearchBar from "../../../../SearchBar/SearchBar.jsx";
import ControlPanel from "../../../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import ChevronSVG from "../../../../../../../../../../assets/tableview/chevron-down.inline.svg";
import InputDate from "../../../../../../utils/Form/InputDate/InputDate.jsx";
import TableView from "./TableView.jsx";
import MessageForUser from "../../../../../../utils/Form/MessageForUser/MessageForUser.jsx";
import Button from "../../../../../../utils/Form/Button/Button.jsx";
import {
  formatDateString,
  formatDateStringNoYear,
} from "../../../../../../utils/functions.jsx";
import { days } from "../../../../../../utils/dataObjects.js";

import "./ProductionJournalNew.scss";
import useWorkReport from "../../../../../../utils/hooks/useWorkReport.js";
import useFormWindow from "../../../../../../utils/hooks/useFormWindow.js";
import RecordWorkForm from "./RecordWorkForm.jsx";

const ProductionJournalNew = ({}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [curDay, setCurDay] = useState(new Date());
  const [curWorkItem, setCurWorkItem] = useState({
    day: "today",
    title: "Создание записи о работе",
    type: "new",
    workshop: "lemz",
    employee: {},
    worksList: [],
    workId: 0,
  });
  const handleCloseWindow = () => {
    return setShowWindow(!showWindow);
  };
  const {
    formWindow,
    setShowWindow,
    showWindow,
  } = useFormWindow(
    curWorkItem.title,
    <RecordWorkForm
      inputs={curWorkItem}
      handleCloseWindow={() => setShowWindow(false)}
      showWindow={() => showWindow}
      setShowWindow={setShowWindow}
    />,
    [curWorkItem]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const {
    worktimeInputs: todaysWork,
    employees,
    isLoading: todayLoading,
    setWorkTimeInputs: setTodaysWork,
  } = useWorkReport(curDay);
  const {
    worktimeInputs: yesterdaysWork,
    isLoading: yesterdayLoading,
    setWorkTimeInputs: setYesterdaysWork,
  } = useWorkReport(new Date(new Date(curDay).setDate(curDay.getDate() - 1)));

  useEffect(() => {
    document.title = "Дневник производства v2.0";
    console.log(todaysWork, yesterdaysWork);
  }, []);

  const handleOpenWorkForm = (
    day = "today",
    type = "new",
    workshop = "lemz",
    employee,
    worksList,
    workId
  ) => {
    const selectedWork = worksList
      ? worksList.find((work) => work.id === workId)
      : null;
    console.log(day, type, workshop, worksList, selectedWork);
    handleCloseWindow();
    setCurWorkItem({
      day: day,
      date:
        day === "today"
          ? curDay
          : new Date(new Date(curDay).setDate(curDay.getDate() - 1)),
      type: type,
      workshop: workshop,
      employee: employee,
      works:
        type === "new"
          ? [
              {
                product: [],
                draft: [],
                workName: "",
                workType: "",
                workId: null,
                hours: 0,
                comment: "",
                isOld: false,
              },
            ]
          : [selectedWork],
      title:
        type === "new"
          ? "Создание записи о работе"
          : "Редактирование записи о работе",
      hideWindow: () => setShowWindow(!showWindow),
    });
    // console.log(day, type, workshop, employee, worksList, workId);
  };

  return (
    <div className="notes-journal">
      <div className="main-window__header main-window__header--full">
        <div className="main-window__title">Дневник производства v2.0</div>
        <div className="main-window__description">
          Для того, чтобы сохранить введенные вами данные о работе в системе,
          нажмите кнопку "Сохранить данные" в окне создания/редактирования
          записи о работе. <p />
          Для редактирования записи о работе, достаточно нажать на эту запись
          мышкой - вы перейдете в окно редактирования.
        </div>
      </div>
      {formWindow}
      <SearchBar
        fullSize
        placeholder="Введите фамилию сотрудника для поиска..."
        setSearchQuery={setSearchQuery}
      />
      <MessageForUser
        message="Данные успешно сохранены"
        title="Сохранение данных"
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
      <ControlPanel
        buttons={
          <InputDate
            selected={Date.parse(curDay)}
            inputName="Выбор даты:"
            handleDateChange={(date) => setCurDay(date)}
          />
        }
      />
      <div className="notes-journal__current-date">
        <ChevronSVG
          className="main-window__img"
          style={{ transform: "rotate(90deg)" }}
          onClick={() =>
            setCurDay(new Date(new Date(curDay).setDate(curDay.getDate() - 1)))
          }
        />
        {`${formatDateStringNoYear(curDay)} - ${days[curDay.getDay()]}`}
        <ChevronSVG
          className="main-window__img"
          style={{ transform: "rotate(-90deg)" }}
          onClick={() =>
            setCurDay(new Date(new Date(curDay).setDate(curDay.getDate() + 1)))
          }
        />
      </div>
      <TableView
        isLoading={todayLoading || yesterdayLoading}
        curDay={curDay}
        todaysWork={todaysWork}
        yesterdaysWork={yesterdaysWork}
        searchQuery={searchQuery}
        employeesNotes={employees}
        handleOpenWorkForm={handleOpenWorkForm}
      />
    </div>
  );
};

export default ProductionJournalNew;
