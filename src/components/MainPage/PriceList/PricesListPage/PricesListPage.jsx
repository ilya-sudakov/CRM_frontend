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
import styled from 'styled-components';
import FloatingPlus from 'Utils/MainWindow/FloatingPlus/FloatingPlus.jsx';
import TableView from './TableView/TableView.jsx';
import { Link } from 'react-router-dom';

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
          <div className="main-window__title">
            Прайс-листы
            <Link
              className="main-window__button main-window__button--inverted"
              to="/price-list/prices/upload"
            >
              Загрузить файл
            </Link>
          </div>
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
