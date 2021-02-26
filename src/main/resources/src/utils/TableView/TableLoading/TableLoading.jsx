import React from "react";
import PropTypes from "prop-types";
import "./TableLoading.scss";

const TableLoading = ({ isLoading }) => {
  return (
    <div
      className={`table-loading ${isLoading ? "" : "table-loading--hidden"}`}
    >
      {isLoading && <div className="table-loading__circle"></div>}
    </div>
  );
};

export default TableLoading;

TableLoading.propTypes = {
  isLoading: PropTypes.bool,
};
