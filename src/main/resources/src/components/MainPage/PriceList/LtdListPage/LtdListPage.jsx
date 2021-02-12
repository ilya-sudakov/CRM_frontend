import React, { useContext, useEffect, useState } from "react";
import usePagination from "../../../../utils/hooks/usePagination/usePagination.js";
import useSort from "../../../../utils/hooks/useSort/useSort.js";
import FloatingPlus from "../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx";
import ControlPanel from "../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx";
import {
  deleteLTD,
  getLTDList,
} from "../../../../utils/RequestsAPI/PriceList/lts_list.js";
import SearchBar from "../../SearchBar/SearchBar.jsx";
import TableActions from "../../../../utils/TableView/TableActions/TableActions.jsx";
import DeleteItemAction from "../../../../utils/TableView/TableActions/Actions/DeleteItemAction.jsx";
import UserContext from "../../../../App.js";

import editSVG from "../../../../../../../../assets/tableview/edit.svg";

import "./LtdListPage.scss";

const LtdListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ltdData, setLtdData] = useState([]);
  const userContext = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { sortPanel, sortedData, sortOrder } = useSort(
    ltdData,
    {
      sortOrder: {
        curSort: "name",
        name: "asc",
      },
      sortOptions: [
        { value: "name asc", text: "По названию (А-Я)" },
        { value: "name desc", text: "По названию (Я-А)" },
      ],
      ignoreURL: false,
    },
    [ltdData]
  );
  const { pagination, data } = usePagination(
    () => filterSearchQuery(sortedData),
    [searchQuery, sortOrder, sortedData],
    "static"
  );

  const filterSearchQuery = (data) => {
    const query = searchQuery.toLowerCase();
    return data.filter(
      (item) =>
        item.name?.toLowerCase().includes(query) ||
        item.inn?.toLowerCase().includes(query) ||
        item.kpp?.toLowerCase().includes(query) ||
        item.id.toString().includes(query)
    );
  };

  useEffect(() => {
    document.title = "Список ООО";
    loadLTDList();
  }, []);

  const loadLTDList = () => {
    getLTDList()
      .then((res) => {
        setLtdData([...res.data]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const deleteItem = (id) => {
    deleteLTD(id).then(() => loadLTDList());
  };

  return (
    <div className="ltd-list">
      <div className="main-window">
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Список ООО</div>
        </div>
        <FloatingPlus
          visibility={["ROLE_ADMIN", "ROLE_MANAGER"]}
          linkTo={"/ltd-list/new"}
        />
        <SearchBar
          fullSize
          placeholder="Введите название продукции для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <ControlPanel
          sorting={sortPanel}
          itemsCount={`Всего: ${ltdData.length} записей`}
        />
        <div className="main-window__list main-window__list--full">
          <div className="main-window__list-item main-window__list-item--header">
            <span>Название</span>
            <span>Адрес</span>
            <span>ИНН</span>
            <div className="main-window__table-actions"></div>
          </div>
          {data.map((item) => (
            <div className="main-window__list-item">
              <span>{item.name}</span>
              <span>{item.legalAddress}</span>
              <span>{item.inn}</span>
              <TableActions
                actionsList={[
                  {
                    title: "Редактирование",
                    link: `/ltd-list/edit/${item.id}`,
                    imgSrc: editSVG,
                    isRendered: userContext.userHasAccess([
                      "ROLE_ADMIN",
                      "ROLE_MANAGER",
                    ]),
                  },
                  {
                    customElement: (
                      <DeleteItemAction
                        title="Удаление заявки"
                        onClick={() => deleteItem(item.id)}
                      />
                    ),
                    isRendered:
                      (deleteItem ? deleteItem : false) &&
                      userContext.userHasAccess(["ROLE_ADMIN"]),
                  },
                ]}
              />
            </div>
          ))}
        </div>
        {pagination}
      </div>
    </div>
  );
};

export default LtdListPage;
