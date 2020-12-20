import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sortIcon from "../../../../../../../../../assets/tableview/sort_icon.png";
import viewIcon from "../../../../../../../../../assets/tableview/view.svg";
import editIcon from "../../../../../../../../../assets/tableview/edit.svg";
import deleteIcon from "../../../../../../../../../assets/tableview/delete.svg";
import printSVG from "../../../../../../../../../assets/tableview/print.svg";
import printIcon from "../../../../../../../../../assets/print.png";
import pdfMake from "pdfmake";
import "./TableView.scss";
import { formatDateString } from "../../../../../utils/functions.jsx";
import { getEmployeesByWorkshopListPdfText } from "../../../../../utils/pdfFunctions.jsx";
import PlaceholderLoading from "../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx";

const TableView = (props) => {
  const [workshops, setWorkshops] = useState([
    "ЦехЛЭМЗ",
    "ЦехЛепсари",
    "ЦехЛиговский",
    "Офис",
    "Уволенные",
  ]);
  const [workshopsVisible, setWorkshopsVisible] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    curSort: "lastName",
    date: "desc",
  });

  const searchQuery = (data) => {
    const query = props.searchQuery.toLowerCase();
    return data.filter(
      (item) =>
        item.lastName.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.middleName.toLowerCase().includes(query) ||
        item.id.toString().includes(query) ||
        (item.yearOfBirth && item.yearOfBirth.toString().includes(query)) ||
        (item.dateOfBirth && item.dateOfBirth.toString().includes(query)) ||
        item.citizenship.toLowerCase().includes(query) ||
        item.workshop.toLowerCase().includes(query) ||
        item.position.toLowerCase().includes(query) ||
        item.comment.toLowerCase().includes(query) ||
        item.relevance.toLowerCase().includes(query)
    );
  };

  const sortEmployees = (data) => {
    return searchQuery(data).sort((a, b) => {
      if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === "desc" ? 1 : -1;
      }
      if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === "desc" ? -1 : 1;
      }
      return 0;
    });
  };

  const checkWorkshop = (index) => {
    index = Number.parseInt(index);
    return workshopsVisible.map((element, element_index) => {
      if (element.id == index) {
        let temp2 = Object.assign({
          id: index,
          hidden: !element.hidden,
        });
        return temp2;
      }
      return element;
    });
  };

  const isWorkshopHidden = (index) => {
    index = Number.parseInt(index);
    let check = true;
    workshopsVisible.map((element) => {
      if (element.id === index) {
        check = element.hidden;
      }
    });
    return check;
  };

  const handleClickWorkshop = (id) => {
    setWorkshopsVisible([...checkWorkshop(id)]);
  };

  const filterEmployees = (data, workshopItem) => {
    return data.filter(
      (employee) =>
        (workshopItem === employee.workshop &&
          employee.relevance !== "Уволен") ||
        (workshopItem === "Уволенные" && employee.relevance === "Уволен")
    );
  };

  useEffect(() => {
    if (workshopsVisible.length === 0) {
      let temp = [];
      workshops.map((element, index) =>
        temp.push({
          id: index,
          hidden: true,
        })
      );
      setWorkshopsVisible([...temp]);
    }
  }, [props.data]);

  return (
    <div className="tableview-employees">
      <div className="main-window__list">
        <div className="main-window__list-item main-window__list-item--header">
          <span>Подразделение</span>
          <div className="main-window__actions">Действия</div>
        </div>
        {workshops.map((item, index) => (
          <React.Fragment>
            <div
              className="main-window__list-item"
              onClick={() => handleClickWorkshop(index)}
            >
              <span>
                <div className="main-window__mobile-text">Подразделение:</div>
                {item}
                {item !== "Уволенные" ? (
                  <span className="main-window__items-count">
                    {searchQuery(filterEmployees(props.data, item)).length}
                  </span>
                ) : null}
              </span>
              <div className="main-window__actions">
                <div
                  className="main-window__action"
                  onClick={() => {
                    let dd = getEmployeesByWorkshopListPdfText(
                      sortEmployees(filterEmployees(props.data, item)),
                      item
                    );
                    pdfMake.createPdf(dd).print();
                  }}
                  title="Печать"
                >
                  <img className="main-window__img" src={printSVG} alt="" />
                  {"    "}
                  Печать
                </div>
              </div>
            </div>
            <div
              className={
                isWorkshopHidden(index)
                  ? "main-window__list-options main-window__list-options--hidden"
                  : "main-window__list-options"
              }
            >
              <div className="main-window__list">
                <div className="main-window__list-item main-window__list-item--header">
                  <span>ФИО</span>
                  <span>Дата рождения</span>
                  <span>Гражданство</span>
                  <span>Должность</span>
                  <div className="main-window__actions">Действия</div>
                </div>
                {props.isLoading && (
                  <PlaceholderLoading
                    itemClassName="main-window__list-item"
                    minHeight="35px"
                    items={8}
                  />
                )}
                {sortEmployees(filterEmployees(props.data, item)).map(
                  (employee, employee_id) => (
                    <div key={employee_id} className={"main-window__list-item"}>
                      <span>
                        <div className="main-window__mobile-text">ФИО:</div>
                        {employee.lastName +
                          " " +
                          employee.name +
                          " " +
                          employee.middleName}
                      </span>
                      <span>
                        <div className="main-window__mobile-text">
                          Дата рождения:
                        </div>
                        {employee.dateOfBirth ? (
                          <div>{formatDateString(employee.dateOfBirth)}</div>
                        ) : (
                          <div
                            style={{ color: "#bbbbbb" }}
                            title="Дата рождения в старом формате"
                          >
                            {`Ввести заново! ${formatDateString(
                              employee.yearOfBirth
                            )}`}
                          </div>
                        )}
                      </span>
                      <span>
                        <div className="main-window__mobile-text">
                          Гражданство:
                        </div>
                        {employee.citizenship}
                      </span>
                      <span>
                        <div className="main-window__mobile-text">
                          Должность:
                        </div>
                        {employee.position}
                      </span>
                      <div className="main-window__actions">
                        <Link
                          to={"/dispatcher/employees/edit/" + employee.id}
                          className="main-window__action"
                          title="Редактирование"
                        >
                          <img
                            className="main-window__img"
                            src={editIcon}
                            alt=""
                          />
                        </Link>
                        {props.userHasAccess(["ROLE_ADMIN"]) && (
                          <div
                            className="main-window__action"
                            onClick={() => props.deleteItem(employee.id)}
                            title="Удалить"
                          >
                            <img
                              className="main-window__img"
                              src={deleteIcon}
                              alt=""
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TableView;
