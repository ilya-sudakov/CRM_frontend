import { useEffect } from 'react';

import TableActions from 'Components/TableView/TableActions/TableActions.jsx';
import DeleteItemAction from 'Components/TableView/TableActions/Actions/DeleteItemAction.jsx';
import editSVG from 'Assets/tableview/edit.svg';
import okSVG from 'Assets/tableview/ok.svg';
import PlaceholderLoading from 'Components/TableView/PlaceholderLoading/PlaceholderLoading.jsx';

import './TableView.scss';

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
    <div className="ltd-tableview">
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
              key={item.id}
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
                      title: 'Редактирование',
                      link: `/ltd-list/edit/${item.id}`,
                      imgSrc: editSVG,
                      isRendered: userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']),
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
                        userHasAccess(['ROLE_ADMIN']),
                    },
                  ]}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TableView;
