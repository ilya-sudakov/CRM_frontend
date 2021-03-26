import { useEffect } from 'react';
import TableActions from 'Utils/TableView/TableActions/TableActions.jsx';
import DeleteItemAction from 'Utils/TableView/TableActions/Actions/DeleteItemAction.jsx';
import PlaceholderLoading from 'Utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';
import { getExcelFileBlob } from '../../PriceList/functions.js';
import { downloadImage } from 'Utils/Form/ImageView/functions.js';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TableView = ({
  data,
  deleteItem,
  userHasAccess,
  isLoading,
  setShowWindow,
  selectedItem,
  onSelect,
}) => {
  useEffect(() => {
    if (!setShowWindow) return;
    setShowWindow(false);
  }, [selectedItem]);

  const List = styled.div`
    display: flex;
    width: 100%;
  `;

  const IdColumn = styled.span`
    max-width: 50px;
  `;

  const FilenameColumn = styled.span`
    flex: 0 1 40% !important;
  `;

  return (
    <List className="prices__tableview">
      <div className="main-window__list main-window__list--full">
        <div className="main-window__list-item main-window__list-item--header">
          <IdColumn>ID</IdColumn>
          <FilenameColumn>Имя файла</FilenameColumn>
          <FilenameColumn>Ссылка на прайс-лист</FilenameColumn>
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
              <IdColumn>{item.id}</IdColumn>
              <FilenameColumn>
                {item.uri.split('downloadFile/')[1]}
              </FilenameColumn>
              <FilenameColumn>
                <Link
                  to={`/price-list?filename=${
                    item.uri.split('downloadFile/')[1]
                  }`}
                  className="main-window__link"
                >
                  Просмотр прайс-листа
                </Link>
              </FilenameColumn>
              {onSelect ? (
                <div className="main-window__table-actions"></div>
              ) : (
                <TableActions
                  actionsList={[
                    {
                      onClick: async () =>
                        downloadImage(
                          await getExcelFileBlob(
                            item.uri,
                            item.uri.split('downloadFile/')[1],
                          ),
                          item.uri.split('downloadFile/')[1],
                        ),
                      text: 'Скачать',
                    },
                    {
                      customElement: (
                        <DeleteItemAction
                          title="Удаление прайса"
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
    </List>
  );
};

export default TableView;
