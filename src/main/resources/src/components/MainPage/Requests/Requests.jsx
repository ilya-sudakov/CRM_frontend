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
  addProductsToRequest,
  connectClientToRequest,
  transferRequest,
  getRequests,
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
import {
  filterRequestsByPage,
  getPageByRequest,
} from "../WorkshopsComponents/functions.js";
import chevronDown from "../../../../../../../assets/tableview/chevron-down.svg";
import {
  requestStatuses,
  workshops,
} from "../WorkshopsComponents/workshopVariables.js";
import { pages } from "../WorkshopsComponents/objects.js";
import useSort from "../../../utils/hooks/useSort/useSort.js";
import useTitleHeader from "../../../utils/hooks/uiComponents/useTitleHeader.js";
import { sortByField } from "../../../utils/sorting/sorting.js";

const Requests = (props) => {
  const [requests, setRequests] = useState([]); //Массив заявок
  const [searchQuery, setSearchQuery] = useState(""); //Значение строки поиска
  const [showWindow, setShowWindow] = useState(false); //Показывать ли окно
  const [isLoading, setIsLoading] = useState(false); //Индикатор загрузки
  const [toWorkshop, setToWorkshop] = useState("lemz"); //Название цеха для переноса заявки
  //id заявки, использующийся при ее дальнейшем копировании или переносе в цеха
  const [requestId, setRequestId] = useState(0);
  const [dates, setDates] = useState([]);
  const [isMinimized, setIsMinimized] = useState(true);
  //Статусы заявок
  const [statuses, setStatuses] = useState(
    requestStatuses.map((status) => ({ ...status, visible: false }))
  );
  const [workshopsFilter, setWorkshopsFilter] = useState([
    {
      filter: ["lemz", "lepsari", null, "requests"],
      fullName: "Все",
      visible: true,
    },
    { filter: ["lemz"], fullName: "ЦехЛЭМЗ", visible: false },
    { filter: ["lepsari"], fullName: "ЦехЛепсари", visible: false },
    { filter: [null, "requests"], fullName: "Не перенесенные", visible: false },
  ]);
  const { sortOrder, sortPanel } = useSort([], {
    ignoreURL: false,
    sortOrder: {
      curSort: "date",
      date: "desc",
    },
    sortOptions: [
      { value: "date desc", text: "По дате (убыв.)" },
      { value: "date asc", text: "По дате (возр.)" },
      { value: "sum desc", text: "По сумме (убыв.)" },
      { value: "sum asc", text: "По сумме (возр.)" },
      { value: "shippingDate desc", text: "По даты отгрузки (убыв.)" },
      { value: "shippingDate asc", text: "По даты отгрузки (возр.)" },
    ],
  });

  const filterRequestsByWorkshop = (data) => {
    return data.filter((item) => {
      const selectedWorkshop = workshopsFilter.find(
        (workshop) => workshop.visible
      );
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
      statuses.map((status) => {
        statuses.map((status) => {
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

  const getCategoriesCount = (category) => {
    return filterRequestsByPage(filterRequestsByWorkshop(requests), category)
      .length;
  };

  const pageNameInURL = props.location.pathname.split(
    `${workshops[props.type].redirectURL}/`
  )[1];
  const menuItems = [
    {
      pageName: "open",
      pageTitle: "Открытые",
      count: getCategoriesCount("Открытые"),
      link: `${workshops[props.type].redirectURL}/open`,
    },
    {
      pageName: "shipped",
      pageTitle: "Отгружено",
      count: getCategoriesCount("Отгружено"),
      link: `${workshops[props.type].redirectURL}/shipped`,
    },
    {
      pageName: "completed",
      pageTitle: "Завершено",
      link: `${workshops[props.type].redirectURL}/completed`,
    },
  ];
  const { curPage, titleHeader } = useTitleHeader(
    "Заявки",
    menuItems,
    pages[pageNameInURL] !== undefined ? pageNameInURL : "open"
  );

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
    return getRequests(signal)
      .then((res) => res.json())
      .then((requests) => {
        let temp = requests.map((item) => {
          return {
            ...item,
            open: false,
          };
        });
        setIsLoading(false);
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
  const transferRequestId = (id) => {
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

  const handleStatusClick = (status, index) => {
    let temp = statuses.map((status) => {
      return {
        ...status,
        visible: false,
      };
    });
    temp.splice(index, 1, {
      ...status,
      visible: !status.visible,
    });
    setStatuses([...temp]);
  };

  const handleTransferRequest = () => {
    setIsLoading(true);
    const request = requests.find((item) => item.id === requestId);
    transferRequest(request.id, toWorkshop)
      .then((res) => res.json())
      .then(() => {
        setIsLoading(false);
        setShowWindow(false);
        props.history.push(
          `/${toWorkshop}/workshop-${toWorkshop}/${getPageByRequest(request)}#${
            request.id
          }`
        );
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("Ошибка при копировании записи");
        setIsLoading(false);
      });
  };

  return (
    <div className="requests">
      <div className="main-window">
        <FloatingPlus
          visibility={["ROLE_ADMIN", "ROLE_MANAGER"]}
          onClick={() => setIsMinimized(!isMinimized)}
          iconSrc={chevronDown}
          iconStyles={{ transform: isMinimized ? "rotate(180deg)" : "" }}
          title="Свернуть заявки"
        />
        {titleHeader}
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
                        onChange={({ target }) => setToWorkshop(target.value)}
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
                      onClick={handleTransferRequest}
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
          sorting={sortPanel}
          content={
            <>
              <div className="main-window__status-panel">
                <div>Фильтр по статусам: </div>
                {statuses.map((status, index) => {
                  return (
                    <div
                      className={
                        (status.visible
                          ? "main-window__button"
                          : "main-window__button main-window__button--inverted") +
                        " main-window__list-item--" +
                        status.className
                      }
                      onClick={() => handleStatusClick(status, index)}
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
                {workshopsFilter.map((workshop, index) => {
                  return (
                    <div
                      className={
                        workshop.visible
                          ? "main-window__button"
                          : "main-window__button main-window__button--inverted"
                      }
                      onClick={() => {
                        let temp = workshopsFilter.map((tempWorkshop) => {
                          return {
                            ...tempWorkshop,
                            visible: false,
                          };
                        });
                        temp.splice(index, 1, {
                          ...workshop,
                          visible: !workshop.visible,
                        });
                        setWorkshopsFilter([...temp]);
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
          dates={sortByField(dates, {
            fieldName: sortOrder.curSort,
            direction: sortOrder[sortOrder.curSort],
          })}
          isLoading={isLoading}
          sortOrder={sortOrder}
          workshopName="requests"
          loadData={loadRequests}
          isMinimized={isMinimized}
          deleteItem={deleteItem}
          transferRequest={transferRequestId}
          copyRequest={copySelectedRequest}
        />
      </div>
    </div>
  );
};

export default Requests;
