import React, { useState } from "react";
import "./LogListPage.scss";
import "../../../utils/MainWindow/MainWindow.scss";
import TableView from "./TableView/TableView.jsx";
import ControlPanel from "../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import { logItemsTypes } from "./objects.js";
import { getLogsListByType } from "../../../utils/RequestsAPI/Logs/logs.js";
import usePagination from "../../../utils/hooks/usePagination/usePagination";
import useSort from "../../../utils/hooks/useSort/useSort";

const LogListPage = () => {
  const [curCategory, setCurCategory] = useState("request");
  const { sortOrder, sortPanel } = useSort(data, {}, [data]);
  const { curPage, itemsPerPage, data, isLoading, pagination } = usePagination(
    () => getLogsListByType(curCategory, itemsPerPage, curPage - 1, sortOrder),
    [curCategory, sortOrder],
    "dynamic"
  );

  return (
    <div className="log-list">
      <div className="main-window">
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Логи</div>
          <div className="main-window__menu">
            {Object.values(logItemsTypes).map((item) => (
              <div
                className={
                  curCategory === item.originalName
                    ? "main-window__item--active main-window__item"
                    : "main-window__item"
                }
                onClick={() => setCurCategory(item.originalName)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <ControlPanel sorting={sortPanel} />
        <TableView data={data} isLoading={isLoading} />
        {pagination}
      </div>
    </div>
  );
};

export default LogListPage;
