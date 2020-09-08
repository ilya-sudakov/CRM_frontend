import React, { useState, useEffect } from 'react'
import SmallPanel from './SmallPanel.jsx'
import ClockIcon from '../../../../../../../../assets/etc/time.inline.svg'
import {
  dateDiffInDays,
  formatDateStringNoDate,
} from '../../../../utils/functions.jsx'

const OnTimeRequestsDistribution = ({ requests, curDate }) => {
  const [stats, setStats] = useState({
    category: 'Вовремя выполненные заказы',
    percentage: 0,
    value: null,
    linkTo: '/requests',
    isLoaded: false,
    isLoading: false,
    timePeriod: 'От прошлого месяца',
    difference: 0,
    renderIcon: () => <ClockIcon className="panel__img panel__img--time" />,
  })

  const getStats = (requests, curDate = new Date()) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }))

    let curMonthOnTimeQuantity = 0
    let curMonthAllQuantity = 0
    let prevMonthOnTimeQuantity = 0
    let prevMonthAllQuantity = 0

    //check prev month
    let temp = requests.filter((request) => {
      const date = new Date(request.date)
      if (
        formatDateStringNoDate(date) ===
          formatDateStringNoDate(new Date(curDate).setDate(0)) &&
        (request.status === 'Завершено' || request.status === 'Отгружено')
      ) {
        //если заказ отгружен вовремя
        if (
          Math.abs(
            dateDiffInDays(
              new Date(request.date),
              new Date(request.shippingDate),
            ),
          ) <= 7
        ) {
          prevMonthOnTimeQuantity++
        }
        prevMonthAllQuantity++
        return false
      }
      return true
    })

    //check cur month
    temp.map((request) => {
      const date = new Date(request.date)
      if (
        formatDateStringNoDate(date) === formatDateStringNoDate(curDate) &&
        (request.status === 'Завершено' || request.status === 'Отгружено')
      ) {
        //если заказ отгружен вовремя
        if (
          Math.abs(
            dateDiffInDays(
              new Date(request.date),
              new Date(request.shippingDate),
            ),
          ) <= 7
        ) {
          curMonthOnTimeQuantity++
        }
        curMonthAllQuantity++
      }
    })

    //соотношение вовремя выпол. заказов в тек. месяце
    const curMonthValue =
      Math.floor(
        (curMonthOnTimeQuantity /
          (curMonthAllQuantity !== 0 ? curMonthAllQuantity : 1)) *
          100,
      ) / 100

    //соотношение вовремя выпол. заказов в пред. месяце
    const prevMonthValue =
      Math.floor(
        (prevMonthOnTimeQuantity /
          (prevMonthAllQuantity !== 0 ? prevMonthAllQuantity : 1)) *
          100,
      ) / 100

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      isLoading: false,
      value: `${Math.floor(curMonthValue * 100 * 100) / 100}%`,
      difference:
        Math.floor((curMonthValue - prevMonthValue) * 100 * 100) / 100,
      percentage:
        Math.floor(
          ((curMonthValue - prevMonthValue) / prevMonthValue) * 100 * 100,
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

export default OnTimeRequestsDistribution
