import React, { useState, useEffect, useContext } from "react";
import "./Clients.scss";
import "../../../utils/MainWindow/MainWindow.scss";
import "../../../utils/Form/Form.scss";
import { searchClients } from "../../../utils/RequestsAPI/Clients.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Link } from "react-router-dom";
import FormWindow from "../../../utils/Form/FormWindow/FormWindow.jsx";
import Button from "../../../utils/Form/Button/Button.jsx";
import FloatingPlus from "../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx";
import ControlPanel from "../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import EditWorkHistory from "./MainComponents/EditWorkHistory.jsx";
import EditNextContactDate from "./MainComponents/EditContactDay.jsx";
import ClientsList from "./MainComponents/ClientsList.jsx";
import UserContext from "../../../App.js";
import { getEmailsExcel } from "./MainComponents/functions.js";
import { changeSortOrder } from "../../../utils/functions.jsx";
import { clientTypes } from "./MainComponents/objects.js";
import usePagination from "../../../utils/hooks/usePagination/usePagination";

const Clients = (props) => {
  const [clients, setClients] = useState([]);
  const [curCategory, setCurCategory] = useState("");
  const [curClientType, setCurClientType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    pagination,
    curPage,
    setCurPage,
    isLoadingPages = isLoading,
    itemsPerPage,
    sortOrder,
    data,
    setSortOrder,
  } = usePagination(
    curCategory !== "" ? () => loadData(curCategory, curClientType) : null,
    [curClientType, curCategory],
    "dynamic",
    {
      sortOrder: {
        curSort: "name",
        name: "asc",
        nextDateContact: "asc",
      },
      size: 10,
    }
  );
  const [itemsActiveCount, setItemsActiveCount] = useState(0);
  const [itemsPotentialCount, setItemsPotentialCount] = useState(0);
  const [itemsProgressCount, setItemsProgressCount] = useState(0);
  const [curForm, setCurForm] = useState("nextContactDate");
  const [showWindow, setShowWindow] = useState(false);
  const [closeWindow, setCloseWindow] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const userContext = useContext(UserContext);

  const menuItems = [
    {
      link: "active",
      name: "Активные",
      count: itemsActiveCount,
    },
    {
      link: "potential",
      name: "Потенциальные",
      count: itemsPotentialCount,
    },
    {
      link: "in-progress",
      name: "В разработке",
      count: itemsProgressCount,
    },
  ];

  const deleteItem = async (clientId, index) => {
    return Promise.all(
      clients[index].legalEntities.map((item) =>
        clientTypes[props.type].deleteLegalEntityFunction(item.id)
      )
    )
      .then(() =>
        Promise.all(
          clients[index].contacts.map((item) => {
            return clientTypes[props.type].deleteContactsFunction(item.id);
          })
        )
      )
      .then(() =>
        Promise.all(
          clients[index].histories.map((item) => {
            return clientTypes[props.type].deleteWorkHistoryFunction(item.id);
          })
        )
      )
      .then(() =>
        clientTypes[props.type].deleteItemFunction(clientId).then(() => {
          let temp = clients;
          temp.splice(index, 1);
          setClients([...temp]);
        })
      )
      .catch((error) => {
        alert("Ошибка при удалении");
        console.log(error);
      });
  };

  const loadClientsTotalByType = (category) => {
    return clientTypes[props.type]
      .loadItemsByCategory(
        {
          categoryName: category,
          clientType: "Активные",
        },
        1,
        1,
        sortOrder
      )
      .then((res) => res.json())
      .then((res) => {
        setItemsActiveCount(res.totalElements);
        return clientTypes[props.type]
          .loadItemsByCategory(
            {
              categoryName: category,
              clientType: "Потенциальные",
            },
            1,
            1,
            sortOrder
          )
          .then((res) => res.json())
          .then((res) => {
            setItemsPotentialCount(res.totalElements);
            return clientTypes[props.type]
              .loadItemsByCategory(
                {
                  categoryName: category,
                  clientType: "В разработке",
                },
                1,
                1,
                sortOrder
              )
              .then((res) => res.json())
              .then((res) => {
                setItemsProgressCount(res.totalElements);
              });
          });
      });
  };

  const loadData = (category, type, signal) => {
    setSearchQuery("");
    return clientTypes[props.type].loadItemsByCategory(
      {
        categoryName: category,
        clientType:
          type === "active"
            ? "Активные"
            : type === "potential"
            ? "Потенциальные"
            : "В разработке",
      },
      curPage,
      itemsPerPage,
      sortOrder,
      signal
    );
  };

  const initialLoad = () => {
    const curCategoryTemp = props.location.pathname
      .split("/category/")[1]
      .split("/")[0];
    const curClientTypeTemp = props.location.pathname
      .split("/category/")[1]
      .split("/")[1];
    if (
      curCategory !== "" &&
      curClientTypeTemp !== "" &&
      (curCategoryTemp !== curCategory || curClientTypeTemp !== curClientType)
    )
      setCurPage(1);
    setCurCategory(curCategoryTemp);
    setCurClientType(curClientTypeTemp);
    loadClientsTotalByType(curCategoryTemp);
    return;
  };

  useEffect(() => {
    document.title = clientTypes[props.type].title;
    const abortController = new AbortController();
    initialLoad(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, [props.location, props.type]);

  return (
    <div className="clients">
      <div className="main-window">
        <FloatingPlus
          linkTo={"/" + props.type + "/new"}
          visibility={["ROLE_ADMIN", "ROLE_MANAGER"]}
        />
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">
            <span>{curCategory}</span>
            <Button
              text="Выгрузить эл. почты"
              isLoading={isLoading}
              className="main-window__button main-window__button--inverted"
              inverted
              onClick={async () => {
                setIsLoading(true);
                getEmailsExcel().then(() => {
                  setIsLoading(false);
                });
              }}
            />
          </div>
          <div className="main-window__menu">
            {menuItems.map((menuItem) => (
              <MenuItem
                type={props.type}
                curCategory={curCategory}
                location={props.location}
                item={menuItem}
              />
            ))}
          </div>
        </div>
        <SearchBar
          fullSize
          placeholder="Введите запрос для поиска..."
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          onButtonClick={(query) => {
            setIsLoading(true);
            if (query === "") {
              setIsLoading(false);
              loadData(curCategory, curClientType);
            } else {
              searchClients({
                name: query,
                type: clientTypes[props.type].type,
              })
                .then((res) => res.json())
                .then((res) => {
                  setClients(res);
                  setIsLoading(false);
                })
                .catch((error) => {
                  console.log(error);
                  setIsLoading(false);
                });
            }
          }}
        />
        <FormWindow
          title={
            curForm === "nextContactDate"
              ? "Дата следующего контакта"
              : "Запись действия"
          }
          content={
            <React.Fragment>
              {curForm === "nextContactDate" ? (
                <EditNextContactDate
                  selectedItem={selectedItem}
                  showWindow={showWindow}
                  setShowWindow={setShowWindow}
                  setCloseWindow={setCloseWindow}
                  closeWindow={closeWindow}
                  loadData={loadData}
                  editNextContactDate={
                    clientTypes[props.type].editNextContactDateFunction
                  }
                />
              ) : (
                <EditWorkHistory
                  selectedItem={selectedItem}
                  showWindow={showWindow}
                  setShowWindow={setShowWindow}
                  setCloseWindow={setCloseWindow}
                  closeWindow={closeWindow}
                  userHasAccess={userContext.userHasAccess}
                  addWorkHistory={
                    clientTypes[props.type].addWorkHistoryFunction
                  }
                  editWorkHistory={
                    clientTypes[props.type].editWorkHistoryFunction
                  }
                  deleteWorkHistory={
                    clientTypes[props.type].deleteWorkHistoryFunction
                  }
                />
              )}
            </React.Fragment>
          }
          showWindow={showWindow}
          setShowWindow={setShowWindow}
        />
        <ControlPanel
          sorting={
            <div className="main-window__sort-panel">
              <select
                onChange={(event) => setSortOrder(changeSortOrder(event))}
              >
                <option value="name asc">По алфавиту (А-Я)</option>
                <option value="name desc">По алфавиту (Я-А)</option>
                <option value="nextDateContact asc">
                  По дате след. контакта
                </option>
              </select>
            </div>
          }
        />
        <ClientsList
          isLoading={isLoadingPages || isLoading}
          itemsPerPage={itemsPerPage}
          clients={searchQuery === "" ? data : clients}
          searchQuery={searchQuery}
          sortOrder={sortOrder}
          deleteItem={deleteItem}
          setClients={setClients}
          type={props.type}
          userContext={userContext}
          setCloseWindow={setCloseWindow}
          setSelectedItem={setSelectedItem}
          setShowWindow={setShowWindow}
          setCurForm={setCurForm}
          editItemFunction={clientTypes[props.type].editItemFunction}
        />
        {searchQuery === "" ? pagination : null}
      </div>
    </div>
  );
};
export default Clients;

const MenuItem = ({ type, curCategory, item, location }) => {
  return (
    <Link
      to={`/${type}/category/${curCategory}/${item.link}`}
      className={
        location.pathname.includes(item.link) === true
          ? "main-window__item--active main-window__item"
          : "main-window__item"
      }
    >
      <div>
        {item.name}
        <span className="main-window__menu-item-amount">{item.count}</span>
      </div>
    </Link>
  );
};
