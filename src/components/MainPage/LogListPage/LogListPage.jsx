import { useState } from 'react';
import './LogListPage.scss';
import 'Utils/MainWindow/MainWindow.scss';
import TableView from './TableView/TableView.jsx';
import ControlPanel from 'Utils/MainWindow/ControlPanel/ControlPanel.jsx';
import { logItemsTypes } from './objects.js';
import { getLogsListByType } from 'Utils/RequestsAPI/Logs/logs.js';
import usePagination from 'Utils/hooks/usePagination/usePagination';
import useSort from 'Utils/hooks/useSort/useSort';
import useQuery from 'Utils/hooks/useQuery';

const LogListPage = () => {
  const { query, pushParamToURL } = useQuery();
  const [curCategory, setCurCategory] = useState(
    query.get('category') ?? 'request',
  );
  const { sortOrder, sortPanel } = useSort(data, {}, [data]);
  const {
    curPage,
    setCurPage,
    itemsPerPage,
    data,
    isLoading,
    pagination,
  } = usePagination(
    () => getLogsListByType(curCategory, itemsPerPage, curPage - 1, sortOrder),
    [curCategory, sortOrder, setCurPage, curPage],
    'dynamic',
  );

  const handleCategoryChange = (item) => {
    setCurPage(1);
    pushParamToURL('page', 1);
    pushParamToURL('category', item.originalName);
    setCurCategory(item.originalName);
  };

  return (
    <div className="log-list">
      <div className="main-window">
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Логи</div>
          <div className="main-window__menu">
            {Object.values(logItemsTypes).map((item) => (
              <div
                className={
                  curCategory === item.originalName
                    ? 'main-window__item--active main-window__item'
                    : 'main-window__item'
                }
                onClick={() => handleCategoryChange(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <ControlPanel sorting={sortPanel} />
        <TableView data={data} isLoading={isLoading} />
        {pagination}
      </div>
    </div>
  );
};

export default LogListPage;
