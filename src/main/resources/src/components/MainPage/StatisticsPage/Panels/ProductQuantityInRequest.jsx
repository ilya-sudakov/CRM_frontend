import React, { useState, useEffect } from 'react'
import SmallPanel from './SmallPanel.jsx'
import PlaylistIcon from '../../../../../../../../assets/sidemenu/play_list.inline.svg'
import { formatDateStringNoDate } from '../../../../utils/functions.jsx'

const ProductQuantityInRequest = ({ requests, curDate }) => {
  const [stats, setStats] = useState({
    category: 'Среднее кол-во позиций в заказе',
    percentage: 0,
    value: null,
    linkTo: '/requests',
    isLoaded: false,
    isLoading: false,
    timePeriod: 'От прошлого месяца',
    difference: 0,
    renderIcon: () => (
      <PlaylistIcon className="panel__img panel__img--requests" />
    ),
  })

  const getStats = (requests, curDate = new Date()) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }))

    let curMonthAverage = 0
    let prevMonthAverage = 0
    let curMonthQuantity = 0
    let prevMonthQuantity = 0

    //check prev month
    let temp = requests.filter((request) => {
      const date = formatDateStringNoDate(request.date)
      if (date === formatDateStringNoDate(new Date(curDate).setDate(0))) {
        prevMonthAverage += request.requestProducts.length
        prevMonthQuantity++
        return false
      }
      return true
    })

    temp.map((request) => {
      const date = formatDateStringNoDate(request.date)
      if (date === formatDateStringNoDate(curDate)) {
        curMonthAverage += request.requestProducts.length
        curMonthQuantity++
      }
    })

    curMonthAverage =
      curMonthAverage / (curMonthQuantity !== 0 ? curMonthQuantity : 1)
    prevMonthAverage =
      prevMonthAverage / (prevMonthQuantity !== 0 ? prevMonthQuantity : 1)

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      isLoading: false,
      value: Math.floor(curMonthAverage * 100) / 100,
      difference: curMonthAverage - prevMonthAverage,
      percentage:
        Math.floor(
          ((curMonthAverage - prevMonthAverage) / prevMonthAverage) * 100 * 100,
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

export default ProductQuantityInRequest
