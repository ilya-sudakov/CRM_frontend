import React, { useState } from "react";
import PropTypes from "prop-types";
import DotsIcon from "../../../../../../../assets/sidemenu/more.inline.svg";
import "./TableActions.scss";
import { Link } from "react-router-dom";

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

const ActionItem = ({ item }) => {
  const isRendered = item.isRendered === undefined || item.isRendered === true;
  if (item.customElement) return !isRendered ? null : item.customElement;
  if (!isRendered) return null;
  if (item.link) {
    return (
      <Link
        className="main-window__action"
        to={item.link}
        title={item.title}
        target={item.openInNewTab ? "_blank" : ""}
        rel={item.openInNewTab ? "noopener noreferrer" : ""}
      >
        {item.text}
        <img className="main-window__img" src={item.imgSrc} />
      </Link>
    );
  }
  return (
    <div
      className="main-window__action"
      onClick={item.onClick}
      title={item.title}
    >
      {item.text}
      <img className="main-window__img" src={item.imgSrc} />
    </div>
  );
};
