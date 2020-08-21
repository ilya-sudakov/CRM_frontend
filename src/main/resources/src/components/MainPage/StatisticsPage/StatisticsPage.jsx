import React from 'react'
import { Link } from 'react-router-dom'
import './StatisticsPage.scss'

import ClientsIcon from '../../../../../../../assets/sidemenu/client.inline.svg'
import BoxIcon from '../../../../../../../assets/sidemenu/box.inline.svg'
import TruckIcon from '../../../../../../../assets/sidemenu/truck.inline.svg'

const StatisticsPage = (props) => {
  return (
    <div className="statistics">
      <div className="main-window">
        <div className="main-window__title">Статистика</div>
        <div className="statistics__row">
          <SmallPanel
            renderIcon={() => (
              <ClientsIcon className="panel__img panel__img--requests" />
            )}
            category="Заказы"
            percentage={2.57}
            value={5543}
            linkTo="/requests"
          />
          <SmallPanel
            category="Посещения"
            renderIcon={() => (
              <BoxIcon className="panel__img panel__img--visits" />
            )}
            percentage={-50.3}
            value={5043}
            linkTo="/requests"
          />
          <SmallPanel
            category="Звонки"
            renderIcon={() => (
              <TruckIcon className="panel__img panel__img--calls" />
            )}
            percentage={0}
            value={3543}
            linkTo="/requests"
          />
        </div>
      </div>
    </div>
  )
}

export default StatisticsPage

const SmallPanel = (props) => {
  const Icon = props.icon

  return (
    <Link className="panel" to={props.linkTo || '/'}>
      <div className="panel__category">
        <span>{props.category || 'Категория'}</span>
        {props.renderIcon ? (
          <div className="panel__icon">{props.renderIcon()}</div>
        ) : null}
      </div>
      <div className="panel__value">{props.value}</div>
      <div
        className={`panel__difference panel__difference--${
          props.percentage < 0
            ? 'negative'
            : props.percentage === 0
            ? 'equal'
            : 'positive'
        }`}
      >
        <div className="panel__arrow"></div>
        <div className="panel__percentage">
          <span></span>
          {`${Math.abs(props.percentage)}%`}
        </div>
        <div className="panel__time-period">От прошлого месяца</div>
      </div>
    </Link>
  )
}
