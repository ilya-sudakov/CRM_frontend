import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./TitleHeader.scss";

const TitleHeader = ({ title, menuItems, curPage, setCurPage }) => {
  return (
    <div className="title-header">
      <div className="main-window__header main-window__header--full">
        {title ? <div className="main-window__title">{title}</div> : null}
        {menuItems ? (
          <div className="main-window__menu">
            {menuItems.map((item) => (
              <Link
                className={`main-window__item ${
                  (item.isActive === undefined && curPage === item.pageName) ||
                  item.isActive
                    ? "main-window__item--active"
                    : ""
                }`}
                to={item.link}
                onClick={() => setCurPage(item.pageName)}
              >
                {item.pageTitle}
                {item.count ? (
                  <span className="main-window__items-count">{item.count}</span>
                ) : null}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TitleHeader;

TitleHeader.propTypes = {
  title: PropTypes.string,
  menuItems: PropTypes.array,
  curPage: PropTypes.string,
  setCurPage: PropTypes.func,
};
