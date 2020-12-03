import React, { useState, useEffect } from 'react'
import './WorkshopLEMZ.scss'
import '../../../utils/MainWindow/MainWindow.scss'
import PrintIcon from '../../../../../../../assets/print.png'
import pdfMake from 'pdfmake'
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
import { getCategories } from '../../../utils/RequestsAPI/Products/Categories.js'
import {
  sortRequestsByDates,
  getQuantityOfProductsFromRequests,
  formatDateString,
  getDatesFromRequests,
} from '../../../utils/functions.jsx'
import ControlPanel from '../../../utils/MainWindow/ControlPanel/ControlPanel.jsx'

const WorkshopLEMZ = (props) => {
  const [requestsLEMZ, setRequestsLEMZ] = useState([])
  const [dates, setDates] = useState([])
  const [productsQuantities, setProductsQuantities] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [curPage, setCurPage] = useState('Открытые')

  const deleteItem = (event) => {
    const id = event.currentTarget.dataset.id
    getRequestById(id)
      .then((res) => res.json())
      .then((res) => {
        const productsArr = res.requestProducts.map((product) => {
          return deleteProductsToRequest(product.id)
        })
        Promise.all(productsArr).then(() => {
          deleteRequest(id).then(() => loadRequestsLEMZ())
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const printRequestsList = () => {
    let categories = {}
    //получаем список категорий продукций для категоризации
    //в pdf файле
    setIsLoading(true)
    getCategories()
      .then((res) => res.json())
      .then((res) => {
        res.map((category) => {
          if (categories[category.category] === undefined) {
            categories = { ...categories, [category.category]: {} }
          }
          Object.entries(productsQuantities).map((product) => {
            category.products.map((categoryProduct) => {
              if (product[0] === categoryProduct.name) {
                categories = {
                  ...categories,
                  [category.category]: {
                    ...categories[category.category],
                    [product[0]]: product[1],
                  },
                }
              }
            })
          })
        })
      })
      .then(() => {
        setIsLoading(false)
        let dd = getProductsFromRequestsListPdfText(categories, 'ЦехЛЭМЗ')
        pdfMake.createPdf(dd).print()
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
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
    getRequestsByWorkshop('lemz', signal)
      .then((res) => res.json())
      .then((requests) => {
        setRequestsLEMZ(requests)
        setProductsQuantities(getQuantityOfProductsFromRequests(requests))
        setDates(getDatesFromRequests(requests))
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

  const filterRequestsByPage = (data, page) => {
    return data.filter((item) => {
      if (page === 'Завершено' && item.status === 'Завершено') {
        return true
      }
      if (
        page === 'Отгружено' &&
        (item.status === 'Отгружено' || item.status === 'Частично отгружено')
      ) {
        return true
      }
      if (
        page === 'Открытые' &&
        item.status !== 'Завершено' &&
        item.status !== 'Отгружено' &&
        item.status !== 'Частично отгружено'
      ) {
        return true
      }
      return false
    })
  }

  const filterRequestsByWorkshop = (data) => {
    return data.filter((item) => item.factory === 'lemz')
  }

  const filterRequestsByStatuses = (data) => {
    return data.filter((item) => {
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
            (status.name === item.status || status.oldName === item.status))
        ) {
          check = true
          return
        }
      })
      return check
    })
  }

  const filterRequests = (requestsLEMZ) => {
    return filterRequestsByStatuses(
      filterRequestsByPage(filterRequestsByWorkshop(requestsLEMZ), curPage),
    )
  }

  // * Sorting

  const [sortOrder, setSortOrder] = useState({
    curSort: 'date',
    date: 'desc',
  })

  const filterSearchQuery = (data) => {
    const query = searchQuery.toLowerCase()
    return data.filter((item) => {
      return item.requestProducts.length !== 0 &&
        item.requestProducts[0].name !== null
        ? item.requestProducts[0].name.toLowerCase().includes(query) ||
            item.id.toString().includes(query) ||
            formatDateString(item.date).includes(query) ||
            (item.codeWord || '').toLowerCase().includes(query) ||
            item.status.toLowerCase().includes(query) ||
            item.responsible.toLowerCase().includes(query) ||
            formatDateString(item.shippingDate).includes(query)
        : item.status.toLowerCase().includes(query)
    })
  }

  const sortRequests = (data) => {
    return filterSearchQuery(data).sort((a, b) => {
      if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1
      }
      if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1
      }
      return 0
    })
  }

  const changeSortOrder = (event) => {
    const name = event.target.value.split(' ')[0]
    const order = event.target.value.split(' ')[1]
    setSortOrder({
      curSort: name,
      [name]: order,
    })
  }

  return (
    <div className="requests_LEMZ">
      <div className="main-window">
        <FloatingPlus
          linkTo="/lemz/workshop-lemz/new"
          visibility={['ROLE_ADMIN', 'ROLE_LEMZ']}
        />
        <SearchBar
          // title="Поиск по заявкам ЛЭМЗ"
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
              <span className="main-window__items-count">
                {
                  filterRequestsByPage(
                    filterRequestsByWorkshop(requestsLEMZ),
                    'Открытые',
                  ).length
                }
              </span>
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
              <span className="main-window__items-count">
                {
                  filterRequestsByPage(
                    filterRequestsByWorkshop(requestsLEMZ),
                    'Отгружено',
                  ).length
                }
              </span>
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
          itemsCount={`Всего: ${requestsLEMZ.length} записей`}
          buttons={
            <Button
              text="Печать списка"
              isLoading={isLoading}
              imgSrc={PrintIcon}
              inverted
              className="main-window__button main-window__button--inverted"
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
          sorting={
            <div className="main-window__sort-panel">
              <select onChange={changeSortOrder}>
                <option value="date desc">По дате (убыв.)</option>
                <option value="date asc">По дате (возр.)</option>
                {/* <option value="codeWord asc">По клиенту (А-Я)</option>
                <option value="codeWord desc">По клиенту (Я-А)</option> */}
                <option value="shippingDate desc">
                  По дате отгрузки (убыв.)
                </option>
                <option value="shippingDate asc">
                  По дате отгрузки (возр.)
                </option>
              </select>
            </div>
          }
        />
        <TableView
          data={sortRequests(filterRequests(requestsLEMZ))}
          workshopName="lemz"
          isLoading={isLoading}
          loadData={loadRequestsLEMZ}
          dates={dates.sort((a, b) => {
            if (a < b) {
              return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1
            }
            if (a > b) {
              return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1
            }
            return 0
          })}
          deleteItem={deleteItem}
          // copyRequest={copyRequest}
          searchQuery={searchQuery}
          userHasAccess={props.userHasAccess}
        />
      </div>
    </div>
  )
}

export default WorkshopLEMZ
