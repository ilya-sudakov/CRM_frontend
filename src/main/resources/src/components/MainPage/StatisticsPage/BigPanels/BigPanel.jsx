import React, { useEffect, useState } from "react";
import FormWindow from "../../../../utils/Form/FormWindow/FormWindow.jsx";
import { addSpaceDelimiter } from "../../../../utils/functions.jsx";

const BigPanel = ({
  isLoaded,
  renderIcon,
  value,
  category,
  invertedStats,
  difference,
  percentage,
  timePeriod,
  linkTo,
  chartName,
  windowContent,
  content,
}) => {
  const [showWindow, setShowWindow] = useState(false);

  useEffect(() => {}, [isLoaded]);

  useEffect(() => {}, [showWindow, setShowWindow, windowContent, content]);

  return (
    <div
      className={`panel panel--big ${isLoaded ? "" : "panel--placeholder"}`}
      // to={linkTo || "/"}
    >
      <div className="panel__category" onClick={() => setShowWindow(true)}>
        <span>{category || "Категория"}</span>
        {renderIcon ? <div className="panel__icon">{renderIcon()}</div> : null}
      </div>
      {windowContent || chartName ? (
        <FormWindow
          title={category}
          content={
            <>
              {windowContent}
              <div
                className={`panel__chart-wrapper panel__chart-wrapper--${chartName}`}
              ></div>
            </>
          }
          showWindow={showWindow}
          setShowWindow={setShowWindow}
        />
      ) : null}
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
      <div
        className={`panel__chart-wrapper--content panel__chart-wrapper--${chartName}-content`}
      ></div>
      {content}
    </div>
  );
};

export default BigPanel;
