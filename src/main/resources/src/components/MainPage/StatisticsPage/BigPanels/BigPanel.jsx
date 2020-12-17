import React, { useEffect, useState } from "react";
import FormWindow from "../../../../utils/Form/FormWindow/FormWindow.jsx";
import { addSpaceDelimiter } from "../../../../utils/functions.jsx";

const BigPanel = ({
  isLoaded,
  isLoading,
  renderIcon,
  value,
  prevValue,
  category,
  invertedStats,
  percentage,
  timePeriod,
  charts,
  windowCharts,
  windowContent,
  content,
  curPeriod,
}) => {
  const [showWindow, setShowWindow] = useState(false);

  useEffect(() => {}, [isLoaded]);

  useEffect(() => {}, [showWindow, setShowWindow, windowContent, content]);

  return (
    <div
      className={`panel panel--big ${
        isLoaded && !isLoading ? "" : "panel--placeholder"
      }`}
      // to={linkTo || "/"}
    >
      <div className="panel__category" onClick={() => setShowWindow(true)}>
        <span>{category || "Категория"}</span>
        {renderIcon ? <div className="panel__icon">{renderIcon()}</div> : null}
      </div>
      {windowContent || windowCharts ? (
        <FormWindow
          title={category}
          content={
            <>
              {windowContent}
              {windowCharts ? (
                <>
                  <div className="main-window__title">Графики</div>
                  {windowCharts}
                </>
              ) : null}
            </>
          }
          showWindow={showWindow}
          setShowWindow={setShowWindow}
        />
      ) : null}
      <div className="panel__values">
        <div className={`panel__value`}>
          <span>{`Текущ. ${curPeriod.name.toLowerCase()}`}</span>
          {isLoaded ? value || 0 : null}
        </div>
        <div className={`panel__value`}>
          <span>{`Пред. ${curPeriod.name.toLowerCase()}`}</span>
          {isLoaded ? prevValue || 0 : null}
        </div>
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
      {content}
    </div>
  );
};

export default BigPanel;
