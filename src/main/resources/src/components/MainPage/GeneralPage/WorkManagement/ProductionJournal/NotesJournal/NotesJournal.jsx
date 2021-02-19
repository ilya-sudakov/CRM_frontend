import React, { useEffect, useState } from "react";
import useEmployeesList from "../../../../../../utils/hooks/useEmployeesList.js";
import SearchBar from "../../../../SearchBar/SearchBar.jsx";

import "./NotesJournal.scss";

const NotesJournal = ({}) => {
  const { employees, isLoadingEmployees, workshops } = useEmployeesList();
  const [employeesNotes, setEmployeesNotes] = useState([]);
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

  const onInputChange = (event, type = "yesterday", id) => {
    const value = event.target.value;
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

  const filterEmployees = (employees, searchQuery) => {
    const query = searchQuery.toLowerCase();
    return employees.filter((employee) =>
      employee.lastName.toLowerCase().includes(query)
    );
  };

  useEffect(() => {}, [employeesNotes]);

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
      <div className="notes-journal__list">
        {/* <div className="notes-journal__list-item notes-journal__list-item--header">
          <span>ФИО сотрудника</span>
          <span>Вчера</span>
          <span>Сегодня</span>
        </div> */}
        {isLoadingEmployees
          ? null
          : workshops.map((workshop) => {
              const filteredEmployees = filterEmployees(
                employeesNotes,
                searchQuery
              ).filter((employee) => employee.workshop === workshop);
              if (filteredEmployees.length === 0) return null;
              return (
                <div className="notes-journal__list-item">
                  <span>{workshop}</span>
                  <div className="notes-journal__employees">
                    {filteredEmployees.map((employee) => (
                      <div className="employees__row">
                        <span>
                          {`${employee.lastName} ${employee.name} ${employee.middleName}`}
                          <div>{employee.position}</div>
                        </span>
                        <span>
                          <div>Вчера</div>
                          <textarea
                            onChange={(event) =>
                              onInputChange(event, "yesterday", employee.id)
                            }
                            value={employee.workCommentYesterday}
                            placeholder="Введите текст..."
                          />
                        </span>
                        <span>
                          <div>Сегодня</div>
                          <textarea
                            onChange={(event) =>
                              onInputChange(event, "today", employee.id)
                            }
                            value={employee.workCommentToday}
                            placeholder="Введите текст..."
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default NotesJournal;
