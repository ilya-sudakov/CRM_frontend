import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './StatisticsPage.scss'

import { getRequests } from '../../../utils/RequestsAPI/Requests.jsx'

import ClientsIcon from '../../../../../../../assets/sidemenu/client.inline.svg'

const StatisticsPage = () => {
  const [requestsStats, setRequestsStats] = useState({
    category: 'Заявки',
    percentage: 0,
    value: null,
    linkTo: '/requests',
    isLoaded: false,
    timePeriod: 'От прошлого месяца',
    renderIcon: () => (
      <ClientsIcon className="panel__img panel__img--requests" />
    ),
  })

  const getRequestStats = (signal) => {
    !requestsStats.isLoaded &&
      getRequests(signal)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          let curMonthQuantity = 0
          let prevMonthQuantity = 0

          //check prev month
          let temp = res.filter((request) => {
            const date = new Date(request.date)
            if (
              date.getMonth() === new Date(new Date().setDate(0)).getMonth()
            ) {
              prevMonthQuantity++
              return false
            }
            return true
          })
          temp.map((request) => {
            const date = new Date(request.date)
            if (date.getMonth() === new Date().getMonth()) {
              curMonthQuantity++
            }
          })

          setRequestsStats((requestsStats) => ({
            ...requestsStats,
            isLoaded: true,
            value: curMonthQuantity,
            percentage:
              Math.floor((curMonthQuantity / prevMonthQuantity) * 100 * 100) /
              100,
          }))
        })
        .catch((error) => {
          console.log(error)
        })
  }

  useEffect(() => {
    const abortController = new AbortController()
    getRequestStats(abortController.signal)
  }, [])

  return (
    <div className="statistics">
      <div className="main-window">
        <div className="main-window__title">Статистика</div>
        <div className="statistics__row">
          <SmallPanel {...requestsStats} />
        </div>
      </div>
    </div>
  )
}

export default StatisticsPage

const SmallPanel = (props) => {
  const Icon = props.icon

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
      <div className="panel__value">{props.value || ''}</div>
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
          <span></span>
          {props.isLoaded ? `${Math.abs(props.percentage)}%` : ''}
        </div>
        <div className="panel__time-period">
          {props.isLoaded ? props.timePeriod : ''}
        </div>
      </div>
    </Link>
  )
}
