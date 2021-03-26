import { useContext, useEffect, useState } from 'react';
import usePagination from 'Utils/hooks/usePagination/usePagination.js';
import useSort from 'Utils/hooks/useSort/useSort.js';
import ControlPanel from 'Utils/MainWindow/ControlPanel/ControlPanel.jsx';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import UserContext from '../../../../App.js';
import {
  deletePriceList,
  getPriceLists,
} from 'Utils/RequestsAPI/Clients/price_list.js';
import TableActions from 'Utils/TableView/TableActions/TableActions.jsx';
import DeleteItemAction from 'Utils/TableView/TableActions/Actions/DeleteItemAction.jsx';
import PlaceholderLoading from 'Utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx';
import styled from 'styled-components';
import { getExcelFileBlob } from '../PriceList/functions.js';
import { downloadImage } from 'Utils/Form/ImageView/functions.js';
import FloatingPlus from 'Utils/MainWindow/FloatingPlus/FloatingPlus.jsx';

const PricesListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ltdData, setLtdData] = useState([]);
  const userContext = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { sortPanel, sortedData, sortOrder } = useSort(
    ltdData,
    {
      sortOrder: {
        curSort: 'uri',
        uri: 'asc',
      },
      sortOptions: [
        { value: 'uri asc', text: 'По названию (А-Я)' },
        { value: 'uri desc', text: 'По названию (Я-А)' },
      ],
      ignoreURL: false,
    },
    [ltdData],
  );
  const { pagination, data } = usePagination(
    () => filterSearchQuery(sortedData),
    [searchQuery, sortOrder, sortedData],
    'static',
  );

  const loadLTDList = () => {
    getPriceLists()
      .then(({ data }) => {
        setLtdData([...data]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const filterSearchQuery = (data) => {
    const query = searchQuery.toLowerCase();
    return data.filter(
      (item) =>
        item.uri?.toLowerCase().includes(query) ||
        item.id.toString().includes(query),
    );
  };

  useEffect(() => {
    document.title = 'Прайс-листы';
    loadLTDList();
  }, []);

  const deleteItem = (id) => {
    deletePriceList(id).then(() => loadLTDList());
  };

  const Wrapper = styled.div`
    display: flex;
    width: 100%;
  `;

  return (
    <Wrapper>
      <div className="main-window">
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Прайс-листы</div>
        </div>
        <SearchBar
          fullSize
          placeholder="Введите название продукции для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <ControlPanel
          sorting={sortPanel}
          itemsCount={`Всего: ${ltdData.length} записей`}
        />
        <TableView
          data={data}
          deleteItem={deleteItem}
          userHasAccess={userContext.userHasAccess}
          isLoading={isLoading}
        />
        {pagination}
        <FloatingPlus linkTo="/price-list/prices/upload" />
      </div>
    </Wrapper>
  );
};

export default PricesListPage;

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
    flex: 0 1 90% !important;
  `;

  return (
    <List className="prices__tableview">
      <div className="main-window__list main-window__list--full">
        <div className="main-window__list-item main-window__list-item--header">
          <IdColumn>ID</IdColumn>
          <FilenameColumn>Имя файла</FilenameColumn>
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
