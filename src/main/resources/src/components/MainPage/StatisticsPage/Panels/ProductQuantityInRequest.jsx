import React, { useState, useEffect } from 'react'
import SmallPanel from './SmallPanel.jsx'
import PlaylistIcon from '../../../../../../../../assets/sidemenu/play_list.inline.svg'

const ProductQuantityInRequest = (props) => {
  const [stats, setStats] = useState({
    category: 'Среднее кол-во продукции в заказе',
    percentage: 0,
    value: null,
    linkTo: '/requests',
    isLoaded: false,
    timePeriod: 'От прошлого месяца',
    difference: 0,
    renderIcon: () => (
      <PlaylistIcon className="panel__img panel__img--requests" />
    ),
  })

  const getStats = (requests) => {
    let curMonthAverage = 0
    let prevMonthAverage = 0
    let curMonthQuantity = 0
    let prevMonthQuantity = 0

    //check prev month
    let temp = requests.filter((request) => {
      const date = new Date(request.date)
      if (date.getMonth() === new Date(new Date().setDate(0)).getMonth()) {
        // console.log(request, request.requestProducts.length)
        prevMonthAverage += request.requestProducts.length
        prevMonthQuantity++
        return false
      }
      return true
    })

    temp.map((request) => {
      const date = new Date(request.date)
      if (date.getMonth() === new Date().getMonth()) {
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
      value: curMonthAverage,
      difference: curMonthAverage - prevMonthAverage,
      percentage:
        Math.floor(
          ((curMonthAverage - prevMonthAverage) / prevMonthAverage) * 100 * 100,
        ) / 100,
    }))
  }

  useEffect(() => {
    !stats.isLoaded && props.requests.length > 1 && getStats(props.requests)
  }, [props.requests, stats])

  return <SmallPanel {...stats} />
}

export default ProductQuantityInRequest
