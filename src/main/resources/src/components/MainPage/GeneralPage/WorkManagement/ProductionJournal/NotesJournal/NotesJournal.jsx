import React, { useEffect, useState } from "react";
import useEmployeesList from "../../../../../../utils/hooks/useEmployeesList.js";
import { sortByField } from "../../../../../../utils/sorting/sorting.js";
import SearchBar from "../../../../SearchBar/SearchBar.jsx";
import { getNotesJournalList } from "../../../../../../utils/RequestsAPI/WorkManaging/notes_journal.js";
import ControlPanel from "../../../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import InputDate from "../../../../../../utils/Form/InputDate/InputDate.jsx";

import "./NotesJournal.scss";

const NotesJournal = ({}) => {
  const { employees, isLoadingEmployees, workshops } = useEmployeesList();
  const [employeesNotes, setEmployeesNotes] = useState([]);
  const [isDaysLoaded, setIsDaysLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [curDay, setCurDay] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Журнал руководителя";
    if (employees.length === 0 || employeesNotes.length > 0) return;
    setEmployeesNotes([
      ...employees.map((employee) => ({
        ...employee,
        workCommentYesterday: "",
        workCommentToday: "",
      })),
    ]);
  }, [employees]);

  useEffect(() => {
    if (!isLoading && employeesNotes.length > 0) {
      return fetchBothDays();
    }
  }, [curDay, employeesNotes]);

  const onInputChange = (value, type = "yesterday", id) => {
    const employee = employeesNotes.find((employee) => employee.id === id);
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
    console.log(newEmployeesNotes);
    return setEmployeesNotes([...newEmployeesNotes]);
  };

  const fetchBothDays = () => {
    setIsLoading(true);
    const today = curDay;
    const prevDay = new Date(new Date(curDay).setDate(curDay.getDate() - 1));
    //fetch cur day
    getNotesJournalList(today)
      .then(({ data }) => {
        return updateEmployeesData(data, "today");
      })
      //fetch prev day
      .then(() => getNotesJournalList(prevDay))
      .then(({ data }) => {
        updateEmployeesData(data, "yesterday");
        setIsDaysLoaded(true);
        setIsLoading(false);
        return;
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const updateEmployeesData = (employeeData, type = "yesterday") => {
    let newEmployeesNotes = employeesNotes;
    employeeData.map((item) => {
      const employee = employeesNotes.find(
        (employee) => employee.id === item.employee.id
      );
      switch (type) {
        case "yesterday":
          newEmployeesNotes.splice(employeesNotes.indexOf(employee), 1, {
            ...employee,
            workCommentYesterday: item.comment,
          });
          break;
        case "today":
          newEmployeesNotes.splice(employeesNotes.indexOf(employee), 1, {
            ...employee,
            workCommentToday: item.comment,
          });
          break;
      }
    });
    return setEmployeesNotes([...newEmployeesNotes]);
  };

  const filterEmployees = (employees, searchQuery) => {
    const query = searchQuery.toLowerCase();
    return employees.filter((employee) =>
      employee.lastName.toLowerCase().includes(query)
    );
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
      <div className="notes-journal__list">
        {isLoadingEmployees
          ? null
          : workshops.map((workshop) => {
              const filteredEmployees = sortByField(
                filterEmployees(employeesNotes, searchQuery).filter(
                  (employee) => employee.workshop === workshop
                ),
                { fieldName: "lastName", direction: "desc" }
              );
              if (filteredEmployees.length === 0) return null;
              return (
                <div className="notes-journal__list-item">
                  <span>{workshop}</span>
                  <div className="notes-journal__employees">
                    {filteredEmployees.map((employee, index) => {
                      const prevDay = new Date(
                        new Date(curDay).setDate(curDay.getDate() - 1)
                      );
                      return (
                        <div
                          className={`employees__row ${
                            index % 2 === 0 ? "employees__row--even" : ""
                          }`}
                        >
                          <span>
                            {`${employee.lastName} ${employee.name} ${employee.middleName}`}
                            <div>{employee.position}</div>
                          </span>
                          <div className="employees__days-wrapper">
                            <span
                              className={
                                prevDay.getDay() === 0 || prevDay.getDay() === 6
                                  ? "employees__weekend"
                                  : ""
                              }
                            >
                              <div>Вчера</div>
                              <textarea
                                onChange={({ target }) =>
                                  onInputChange(
                                    target.value,
                                    "yesterday",
                                    employee.id
                                  )
                                }
                                value={employee.workCommentYesterday}
                                placeholder={
                                  prevDay.getDay() === 0 ||
                                  prevDay.getDay() === 6
                                    ? "Выходной"
                                    : "Введите текст..."
                                }
                              />
                            </span>
                            <span
                              className={
                                curDay.getDay() === 0 || curDay.getDay() === 6
                                  ? "employees__weekend"
                                  : ""
                              }
                            >
                              <div>Сегодня</div>
                              <textarea
                                onChange={({ target }) =>
                                  onInputChange(
                                    target.value,
                                    "today",
                                    employee.id
                                  )
                                }
                                value={employee.workCommentToday}
                                placeholder={
                                  curDay.getDay() === 0 || curDay.getDay() === 6
                                    ? "Выходной"
                                    : "Введите текст..."
                                }
                              />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default NotesJournal;
