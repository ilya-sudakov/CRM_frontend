import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './StatisticsPage.scss'

import { getRequests } from '../../../utils/RequestsAPI/Requests.jsx'

import ClientsIcon from '../../../../../../../assets/sidemenu/client.inline.svg'
import MoneyIcon from '../../../../../../../assets/etc/bx-ruble.inline.svg'

const StatisticsPage = () => {
  const [requests, setRequests] = useState([])
  const [requestsLoaded, setRequestsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const loadRequests = (signal) => {
    if (!requestsLoaded && !isLoading) {
      setIsLoading(true)
      getRequests(signal)
        .then((res) => res.json())
        .then((res) => {
          setRequestsLoaded(true)
          setRequests([...res])
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
          setRequestsLoaded(true)
          console.log(error)
        })
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    loadRequests(abortController.signal)
  }, [])

  return (
    <div className="statistics">
      <div className="main-window">
        <div className="main-window__title">Статистика</div>
        <div className="statistics__row">
          <RequestsQuantityPanel requests={requests} />
          <IncomeStatsPanel requests={requests} />
        </div>
      </div>
    </div>
  )
}

export default StatisticsPage

const RequestsQuantityPanel = (props) => {
  const [stats, setStats] = useState({
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

  const getRequestQuantityStats = (requests) => {
    let curMonthQuantity = 0
    let prevMonthQuantity = 0

    //check prev month
    let temp = requests.filter((request) => {
      const date = new Date(request.date)
      if (date.getMonth() === new Date(new Date().setDate(0)).getMonth()) {
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

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      value: curMonthQuantity,
      percentage:
        Math.floor((curMonthQuantity / prevMonthQuantity) * 100 * 100) / 100,
    }))
  }

  useEffect(() => {
    !stats.isLoaded &&
      props.requests.length > 1 &&
      getRequestQuantityStats(props.requests)
  }, [props.requests, stats])

  return <SmallPanel {...stats} />
}

const IncomeStatsPanel = (props) => {
  const [stats, setStats] = useState({
    category: 'Доход',
    percentage: 0,
    value: null,
    linkTo: '/requests',
    isLoaded: false,
    timePeriod: 'От прошлого месяца',
    renderIcon: () => <MoneyIcon className="panel__img panel__img--money" />,
  })

  const getStats = (requests) => {
    let curMonthIncome = 0
    let prevMonthIncome = 0

    //check prev month
    let temp = requests.filter((request) => {
      const date = new Date(request.date)
      if (
        date.getMonth() === new Date(new Date().setDate(0)).getMonth() &&
        request.status === 'Завершено'
      ) {
        prevMonthIncome += Number.parseFloat(request.sum)
        return false
      }
      if (request.status !== 'Завершено') {
        return false
      }
      return true
    })
    temp.map((request) => {
      const date = new Date(request.date)
      if (
        date.getMonth() === new Date().getMonth() &&
        request.status === 'Завершено'
      ) {
        curMonthIncome += Number.parseFloat(request.sum)
      }
    })

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      value: `${curMonthIncome} руб.`,
      percentage:
        Math.floor(
          (curMonthIncome / (prevMonthIncome === 0 ? 1 : prevMonthIncome)) *
            100 *
            100,
        ) / 100,
    }))
  }

  useEffect(() => {
    !stats.isLoaded && props.requests.length > 1 && getStats(props.requests)
  }, [props.requests, stats])

  return <SmallPanel {...stats} />
}

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
