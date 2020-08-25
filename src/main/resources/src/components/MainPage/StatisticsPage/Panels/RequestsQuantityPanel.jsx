import React, { useState, useEffect } from 'react'
import SmallPanel from './SmallPanel.jsx'
import PlaylistIcon from '../../../../../../../../assets/sidemenu/play_list.inline.svg'

const RequestsQuantityPanel = (props) => {
  const [stats, setStats] = useState({
    category: 'Заявки',
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
      difference: curMonthQuantity - prevMonthQuantity,
      percentage:
        Math.floor(
          ((curMonthQuantity - prevMonthQuantity) / prevMonthQuantity) *
            100 *
            100,
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

export default RequestsQuantityPanel
