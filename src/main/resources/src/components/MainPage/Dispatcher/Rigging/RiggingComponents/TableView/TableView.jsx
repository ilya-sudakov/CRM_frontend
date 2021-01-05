import React, { useState, useEffect, useCallback } from "react";
import { Link, withRouter } from "react-router-dom";
import viewIcon from "../../../../../../../../../../assets/tableview/view.svg";
import editIcon from "../../../../../../../../../../assets/tableview/edit.svg";
import deleteIcon from "../../../../../../../../../../assets/tableview/delete.svg";
import "./TableView.scss";
import {
  addSpaceDelimiter,
  scrollToElement,
} from "../../../../../../utils/functions.jsx";
import { rigStatuses, rigTypes, workshopsLocations } from "../rigsVariables";
import {
  editStampColor,
  editStampPartColor,
} from "../../../../../../utils/RequestsAPI/Rigging/Stamp.jsx";
import PlaceholderLoading from "../../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx";
import TableActions from "../../../../../../utils/TableView/TableActions/TableActions.jsx";
import DeleteItemAction from "../../../../../../utils/TableView/TableActions/Actions/DeleteItemAction.jsx";

const TableView = (props) => {
  const [sortOrder, setSortOrder] = useState({
    curSort: "id",
    date: "desc",
  });
  const [partsVisible, setPartsVisible] = useState([]);
  const [scrolledToPrev, setScrolledToPrev] = useState(false);

  const searchQuery = (data) => {
    let re = /[.,\s]/gi;
    const query = props.searchQuery.toLowerCase();
    return data.filter(
      (item) =>
        item.id.toString().includes(query) ||
        item.comment.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.number
          .toLowerCase()
          .replace(re, "")
          .includes(query.replace(re, ""))
    );
  };

  const sortStamps = (data) => {
    return searchQuery(data).sort((a, b) => {
      if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === "desc" ? -1 : 1;
      }
      if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === "desc" ? 1 : -1;
      }
      return 0;
    });
  };

  const sortStampParts = (data) => {
    return data.sort((a, b) => {
      if (a.number < b.number) {
        return -1;
      }
      if (a.number > b.number) {
        return 1;
      }
      if (a.number === b.number && a.id < b.id) {
        return -1;
      }
      if (a.number === b.number && a.id > b.id) {
        return 1;
      }
      return 0;
    });
  };

  useEffect(() => {
    // console.log(props.data);
    let temp = [];
    props.data.map((element, index) => {
      if (props.cachedItems[element.id] === undefined) {
        props.setCachedItems({
          ...props.cachedItems,
          [element.id]: true,
        });
      }
      return temp.push({
        id: element.id,
        hidden:
          props.cachedItems[element.id] !== undefined
            ? props.cachedItems[element.id]
            : true,
      });
    });
    // console.log(cacheElements)
    setPartsVisible([...temp]);
  }, [props.data]);

  const checkPart = (index) => {
    index = Number.parseInt(index);
    return partsVisible.map((element, element_index) => {
      if (element.id == index) {
        props.setCachedItems({
          ...props.cachedItems,
          [index]: !element.hidden,
        });
        let temp2 = Object.assign({
          id: index,
          hidden: !element.hidden,
        });
        return temp2;
      }
      return element;
    });
  };

  const isPartHidden = (index) => {
    index = Number.parseInt(index);
    let check = true;
    partsVisible.map((element) => {
      if (element.id === index) {
        check = element.hidden;
      }
    });
    return check;
  };

  const handleClickStamp = (event) => {
    let id = event.currentTarget.getAttribute("id");
    !event.target.className.includes("main-window__status_select") &&
      !event.target.className.includes("main-window__action") &&
      !event.target.className.includes("main-window__img") &&
      setPartsVisible([...checkPart(id)]);
  };

  const prevRef = useCallback(
    (node) => {
      const id = Number.parseInt(props.history.location.hash.split("#")[1]);

      if (
        !props.data ||
        scrolledToPrev ||
        props.data.find((item) => item.id === id) === undefined
      )
        return;

      if (node !== null && props.data) {
        setTimeout(() => scrollToElement(node, -200), 600);
        setScrolledToPrev(true);
      }
    },
    [props.data]
  );

  return (
    <div className="rigging-tableview">
      <div className="main-window">
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <span>ID</span>
            <span>Артикул</span>
            <span>Название</span>
            <span>Комментарий</span>
            <span>Статус</span>
            <div className="main-window__table-actions"></div>
          </div>
          {props.isLoading && (
            <PlaceholderLoading
              itemClassName="main-window__list-item"
              minHeight="35px"
              items={5}
            />
          )}
          {sortStamps(props.data).map((stamp, stamp_id) => (
            <>
              <div
                id={stamp.id}
                ref={
                  Number.parseInt(props.history.location.hash.split("#")[1]) ===
                  stamp.id
                    ? prevRef
                    : null
                }
                className={
                  "main-window__list-item main-window__list-item--" +
                  (stamp.color || "production")
                }
                onClick={handleClickStamp}
              >
                <span>
                  <div className="main-window__mobile-text">ID:</div>
                  {stamp.id}
                </span>
                <span>
                  <div className="main-window__mobile-text">Артикул:</div>
                  {stamp.number}
                </span>
                <span>
                  <div className="main-window__mobile-text">Название:</div>
                  {stamp.name}
                </span>
                <span title={stamp.comment}>
                  <div className="main-window__mobile-text">Комментарий:</div>
                  {stamp.comment}
                </span>
                <span
                  className={
                    "main-window__list-item--" +
                    rigStatuses[stamp.color || "production"].className
                  }
                >
                  <div className="main-window__mobile-text">Статус заявки:</div>
                  <select
                    id={stamp.id}
                    className="main-window__status_select"
                    value={stamp.color || "production"}
                    onChange={(event) => {
                      return editStampColor(
                        {
                          color: event.target.value,
                        },
                        stamp.id
                      ).then(() => props.loadData());
                    }}
                  >
                    {Object.values(rigStatuses).map((status) => (
                      <option value={status.className}>{status.name}</option>
                    ))}
                  </select>
                </span>
                <TableActions
                  actionsList={[
                    {
                      link: `${rigTypes[props.type].redirectURL}/view/${
                        stamp.id
                      }`,
                      title: "Просмотр",
                      imgSrc: viewIcon,
                    },
                    {
                      link: `${rigTypes[props.type].redirectURL}/edit/${
                        stamp.id
                      }`,
                      title: "Редактирование",
                      imgSrc: editIcon,
                    },
                    {
                      customElement: (
                        <DeleteItemAction
                          onClick={() => props.deleteItem(stamp.id)}
                          icon={deleteIcon}
                          title="Удалить"
                        />
                      ),
                    },
                  ]}
                />
              </div>
              <div
                id={stamp_id}
                className={`main-window__list-options 
                  ${
                    isPartHidden(stamp.id) === true
                      ? "main-window__list-options--hidden"
                      : ""
                  }`}
              >
                <div className="main-window__list">
                  <div className="main-window__list-item main-window__list-item--header">
                    <span>Артикул</span>
                    <span>Название</span>
                    <span>Кол-во</span>
                    <span>Местоположение</span>
                    <span>Комментарий</span>
                    <span>Статус</span>
                    <span>Распил/габариты</span>
                    <span>Фрезеровка/точение</span>
                    <span>Закалка</span>
                    <span>Шлифовка</span>
                    <span>Эрозия</span>
                    {/* <span>Проверка</span> */}
                    <div className="main-window__actions">Действия</div>
                  </div>
                  {sortStampParts(stamp.stampParts).map((part, index) => (
                    <div
                      key={index}
                      className={
                        "main-window__list-item main-window__list-item--" +
                        (part.color || "production") +
                        (workshopsLocations[part.location]
                          ? ""
                          : " main-window__list-item--message main-window__list-item--warning")
                      }
                      data-msg="Предупреждение! Введите корректное местоположение"
                    >
                      <span>
                        <div className="main-window__mobile-text">Артикул:</div>
                        {part.number}
                      </span>
                      <span>
                        <div className="main-window__mobile-text">
                          Название:
                        </div>{" "}
                        {part.name}
                      </span>
                      <span>
                        <div className="main-window__mobile-text">Кол-во:</div>
                        {addSpaceDelimiter(part.amount)}
                      </span>
                      <span>
                        <div className="main-window__mobile-text">
                          Местоположение:
                        </div>
                        {workshopsLocations[part.location]
                          ? workshopsLocations[part.location].name
                          : ""}
                      </span>
                      <span>
                        <div className="main-window__mobile-text">
                          Комментарий:
                        </div>
                        {part.comment}
                      </span>
                      <span
                        className={
                          "main-window__list-item--" +
                          rigStatuses[part.color || "production"].className
                        }
                      >
                        <div className="main-window__mobile-text">Статус:</div>
                        <select
                          id={part.id}
                          className="main-window__status_select"
                          value={part.color}
                          onChange={(event) => {
                            return editStampPartColor(
                              {
                                color: event.target.value,
                              },
                              part.id
                            ).then(() => props.loadData());
                          }}
                        >
                          {Object.values(rigStatuses).map((status) => (
                            <option value={status.className}>
                              {status.name}
                            </option>
                          ))}
                        </select>
                      </span>
                      <span className="main-window__list-item--border-checked">
                        <div className="main-window__mobile-text">
                          Распил/габариты:
                        </div>
                        {part.cuttingDimensions}
                      </span>
                      <span className="main-window__list-item--border-checked">
                        <div className="main-window__mobile-text">
                          Фрезеровка/точение:
                        </div>
                        {part.milling}
                      </span>
                      <span className="main-window__list-item--border-checked">
                        <div className="main-window__mobile-text">Закалка:</div>
                        {part.harding}
                      </span>
                      <span className="main-window__list-item--border-checked">
                        <div className="main-window__mobile-text">
                          Шлифовка:
                        </div>
                        {part.grinding}
                      </span>
                      <span className="main-window__list-item--border-checked">
                        <div className="main-window__mobile-text">Эрозия:</div>
                        {part.erosion}
                      </span>
                      <div className="main-window__actions">
                        <Link
                          to={`${rigTypes[props.type].redirectURL}/edit-part/${
                            stamp.id
                          }/${part.id}`}
                          className="main-window__action"
                          title="Редактировать"
                        >
                          <img
                            className="main-window__img"
                            src={editIcon}
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withRouter(TableView);
