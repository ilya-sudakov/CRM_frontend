import React, { useEffect, useState } from "react";
import useEmployeesList from "../../../../../../utils/hooks/useEmployeesList.js";
import SearchBar from "../../../../SearchBar/SearchBar.jsx";
import {
  addJournalNote,
  getNotesJournalList,
  editJournalNote,
  deleteJournalNote,
} from "../../../../../../utils/RequestsAPI/WorkManaging/notes_journal.js";
import ControlPanel from "../../../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import InputDate from "../../../../../../utils/Form/InputDate/InputDate.jsx";
import TableView from "./TableView.jsx";

import "./NotesJournal.scss";
import Button from "../../../../../../utils/Form/Button/Button.jsx";
import { formatDateStringNoYear } from "../../../../../../utils/functions.jsx";
import { days } from "../../../../../../utils/dataObjects.js";

const NotesJournal = ({}) => {
  const { employees, isLoadingEmployees, workshops } = useEmployeesList();
  const [employeesNotes, setEmployeesNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [curDay, setCurDay] = useState(new Date());
  const [loadedDay, setLoadedDay] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Журнал руководителя";
    if (employees.length === 0 || employeesNotes.length > 0) return;
    if (employees.length > 0 && employeesNotes.length === 0) {
      setEmployeesNotes([
        ...employees.map((employee) => ({
          employee: employee,
          workCommentYesterday: "",
          workCommentToday: "",
        })),
      ]);
    }
  }, [employees]);

  useEffect(() => {
    if (loadedDay !== curDay && !isLoading && employeesNotes.length > 0) {
      return fetchBothDays();
    }
  }, [curDay, employeesNotes]);

  const onInputChange = (value, type = "yesterday", id) => {
    const employee = employeesNotes.find(
      (employee) => employee.employee.id === id
    );
    let newEmployeesNotes = employeesNotes;
    switch (type) {
      case "yesterday":
        newEmployeesNotes.splice(employeesNotes.indexOf(employee), 1, {
          ...employee,
          workCommentYesterday: value,
        });
        break;
      case "today":
        newEmployeesNotes.splice(employeesNotes.indexOf(employee), 1, {
          ...employee,
          workCommentToday: value,
        });
        break;
    }
    return setEmployeesNotes([...newEmployeesNotes]);
  };

  const fetchBothDays = () => {
    setIsLoading(true);
    console.log('fetching both days');
    const today = curDay;
    let employeesData = [...employeesNotes];
    employeesData = employeesData.map((item) => ({
      ...item,
      noteIdYesterday: null,
      workCommentYesterday: "",
      workCommentYesterdayOG: null,
      noteIdToday: null,
      workCommentToday: "",
      workCommentTodayOG: null,
    }));
    const prevDay = new Date(new Date(curDay).setDate(curDay.getDate() - 1));
    //fetch cur day
    getNotesJournalList(today)
      .then(
        ({ data }) =>
          (employeesData = updateEmployeesData(data, "today", employeesData))
      )
      //fetch prev day
      .then(() => getNotesJournalList(prevDay))
      .then(({ data }) => {
        employeesData = updateEmployeesData(data, "yesterday", employeesData);
        console.log(employeesData);
        setEmployeesNotes([...employeesData]);
        setLoadedDay(curDay);
        setIsLoading(false);
        return;
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const updateEmployeesData = (
    employeeData,
    type = "yesterday",
    employeesData
  ) => {
    let newEmployeesNotes = [...employeesData];
    employeeData.map((item) => {
      const employee = employeesData.find(
        (employee) => employee.employee.id === item.employeeId
      );
      switch (type) {
        case "yesterday":
          newEmployeesNotes.splice(newEmployeesNotes.indexOf(employee), 1, {
            ...employee,
            noteIdYesterday: item.id,
            workCommentYesterday: item.comment,
            workCommentYesterdayOG: item.comment,
          });
          break;
        case "today":
          newEmployeesNotes.splice(newEmployeesNotes.indexOf(employee), 1, {
            ...employee,
            noteIdToday: item.id,
            workCommentToday: item.comment,
            workCommentTodayOG: item.comment,
          });
          break;
      }
    });
    return newEmployeesNotes;
  };

  const handleSubmit = () => {
    console.log(employeesNotes);
    Promise.all(
      employeesNotes.map((note) => {
        //delete all empty comments
        if (
          note.noteIdToday &&
          note.workCommentToday === "" &&
          note.workCommentTodayOG !== ""
        )
          return deleteJournalNote(note.noteIdToday);
        //add/edit all nonempty todays comments
        if (
          note.workCommentToday === "" ||
          note.workCommentToday === note.workCommentTodayOG
        )
          return;
        const noteObject = {
          comment: note.workCommentToday,
          date: Math.floor(curDay.getTime() / 1000),
          employeeId: note.employee.id,
        };
        if (
          note.noteIdToday &&
          note.workCommentToday !== note.workCommentTodayOG
        ) {
          return editJournalNote(noteObject, note.noteIdToday);
        }
        return addJournalNote(noteObject);
      })
    )
      .then(() =>
        Promise.all(
          employeesNotes.map((note) => {
            const prevDay = new Date(
              new Date(curDay).setDate(curDay.getDate() - 1)
            );
            //delete all empty comments
            if (
              note.noteIdYesterday &&
              note.workCommentYesterday === "" &&
              note.workCommentYesterdayOG !== ""
            )
              return deleteJournalNote(note.noteIdYesterday);
            if (
              note.workCommentYesterday === "" ||
              note.workCommentYesterday === note.workCommentYesterdayOG
            )
              return;
            //add/edit all nonempty yesterday comments
            const noteObject = {
              comment: note.workCommentYesterday,
              date: Math.floor(prevDay.getTime() / 1000),
              employeeId: note.employee.id,
            };
            if (
              note.noteIdYesterday &&
              note.workCommentYesterday !== note.workCommentYesterdayOG
            ) {
              return editJournalNote(noteObject, note.noteIdYesterday);
            }
            return addJournalNote(noteObject);
          })
        )
      )
      .then(() => {
        alert("Данные успешно сохранены");
        return setIsLoading(false);
      });
  };

  return (
    <div className="notes-journal">
      <div className="main-window__header main-window__header--full">
        <div className="main-window__title">Журнал руководителя</div>
      </div>
      <SearchBar
        fullSize
        placeholder="Введите фамилию сотрудника для поиска..."
        setSearchQuery={setSearchQuery}
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
        {`${formatDateStringNoYear(curDay)} - ${days[curDay.getDay()]}`}
      </div>
      <TableView
        isLoading={isLoadingEmployees || isLoading}
        workshops={workshops}
        curDay={curDay}
        employeesNotes={employeesNotes}
        searchQuery={searchQuery}
        onInputChange={onInputChange}
      />
      <Button
        text="Сохранить данные"
        className="main-window__button"
        onClick={handleSubmit}
        isLoading={
          isLoadingEmployees || isLoading || employeesNotes.length === 0
        }
      />
    </div>
  );
};

export default NotesJournal;