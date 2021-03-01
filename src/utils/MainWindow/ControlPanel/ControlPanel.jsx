import React, { useState } from "react";
import ChevronSVG from "../../../../assets/tableview/chevron-down.inline.svg";
import "./ControlPanel.scss";

const ControlPanel = (props) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className="control-panel" style={{ ...(props.styles ?? {}) }}>
      <div className="main-window__control-panel-wrapper">
        <div className="control-panel__buttons">
          {props.sorting || null}
          {props.content ? (
            <div
              className="main-window__button main-window__button--inverted main-window__button--filter"
              onClick={() => setIsHidden((isHidden) => !isHidden)}
            >
              <span>{props.panelName || "Фильтры"}</span>
              <ChevronSVG
                className={`main-window__img ${
                  isHidden ? "" : "main-window__img--rotated"
                }`}
              />
            </div>
          ) : null}
          {props.buttons || null}
          {props.itemsCount ? (
            <div className="main-window__amount_table">{props.itemsCount}</div>
          ) : null}
        </div>
        {!isHidden ? props.content : null}
      </div>
    </div>
  );
};

export default ControlPanel;
