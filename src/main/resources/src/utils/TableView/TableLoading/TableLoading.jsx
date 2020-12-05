import React from "react";
import "./TableLoading.scss";

const TableLoading = (props) => {
  return (
    <div
      className={
        props.isLoading
          ? "table-loading"
          : "table-loading table-loading--hidden"
      }
    >
      {props.isLoading && <div className="table-loading__circle"></div>}
    </div>
  );
};

export default TableLoading;
