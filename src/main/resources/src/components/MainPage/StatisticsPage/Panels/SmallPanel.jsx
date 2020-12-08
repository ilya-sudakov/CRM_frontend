import React, { useEffect, useState } from "react";
import FormWindow from "../../../../utils/Form/FormWindow/FormWindow.jsx";
import { addSpaceDelimiter } from "../../../../utils/functions.jsx";

const SmallPanel = ({
  isLoaded,
  renderIcon,
  value,
  category,
  invertedStats,
  difference,
  percentage,
  timePeriod,
  linkTo,
}) => {
  useEffect(() => {}, [isLoaded]);

  return (
    <div className={`panel ${isLoaded ? "" : "panel--placeholder"}`}>
      <div className="panel__category">
        <span>{category || "Категория"}</span>
        {renderIcon ? <div className="panel__icon">{renderIcon()}</div> : null}
      </div>
      <div
        className={`panel__value panel__value--${
          invertedStats === true
            ? difference >= 0
              ? "negative"
              : "positive"
            : difference < 0
            ? "negative"
            : "positive"
        }`}
      >
        {isLoaded ? value || 0 : null}
        <span>
          {isLoaded
            ? `${difference < 0 ? "" : "+"}${addSpaceDelimiter(
                Math.floor(difference * 100) / 100
              )}`
            : ""}
        </span>
      </div>
      <div
        className={`panel__difference panel__difference--${
          invertedStats === true
            ? percentage === 0 || !isLoaded
              ? "equal"
              : percentage >= 0
              ? "negative"
              : "positive"
            : percentage === 0 || !isLoaded
            ? "equal"
            : percentage < 0
            ? "negative"
            : "positive"
        }`}
      >
        <div className="panel__arrow"></div>
        <div className="panel__percentage">
          {isLoaded ? `${Math.abs(percentage)}%` : ""}
        </div>
        <div className="panel__time-period">{isLoaded ? timePeriod : ""}</div>
      </div>
      <div
        className={`panel__difference panel__difference--${
          percentage === 0 || !isLoaded
            ? "equal"
            : percentage < 0
            ? "negative"
            : "positive"
        }`}
      ></div>
    </div>
  );
};

export default SmallPanel;
