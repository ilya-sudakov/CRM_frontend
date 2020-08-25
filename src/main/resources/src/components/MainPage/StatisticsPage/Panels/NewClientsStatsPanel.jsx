import React, { useState, useEffect } from 'react'
import SmallPanel from './SmallPanel.jsx'
import ClientsIcon from '../../../../../../../../assets/sidemenu/client.inline.svg'
import {
  addSpaceDelimiter,
  formatDateString,
} from '../../../../utils/functions.jsx'

const NewClientsStatsPanel = (props) => {
  const [stats, setStats] = useState({
    category: 'Новые клиенты',
    percentage: 0,
    value: null,
    linkTo: '/clients/categories',
    isLoaded: false,
    timePeriod: 'От прошлого месяца',
    difference: 0,
    renderIcon: () => <ClientsIcon className="panel__img panel__img--money" />,
  })

  const getStats = (requests) => {
    let clients = {}
    //find all clients except once from cur and prev month
    const oneMonthAgo = new Date(new Date().setDate(0)).getMonth()
    const curMonth = new Date().getMonth()

    let prevMonthNewClients = 0
    let curMonthNewClients = 0

    requests.filter((request) => {
      if (
        request.client !== null &&
        new Date(request.date).getMonth() !== oneMonthAgo &&
        new Date(request.date).getMonth() !== curMonth &&
        clients[request.client.id] === undefined
      ) {
        clients = {
          ...clients,
          [request.client.id]: '',
        }
        return false
      }
      return true
    })
    requests.filter((request) => {
      if (
        request.client !== null &&
        new Date(request.date).getMonth() === oneMonthAgo &&
        clients[request.client.id] === undefined
      ) {
        prevMonthNewClients++
        clients = {
          ...clients,
          [request.client.id]: '',
        }
        return false
      }
      if (request.client === null) {
        return false
      }
      return true
    })
    requests.map((request) => {
      if (
        request.client !== null &&
        new Date(request.date).getMonth() === curMonth &&
        clients[request.client.id] === undefined
      ) {
        curMonthNewClients++
        clients = {
          ...clients,
          [request.client.id]: '',
        }
      }
    })
    setStats((stats) => ({
      ...stats,
      isLoaded: true,
      value: addSpaceDelimiter(Math.floor(curMonthNewClients * 100) / 100),
      difference: curMonthNewClients - prevMonthNewClients,
      percentage:
        Math.floor(
          ((curMonthNewClients - prevMonthNewClients) /
            (prevMonthNewClients === 0 ? 1 : prevMonthNewClients)) *
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

export default NewClientsStatsPanel
