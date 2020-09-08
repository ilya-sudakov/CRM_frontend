import React, { useState, useEffect } from 'react'
import SmallPanel from './SmallPanel.jsx'
import MoneyIcon from '../../../../../../../../assets/etc/bx-ruble.inline.svg'
import {
  addSpaceDelimiter,
  formatDateStringNoDate,
} from '../../../../utils/functions.jsx'

const IncomeStatsPanel = ({ requests, curDate }) => {
  const [stats, setStats] = useState({
    category: 'Доход',
    percentage: 0,
    value: null,
    linkTo: '/requests',
    isLoaded: false,
    isLoading: false,
    timePeriod: 'От прошлого месяца',
    difference: 0,
    renderIcon: () => <MoneyIcon className="panel__img panel__img--money" />,
  })

  const getStats = (requests, curDate = new Date()) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }))

    let curMonthIncome = 0
    let prevMonthIncome = 0

    //check prev month
    let temp = requests.filter((request) => {
      const date = new Date(request.date)
      if (
        formatDateStringNoDate(date) ===
          formatDateStringNoDate(new Date(curDate).setDate(0)) &&
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
        formatDateStringNoDate(date) === formatDateStringNoDate(curDate) &&
        request.status === 'Завершено'
      ) {
        curMonthIncome += Number.parseFloat(request.sum || 0)
      }
    })

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      isLoading: false,
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

  //При первой загрузке
  useEffect(() => {
    !stats.isLoaded && requests.length > 1 && getStats(requests, curDate)
  }, [requests, stats])

  //При обновлении тек. даты
  useEffect(() => {
    if (!stats.isLoading && requests.length > 1) {
      getStats(requests, curDate)
    }
  }, [curDate])

  return <SmallPanel {...stats} />
}

export default IncomeStatsPanel
