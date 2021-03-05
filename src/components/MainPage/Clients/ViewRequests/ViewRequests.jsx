import './ViewRequests.scss';
import TableView from '../../WorkshopsComponents/TableView/TableView.jsx';
import usePagination from 'Utils/hooks/usePagination/usePagination';
import { sortRequests } from '../../WorkshopsComponents/TableView/functions.js';

const ViewRequests = (data) => {
  const sortBy = { curSort: 'id', id: 'desc' };

  const printConfig = {
    ['id']: {
      visible: true,
    },
    ['date']: {
      visible: false,
    },
    ['products']: {
      visible: true,
    },
    ['client']: {
      visible: false,
    },
    ['responsible']: {
      visible: true,
    },
    ['status']: {
      visible: false,
    },
    ['date-shipping']: {
      visible: true,
    },
    ['comment']: {
      visible: true,
    },
    ['price']: {
      visible: true,
    },
  };

  const pages = usePagination(
    () => sortRequests(data.requests, sortBy),
    [data.requests],
    'static',
    {
      size: 10,
      ignoreURL: true,
    },
  );

  return (
    <div className="view-requests">
      <div className="main-window">
        {pages.data.length > 0 || data.isLoading ? (
          <>
            <TableView
              data={pages.data}
              isLoading={data.isLoading}
              workshopName="requests"
              sortOrder={sortBy}
              loadData={() => {}}
              isMinimized={true}
              printConfig={printConfig}
            />
            {pages.pagination}
          </>
        ) : (
          <div className="main-window__info-text">
            Нет заявок за выбранный период
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRequests;
