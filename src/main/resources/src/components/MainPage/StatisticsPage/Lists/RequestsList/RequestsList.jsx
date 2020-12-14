import React from "react";
import TableView from "../../../WorkshopsComponents/TableView/TableView.jsx";
import "./RequestsList.scss";

const RequestsList = ({
  data = [],
  sortBy = { curSort: "id", id: "asc" },
  title = "",
  loadData,
}) => {
  return (
    <div className="requests-list">
      <div className="main-window__title">{title}</div>

      {data.length > 0 ? (
        <TableView
          data={data}
          isLoading={false}
          workshopName="requests"
          sortOrder={sortBy}
          loadData={loadData}
        />
      ) : (
        <div className="main-window__info-text">
          Нет заявок за выбранный период
        </div>
      )}
    </div>
  );
};

export default RequestsList;
