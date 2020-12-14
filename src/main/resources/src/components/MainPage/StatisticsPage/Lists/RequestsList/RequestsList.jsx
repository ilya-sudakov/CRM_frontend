import React from "react";
import TableView from "../../../WorkshopsComponents/TableView/TableView.jsx";
import "./RequestsList.scss";

const RequestsList = ({
  data = [],
  sortBy = { name: ["id"], type: "ASC" },
  title = "",
  loadData,
}) => {
  const sortData = (data) => {
    return data.sort((a, b) => {
      if (a[sortBy.name] < b[sortBy.name]) {
        return sortBy.type === "DESC" ? 1 : -1;
      }
      if (a[sortBy.name] > b[sortBy.name]) {
        return sortBy.type === "DESC" ? -1 : 1;
      }
      return 0;
    });
  };

  return (
    <div className="requests-list">
      <div className="main-window__title">{title}</div>

      {data.length > 0 ? (
        <TableView
          data={sortData(data)}
          isLoading={false}
          workshopName="requests"
          curSort={sortBy.name}
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
