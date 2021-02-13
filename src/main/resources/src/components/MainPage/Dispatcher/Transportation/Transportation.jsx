import React, { useEffect, useState } from "react";
import pdfMake from "pdfmake";
import "./Transportation.scss";
import "../../../../utils/MainWindow/MainWindow.scss";
import SearchBar from "../../SearchBar/SearchBar.jsx";
import PrintIcon from "../../../../../../../../assets/print.png";
import TableView from "./TableView/TableView.jsx";
import {
  getTransportations,
  deleteTransportation,
} from "../../../../utils/RequestsAPI/Transportation.jsx";
import { getTransportationListPdfText } from "../../../../utils/pdfFunctions.jsx";
import Button from "../../../../utils/Form/Button/Button.jsx";
import FloatingPlus from "../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx";
import ControlPanel from "../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import usePagination from "../../../../utils/hooks/usePagination/usePagination.js";
import { formatDateString } from "../../../../utils/functions.jsx";
import useSort from "../../../../utils/hooks/useSort/useSort.js";

const Transportation = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [transportation, setTransportation] = useState([]);
  const { sortPanel, sortedData, sortOrder } = useSort(transportation, {}, [
    transportation,
  ]);

  const filterSearchQuery = (data) => {
    const query = searchQuery.toLowerCase();
    return data.filter(
      (item) =>
        item.cargo.toLowerCase().includes(query) ||
        formatDateString(item.date).includes(query) ||
        item.sender.toLowerCase().includes(query) ||
        item.recipient.toLowerCase().includes(query) ||
        item.driver.toLowerCase().includes(query) ||
        item.id.toString().includes(query)
    );
  };

  const handleFilterData = (data) => {
    return filterSearchQuery(data).filter((item) => {
      let senderCheck = false;
      let recipientCheck = false;
      workshops.map((workshop) => {
        if (workshop.senderActive && workshop.name === item.sender) {
          senderCheck = true;
        }
        if (workshop.recipientActive && workshop.name === item.recipient) {
          recipientCheck = true;
        }
      });
      return recipientCheck && senderCheck;
    });
  };

  const { pagination, data } = usePagination(
    () => handleFilterData(sortedData),
    [searchQuery, sortOrder, sortedData],
    "static"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [workshops, setWorkshops] = useState([
    {
      name: "ЦехЛЭМЗ",
      visibility: ["ROLE_ADMIN", "ROLE_LEMZ"],
      senderActive: true,
      recipientActive: true,
    },
    {
      name: "ЦехЛепсари",
      visibility: ["ROLE_ADMIN", "ROLE_LEPSARI"],
      senderActive: true,
      recipientActive: true,
    },
    {
      name: "ЦехЛиговский",
      visibility: [
        "ROLE_ADMIN",
        "ROLE_LIGOVSKIY",
        "ROLE_DISPATCHER",
        "ROLE_MANAGER",
      ],
      senderActive: true,
      recipientActive: true,
    },
    {
      name: "Офис",
      visibility: ["ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_MANAGER"],
      senderActive: true,
      recipientActive: true,
    },
  ]);
  const printTransportationList = () => {
    let dd = getTransportationListPdfText(
      transportation
        .filter((item) => {
          let senderCheck = false;
          let recipientCheck = false;
          workshops.map((workshop) => {
            if (workshop.senderActive && workshop.name === item.sender) {
              senderCheck = true;
            }
            if (workshop.recipientActive && workshop.name === item.recipient) {
              recipientCheck = true;
            }
          });
          return recipientCheck && senderCheck;
        })
        .sort((a, b) => {
          if (a.date < b.date) {
            return 1;
          }
          if (a.date > b.date) {
            return -1;
          } else return 0;
        })
    );
    pdfMake.createPdf(dd).print();
  };

  useEffect(() => {
    document.title = "Реестр транспортировок";
    let abortController = new AbortController();
    loadTransportation(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, []);

  const loadTransportation = (signal) => {
    getTransportations(signal)
      .then((res) => res.json())
      .then((res) => {
        setTransportation(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const deleteItem = (id) => {
    deleteTransportation(id).then(() => loadTransportation());
  };

  return (
    <div className="transportation">
      <div className="main-window">
        <FloatingPlus
          linkTo="/dispatcher/transportation/new"
          visibility={["ROLE_ADMIN", "ROLE_DISPATCHER"]}
        />
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Реестр транспортировок</div>
        </div>
        <SearchBar
          fullSize
          placeholder="Введите название товара для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <ControlPanel
          buttons={
            <Button
              text="Печать списка"
              inverted
              imgSrc={PrintIcon}
              isLoading={isLoading}
              className="main-window__button main-window__button--inverted"
              onClick={printTransportationList}
            />
          }
          sorting={sortPanel}
          itemsCount={`Всего: ${transportation.length} записей`}
          content={
            <div className="main-window__info-panel">
              <div className="transportation__container">
                <span>Фильтр по подразделениям</span>
                <div className="main-window__filter-pick">
                  <span className="transportation__text">Откуда: </span>
                  {workshops.map((item, index) => {
                    if (props.userHasAccess(item.visibility)) {
                      return (
                        <div
                          className={
                            item.senderActive
                              ? "main-window__button"
                              : "main-window__button main-window__button--inverted"
                          }
                          onClick={() => {
                            let temp = workshops;
                            temp.splice(index, 1, {
                              ...temp[index],
                              name: item.name,
                              senderActive: !item.senderActive,
                            });
                            setWorkshops([...temp]);
                          }}
                        >
                          {item.name}
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="main-window__filter-pick">
                  <span className="transportation__text">Куда: </span>
                  {workshops.map((item, index) => {
                    if (props.userHasAccess(item.visibility)) {
                      return (
                        <div
                          className={
                            item.recipientActive
                              ? "main-window__button"
                              : "main-window__button main-window__button--inverted"
                          }
                          onClick={() => {
                            let temp = workshops;
                            temp.splice(index, 1, {
                              ...temp[index],
                              name: item.name,
                              recipientActive: !item.recipientActive,
                            });
                            setWorkshops([...temp]);
                          }}
                        >
                          {item.name}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          }
        />
        <TableView
          data={data}
          searchQuery={searchQuery}
          isLoading={isLoading}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
        />
        {pagination}
      </div>
    </div>
  );
};

export default Transportation;
