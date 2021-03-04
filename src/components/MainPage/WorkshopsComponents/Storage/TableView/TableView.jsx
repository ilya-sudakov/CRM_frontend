import React from 'react';
import editIcon from '../../../../../../assets/tableview/edit.svg';
import './TableView.scss';
import { addSpaceDelimiter } from '../../../../../utils/functions.jsx';
import TableActions from '../../../../../utils/TableView/TableActions/TableActions.jsx';
import DeleteItemAction from '../../../../../utils/TableView/TableActions/Actions/DeleteItemAction.jsx';
import PlaceholderLoading from '../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';

const TableView = ({ data, deleteItem, userHasAccess, link, isLoading }) => {
  return (
    <div className="tableview-storage">
      <div className="main-window__list main-window__list--full">
        <div className="main-window__list-item main-window__list-item--header">
          <span>Номер</span>
          <span>Название</span>
          <span>Кол-во</span>
          <span>Комментарий</span>
          <div className="main-window__table-actions"></div>
        </div>
        {isLoading ? (
          <PlaceholderLoading
            itemClassName="main-window__list-item"
            items={3}
          />
        ) : (
          data.map((storage) => {
            return (
              <div className="main-window__list-item" key={storage.id}>
                <span>
                  <div className="main-window__mobile-text">Номер:</div>
                  {storage.number}
                </span>
                <span>
                  <div className="main-window__mobile-text">Название:</div>
                  {storage.name}
                </span>
                <span>
                  <div className="main-window__mobile-text">Кол-во:</div>
                  {addSpaceDelimiter(storage.quantity)}
                </span>
                <span>
                  <div className="main-window__mobile-text">Комментарий:</div>
                  {storage.comment}
                </span>
                <TableActions
                  actionsList={[
                    { link: `${link}/edit/${storage.id}`, imgSrc: editIcon },
                    {
                      customElement: (
                        <DeleteItemAction
                          onClick={() => deleteItem(storage.id)}
                          isRendered={userHasAccess(['ROLE_ADMIN'])}
                        />
                      ),
                    },
                  ]}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TableView;
