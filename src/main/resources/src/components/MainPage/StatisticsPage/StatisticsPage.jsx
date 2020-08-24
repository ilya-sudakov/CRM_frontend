import React, { useEffect, useState } from 'react'
import './StatisticsPage.scss'

import { getRequests } from '../../../utils/RequestsAPI/Requests.jsx'

import RequestsQuantityPanel from './Panels/RequestsQuantityPanel.jsx'
import IncomeStatsPanel from './Panels/IncomeStatsPanel.jsx'
import AverageSumStatsPanel from './Panels/AverageSumStatsPanel.jsx'
import NewClientsStatsPanel from './Panels/NewClientsStatsPanel.jsx'
import RequestsQuantityGraphPanel from './Graphs/RequestsQuantityGraphPanel.jsx'
import ManagerEfficiencyGraphPanel from './Graphs/ManagerEfficiencyGraphPanel.jsx'
import ManagerMoneyGraphPanel from './Graphs/ManagerMoneyGraphPanel.jsx'

const StatisticsPage = () => {
  const [requests, setRequests] = useState([])
  const [requestsLoaded, setRequestsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const loadRequests = (signal) => {
    if (!requestsLoaded && !isLoading) {
      setIsLoading(true)
      getRequests(signal)
        .then((res) => res.json())
        .then((res) => {
          setRequestsLoaded(true)
          setRequests([...res])
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
          setRequestsLoaded(true)
          console.log(error)
        })
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    loadRequests(abortController.signal)
  }, [])

  return (
    <div className="statistics">
      <div className="main-window">
        <div className="main-window__title">Статистика</div>
        <div className="statistics__row">
          <RequestsQuantityPanel requests={requests} />
          <IncomeStatsPanel requests={requests} />
          <AverageSumStatsPanel requests={requests} />
          <NewClientsStatsPanel requests={requests} />
        </div>
        <div className="statistics__row">
          <RequestsQuantityGraphPanel data={requests} />
          <ManagerEfficiencyGraphPanel data={requests} />
          <ManagerMoneyGraphPanel data={requests} />
        </div>
        {/* <div className="statistics__row">
        </div> */}
      </div>
    </div>
  )
}

export default StatisticsPage
