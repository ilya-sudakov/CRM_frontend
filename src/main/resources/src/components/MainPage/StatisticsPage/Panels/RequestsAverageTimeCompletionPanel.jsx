import React, { useState, useEffect } from 'react'
import SmallPanel from './SmallPanel.jsx'
import TimeIcon from '../../../../../../../../assets/etc/time.inline.svg'

const RequestsAverageTimeCompletionPanel = (props) => {
  const [stats, setStats] = useState({
    category: 'Средняя прод. выполнения заказа',
    percentage: 0,
    value: null,
    linkTo: '/requests',
    isLoaded: false,
    timePeriod: 'От прошлого месяца',
    difference: 0,
    invertedStats: true,
    renderIcon: () => <TimeIcon className="panel__img panel__img--time" />,
  })

  const dateDiffInDays = (a, b) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

    return Math.floor((utc2 - utc1) / _MS_PER_DAY)
  }

  const getRequestQuantityStats = (requests) => {
    let curMonthQuantity = 0
    let prevMonthQuantity = 0
    let curMonthAverage = 0
    let prevMonthAverage = 0

    //check prev month
    let temp = requests.filter((request) => {
      const date = new Date(request.date)
      if (
        date.getMonth() === new Date(new Date().setDate(0)).getMonth() &&
        request.status === 'Завершено'
      ) {
        prevMonthAverage += dateDiffInDays(
          new Date(request.date),
          new Date(request.shippingDate || new Date()),
        )
        prevMonthQuantity++
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
        curMonthAverage += dateDiffInDays(
          new Date(request.date),
          new Date(request.shippingDate || new Date()),
        )
        return curMonthQuantity++
      }
    })

    curMonthAverage =
      curMonthAverage / (curMonthQuantity > 0 ? curMonthQuantity : 1)
    prevMonthAverage =
      prevMonthAverage / (prevMonthQuantity > 0 ? prevMonthQuantity : 1)

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      value: Math.floor(curMonthAverage * 100) / 100,
      difference: curMonthAverage - prevMonthAverage,
      percentage:
        Math.floor(
          ((curMonthAverage - prevMonthAverage) / prevMonthAverage) * 100 * 100,
        ) / 100,
    }))
  }

  useEffect(() => {
    !stats.isLoaded &&
      props.requests.length > 1 &&
      getRequestQuantityStats(props.requests)
  }, [props.requests, stats])

  return <SmallPanel {...stats} />
}

export default RequestsAverageTimeCompletionPanel
