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
import RequestsAverageTimeCompletionPanel from './Panels/RequestsAverageTimeCompletionPanel.jsx'
import ProductQuantityInRequest from './Panels/ProductQuantityInRequest.jsx'
import ClientTypeDistributionInRequests from './Graphs/ClientTypeDistributionInRequests.jsx'

const StatisticsPage = () => {
  const [curPage, setCurPage] = useState('requests')
  const pages = {
    requests: () => <RequestsPage />,
    production: () => <RequestsPage />,
  }

  return (
    <div className="statistics">
      <div className="main-window">
        <div className="main-window__title">Статистика</div>
        <div className="main-window__header">
          <div className="main-window__menu">
            <div
              className={`main-window__item ${
                curPage === 'requests' ? 'main-window__item--active' : ''
              }`}
              onClick={() => setCurPage('requests')}
            >
              Заказы
            </div>
            <div
              className={`main-window__item ${
                curPage === 'production' ? 'main-window__item--active' : ''
              }`}
              onClick={() => setCurPage('production')}
            >
              Производство
            </div>
          </div>
        </div>
        {pages[curPage]()}
      </div>
    </div>
  )
}

export default StatisticsPage

const RequestsPage = (props) => {
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
    <div className="statistics__page-wrapper">
      <div className="statistics__row">
        <RequestsQuantityPanel requests={requests} />
        <IncomeStatsPanel requests={requests} />
        <AverageSumStatsPanel requests={requests} />
      </div>
      <div className="statistics__row">
        <ManagerEfficiencyGraphPanel data={requests} />
        <ManagerMoneyGraphPanel data={requests} />
      </div>
      <div className="statistics__row">
        <RequestsAverageTimeCompletionPanel requests={requests} />
        <NewClientsStatsPanel requests={requests} />
        <ProductQuantityInRequest requests={requests} />
      </div>
      <div className="statistics__row">
        <RequestsQuantityGraphPanel data={requests} />
        <ClientTypeDistributionInRequests data={requests} />
      </div>
    </div>
  )
}
