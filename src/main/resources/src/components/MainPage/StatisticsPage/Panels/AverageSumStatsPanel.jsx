import React, { useState, useEffect } from 'react'
import SmallPanel from './SmallPanel.jsx'
import MoneyIcon from '../../../../../../../../assets/etc/bx-ruble.inline.svg'
import {
  addSpaceDelimiter,
} from '../../../../utils/functions.jsx'

const AverageSumStatsPanel = (props) => {
  const [stats, setStats] = useState({
    category: 'Средняя сумма заказа',
    percentage: 0,
    value: null,
    linkTo: '/requests',
    isLoaded: false,
    timePeriod: 'От прошлого месяца',
    difference: 0,
    renderIcon: () => <MoneyIcon className="panel__img panel__img--money" />,
  })

  const getStats = (requests) => {
    let curMonthAverage = 0
    let prevMonthAverage = 0
    let prevMonthLength = 0
    let curMonthLength = 0

    //check prev month
    let temp = requests.filter((request) => {
      const date = new Date(request.date)
      if (
        date.getMonth() === new Date(new Date().setDate(0)).getMonth() &&
        request.status === 'Завершено'
      ) {
        prevMonthLength++
        prevMonthAverage += Number.parseFloat(request.sum || 0)
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
        curMonthLength++
        curMonthAverage += Number.parseFloat(request.sum || 0)
      }
    })

    curMonthAverage = curMonthAverage / curMonthLength
    prevMonthAverage = prevMonthAverage / prevMonthLength

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      value: `${addSpaceDelimiter(
        Math.floor(curMonthAverage * 100) / 100,
      )} руб.`,
      difference: curMonthAverage - prevMonthAverage,
      percentage:
        Math.floor(
          ((curMonthAverage - prevMonthAverage) /
            (prevMonthAverage === 0 ? 1 : prevMonthAverage)) *
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

export default AverageSumStatsPanel
