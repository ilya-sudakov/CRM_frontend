import React, { useContext, useEffect, useState } from 'react';
import usePagination from '../../../../utils/hooks/usePagination/usePagination.js';
import useSort from '../../../../utils/hooks/useSort/useSort.js';
import FloatingPlus from '../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx';
import ControlPanel from '../../../../utils/MainWindow/ControlPanel/ControlPanel.jsx';
import {
  deleteLTD,
  getLTDList,
} from '../../../../utils/RequestsAPI/PriceList/lts_list.js';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import UserContext from '../../../../App.js';
import TableView from './TableView/TableView.jsx';

import './LtdListPage.scss';

const LtdListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ltdData, setLtdData] = useState([]);
  const userContext = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { sortPanel, sortedData, sortOrder } = useSort(
    ltdData,
    {
      sortOrder: {
        curSort: 'name',
        name: 'asc',
      },
      sortOptions: [
        { value: 'name asc', text: 'По названию (А-Я)' },
        { value: 'name desc', text: 'По названию (Я-А)' },
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

  const filterSearchQuery = (data) => {
    const query = searchQuery.toLowerCase();
    return data.filter(
      (item) =>
        item.name?.toLowerCase().includes(query) ||
        item.inn?.toLowerCase().includes(query) ||
        item.kpp?.toLowerCase().includes(query) ||
        item.id.toString().includes(query),
    );
  };

  useEffect(() => {
    document.title = 'Список ООО';
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
          visibility={['ROLE_ADMIN', 'ROLE_MANAGER']}
          linkTo={'/ltd-list/new'}
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
        <TableView
          data={data}
          deleteItem={deleteItem}
          userHasAccess={userContext.userHasAccess}
          isLoading={isLoading}
        />
        {pagination}
      </div>
    </div>
  );
};

export default LtdListPage;
