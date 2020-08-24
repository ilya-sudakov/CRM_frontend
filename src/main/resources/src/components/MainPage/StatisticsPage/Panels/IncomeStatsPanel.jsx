import React, { useState, useEffect } from 'react'
import SmallPanel from './SmallPanel.jsx'
import MoneyIcon from '../../../../../../../../assets/etc/bx-ruble.inline.svg'
import {
  addSpaceDelimiter,
} from '../../../../utils/functions.jsx'

const IncomeStatsPanel = (props) => {
  const [stats, setStats] = useState({
    category: 'Доход',
    percentage: 0,
    value: null,
    linkTo: '/requests',
    isLoaded: false,
    timePeriod: 'От прошлого месяца',
    difference: 0,
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
        prevMonthIncome += Number.parseFloat(request.sum || 0)
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
        curMonthIncome += Number.parseFloat(request.sum || 0)
      }
    })

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      value: `${addSpaceDelimiter(curMonthIncome)} руб.`,
      difference: curMonthIncome - prevMonthIncome,
      percentage:
        Math.floor(
          ((curMonthIncome - prevMonthIncome) /
            (prevMonthIncome === 0 ? 1 : prevMonthIncome)) *
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

export default IncomeStatsPanel
