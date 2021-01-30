import React from "react";
import usePagination from "../../../../../utils/hooks/usePagination/usePagination.js";
import TableView from "../../../WorkshopsComponents/TableView/TableView.jsx";
import "./RequestsList.scss";

const RequestsList = ({
  data = [],
  sortBy = { curSort: "id", id: "asc" },
  title = "",
  loadData,
}) => {
  const { requests = data, pagination } = usePagination(
    () => data,
    [],
    "static",
    { size: 10 }
  );
  return (
    <div className="requests-list">
      <div className="main-window__title">{title}</div>
      {requests.length > 0 ? (
        <>
          <TableView
            data={requests}
            isLoading={false}
            workshopName="requests"
            sortOrder={sortBy}
            loadData={loadData}
            isMinimized={true}
          />
          {pagination}
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
