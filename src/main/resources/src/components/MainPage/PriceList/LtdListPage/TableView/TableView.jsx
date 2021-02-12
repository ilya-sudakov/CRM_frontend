import React, { useEffect } from "react";

import TableActions from "../../../../../utils/TableView/TableActions/TableActions.jsx";
import DeleteItemAction from "../../../../../utils/TableView/TableActions/Actions/DeleteItemAction.jsx";
import editSVG from "../../../../../../../../../assets/tableview/edit.svg";
import okSVG from "../../../../../../../../../assets/tableview/ok.svg";
import PlaceholderLoading from "../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx";

const TableView = ({
  data,
  deleteItem,
  userHasAccess,
  onSelect = false,
  isLoading = false,
  setShowWindow,
  selectedLtd,
}) => {
  useEffect(() => {
    if (!setShowWindow) return;
    setShowWindow(false);
  }, [selectedLtd]);

  return (
    <div className="main-window__list main-window__list--full">
      <div className="main-window__list-item main-window__list-item--header">
        <span>Название</span>
        <span>Адрес</span>
        <span>ИНН</span>
        <div className="main-window__table-actions"></div>
      </div>
      {isLoading ? (
        <PlaceholderLoading
          itemClassName="main-window__list-item"
          minHeight="30px"
          items={3}
        />
      ) : (
        data.map((item) => (
          <div
            className="main-window__list-item"
            onClick={onSelect ? () => onSelect(item) : null}
          >
            <span>{item.name}</span>
            <span>{item.legalAddress}</span>
            <span>{item.inn}</span>
            {onSelect ? (
              <div className="main-window__table-actions">
                <img
                  onClick={() => onSelect(item)}
                  className="main-window__img"
                  src={okSVG}
                />
              </div>
            ) : (
              <TableActions
                actionsList={[
                  {
                    title: "Редактирование",
                    link: `/ltd-list/edit/${item.id}`,
                    imgSrc: editSVG,
                    isRendered: userHasAccess(["ROLE_ADMIN", "ROLE_MANAGER"]),
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
                      userHasAccess(["ROLE_ADMIN"]),
                  },
                ]}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TableView;
