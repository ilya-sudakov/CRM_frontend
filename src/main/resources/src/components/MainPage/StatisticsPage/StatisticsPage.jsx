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
import RiggingItemsQuantityForType from './Graphs/RiggingItemsQuantityForType.jsx'
import { getStamp } from '../../../utils/RequestsAPI/Rigging/Stamp.jsx'
import ProductQuantityProduced from './Panels/ProductQuantityProduced.jsx'
import { getRecordedWorkByDateRange } from '../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx'
import useFetch from '../../../utils/hooks/useFetch.js'

const StatisticsPage = () => {
  const [curPage, setCurPage] = useState('requests')
  const pages = {
    requests: () => <RequestsPage />,
    production: () => <ProductionPage />,
  }

  return (
    <div className="statistics">
      <div className="main-window">
        <div className="main-window__header main-window__header--full">
          <div className="main-window__title">Статистика</div>
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
    return function cancel() {
      abortController.abort()
    }
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

const ProductionPage = (props) => {
  const [drafts, setDrafts] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const loadDrafts = (signal) => {
    setIsLoading(true)
    let newDrafts = []
    getStamp(signal)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        response.map((item) => {
          return item.stampParts
            .filter((stamp) => stamp.color !== 'completed') //Не показываем завершенные детали
            .map((stamp) => {
              newDrafts.push({
                ...stamp,
                type: 'Stamp',
              })
            })
        })
        setDrafts([...newDrafts])
        setIsLoading(false)
        setDataLoaded(true)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (dataLoaded || isLoading) {
      return
    }
    loadDrafts()
    // const abortController = new AbortController()
    // loadDrafts(abortController.signal)
    // return function cancel() {
    //   abortController.abort()
    // }
  }, [dataLoaded, isLoading])

  //запрашиваем данные за пред. и тек. недели
  const { status, data } = useFetch(() => {
    let curMonday = new Date()
    let prevMonday = new Date()
    prevMonday = new Date(
      prevMonday.setDate(
        prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7) - 7,
      ),
    )
    return getRecordedWorkByDateRange(
      prevMonday.getDate(),
      prevMonday.getMonth() + 1,
      curMonday.getDate(),
      curMonday.getMonth() + 1,
    )
  })

  return (
    <div className="statistics__page-wrapper">
      <div className="statistics__row">
        <ProductQuantityProduced data={data} />
      </div>
      <div className="statistics__row">
        <RiggingItemsQuantityForType data={drafts} />
      </div>
    </div>
  )
}
