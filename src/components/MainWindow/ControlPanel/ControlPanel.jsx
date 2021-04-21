import { useState } from 'react';
import PropTypes from 'prop-types';
import ChevronSVG from 'Assets/tableview/chevron-down.inline.svg';
import './ControlPanel.scss';

const ControlPanel = ({
  styles,
  sorting,
  content,
  panelName,
  buttons,
  itemsCount,
}) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className="control-panel" style={{ ...(styles ?? {}) }}>
      <div className="main-window__control-panel-wrapper">
        <div className="control-panel__buttons">
          {sorting || null}
          {content ? (
            <div
              className="main-window__button main-window__button--inverted main-window__button--filter"
              onClick={() => setIsHidden((isHidden) => !isHidden)}
            >
              <span>{panelName || 'Фильтры'}</span>
              <ChevronSVG
                className={`main-window__img ${
                  isHidden ? '' : 'main-window__img--rotated'
                }`}
              />
            </div>
          ) : null}
          {buttons || null}
          {itemsCount ? (
            <div className="main-window__amount_table">{itemsCount}</div>
          ) : null}
        </div>
        {!isHidden ? content : null}
      </div>
    </div>
  );
};

export default ControlPanel;

ControlPanel.propTypes = {
  styles: PropTypes.object,
  sorting: PropTypes.node,
  content: PropTypes.node,
  panelName: PropTypes.string,
  buttons: PropTypes.any,
  itemsCount: PropTypes.string,
};
