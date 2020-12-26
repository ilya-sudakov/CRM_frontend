import React, { useState } from "react";
import PropTypes from "prop-types";
import DotsIcon from "../../../../../../../assets/sidemenu/more.inline.svg";
import "./TableActions.scss";
import ActionItem from "./Actions/ActionItem.jsx";

const TableActions = ({ actionsList = [] }) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div
      className={`main-window__table-actions ${
        isHidden ? "main-window__table-actions--is-hidden" : ""
      }`}
      onMouseEnter={() => setIsHidden(false)}
      onMouseLeave={() => setIsHidden(true)}
    >
      <DotsIcon
        className="main-window__img main-window__img--more"
        style={{ transform: "rotate(90deg)" }}
        width={50}
        height={30}
        alt=""
      />
      <div className="table-actions__menu">
        {actionsList.map((item, index) => (
          <ActionItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TableActions;

TableActions.propTypes = {
  actionsList: PropTypes.array,
};
