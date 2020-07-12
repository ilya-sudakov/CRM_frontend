import React, { useState, useEffect } from 'react'
import './WorkshopLEMZ.scss'
import '../../../utils/MainWindow/MainWindow.scss'
import PrintIcon from '../../../../../../../assets/print.png'
import pdfMake from 'pdfmake'
import {
  getRequestsLEMZ,
  deleteRequestLEMZ,
  getRequestLEMZById,
  deleteProductsToRequestLEMZ,
} from '../../../utils/RequestsAPI/Workshop/LEMZ.jsx'
import TableViewOld from './TableView/TableView.jsx'
import TableView from '../WorkshopsComponents/TableView/TableView.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'
import { getRequestsListPdfText } from '../../../utils/pdfFunctions.jsx'
import ImgLoader from '../../../utils/TableView/ImgLoader/ImgLoader.jsx'
import Button from '../../../utils/Form/Button/Button.jsx'
import FloatingPlus from '../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'

const WorkshopLEMZ = (props) => {
  const [requestsLEMZ, setRequestsLEMZ] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [curPage, setCurPage] = useState('Открытые')

  const deleteItem = (event) => {
    const id = event.currentTarget.dataset.id

    getRequestLEMZById(id)
      .then((res) => res.json())
      .then((res) => {
        const productsArr = res.lemzProducts.map((product) => {
          return deleteProductsToRequestLEMZ(product.id)
        })
        Promise.all(productsArr).then(() => {
          deleteRequestLEMZ(id).then(() => loadRequestsLEMZ())
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const printRequestsList = () => {
    let dd = getRequestsListPdfText(
      requestsLEMZ.sort((a, b) => a.id - b.id),
      'ЦехЛЭМЗ',
      'lemzProducts',
    )
    pdfMake.createPdf(dd).print()
  }

  const copyRequest = (id) => {
    props.setTransferState(true)
    props.setTransferData(
      requestsLEMZ.find((item) => {
        if (item.id === id) {
          return true
        }
      }),
    )
    props.history.push('/lemz/workshop-lemz/new')
  }

  useEffect(() => {
    document.title = 'Заявки - ЛЭМЗ'
    const abortController = new AbortController()
    loadRequestsLEMZ(abortController.signal)
    return function cancel() {
      abortController.abort()
    }
  }, [])

  const loadRequestsLEMZ = (signal) => {
    setIsLoading(true)
    getRequestsLEMZ(signal)
      .then((res) => res.json())
      .then((requests) => {
        setRequestsLEMZ(requests)
        setIsLoading(false)
      })
  }

  //Статусы заявок
  const [requestStatuses, setRequestStatutes] = useState([
    {
      name: 'Проблема/Материалы',
      oldName: 'Проблема-материалы',
      className: 'materials',
      access: ['ROLE_ADMIN', 'ROLE_WORKSHOP'],
      visible: false,
    },
    {
      name: 'Отгружено',
      className: 'shipped',
      access: ['ROLE_ADMIN', 'ROLE_WORKSHOP'],
      visible: false,
    },
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

  return (
    <div className="requests_LEMZ">
      <div className="main-window">
        <div className="main-window__header">
          <SearchBar
            // title="Поиск по заявкам ЛЭМЗ"
            placeholder="Введите название продукции для поиска..."
            setSearchQuery={setSearchQuery}
          />
          <FloatingPlus
            linkTo="/lemz/workshop-lemz/new"
            visibility={['ROLE_ADMIN', 'ROLE_LEMZ']}
          />
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
        {/* <div className="main-window__status-panel">
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
        </div> */}
        <div className="main-window__info-panel">
          <Button
            text="Печать списка"
            isLoading={isLoading}
            imgSrc={PrintIcon}
            className="main-window__button"
            onClick={printRequestsList}
          />
          <div className="main-window__amount_table">
            Всего: {requestsLEMZ.length} записей
          </div>
        </div>

        <TableView
          data={requestsLEMZ
            .filter((item) => {
              if (curPage === 'Открытые') {
                if (item.status !== 'Завершено') return true
              } else {
                if (item.status === 'Завершено') return true
              }
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
          workshopName="lemz"
          isLoading={isLoading}
          loadData={loadRequestsLEMZ}
          deleteItem={deleteItem}
          // transferRequest={}
          copyRequest={copyRequest}
          searchQuery={searchQuery}
          userHasAccess={props.userHasAccess}
        />
        {/* <TableViewOld
          data={requestsLEMZ.filter((item) => {
            if (curPage === 'Открытые') {
              if (item.status !== 'Завершено') return true
            } else {
              if (item.status === 'Завершено') return true
            }
          })}
          loadData={loadRequestsLEMZ}
          userHasAccess={props.userHasAccess}
          deleteItem={deleteItem}
          copyRequest={copyRequest}
          searchQuery={searchQuery}
        /> */}
      </div>
    </div>
  )
}

export default WorkshopLEMZ
