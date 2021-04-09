import { useState, useEffect } from 'react';
import './PackagingPage.scss';
import 'Utils/MainWindow/MainWindow.scss';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { getPackaging, deletePackaging } from 'API/Products/packaging.js';
import FloatingButton from 'Utils/MainWindow/FloatingButton/FloatingButton.jsx';
import ControlPanel from 'Utils/MainWindow/ControlPanel/ControlPanel.jsx';
import TableView from './TableView.jsx';

const PackagingPage = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [sortOrder, setSortOrder] = useState({
    curSort: 'name',
    name: 'asc',
    nextDateContact: 'asc',
  });

  const changeSortOrder = (event) => {
    const name = event.target.value.split(' ')[0];
    const order = event.target.value.split(' ')[1];
    setSortOrder({
      curSort: name,
      [name]: order,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();
    loadData(abortController.signal);
    return function cancel() {
      abortController.abort();
    };
  }, []);

  const loadData = (signal) => {
    return getPackaging(signal)
      .then((res) => res.json())
      .then((res) => {
        setPackages(res);
        setIsLoading(false);
      });
  };

  const deleteItem = ({ id }) => {
    return deletePackaging(id)
      .then(() => loadData())
      .catch((error) => {
        console.log(error);
        alert('Ошибка при удалении');
      });
  };

  return (
    <div className="packaging-page">
      <div className="main-window">
        <FloatingButton linkTo="/packaging/new" visibility={['ROLE_ADMIN']} />
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Упаковки</div>
        </div>
        <SearchBar
          fullSize
          placeholder="Введите запрос для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <ControlPanel
          sorting={
            <div className="main-window__sort-panel">
              <select onChange={changeSortOrder}>
                <option value="name asc">По алфавиту (А-Я)</option>
                <option value="name desc">По алфавиту (Я-А)</option>
                <option value="quantity desc">По штукам</option>
              </select>
            </div>
          }
          itemsCount={`Всего: ${packages.length} записей`}
        />
        <TableView
          data={packages.sort((a, b) => {
            if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
              return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1;
            }
            if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
              return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1;
            }
            return 0;
          })}
          isLoading={isLoading}
          searchQuery={searchQuery}
          deleteItem={deleteItem}
        />
      </div>
    </div>
  );
};

export default PackagingPage;
