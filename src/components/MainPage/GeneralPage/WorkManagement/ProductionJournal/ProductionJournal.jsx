import { useEffect, useState } from 'react';
import SearchBar from 'Components/MainPage/SearchBar/SearchBar.jsx';
import ControlPanel from 'Components/MainWindow/ControlPanel/ControlPanel.jsx';
import ChevronSVG from 'Assets/tableview/chevron-down.inline.svg';
import InputDate from 'Components/Form/InputDate/InputDate.jsx';
import TableView from './TableView.jsx';
import MessageForUser from 'Components/Form/MessageForUser/MessageForUser.jsx';
import { formatDateStringNoYear } from 'Utils/functions.jsx';
import { days } from 'Utils/dataObjects.js';

import './ProductionJournal.scss';
import useWorkReport from 'Utils/hooks/useWorkReport.js';
import useFormWindow from 'Utils/hooks/useFormWindow.js';
import RecordWorkForm from './RecordWorkForm.jsx';
import { createWorkListPDF, updateData } from './functions.js';
import Button from 'Components/Form/Button/Button.jsx';

const ProductionJournal = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [curDay, setCurDay] = useState(new Date());
  const [curWorkItem, setCurWorkItem] = useState({
    day: 'today',
    title: 'Создание записи о работе',
    type: 'new',
    workshop: 'lemz',
    employee: {},
    worksList: [],
    workId: 0,
  });
  const {
    formWindow,
    setShowWindow,
    showWindow,
    toggleFormWindow,
  } = useFormWindow(
    curWorkItem.title,
    <RecordWorkForm
      inputs={curWorkItem}
      handleCloseWindow={() => toggleFormWindow()}
    />,
    [curWorkItem],
  );
  const [searchQuery, setSearchQuery] = useState('');
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
    document.title = 'Дневник производства';
    console.log(todaysWork, yesterdaysWork);
  }, [todaysWork, yesterdaysWork]);

  const defaultWorkItem = {
    product: [],
    draft: [],
    workName: '',
    workType: '',
    workId: null,
    hours: 0,
    comment: '',
    isOld: false,
  };

  const handleOpenWorkForm = (
    day = 'today',
    type = 'new',
    workshop = 'lemz',
    employee,
    worksList,
    workId,
  ) => {
    toggleFormWindow();
    const deletedWork = worksList
      ? worksList.filter((work) => work.id !== workId)
      : null;
    const selectedWork = worksList
      ? worksList.find((work) => work.id === workId)
      : null;
    const updateWork = (daysWork, setDaysWork, works) => {
      setDaysWork({
        ...daysWork,
        [workshop]: {
          [employee.id]: {
            ...daysWork[workshop][employee.id],
            works: works,
            originalWorks: works,
          },
        },
      });
    };
    const updateSelectedDaysWork = (daysWork, setDaysWork, newData) => {
      updateWork(daysWork, setDaysWork, [
        ...updateData(worksList, selectedWork, newData),
      ]);
    };
    const addSelectedDaysWork = (daysWork, setDaysWork, newData) => {
      updateWork(daysWork, setDaysWork, [...worksList, newData]);
    };
    const deleteSelectedDaysWork = (daysWork, setDaysWork) => {
      updateWork(daysWork, setDaysWork, deletedWork);
    };
    setCurWorkItem({
      day: day,
      date:
        day === 'today'
          ? curDay
          : new Date(new Date(curDay).setDate(curDay.getDate() - 1)),
      type: type,
      workshop: workshop,
      employee: employee,
      works: type === 'new' ? [defaultWorkItem] : [selectedWork],
      title:
        type === 'new'
          ? 'Создание записи о работе'
          : 'Редактирование записи о работе',
      hideWindow: () => setShowWindow(!showWindow),
      updateSelectedDaysWork: (newData) =>
        day === 'today'
          ? updateSelectedDaysWork(todaysWork, setTodaysWork, newData)
          : updateSelectedDaysWork(yesterdaysWork, setYesterdaysWork, newData),
      deleteSelectedDaysWork: () =>
        day === 'today'
          ? deleteSelectedDaysWork(todaysWork, setTodaysWork)
          : deleteSelectedDaysWork(yesterdaysWork, setYesterdaysWork),
      addSelectedDaysWork: (newData) =>
        day === 'today'
          ? addSelectedDaysWork(todaysWork, setTodaysWork, newData)
          : addSelectedDaysWork(yesterdaysWork, setYesterdaysWork, newData),
    });
  };

  return (
    <div className="notes-journal">
      <div className="main-window__header main-window__header--full">
        <div className="main-window__title">Дневник производства</div>
        <div className="main-window__description">
          {`Для того, чтобы сохранить введенные вами данные о работе в системе,
          нажмите кнопку "Сохранить данные" в окне создания/редактирования
          записи о работе. Для редактирования записи о работе, достаточно нажать
          на эту запись мышкой - вы перейдете в окно редактирования.`}
          <p />
          {`Сообщайте пожалуйста об ошибках программы/своих предложениях в
          Обратной связи ("Сообщить об ошибке" в боковом меню слева) - мы будем
          рады помочь!`}
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
          <>
            <InputDate
              selected={Date.parse(curDay)}
              inputName="Выбор даты:"
              handleDateChange={(date) => setCurDay(date)}
            />
            <Button
              className="main-window__button main-window__button--inverted"
              inverted
              text="Печатная форма"
              onClick={() =>
                createWorkListPDF(employees, todaysWork, yesterdaysWork, curDay)
              }
            />
          </>
        }
      />
      <div className="notes-journal__current-date">
        <ChangeDayButton day="prevDay" curDay={curDay} setCurDay={setCurDay} />
        {`${formatDateStringNoYear(curDay)} - ${days[curDay.getDay()]}`}

        <ChangeDayButton day="nextDay" curDay={curDay} setCurDay={setCurDay} />
      </div>
      <TableView
        isLoading={todayLoading || yesterdayLoading}
        curDay={curDay}
        todaysWork={todaysWork}
        yesterdaysWork={yesterdaysWork}
        searchQuery={searchQuery}
        employees={employees}
        handleOpenWorkForm={handleOpenWorkForm}
      />
    </div>
  );
};

export default ProductionJournal;

const ChangeDayButton = ({ day = 'prevDay', setCurDay, curDay }) => {
  return (
    <ChevronSVG
      className="main-window__img"
      style={{ transform: `rotate(${day === 'prevDay' ? '90deg' : '-90deg'})` }}
      onClick={() =>
        setCurDay(
          new Date(
            new Date(curDay).setDate(
              curDay.getDate() + (day === 'nextDay' ? 1 : -1),
            ),
          ),
        )
      }
    />
  );
};
