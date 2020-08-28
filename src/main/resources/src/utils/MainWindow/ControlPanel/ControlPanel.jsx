import React, { useState } from 'react'
import chevronSVG from '../../../../../../../assets/tableview/chevron-down.svg'
import './ControlPanel.scss'

const ControlPanel = (props) => {
  const [isHidden, setIsHidden] = useState(true)

  return (
    <div className="control-panel">
      <div className="main-window__control-panel-wrapper">
        <div
          className="main-window__button main-window__button--inverted main-window__button--filter"
          onClick={() => setIsHidden((isHidden) => !isHidden)}
        >
          <span>{props.panelName || 'Фильтры'}</span>
          <img
            className={`main-window__img ${
              isHidden ? '' : 'main-window__img--rotated'
            }`}
            src={chevronSVG}
          />
        </div>
        {!isHidden ? props.content : null}
      </div>
    </div>
  )
}

export default ControlPanel
