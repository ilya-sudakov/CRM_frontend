import React, { useState, useEffect } from "react";
import "./WorkshopRequests.scss";
import "../../../../utils/MainWindow/MainWindow.scss";
import PrintIcon from "../../../../../../../../assets/print.png";
import pdfMake from "pdfmake";
import TableView from "../TableView/TableView.jsx";
import SearchBar from "../../SearchBar/SearchBar.jsx";
import { getProductsFromRequestsListPdfText } from "../../../../utils/pdfFunctions.jsx";
import Button from "../../../../utils/Form/Button/Button.jsx";
import FloatingPlus from "../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx";
import {
  getRequestById,
  deleteProductsToRequest,
  deleteRequest,
  getRequestsByWorkshop,
  transferRequest,
  addRequest,
  addProductsToRequest,
  connectClientToRequest,
  getRequests,
} from "../../../../utils/RequestsAPI/Requests.jsx";
import { getCategories } from "../../../../utils/RequestsAPI/Products/Categories.js";
import {
  getQuantityOfProductsFromRequests,
  formatDateString,
  getDatesFromRequests,
} from "../../../../utils/functions.jsx";
import ControlPanel from "../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import { pages } from "../objects.js";
import chevronDown from "../../../../../../../../assets/tableview/chevron-down.svg";
import useSort from "../../../../utils/hooks/useSort/useSort.js";
import useTitleHeader from "../../../../utils/hooks/uiComponents/useTitleHeader";
import { sortByField } from "../../../../utils/sorting/sorting";
import { requestStatuses, workshops } from "../workshopVariables.js";
import { filterRequestsByPage, getPageByRequest } from "../functions.js";
import useFormWindow from "../../../../utils/hooks/useFormWindow";

const WorkshopRequests = (props) => {
  const [requests, setRequests] = useState([]);
  const [dates, setDates] = useState([]);
  const [productsQuantities, setProductsQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(props.type === "requests");
  const [toWorkshop, setToWorkshop] = useState("lemz"); //Название цеха для переноса заявки
  const [requestId, setRequestId] = useState(0);

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

  const { formWindow, showWindow, setShowWindow } = useFormWindow(
    "Перенос заявки в план производства",
    <>
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
    </>,
    []
  );
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
      })
      .catch((error) => {
        console.log(error);
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

  const printRequestsList = () => {
    let categories = {};
    setIsLoading(true);
    getCategories()
      .then((res) => res.json())
      .then((res) => {
        res.map((category) => {
          if (categories[category.category] === undefined) {
            categories = { ...categories, [category.category]: {} };
          }
          Object.entries(productsQuantities).map((product) => {
            category.products.map((categoryProduct) => {
              if (product[0] === categoryProduct.name) {
                categories = {
                  ...categories,
                  [category.category]: {
                    ...categories[category.category],
                    [product[0]]: product[1],
                  },
                };
              }
            });
          });
        });
      })
      .then(() => {
        setIsLoading(false);
        let dd = getProductsFromRequestsListPdfText(
          categories,
          workshops[props.type].fullName
        );
        pdfMake.createPdf(dd).print();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    document.title = `Заявки - ${workshops[props.type].fullName}`;
    const abortController = new AbortController();
    loadRequests(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, []);

  const loadRequests = (signal) => {
    setIsLoading(true);
    return (props.type === "requests"
      ? getRequests(signal)
      : getRequestsByWorkshop(props.type, signal)
    )
      .then((res) => res.json())
      .then((requests) => {
        setRequests(requests);
        setProductsQuantities(getQuantityOfProductsFromRequests(requests));
        setDates(getDatesFromRequests(requests));
        setIsLoading(false);
        return;
      });
  };

  //Статусы заявок
  const [statuses, setStatuses] = useState(
    requestStatuses.map((status) => ({ ...status, visible: false }))
  );

  const filterRequestsByWorkshop = (data) => {
    return data.filter((item) => item.factory === props.type);
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
          props.type === "requests"
            ? requests
            : filterRequestsByWorkshop(requests),
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
            item.responsible.toLowerCase().includes(query) ||
            formatDateString(item.shippingDate).includes(query)
        : item.status.toLowerCase().includes(query);
    });
  };

  const getCategoriesCount = (category) => {
    return filterRequestsByPage(
      props.type === "requests" ? requests : filterRequestsByWorkshop(requests),
      category
    ).length;
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
    props.type === "requests" ? "Заявки" : undefined,
    menuItems,
    pages[pageNameInURL] !== undefined ? pageNameInURL : "open"
  );

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

  return (
    <div className="workshop-requests">
      <div className="main-window">
        <FloatingPlus
          onClick={() => setIsMinimized(!isMinimized)}
          iconSrc={chevronDown}
          title="Свернуть заявки"
          visibility={["ROLE_ADMIN", "ROLE_WORKSHOP"]}
          iconStyles={{ transform: isMinimized ? "rotate(180deg)" : "" }}
        />
        {props.type === "requests" ? titleHeader : null}
        <SearchBar
          fullSize
          placeholder="Введите название продукции для поиска..."
          setSearchQuery={setSearchQuery}
        />
        {props.type !== "requests" ? titleHeader : null}
        {props.type === "requests" && formWindow}
        <ControlPanel
          itemsCount={`Всего: ${requests.length} записей`}
          buttons={
            <Button
              text="Печать списка"
              isLoading={isLoading}
              imgSrc={PrintIcon}
              inverted
              className="main-window__button main-window__button--inverted"
              onClick={printRequestsList}
            />
          }
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
              {props.type === "requests" && (
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
              )}
            </>
          }
          sorting={sortPanel}
        />
        <TableView
          data={filterRequests(requests)}
          workshopName={props.type}
          isLoading={isLoading}
          sortOrder={sortOrder}
          loadData={loadRequests}
          isMinimized={isMinimized}
          dates={sortByField(dates, {
            fieldName: sortOrder.curSort,
            direction: sortOrder[sortOrder.curSort],
          })}
          deleteItem={deleteItem}
          searchQuery={searchQuery}
          deleteItem={deleteItem}
          transferRequest={transferRequestId}
          copyRequest={copySelectedRequest}
        />
      </div>
    </div>
  );
};

export default WorkshopRequests;
