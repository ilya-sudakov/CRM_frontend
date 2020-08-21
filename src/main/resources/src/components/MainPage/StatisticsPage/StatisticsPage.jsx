import React from 'react'
import './StatisticsPage.scss'

const StatisticsPage = (props) => {
  return (
    <div className="statistics">
      <div className="main-window">
        <div className="main-window__title">Статистика</div>
        <div className="statistics__row">
          <SmallPanel percentage={2.57} />
          <SmallPanel percentage={-50.3} />
        </div>
      </div>
    </div>
  )
}

export default StatisticsPage

const SmallPanel = (props) => {
  return (
    <div className="panel">
      <div className="panel__category">
        <span>Заказы</span>
      </div>
      <div className="panel__value">5,543</div>
      <div
        className={`panel__difference panel__difference--${
          props.percentage < 0 ? 'negative' : 'positive'
        }`}
      >
        <div className="panel__arrow"></div>
        <div className="panel__percentage">
          <span></span>
          {`${Math.abs(props.percentage)}%`}
        </div>
        <div className="panel__time-period">С прошлого месяца</div>
      </div>
    </div>
  )
}
