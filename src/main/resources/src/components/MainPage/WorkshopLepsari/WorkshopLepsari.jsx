import React, { useState, useEffect } from 'react'
import pdfMake from 'pdfmake'
import './WorkshopLepsari.scss'
import PrintIcon from '../../../../../../../assets/print.png'
import TableView from '../WorkshopsComponents/TableView/TableView.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'
import { getProductsFromRequestsListPdfText } from '../../../utils/pdfFunctions.jsx'
import Button from '../../../utils/Form/Button/Button.jsx'
import FloatingPlus from '../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'
import {
  getRequestById,
  deleteProductsToRequest,
  deleteRequest,
  getRequestsByWorkshop,
} from '../../../utils/RequestsAPI/Requests.jsx'
import {
  sortRequestsByDates,
  getQuantityOfProductsFromRequests,
} from '../../../utils/functions.jsx'
import ControlPanel from '../../../utils/MainWindow/ControlPanel/ControlPanel.jsx'

const WorkshopLepsari = (props) => {
  const [requestLepsari, setRequestLepsari] = useState([])
  const [requestsByDate, setRequestsByDate] = useState([])
  const [productsQuantities, setProductsQuantities] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [curPage, setCurPage] = useState('Открытые')

  //Статусы заявок
  const [requestStatuses, setRequestStatutes] = useState([
    {
      name: 'Проблема/Материалы',
      oldName: 'Проблема-материалы',
      className: 'materials',
      access: ['ROLE_ADMIN', 'ROLE_WORKSHOP'],
      visible: false,
    },
    // {
    //   name: 'Отгружено',
    //   className: 'shipped',
    //   access: ['ROLE_ADMIN', 'ROLE_WORKSHOP'],
    //   visible: false,
    // },
    {
      name: 'Готово к отгрузке',
      oldName: 'Готово',
      className: 'ready',
      access: ['ROLE_ADMIN', 'ROLE_MANAGER'],
      visible: false,
    },
    {
      name: 'В производстве',
      className: 'in-production',
      access: ['ROLE_ADMIN', 'ROLE_MANAGER'],
      visible: false,
    },
    {
      name: 'Ожидание',
      className: 'waiting',
      access: ['ROLE_ADMIN', 'ROLE_MANAGER'],
      visible: false,
    },
    {
      name: 'Приоритет',
      className: 'priority',
      access: ['ROLE_ADMIN'],
      visible: false,
    },
  ])

  const deleteItem = (event) => {
    const id = event.currentTarget.dataset.id
    getRequestById(id)
      .then((res) => res.json())
      .then((res) => {
        const productsArr = res.lepsariProducts.map((product) => {
          return deleteProductsToRequest(product.id)
        })
        Promise.all(productsArr).then(() => {
          deleteRequest(id).then(() => loadRequestLepsari())
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    document.title = 'Заявки - Лепсари'
    const abortController = new AbortController()
    loadRequestLepsari(abortController.signal)
    return function cancel() {
      abortController.abort()
    }
  }, [])

  const printRequestsList = () => {
    let dd = getProductsFromRequestsListPdfText(productsQuantities, 'ЦехЛЭМЗ')
    pdfMake.createPdf(dd).print()
  }

  const loadRequestLepsari = (signal) => {
    setIsLoading(true)
    getRequestsByWorkshop('lepsari', signal)
      .then((res) => res.json())
      .then((requests) => {
        // console.log(requests);
        setRequestLepsari(requests)
        setProductsQuantities(getQuantityOfProductsFromRequests(requests))
        setRequestsByDate(sortRequestsByDates(requests))
        setIsLoading(false)
      })
  }

  return (
    <div className="requests_lepsari">
      <div className="main-window">
        <FloatingPlus
          linkTo="/lepsari/workshop-lepsari/new"
          visibility={['ROLE_ADMIN', 'ROLE_LEPSARI']}
        />
        {/* <div className="main-window__title">Заявки на производство Лепсари</div> */}
        <SearchBar
          placeholder="Введите название продукции для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <div className="main-window__header main-window__header--full">
          <div className="main-window__menu">
            <div
              className={
                curPage === 'Открытые'
                  ? 'main-window__item--active main-window__item'
                  : 'main-window__item'
              }
              onClick={() => setCurPage('Открытые')}
            >
              Открытые
            </div>
            <div
              className={
                curPage === 'Отгружено'
                  ? 'main-window__item--active main-window__item'
                  : 'main-window__item'
              }
              onClick={() => setCurPage('Отгружено')}
            >
              Отгружено
            </div>
            <div
              className={
                curPage === 'Завершено'
                  ? 'main-window__item--active main-window__item'
                  : 'main-window__item'
              }
              onClick={() => setCurPage('Завершено')}
            >
              Завершено
            </div>
          </div>
        </div>
        <ControlPanel
          itemsCount={`Всего: ${requestLepsari.length} записей`}
          buttons={
            <Button
              text="Печать списка"
              isLoading={isLoading}
              imgSrc={PrintIcon}
              className="main-window__button"
              onClick={printRequestsList}
            />
          }
          content={
            <div className="main-window__status-panel">
              <div>Фильтр по статусам: </div>
              {requestStatuses.map((status, index) => {
                return (
                  <div
                    className={
                      (status.visible
                        ? 'main-window__button'
                        : 'main-window__button main-window__button--inverted') +
                      ' main-window__list-item--' +
                      status.className
                    }
                    onClick={() => {
                      let temp = requestStatuses.map((status) => {
                        return {
                          ...status,
                          visible: false,
                        }
                      })
                      temp.splice(index, 1, {
                        ...status,
                        visible: !status.visible,
                      })
                      setRequestStatutes([...temp])
                    }}
                  >
                    {status.name}
                  </div>
                )
              })}
            </div>
          }
        />
        <TableView
          data={requestLepsari
            .filter((item) => {
              if (curPage === 'Завершено' && item.status === 'Завершено') {
                return true
              }
              if (curPage === 'Отгружено' && item.status === 'Отгружено') {
                return true
              }
              if (
                curPage === 'Открытые' &&
                item.status !== 'Завершено' &&
                item.status !== 'Отгружено'
              ) {
                return true
              }
              return false
            })
            .filter((item) => {
              let check = false
              let noActiveStatuses = true
              requestStatuses.map((status) => {
                requestStatuses.map((status) => {
                  if (status.visible) {
                    noActiveStatuses = false
                  }
                })
                if (
                  noActiveStatuses === true ||
                  (status.visible &&
                    (status.name === item.status ||
                      status.oldName === item.status))
                ) {
                  check = true
                  return
                }
              })
              return check
            })}
          workshopName="lepsari"
          isLoading={isLoading}
          loadData={loadRequestLepsari}
          requestsByDate={requestsByDate}
          deleteItem={deleteItem}
          // copyRequest={copyRequest}
          searchQuery={searchQuery}
          userHasAccess={props.userHasAccess}
        />
      </div>
    </div>
  )
}

export default WorkshopLepsari
