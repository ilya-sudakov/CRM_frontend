import React, { useState } from 'react'
import './WorkshopOrders.scss'
import '../../../../utils/MainWindow/MainWindow.scss'
import editSVG from '../../../../../../../../assets/tableview/edit.svg'
import deleteSVG from '../../../../../../../../assets/tableview/delete.svg'
import viewSVG from '../../../../../../../../assets/tableview/view.svg'
import SearchBar from '../../SearchBar/SearchBar.jsx'
import {
  formatDateString,
  addSpaceDelimiter,
} from '../../../../utils/functions.jsx'
import {
  getOrdersByName,
  deleteProductFromOrder,
  deleteOrder,
} from '../../../../utils/RequestsAPI/Workshop/Orders.jsx'
import FloatingPlus from '../../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'
import PlaceholderLoading from '../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'

const WorkshopOrders = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [orders, setOrders] = useState([])
  const [statuses, setStatuses] = useState([
    {
      className: 'sent',
      name: 'Отправлено',
      visible: true,
    },
    {
      className: 'completed',
      name: 'Завершено',
      visible: false,
    },
    {
      className: 'ordered',
      name: 'Заказано',
      visible: true,
    },
    {
      className: 'problem',
      name: 'Проблема',
      visible: true,
    },
  ])

  const loadData = (signal) => {
    setIsLoading(true)
    return getOrdersByName(
      {
        name: 'ЦехЛепсари',
      },
      signal,
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setOrders(res)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const deleteItem = (orderIndex) => {
    Promise.all(
      orders[orderIndex].products.map((product) => {
        return deleteProductFromOrder(product.id)
      }),
    ).then(() => {
      return deleteOrder(orders[orderIndex].id).then(() => {
        return loadData()
      })
    })
  }

  useState(() => {
    document.title = 'Комплектация ЦехЛепсари'
    const abortController = new AbortController()
    loadData(abortController.signal)
    setIsLoading(false)
    return function cancel() {
      abortController.abort()
    }
  }, [])

  return (
    <div className="workshop-orders">
      <div className="main-window">
        <SearchBar
          // title="Поиск по заказам"
          placeholder="Введите запрос для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <FloatingPlus
          linkTo="/lepsari/workshop-orders/new"
          visibility={['ROLE_ADMIN', 'ROLE_ENGINEER', 'ROLE_LEPSARI']}
        />
        <div className="main-window__info-panel">
          <div className="main-window__status-panel">
            <div>Фильтр по статусам: </div>
            {statuses.map((status, index) => {
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
                    let temp = statuses
                    temp.splice(index, 1, {
                      ...status,
                      visible: !status.visible,
                    })
                    setStatuses([...temp])
                  }}
                >
                  {status.name}
                </div>
              )
            })}
          </div>
          <div className="main-window__amount_table">
            Всего: {orders.length} записей
          </div>
        </div>
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <span>Дата создания</span>
            <span>Название</span>
            <span>Продукция</span>
            <span>Комплектация</span>
            <span>Статус</span>
            <span>Дата поставки</span>
            <div className="main-window__actions">Действие</div>
          </div>
          {isLoading && (
            <PlaceholderLoading
              itemClassName="main-window__list-item"
              minHeight="35px"
              items={3}
            />
          )}
          {orders
            .filter((item) => {
              if (
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                formatDateString(item.deliverBy)
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                item.assembly.toLowerCase().includes(searchQuery.toLowerCase())
              ) {
                let check = false
                statuses.map((status) => {
                  if (status.visible && status.className === item.status) {
                    check = true
                    return
                  }
                })
                return check
              }
            })
            .sort((a, b) => {
              if (a.date < b.date) {
                return -1
              }
              if (a.date > b.date) {
                return 1
              }
              return 0
            })
            .map((order, orderIndex) => {
              return (
                <div
                  className={
                    'main-window__list-item main-window__list-item--' +
                    order.status
                  }
                >
                  <span>
                    <div className="main-window__mobile-text">
                      Дата создания:{' '}
                    </div>
                    {formatDateString(order.date)}
                  </span>
                  <span>
                    <div className="main-window__mobile-text">Название: </div>
                    {order.name}
                  </span>
                  <span>
                    <div className="main-window__mobile-text">Продукция: </div>
                    <div className="main-window__list-col">
                      {order.products.map((product) => {
                        return (
                          <div className="workshop-orders__products">
                            <div>{product.name}</div>
                            <div>
                              {' '}
                              ({addSpaceDelimiter(product.quantity)} шт.)
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </span>
                  <span>
                    <div className="main-window__mobile-text">Назначение: </div>
                    {order.assembly}
                  </span>
                  <span className={'main-window__list-item--' + order.status}>
                    <div className="main-window__mobile-text">Статус: </div>
                    {
                      statuses.find((item) => item.className === order.status)
                        ?.name
                    }
                  </span>
                  <span>
                    <div className="main-window__mobile-text">
                      Дата поставки:{' '}
                    </div>
                    {new Date(order.deliverBy) < new Date() &&
                    order.status !== 'completed' ? (
                      <div className="main-window__reminder">
                        <div>!</div>
                        <div>{formatDateString(order.deliverBy)}</div>
                      </div>
                    ) : (
                      formatDateString(order.deliverBy)
                    )}
                  </span>
                  <div className="main-window__actions">
                    <div
                      className="main-window__action"
                      title="Просмотр заказа"
                      onClick={() => {
                        props.history.push(
                          '/lepsari/workshop-orders/view/' + order.id,
                        )
                      }}
                    >
                      <img className="main-window__img" src={viewSVG} />
                    </div>
                    <div
                      className="main-window__action"
                      title="Редактирование заказа"
                      onClick={() => {
                        props.history.push(
                          '/lepsari/workshop-orders/edit/' + order.id,
                        )
                      }}
                    >
                      <img className="main-window__img" src={editSVG} />
                    </div>
                    {props.userHasAccess(['ROLE_ADMIN']) && (
                      <div
                        className="main-window__action"
                        title="Удаление заказа"
                        onClick={() => {
                          deleteItem(orderIndex)
                        }}
                      >
                        <img className="main-window__img" src={deleteSVG} />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default WorkshopOrders
