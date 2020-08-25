import React from 'react'

const GraphPanel = (props) => {
  return (
    <div
      className={`panel panel--chart ${
        props.isLoaded ? '' : 'panel--placeholder'
      }`}
    >
      <div className="panel__category">
        <span>{props.category || 'Категория'}</span>
        {props.renderIcon ? (
          <div className="panel__icon">{props.renderIcon()}</div>
        ) : null}
      </div>
      <div
        className={`panel__chart-wrapper panel__chart-wrapper--${props.chartName}`}
      ></div>
      <div className={`panel__difference`}>
        <div className="panel__time-period">
          {props.isLoaded ? props.timePeriod : ''}
        </div>
      </div>
    </div>
  )
}

export default GraphPanel
