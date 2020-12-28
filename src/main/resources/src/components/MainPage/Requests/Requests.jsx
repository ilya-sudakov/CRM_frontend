import React, { useState, useEffect } from "react";
import "../../../utils/MainWindow/MainWindow.scss";
import "./Requests.scss";
import "../../../utils/Form/Form.scss";
import "../../../utils/MainWindow/MainWindow.scss";
import {
  deleteRequest,
  deleteProductsToRequest,
  getRequestById,
  addRequest,
  editRequest,
  addProductsToRequest,
  connectClientToRequest,
} from "../../../utils/RequestsAPI/Requests.jsx";
import TableView from "../WorkshopsComponents/TableView/TableView.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import FormWindow from "../../../utils/Form/FormWindow/FormWindow.jsx";
import FloatingPlus from "../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx";
import Button from "../../../utils/Form/Button/Button.jsx";
import {
  formatDateString,
  getDatesFromRequests,
} from "../../../utils/functions.jsx";
import ControlPanel from "../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import { filterRequestsByPage, getPageByRequest } from "./functions.js";
import { pages } from "./objects.js";
import { Link } from "react-router-dom";
import Switch from "../../../utils/Form/Switch/Switch.jsx";

const Requests = (props) => {
  const [requests, setRequests] = useState([]); //Массив заявок
  const [searchQuery, setSearchQuery] = useState(""); //Значение строки поиска
  const [showWindow, setShowWindow] = useState(false); //Показывать ли окно
  const [isLoading, setIsLoading] = useState(false); //Индикатор загрузки
  const [toWorkshop, setToWorkshop] = useState("lemz"); //Название цеха для переноса заявки
  //id заявки, использующийся при ее дальнейшем копировании или переносе в цеха
  const [requestId, setRequestId] = useState(0);
  const [dates, setDates] = useState([]);
  const pageNameInURL = props.location.pathname.split("/requests/")[1];
  const [curPage, setCurPage] = useState(
    pages[pageNameInURL] !== undefined ? pageNameInURL : "open"
  ); //Текущая страница
  const [isMinimized, setIsMinimized] = useState(false);

  //Статусы заявок
  const [requestStatuses, setRequestStatutes] = useState([
    {
      name: "Проблема/Материалы",
      oldName: "Проблема-материалы",
      className: "materials",
      access: ["ROLE_ADMIN", "ROLE_WORKSHOP"],
      visible: false,
    },
    // {
    //   name: 'Отгружено',
    //   className: 'shipped',
    //   access: ['ROLE_ADMIN', 'ROLE_WORKSHOP'],
    //   visible: false,
    // },
    {
      name: "Готово к отгрузке",
      oldName: "Готово",
      className: "ready",
      access: ["ROLE_ADMIN", "ROLE_MANAGER"],
      visible: false,
    },
    {
      name: "В производстве",
      className: "in-production",
      access: ["ROLE_ADMIN", "ROLE_MANAGER"],
      visible: false,
    },
    {
      name: "Ожидание",
      className: "waiting",
      access: ["ROLE_ADMIN", "ROLE_MANAGER"],
      visible: false,
    },
    {
      name: "Приоритет",
      className: "priority",
      access: ["ROLE_ADMIN"],
      visible: false,
    },
  ]);

  const [workshops, setWorkshops] = useState([
    {
      filter: ["lemz", "lepsari", null, "requests"],
      fullName: "Все",
      visible: true,
    },
    { filter: ["lemz"], fullName: "ЦехЛЭМЗ", visible: false },
    { filter: ["lepsari"], fullName: "ЦехЛепсари", visible: false },
    { filter: [null, "requests"], fullName: "Не перенесенные", visible: false },
  ]);

  //Удалить заявку
  const deleteItem = (id) => {
    getRequestById(id)
      .then((res) => res.json())
      .then((res) => {
        const productsArr = res.requestProducts.map((product) => {
          return deleteProductsToRequest(product.id);
        });
        Promise.all(productsArr).then(() => {
          deleteRequest(id).then(() => loadRequests());
        });
      });
  };

  useEffect(() => {
    document.title = "Заявки";
    let abortController = new AbortController();
    requests.length === 0 && loadRequests(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, [curPage]);

  //GET-запрос на получение всех заявок
  const loadRequests = (signal) => {
    setIsLoading(true);
    return pages[curPage]
      .getRequests(signal)
      .then((res) => res.json())
      .then((requests) => {
        let temp = requests.map((item) => {
          return {
            ...item,
            open: false,
          };
        });
        setIsLoading(false);
        // console.log(temp)
        setRequests(temp);
        setDates(getDatesFromRequests(temp));
        return;
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        return;
      });
  };

  //Перенести заявку
  const transferRequest = (id) => {
    setRequestId(id);
    setShowWindow(!showWindow);
  };

  //Копировать заявку
  const copySelectedRequest = (id) => {
    setIsLoading(true);
    const requestToBeCopied = requests.find((item) => {
      if (item.id === id) {
        return true;
      }
    });
    let newId = 0;
    addRequest({
      date: requestToBeCopied.date,
      products: requestToBeCopied.requestProducts,
      quantity: requestToBeCopied.quantity,
      clientId: requestToBeCopied.client?.id,
      sum: requestToBeCopied.sum,
      responsible: requestToBeCopied.responsible,
      status: requestToBeCopied.status,
      shippingDate:
        requestToBeCopied.shippingDate !== null
          ? requestToBeCopied.shippingDate
          : new Date(),
      comment: requestToBeCopied.comment,
      factory: requestToBeCopied.factory,
    })
      .then((res) => res.json())
      .then((res) => {
        newId = res.id;
        return Promise.all(
          requestToBeCopied.requestProducts.map((item) => {
            return addProductsToRequest({
              requestId: res.id,
              quantity: item.quantity,
              packaging: item.packaging,
              status: item.status,
              name: item.name,
            });
          })
        );
      })
      .then(() => connectClientToRequest(newId, requestToBeCopied.client?.id))
      .then(() => {
        setIsLoading(false);
        loadRequests();
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const filterRequestsByWorkshop = (data) => {
    return data.filter((item) => {
      const selectedWorkshop = workshops.find((workshop) => workshop.visible);
      if (selectedWorkshop === undefined) {
        return false;
      }
      let check = false;
      selectedWorkshop.filter.map((type) => {
        if (type === item.factory) {
          return (check = true);
        }
      });
      return check;
    });
  };

  const filterRequestsByStatuses = (data) => {
    return data.filter((item) => {
      let check = false;
      let noActiveStatuses = true;
      requestStatuses.map((status) => {
        requestStatuses.map((status) => {
          if (status.visible) {
            noActiveStatuses = false;
          }
        });
        if (
          noActiveStatuses === true ||
          (status.visible &&
            (status.name === item.status || status.oldName === item.status))
        ) {
          check = true;
          return;
        }
      });
      return check;
    });
  };

  const filterRequests = (requests) => {
    return filterSearchQuery(
      filterRequestsByStatuses(
        filterRequestsByPage(
          filterRequestsByWorkshop(requests),
          pages[curPage].name
        )
      )
    );
  };

  // * Sorting

  const [sortOrder, setSortOrder] = useState({
    curSort: "date",
    date: "desc",
  });

  const filterSearchQuery = (data) => {
    const query = searchQuery.toLowerCase();
    return data.filter((item) => {
      return item.requestProducts.length !== 0 &&
        item.requestProducts[0].name !== null
        ? item.requestProducts[0].name.toLowerCase().includes(query) ||
            item.id.toString().includes(query) ||
            formatDateString(item.date).includes(query) ||
            (item.codeWord || "").toLowerCase().includes(query) ||
            item.status.toLowerCase().includes(query) ||
            (item.responsible || "").toLowerCase().includes(query) ||
            formatDateString(item.shippingDate).includes(query)
        : item.status.toLowerCase().includes(query);
    });
  };

  const changeSortOrder = (event) => {
    const name = event.target.value.split(" ")[0];
    const order = event.target.value.split(" ")[1];
    setSortOrder({
      curSort: name,
      [name]: order,
    });
  };

  return (
    <div className="requests">
      <div className="main-window">
        <FloatingPlus
          linkTo="/requests/new"
          visibility={["ROLE_ADMIN", "ROLE_MANAGER"]}
        />
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Заявки</div>
          <div className="main-window__menu">
            <Link
              className={
                curPage === "open"
                  ? "main-window__item--active main-window__item"
                  : "main-window__item"
              }
              to="/requests/open"
              onClick={() => setCurPage("open")}
            >
              Открытые
              <span className="main-window__items-count">
                {
                  filterRequestsByPage(
                    filterRequestsByWorkshop(requests),
                    "Открытые"
                  ).length
                }
              </span>
            </Link>
            <Link
              className={
                curPage === "shipped"
                  ? "main-window__item--active main-window__item"
                  : "main-window__item"
              }
              to="/requests/shipped"
              onClick={() => setCurPage("shipped")}
            >
              Отгружено
              <span className="main-window__items-count">
                {
                  filterRequestsByPage(
                    filterRequestsByWorkshop(requests),
                    "Отгружено"
                  ).length
                }
              </span>
            </Link>
            <Link
              className={
                curPage === "completed"
                  ? "main-window__item--active main-window__item"
                  : "main-window__item"
              }
              to="/requests/completed"
              onClick={() => setCurPage("completed")}
            >
              Завершено
            </Link>
          </div>
        </div>
        <SearchBar
          fullSize
          placeholder="Введите название продукции для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <FormWindow
          title="Перенос заявки в план производства"
          windowName="transfer-request"
          content={
            <React.Fragment>
              <div className="main-form">
                <div className="main-form__form">
                  <div className="main-form__item">
                    <div className="main-form__input_name">Подразделение</div>
                    <div className="main-form__input_field">
                      <select
                        name="workshop"
                        onChange={(event) => {
                          setToWorkshop(event.target.value);
                        }}
                      >
                        <option value="lemz">ЦехЛЭМЗ</option>
                        <option value="lepsari">ЦехЛепсари</option>
                      </select>
                    </div>
                  </div>
                  <div className="main-form__buttons main-form__buttons--full">
                    <Button
                      className="main-form__submit"
                      isLoading={isLoading}
                      onClick={() => {
                        setIsLoading(true);
                        const request = requests.find(
                          (item) => item.id === requestId
                        );
                        editRequest(
                          { ...request, factory: toWorkshop },
                          request.id
                        )
                          .then((res) => res.json())
                          .then((res) => {
                            setIsLoading(false);
                            setShowWindow(false);
                            props.history.push(
                              `/${toWorkshop}/workshop-${toWorkshop}/${getPageByRequest(
                                request
                              )}#${request.id}`
                            );
                            window.location.reload();
                          })
                          .catch((error) => {
                            console.log(error);
                            alert("Ошибка при копировании записи");
                            setIsLoading(false);
                          });
                      }}
                      text="Перенести в цех"
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          }
          showWindow={showWindow}
          setShowWindow={setShowWindow}
        />
        <ControlPanel
          itemsCount={`Всего: ${requests.length} записей`}
          // buttons={
          //   <>
          //     <SearchBar
          //       // fullSize
          //       placeholder="Введите название продукции для поиска..."
          //       setSearchQuery={setSearchQuery}
          //     />
          //   </>
          // }
          sorting={
            <div className="main-window__sort-panel">
              <select onChange={changeSortOrder}>
                <option value="date desc">По дате (убыв.)</option>
                <option value="date asc">По дате (возр.)</option>
                <option value="sum desc">По сумме (убыв.)</option>
                <option value="sum asc">По сумме (возр.)</option>
                <option value="shippingDate desc">
                  По дате отгрузки (убыв.)
                </option>
                <option value="shippingDate asc">
                  По дате отгрузки (возр.)
                </option>
              </select>
            </div>
          }
          buttons={
            <Switch
              checked={isMinimized}
              handleChange={(value) => setIsMinimized(value)}
              text="Свернуть заявки"
            />
          }
          content={
            <>
              <div className="main-window__status-panel">
                <div>Фильтр по статусам: </div>
                {requestStatuses.map((status, index) => {
                  return (
                    <div
                      className={
                        (status.visible
                          ? "main-window__button"
                          : "main-window__button main-window__button--inverted") +
                        " main-window__list-item--" +
                        status.className
                      }
                      onClick={() => {
                        let temp = requestStatuses.map((status) => {
                          return {
                            ...status,
                            visible: false,
                          };
                        });
                        temp.splice(index, 1, {
                          ...status,
                          visible: !status.visible,
                        });
                        setRequestStatutes([...temp]);
                      }}
                    >
                      {status.name}
                    </div>
                  );
                })}
              </div>
              <div
                className="main-window__filter-pick"
                style={{ marginTop: "10px" }}
              >
                <div>Фильтр по цехам: </div>
                {workshops.map((workshop, index) => {
                  return (
                    <div
                      className={
                        workshop.visible
                          ? "main-window__button"
                          : "main-window__button main-window__button--inverted"
                      }
                      onClick={() => {
                        let temp = workshops.map((tempWorkshop) => {
                          return {
                            ...tempWorkshop,
                            visible: false,
                          };
                        });
                        temp.splice(index, 1, {
                          ...workshop,
                          visible: !workshop.visible,
                        });
                        setWorkshops([...temp]);
                      }}
                    >
                      {workshop.fullName}
                    </div>
                  );
                })}
              </div>
            </>
          }
        />
        <TableView
          data={filterRequests(requests)}
          dates={dates.sort((a, b) => {
            if (a < b) {
              return sortOrder[sortOrder.curSort] === "desc" ? 1 : -1;
            }
            if (a > b) {
              return sortOrder[sortOrder.curSort] === "desc" ? -1 : 1;
            }
            return 0;
          })}
          isLoading={isLoading}
          sortOrder={sortOrder}
          workshopName="requests"
          loadData={loadRequests}
          isMinimized={isMinimized}
          deleteItem={deleteItem}
          transferRequest={transferRequest}
          copyRequest={copySelectedRequest}
        />
      </div>
    </div>
  );
};

export default Requests;
