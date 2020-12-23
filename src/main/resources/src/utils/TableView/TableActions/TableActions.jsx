import React, { useState } from "react";
import PropTypes from "prop-types";
import DotsIcon from "../../../../../../../assets/sidemenu/more.inline.svg";
import "./TableActions.scss";

const TableActions = ({ isMinimized, actions }) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div
      className={`main-window__table-actions ${
        isHidden ? "main-window__table-actions--is-hidden" : ""
      }`}
      onMouseOver={() => setIsHidden(false)}
      onMouseLeave={() => setIsHidden(true)}
    >
      <DotsIcon
        className="main-window__img main-window__img--more"
        style={{ transform: "rotate(90deg)" }}
        width={50}
        height={30}
        alt=""
        onClick={() => setIsHidden(!isHidden)}
      />
      <div className="table-actions__menu">{actions}</div>
    </div>
  );
};

export default TableActions;

TableActions.propTypes = {
  isMinimized: PropTypes.bool,
  actions: PropTypes.any,
};
