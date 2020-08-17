import React, { useState, useEffect } from 'react'
import '../../../utils/MainWindow/MainWindow.scss'
import './Requests.scss'
import '../../../utils/Form/Form.scss'
import '../../../utils/MainWindow/MainWindow.scss'
import {
  getRequests,
  deleteRequest,
  deleteProductsToRequest,
  getRequestById,
  // copyRequest,
  addRequest,
  editRequest,
  addProductsToRequest,
} from '../../../utils/RequestsAPI/Requests.jsx'
import TableView from '../WorkshopsComponents/TableView/TableView.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'
import FormWindow from '../../../utils/Form/FormWindow/FormWindow.jsx'
import FloatingPlus from '../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'
import Button from '../../../utils/Form/Button/Button.jsx'
// import { Link } from 'react-router-dom'
import {
  // formatDateString,
  sortRequestsByDates,
} from '../../../utils/functions.jsx'

const Requests = (props) => {
  const [requests, setRequests] = useState([]) //Массив заявок
  const [searchQuery, setSearchQuery] = useState('') //Значение строки поиска
  const [showWindow, setShowWindow] = useState(false) //Показывать ли окно
  const [isLoading, setIsLoading] = useState(false) //Индикатор загрузки
  const [toWorkshop, setToWorkshop] = useState('lemz') //Название цеха для переноса заявки
  //id заявки, использующийся при ее дальнейшем копировании или переносе в цеха
  const [requestId, setRequestId] = useState(0)
  const [requestsByDate, setRequestsByDate] = useState([])
  const [clients, setClients] = useState([]) //Массив клиентов
  const [curPage, setCurPage] = useState('Открытые') //Текущая страница
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
  const pages = {
    Открытые: {
      getRequests: (signal) => getRequests(signal),
    },
    Отгружено: {
      getRequests: (signal) => getRequests(signal),
    },
    Завершено: {
      getRequests: (signal) => getRequests(signal),
    },
  }
  const [workshops, setWorkshops] = useState([
    {
      filter: ['lemz', 'lepsari', null, 'requests'],
      fullName: 'Все',
      visible: true,
    },
    { filter: ['lemz'], fullName: 'ЦехЛЭМЗ', visible: false },
    { filter: ['lepsari'], fullName: 'ЦехЛепсари', visible: false },
    { filter: [null, 'requests'], fullName: 'Не перенесенные', visible: false },
  ])

  //Удалить заявку
  const deleteItem = (event) => {
    const id = event.currentTarget.dataset.id
    getRequestById(id)
      .then((res) => res.json())
      .then((res) => {
        const productsArr = res.requestProducts.map((product) => {
          return deleteProductsToRequest(product.id)
        })
        Promise.all(productsArr).then(() => {
          deleteRequest(id).then(() => loadRequests())
        })
      })
  }

  useEffect(() => {
    document.title = 'Заявки'
    let abortController = new AbortController()
    requests.length === 0 && loadRequests(abortController.signal)
    return function cancel() {
      abortController.abort()
    }
  }, [curPage])

  //GET-запрос на получение всех заявок
  const loadRequests = (signal) => {
    setIsLoading(true)
    return pages[curPage]
      .getRequests(signal)
      .then((res) => res.json())
      .then((requests) => {
        let temp = requests.map((item) => {
          return {
            ...item,
            open: false,
          }
        })
        setIsLoading(false)
        // console.log(temp)
        setRequests(temp)
        // getClientsFromRequests(temp)
        setRequestsByDate(sortRequestsByDates(temp))
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }

  //Перенести заявку
  const transferRequest = (id) => {
    setRequestId(id)
    setShowWindow(!showWindow)
  }

  //Копировать заявку
  const copySelectedRequest = (id) => {
    setIsLoading(true)
    const requestToBeCopied = requests.find((item) => {
      if (item.id === id) {
        return true
      }
    })
    addRequest({
      date: requestToBeCopied.date,
      products: requestToBeCopied.requestProducts,
      quantity: requestToBeCopied.quantity,
      codeWord: requestToBeCopied.codeWord,
      responsible: requestToBeCopied.responsible,
      status: requestToBeCopied.status,
      shippingDate:
        requestToBeCopied.shippingDate !== null
          ? requestToBeCopied.shippingDate
          : new Date(),
      comment: requestToBeCopied.comment,
      factory: requestToBeCopied.factory,
    })
      .then((res) => res.json())
      .then((res) => {
        const productsArr = requestToBeCopied.requestProducts.map((item) => {
          return addProductsToRequest({
            requestId: res.id,
            quantity: item.quantity,
            packaging: item.packaging,
            status: item.status,
            name: item.name,
          })
        })
        Promise.all(productsArr).then(() => {
          setIsLoading(false)
          loadRequests()
        })
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }

  const filterRequests = (requests) => {
    return requests
      .filter((item) => {
        const selectedWorkshop = workshops.find((workshop) => workshop.visible)
        if (selectedWorkshop === undefined) {
          return false
        }
        let check = false
        selectedWorkshop.filter.map((type) => {
          if (type === item.factory) {
            return (check = true)
          }
        })
        return check
      })
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
              (status.name === item.status || status.oldName === item.status))
          ) {
            check = true
            return
          }
        })
        return check
      })
  }

  const filterDates = (dates) => {
    console.log(requestsByDate);
    let newDates = dates
    Object.entries(dates).map((item) => {
      // console.log(item[0], item[1], filterRequests(item[1]));
      let temp = filterRequests(item[1])
      newDates[item[0]] = temp
    })
    // console.log(newDates)
    return newDates
  }

  return (
    <div className="requests">
      <div className="main-window">
        <div className="main-window__header">
          <div className="main-window__title">Заявки</div>
          <FloatingPlus
            linkTo="/requests/new"
            visibility={['ROLE_ADMIN', 'ROLE_MANAGER']}
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
        <SearchBar
          // title="Поиск по заявкам"
          placeholder="Введите название продукции для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <FormWindow
          title="Перенос заявки в план производства"
          windowName="transfer-request"
          content={
            <React.Fragment>
              <div className="main-form">
                <div className="main-form__form">
                  <div className="main-form__item">
                    <div className="main-form__input_name">Подразделение</div>
                    <div className="main-form__input_field">
                      <select
                        name="workshop"
                        onChange={(event) => {
                          setToWorkshop(event.target.value)
                        }}
                      >
                        <option value="lemz">ЦехЛЭМЗ</option>
                        <option value="lepsari">ЦехЛепсари</option>
                      </select>
                    </div>
                  </div>
                  <div className="main-form__buttons">
                    <Button
                      className="main-form__submit"
                      isLoading={isLoading}
                      onClick={() => {
                        setIsLoading(true)
                        const request = requests.find(
                          (item) => item.id === requestId,
                        )
                        editRequest(
                          { ...request, factory: toWorkshop },
                          request.id,
                        )
                          .then((res) => res.json())
                          .then((res) => {
                            setIsLoading(false)
                            props.history.push(
                              toWorkshop +
                                '/workshop-' +
                                toWorkshop +
                                '/edit/' +
                                res.id,
                            )
                          })
                          .catch((error) => {
                            console.log(error)
                            alert('Ошибка при копировании записи')
                            setIsLoading(false)
                          })
                      }}
                      text="Перенести в цех"
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          }
          showWindow={showWindow}
          setShowWindow={setShowWindow}
        />
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
          <div className="main-window__amount_table">
            Всего: {requests.length} записей
          </div>
        </div>
        <div className="main-window__filter-pick" style={{ marginTop: '10px' }}>
          <div>Фильтр по цехам: </div>
          {workshops.map((workshop, index) => {
            return (
              <div
                className={
                  workshop.visible
                    ? 'main-window__button'
                    : 'main-window__button main-window__button--inverted'
                }
                onClick={() => {
                  let temp = workshops.map((tempWorkshop) => {
                    return {
                      ...tempWorkshop,
                      visible: false,
                    }
                  })
                  temp.splice(index, 1, {
                    ...workshop,
                    visible: !workshop.visible,
                  })
                  setWorkshops([...temp])
                }}
              >
                {workshop.fullName}
              </div>
            )
          })}
        </div>
        <TableView
          data={filterRequests(requests)}
          requestsByDate={filterDates(requestsByDate)}
          isLoading={isLoading}
          workshopName="requests"
          loadData={loadRequests}
          deleteItem={deleteItem}
          transferRequest={transferRequest}
          copyRequest={copySelectedRequest}
          searchQuery={searchQuery}
          userHasAccess={props.userHasAccess}
        />
      </div>
    </div>
  )
}

export default Requests
