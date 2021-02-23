import React, { useContext, useState } from "react";
import "./WorkshopOrders.scss";
import SearchBar from "../../SearchBar/SearchBar.jsx";
import { formatDateString } from "../../../../utils/functions.jsx";
import {
  deleteProductFromOrder,
  deleteOrder,
  getOrdersByName,
} from "../../../../utils/RequestsAPI/Workshop/Orders.jsx";
import FloatingPlus from "../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx";
import ControlPanel from "../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import UserContext from "../../../../App.js";
import Tableview from "./Table.jsx";
import { sortByField } from "../../../../utils/sorting/sorting";
import { workshops } from "../workshopVariables.js";

const WorkshopOrders = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const userContext = useContext(UserContext);
  const [statuses, setStatuses] = useState([
    {
      className: "sent",
      name: "Отправлено",
      visible: true,
    },
    {
      className: "completed",
      name: "Завершено",
      visible: false,
    },
    {
      className: "ordered",
      name: "Заказано",
      visible: true,
    },
    {
      className: "problem",
      name: "Проблема",
      visible: true,
    },
  ]);

  const loadData = (signal) => {
    setIsLoading(true);
    return getOrdersByName(
      {
        name: workshops[props.type].fullName,
      },
      signal
    )
      .then((res) => res.json())
      .then((res) => {
        setOrders(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const deleteItem = (item) => {
    Promise.all(
      item.products.map((product) => deleteProductFromOrder(product.id))
    )
      .then(() => deleteOrder(item.id))
      .then(() => loadData());
  };

  const filterOrders = (data) => {
    return data.filter((item) => {
      if (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formatDateString(item.deliverBy)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.assembly.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        let check = false;
        statuses.map((status) => {
          if (status.visible && status.className === item.status) {
            check = true;
            return;
          }
        });
        return check;
      }
    });
  };

  const handleStatusClick = (index, status) => {
    let temp = statuses;
    temp.splice(index, 1, {
      ...status,
      visible: !status.visible,
    });
    setStatuses([...temp]);
  };

  useState(() => {
    document.title = `Комплектация ${workshops[props.type].name}`;
    const abortController = new AbortController();
    loadData(abortController.signal);
    setIsLoading(false);
    return function cancel() {
      abortController.abort();
    };
  }, []);

  return (
    <div className="workshop-orders">
      <div className="main-window">
        <SearchBar
          fullSize
          placeholder="Введите запрос для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <FloatingPlus
          linkTo={`${workshops[props.type].ordersRedirectURL}/new`}
          visibility={["ROLE_ADMIN", "ROLE_ENGINEER", "ROLE_LEMZ"]}
        />
        <ControlPanel
          itemsCount={`Всего: ${orders.length} записей`}
          content={
            <div className="main-window__info-panel">
              <div className="main-window__status-panel">
                <div>Фильтр по статусам: </div>
                {statuses.map((status, index) => {
                  return (
                    <div
                      className={`main-window__button ${
                        status.visible ? "" : "main-window__button--inverted"
                      } main-window__list-item--${status.className}`}
                      onClick={() => handleStatusClick(index, status)}
                    >
                      {status.name}
                    </div>
                  );
                })}
              </div>
            </div>
          }
        />
        <Tableview
          data={sortByField(filterOrders(orders), {
            fieldName: "date",
            direction: "desc",
          })}
          link={workshops[props.type].ordersRedirectURL}
          isLoading={isLoading}
          statuses={statuses}
          deleteItem={deleteItem}
          userHasAccess={userContext.userHasAccess}
        />
      </div>
    </div>
  );
};

export default WorkshopOrders;
