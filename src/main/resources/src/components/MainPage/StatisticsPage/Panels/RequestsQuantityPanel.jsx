import React, { useState, useEffect } from 'react'
import SmallPanel from './SmallPanel.jsx'
import PlaylistIcon from '../../../../../../../../assets/sidemenu/play_list.inline.svg'
import { formatDateStringNoDate } from '../../../../utils/functions.jsx'

const RequestsQuantityPanel = ({ requests, curDate }) => {
  const [stats, setStats] = useState({
    category: 'Заявки',
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

  const getRequestQuantityStats = (requests, curDate = new Date()) => {
    setStats((stats) => ({
      ...stats,
      isLoading: true,
      isLoaded: false,
    }))

    let curMonthQuantity = 0
    let prevMonthQuantity = 0

    //check prev month
    let temp = requests.filter((request) => {
      const date = new Date(request.date)
      if (
        formatDateStringNoDate(date) ===
        formatDateStringNoDate(new Date(new Date(curDate).setDate(0)))
      ) {
        prevMonthQuantity++
        return false
      }
      return true
    })
    temp.map((request) => {
      const date = new Date(request.date)
      if (formatDateStringNoDate(date) === formatDateStringNoDate(curDate)) {
        curMonthQuantity++
      }
    })

    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      isLoading: false,
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

  //При первой загрузке
  useEffect(() => {
    if (!stats.isLoaded && !stats.isLoading && requests.length > 1) {
      getRequestQuantityStats(requests, curDate)
      // console.log('updated through first useeffect')
    }
  }, [requests, stats])

  //При обновлении тек. даты
  useEffect(() => {
    if (!stats.isLoading && requests.length > 1) {
      getRequestQuantityStats(requests, curDate)
      // console.log('updated through date')
    }
  }, [curDate])

  return <SmallPanel {...stats} />
}

export default RequestsQuantityPanel
