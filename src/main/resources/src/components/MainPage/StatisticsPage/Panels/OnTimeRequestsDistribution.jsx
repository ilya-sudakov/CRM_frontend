import React, { useState, useEffect } from 'react'
import SmallPanel from './SmallPanel.jsx'
import ClockIcon from '../../../../../../../../assets/etc/time.inline.svg'
import { dateDiffInDays } from '../../../../utils/functions.jsx'

const OnTimeRequestsDistribution = (props) => {
  const [stats, setStats] = useState({
    category: 'Вовремя выполненные заказы',
    percentage: 0,
    value: null,
    linkTo: '/requests',
    isLoaded: false,
    timePeriod: 'От прошлого месяца',
    difference: 0,
    renderIcon: () => <ClockIcon className="panel__img panel__img--time" />,
  })

  const getStats = (requests) => {
    let curMonthOnTimeQuantity = 0
    let curMonthAllQuantity = 0
    let prevMonthOnTimeQuantity = 0
    let prevMonthAllQuantity = 0

    //check prev month
    let temp = requests.filter((request) => {
      const date = new Date(request.date)
      if (date.getMonth() === new Date(new Date().setDate(0)).getMonth()) {
        //если заказ отгружен вовремя
        if (
          (request.status === 'Завершено' || request.status === 'Отгружено') &&
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
      if (date.getMonth() === new Date().getMonth()) {
        curMonthAllQuantity++
        //если заказ отгружен вовремя
        if (
          (request.status === 'Завершено' || request.status === 'Отгружено') &&
          Math.abs(
            dateDiffInDays(
              new Date(request.date),
              new Date(request.shippingDate),
            ),
          ) <= 7
        ) {
          curMonthOnTimeQuantity++
        }
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
      value: `${Math.floor(curMonthValue * 100 * 100) / 100}%`,
      difference:
        Math.floor((curMonthValue - prevMonthValue) * 100 * 100) / 100,
      percentage:
        Math.floor(
          ((curMonthValue - prevMonthValue) / prevMonthValue) * 100 * 100,
        ) / 100,
    }))
  }

  useEffect(() => {
    !stats.isLoaded && props.requests.length > 1 && getStats(props.requests)
  }, [props.requests, stats])

  return <SmallPanel {...stats} />
}

export default OnTimeRequestsDistribution
