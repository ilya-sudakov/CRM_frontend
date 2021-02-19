import React, { useState, useEffect } from "react";
import SearchBar from "../../../SearchBar/SearchBar.jsx";
import "./Stamp.scss";
import "../../../../../utils/MainWindow/MainWindow.scss";
import TableView from "../RiggingComponents/TableView/TableView.jsx";
import {
  getStampById,
  deletePartsFromStamp,
  deleteStamp,
  getStampsByStatus,
} from "../../../../../utils/RequestsAPI/Rigging/Stamp.jsx";
import FloatingPlus from "../../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx";
import ControlPanel from "../../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";

const Stamp = (props) => {
  const [stamps, setStamps] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [curPage, setCurPage] = useState("Активные");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.title = "Штампы";
    const abortController = new AbortController();
    !isLoaded && !isLoading && loadStamps(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, []);

  const loadStamps = (signal) => {
    setIsLoading(true);
    getStampsByStatus("stamp", signal)
      // getStamp(signal)
      .then((res) => res.json())
      .then((res) => {
        setIsLoaded(true);
        console.log(res);
        setStamps(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const deleteItem = (id) => {
    getStampById(id)
      .then((res) => res.json())
      .then((res) =>
        Promise.all(res.stampParts.map((item) => deletePartsFromStamp(item.id)))
      )
      .then(() => deleteStamp(id))
      .then(() => loadStamps());
  };

  return (
    <div className="stamp">
      <FloatingPlus
        linkTo="/dispatcher/rigging/stamp/new"
        visibility={["ROLE_ADMIN", "ROLE_WORKSHOP", "ROLE_ENGINEER"]}
      />
      <SearchBar
        fullSize
        // title="Поиск штампа"
        setSearchQuery={setSearchQuery}
        placeholder="Введите здесь запрос для поиска..."
      />
      <div className="main-window__header main-window__header--full">
        <div className="main-window__menu">
          <div
            className={
              curPage === "Активные"
                ? "main-window__item--active main-window__item"
                : "main-window__item"
            }
            onClick={() => setCurPage("Активные")}
          >
            Активные
          </div>
          {!props.userHasAccess(["ROLE_WORKSHOP"]) && (
            <div
              className={
                curPage === "Завершено"
                  ? "main-window__item--active main-window__item"
                  : "main-window__item"
              }
              onClick={() => setCurPage("Завершено")}
            >
              Завершено
            </div>
          )}
        </div>
      </div>
      <ControlPanel itemsCount={`Всего: ${stamps.length} записей`} />
      <TableView
        data={stamps.filter((item) => {
          if (item.color === "completed" && curPage === "Завершено") {
            return true;
          }
          if (curPage === "Активные" && item.color !== "completed") {
            return true;
          }
        })}
        searchQuery={searchQuery}
        userHasAccess={props.userHasAccess}
        loadData={loadStamps}
        deleteItem={deleteItem}
        cachedItems={props.cachedItems}
        setCachedItems={(items) => props.setCachedItems(items)}
        isLoading={isLoading}
        type="stamp"
      />
    </div>
  );
};

export default Stamp;
