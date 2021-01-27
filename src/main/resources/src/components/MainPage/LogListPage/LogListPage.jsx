import React, { useState, useEffect } from "react";
import "./LogListPage.scss";
import "../../../utils/MainWindow/MainWindow.scss";
import SearchBar from "../SearchBar/SearchBar.jsx";
import TableView from "./TableView/TableView.jsx";
import ControlPanel from "../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import { changeSortOrder } from "../../../utils/functions.jsx";
import { logItemsTypes } from "./objects.js";
import {
  filterLogListItems,
  filterSearchQuery,
  sortHistory,
} from "./functions.js";

const LogListPage = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [curPage, setCurPage] = useState("requests");
  const [history, setHistory] = useState([
    {
      id: 1,
      username: "ЦехЛепсари",
      type: "profile",
      date: new Date(),
    },
    {
      id: 2,
      username: "ЦехЛЭМЗ",
      type: "requests",
      action: "Создание заявки",
      date: new Date(),
    },
    {
      id: 2,
      username: "Алексей",
      type: "requests",
      action: "Удаление заявки",
      date: new Date(),
    },
  ]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    //API
  };

  const deleteItem = () => {
    //API
  };

  // * Sorting

  const [sortOrder, setSortOrder] = useState({
    curSort: "id",
    id: "desc",
  });

  return (
    <div className="log-list">
      <div className="main-window">
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Логи</div>
          <div className="main-window__menu">
            {Object.values(logItemsTypes).map((item) => (
              <div
                className={
                  curPage === item.originalName
                    ? "main-window__item--active main-window__item"
                    : "main-window__item"
                }
                onClick={() => setCurPage(item.originalName)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <SearchBar
          fullSize
          placeholder="Введите запрос для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <ControlPanel
          sorting={
            <div className="main-window__sort-panel">
              <select onChange={(evt) => setSortOrder(changeSortOrder(evt))}>
                <option value="date desc">По дате (убыв.)</option>
              </select>
            </div>
          }
          itemsCount={`Всего: ${history.length} записей`}
        />
        <TableView
          data={sortHistory(
            filterSearchQuery(
              filterLogListItems(history, curPage),
              searchQuery
            ),
            sortOrder
          )}
          searchQuery={searchQuery}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
        />
      </div>
    </div>
  );
};

export default LogListPage;
