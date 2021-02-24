import React, { useState, useEffect } from "react";
import "./WorkshopLEMZ.scss";
import "../../../utils/MainWindow/MainWindow.scss";
import PrintIcon from "../../../../../../../assets/print.png";
import pdfMake from "pdfmake";
import TableView from "../WorkshopsComponents/TableView/TableView.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { getProductsFromRequestsListPdfText } from "../../../utils/pdfFunctions.jsx";
import Button from "../../../utils/Form/Button/Button.jsx";
import FloatingPlus from "../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx";
import {
  getRequestById,
  deleteProductsToRequest,
  deleteRequest,
  getRequestsByWorkshop,
} from "../../../utils/RequestsAPI/Requests.jsx";
import { getCategories } from "../../../utils/RequestsAPI/Products/Categories.js";
import {
  getQuantityOfProductsFromRequests,
  formatDateString,
  getDatesFromRequests,
} from "../../../utils/functions.jsx";
import ControlPanel from "../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import { pages } from "../Requests/objects.js";
import chevronDown from "../../../../../../../assets/tableview/chevron-down.svg";
import useSort from "../../../utils/hooks/useSort/useSort.js";
import useTitleHeader from "../../../utils/hooks/uiComponents/useTitleHeader";

const WorkshopLEMZ = (props) => {
  const [requests, setRequests] = useState([]);
  const [dates, setDates] = useState([]);
  const [productsQuantities, setProductsQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
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
        let dd = getProductsFromRequestsListPdfText(categories, "ЦехЛЭМЗ");
        pdfMake.createPdf(dd).print();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Заявки - ЛЭМЗ";
    const abortController = new AbortController();
    loadRequests(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, []);

  const loadRequests = (signal) => {
    setIsLoading(true);
    return getRequestsByWorkshop("lemz", signal)
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
  const [requestStatuses, setRequestStatutes] = useState(
    requestStatuses.map((status) => ({ ...status, visible: false }))
  );

  const filterRequestsByPage = (data, page) => {
    return data.filter((item) => {
      if (page === "Завершено" && item.status === "Завершено") {
        return true;
      }
      if (
        page === "Отгружено" &&
        (item.status === "Отгружено" || item.status === "Частично отгружено")
      ) {
        return true;
      }
      if (
        page === "Открытые" &&
        item.status !== "Завершено" &&
        item.status !== "Отгружено" &&
        item.status !== "Частично отгружено"
      ) {
        return true;
      }
      return false;
    });
  };

  const filterRequestsByWorkshop = (data) => {
    return data.filter((item) => item.factory === "lemz");
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
    return filterRequestsByPage(filterRequestsByWorkshop(requests), category)
      .length;
  };

  const pageNameInURL = props.location.pathname.split(
    "/lemz/workshop-lemz/"
  )[1];
  const menuItems = [
    {
      pageName: "open",
      pageTitle: "Открытые",
      count: getCategoriesCount("Открытые"),
      link: "/lemz/workshop-lemz/open",
    },
    {
      pageName: "shipped",
      pageTitle: "Отгружено",
      count: getCategoriesCount("Отгружено"),
      link: "/lemz/workshop-lemz/shipped",
    },
    {
      pageName: "completed",
      pageTitle: "Завершено",
      count: getCategoriesCount("Завершено"),
      link: "/lemz/workshop-lemz/completed",
    },
  ];
  const { curPage, titleHeader } = useTitleHeader(
    undefined,
    menuItems,
    pages[pageNameInURL] !== undefined ? pageNameInURL : "open"
  );

  const handleStatusClick = (status, index) => {
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
  };

  return (
    <div className="requests_LEMZ">
      <div className="main-window">
        <FloatingPlus
          onClick={() => setIsMinimized(!isMinimized)}
          iconSrc={chevronDown}
          title="Свернуть заявки"
          visibility={["ROLE_ADMIN", "ROLE_LEMZ"]}
          iconStyles={{ transform: isMinimized ? "rotate(180deg)" : "" }}
        />
        <SearchBar
          fullSize
          placeholder="Введите название продукции для поиска..."
          setSearchQuery={setSearchQuery}
        />
        {titleHeader}
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
                    onClick={() => handleStatusClick(status, index)}
                  >
                    {status.name}
                  </div>
                );
              })}
            </div>
          }
          sorting={sortPanel}
        />
        <TableView
          data={filterRequests(requests)}
          workshopName="lemz"
          isLoading={isLoading}
          sortOrder={sortOrder}
          loadData={loadRequests}
          isMinimized={isMinimized}
          dates={dates.sort((a, b) => {
            if (a < b) {
              return sortOrder[sortOrder.curSort] === "desc" ? 1 : -1;
            }
            if (a > b) {
              return sortOrder[sortOrder.curSort] === "desc" ? -1 : 1;
            }
            return 0;
          })}
          deleteItem={deleteItem}
          searchQuery={searchQuery}
          userHasAccess={props.userHasAccess}
        />
      </div>
    </div>
  );
};

export default WorkshopLEMZ;
