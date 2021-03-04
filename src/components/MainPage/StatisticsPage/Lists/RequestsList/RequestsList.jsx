import usePagination from '../../../../../utils/hooks/usePagination/usePagination.js';
import { sortRequests } from '../../../WorkshopsComponents/TableView/functions.js';
import TableView from '../../../WorkshopsComponents/TableView/TableView.jsx';
import './RequestsList.scss';

const RequestsList = ({
  data = [],
  sortBy = { curSort: 'id', id: 'asc' },
  title = '',
  loadData,
}) => {
  const pages = usePagination(
    () => sortRequests(data, sortBy),
    [data],
    'static',
    {
      size: 10,
      ignoreURL: true,
    },
  );
  return (
    <div className="requests-list">
      <div className="main-window__title">{title}</div>
      {pages.data.length > 0 ? (
        <>
          <TableView
            data={pages.data}
            isLoading={false}
            workshopName="requests"
            sortOrder={sortBy}
            loadData={loadData}
            isMinimized={true}
          />
          {pages.pagination}
        </>
      ) : (
        <div className="main-window__info-text">
          Нет заявок за выбранный период
        </div>
      )}
    </div>
  );
};

export default RequestsList;
