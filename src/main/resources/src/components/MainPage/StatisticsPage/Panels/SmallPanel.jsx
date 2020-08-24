import React from 'react'
import { Link } from 'react-router-dom'

const SmallPanel = (props) => {
  return (
    <Link
      className={`panel ${props.isLoaded ? '' : 'panel--placeholder'}`}
      to={props.linkTo || '/'}
    >
      <div className="panel__category">
        <span>{props.category || 'Категория'}</span>
        {props.renderIcon ? (
          <div className="panel__icon">{props.renderIcon()}</div>
        ) : null}
      </div>
      <div
        className={`panel__value panel__value--${
          props.difference < 0 ? 'negative' : 'positive'
        }`}
      >
        {props.value || ''}
        <span>
          {props.isLoaded
            ? `${props.difference < 0 ? '' : '+'}${
                Math.floor(props.difference * 100) / 100
              }`
            : ''}
        </span>
      </div>
      <div
        className={`panel__difference panel__difference--${
          props.percentage === 0 || !props.isLoaded
            ? 'equal'
            : props.percentage < 0
            ? 'negative'
            : 'positive'
        }`}
      >
        <div className="panel__arrow"></div>
        <div className="panel__percentage">
          {props.isLoaded ? `${Math.abs(props.percentage)}%` : ''}
        </div>
        <div className="panel__time-period">
          {props.isLoaded ? props.timePeriod : ''}
        </div>
      </div>
      <div
        className={`panel__difference panel__difference--${
          props.percentage === 0 || !props.isLoaded
            ? 'equal'
            : props.percentage < 0
            ? 'negative'
            : 'positive'
        }`}
      ></div>
    </Link>
  )
}

export default SmallPanel
