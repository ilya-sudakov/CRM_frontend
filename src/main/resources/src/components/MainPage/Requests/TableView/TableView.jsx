import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import sortIcon from '../../../../../../../../assets/tableview/sort_icon.png'
import viewSVG from '../../../../../../../../assets/tableview/view.svg'
import editSVG from '../../../../../../../../assets/tableview/edit.svg'
import deleteSVG from '../../../../../../../../assets/tableview/delete.svg'
import copySVG from '../../../../../../../../assets/tableview/copy.svg'
import transferSVG from '../../../../../../../../assets/tableview/transfer.svg'
import './TableView.scss'
import { editRequestStatus } from '../../../../utils/RequestsAPI/Requests.jsx'
import { formatDateString } from '../../../../utils/functions.jsx'
import TableDataLoading from '../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx'

const TableView = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState({
    curSort: 'date',
    date: 'asc',
  })
  const [requests, setRequests] = useState([])
  const [requestStatuses, setRequestStatutes] = useState([
    {
      name: 'Проблема-материалы',
      className: 'materials',
      access: ['ROLE_ADMIN', 'ROLE_WORKSHOP'],
    },
    {
      name: 'Завершено',
      className: 'completed',
      access: ['ROLE_ADMIN'],
    },
    {
      name: 'Отгружено',
      className: 'shipped',
      access: ['ROLE_ADMIN', 'ROLE_WORKSHOP'],
    },
    {
      name: 'Готово',
      className: 'ready',
      access: ['ROLE_ADMIN', 'ROLE_MANAGER'],
    },
    {
      name: 'В производстве',
      className: 'in-production',
      access: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_MANAGER'],
    },
    {
      name: 'Ожидание',
      className: 'waiting',
      access: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_MANAGER'],
    },
  ])

  const changeSortOrder = (event) => {
    const name = event.target.value.split(' ')[0]
    const order = event.target.value.split(' ')[1]
    setSortOrder({
      curSort: name,
      [name]: order,
    })
  }

  const searchQuery = (data) => {
    const query = props.searchQuery.toLowerCase()
    return data.filter((item) => {
      return item.requestProducts.length !== 0 &&
        item.requestProducts[0].name !== null
        ? item.requestProducts[0].name.toLowerCase().includes(query) ||
            item.id.toString().includes(query) ||
            formatDateString(item.date).includes(query) ||
            item.codeWord.toLowerCase().includes(query) ||
            item.status.toLowerCase().includes(query) ||
            item.responsible.toLowerCase().includes(query) ||
            formatDateString(item.shippingDate).includes(query)
        : item.status.toLowerCase().includes(query)
    })
  }

  const handleStatusChange = (event) => {
    const status = event.target.value
    const id = event.target.getAttribute('id')
    editRequestStatus(
      {
        status: status,
      },
      id,
    )
      .then(() => {
        props.loadData()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const sortRequests = (data) => {
    return searchQuery(data).sort((a, b) => {
      if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1
      }
      if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1
      }
      return 0
    })
  }

  useEffect(() => {
    if (props.data) {
      setRequests(props.data)
      setIsLoading(false)
    }
  }, [props.data, requests, props.isLoading])

  return (
    <div className="tableview_requests">
      <div className="main-window">
        <div className="main-window__sort-panel">
          <span>Сортировка: </span>
          <select onChange={changeSortOrder}>
            <option value="date asc">По дате</option>
            <option value="codeWord asc">По клиенту (А-Я)</option>
            <option value="codeWord desc">По клиенту (Я-А)</option>
            {/* <option value="nextDateContact asc">По дате след. контакта</option> */}
          </select>
        </div>
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <span>Дата</span>
            <span>Продукция</span>
            <span>Кодовое слово</span>
            <span>Ответственный</span>
            <span>Статус</span>
            <div className="main-window__actions">Действия</div>
          </div>
          {props.isLoading && (
            <TableDataLoading
              minHeight="50px"
              className="main-window__list-item"
            />
          )}
          {sortRequests(requests).map((request, request_id) => (
            <React.Fragment>
              <div
                className={
                  'main-window__list-item main-window__list-item--' +
                  requestStatuses.find((item) => item.name === request.status)
                    ?.className
                }
                onClick={(event) => {
                  //   console.log(event.target.classList)
                  if (
                    !event.target.classList.contains(
                      'main-window__status_select',
                    ) &&
                    !event.target.classList.contains('main-window__img') &&
                    !event.target.classList.contains('main-window__action')
                  ) {
                    let temp = requests
                    temp.splice(
                      temp.indexOf(temp.find((item) => item.id === request.id)),
                      1,
                      {
                        ...request,
                        open: !request.open,
                      },
                    )
                    setRequests([...temp])
                  }
                }}
                key={request_id}
              >
                <span>
                  <div className="main-window__mobile-text">Дата:</div>
                  {formatDateString(request.date)}
                </span>
                <span>
                  <div className="main-window__mobile-text">Продукция:</div>
                  {request?.requestProducts[0].name}
                </span>
                <span>
                  <div className="main-window__mobile-text">Кодовое слово:</div>
                  {request.codeWord}
                </span>
                <span>
                  <div className="main-window__mobile-text">Ответственный:</div>
                  {request.responsible}
                </span>
                <span>
                  <div className="main-window__mobile-text">Статус:</div>
                  <select
                    id={request.id}
                    className="main-window__status_select"
                    value={request.status}
                    onChange={handleStatusChange}
                  >
                    {requestStatuses.map((status) => {
                      if (props.userHasAccess(status.access)) {
                        return <option>{status.name}</option>
                      } else {
                        return (
                          <option style={{ display: `none` }}>
                            {status.name}
                          </option>
                        )
                      }
                    })}
                  </select>
                </span>
                <div className="main-window__actions">
                  <Link
                    to={'/requests/view/' + request.id}
                    className="main-window__action"
                    title="Просмотр заявки"
                  >
                    {/* Просмотр */}
                    <img className="main-window__img" src={viewSVG} />
                  </Link>
                  {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && (
                    <Link
                      to={'/requests/edit/' + request.id}
                      className="main-window__action"
                      title="Редактирование заявки"
                    >
                      {/* Редактировать */}
                      <img className="main-window__img" src={editSVG} />
                    </Link>
                  )}
                  {props.userHasAccess(['ROLE_ADMIN']) && (
                    <div
                      data-id={request.id}
                      className="main-window__action"
                      title="Удаление заявки"
                      onClick={props.deleteItem}
                    >
                      {/* Удалить */}
                      <img className="main-window__img" src={deleteSVG} />
                    </div>
                  )}
                  {props.userHasAccess(['ROLE_ADMIN']) && (
                    <div
                      data-id={request.id}
                      className="main-window__action"
                      title="Перенос заявки"
                      onClick={(event) => {
                        event.preventDefault()
                        props.transferRequest(request.id)
                      }}
                    >
                      {/* Перенести */}
                      <img className="main-window__img" src={transferSVG} />
                    </div>
                  )}
                  {props.userHasAccess(['ROLE_ADMIN']) && (
                    <div
                      data-id={request.id}
                      className="main-window__action"
                      title="Копирование заявки"
                      onClick={() => props.copyRequest(request.id)}
                    >
                      {/* Копировать */}
                      <img className="main-window__img" src={copySVG} />
                    </div>
                  )}
                </div>
              </div>
              <div
                className={
                  request.open
                    ? 'main-window__list-options'
                    : 'main-window__list-options main-window__list-options--hidden'
                }
              >
                <div className="main-window__list">
                  <div className="main-window__list-item main-window__list-item--header">
                    <span>Название</span>
                    <span>Фасовка</span>
                    <span>Количество</span>
                  </div>
                  {props.isLoading && (
                    <TableDataLoading
                      minHeight="20px"
                      className="main-window__list-item"
                    />
                  )}
                  {request.requestProducts.map((product) => {
                    return (
                      <div className="main-window__list-item">
                        <span>
                          <div className="main-window__mobile-text">
                            Название:
                          </div>
                          {product.name}
                        </span>
                        <span>
                          <div className="main-window__mobile-text">
                            Фасовка:
                          </div>
                          {product.packaging}
                        </span>
                        <span>
                          <div className="main-window__mobile-text">
                            Количество:
                          </div>
                          {product.quantity}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* //!!! */}

      {/* <div className="tableview_requests__row tableview_requests__row--header">
        <div className="tableview_requests__col">
          <span>Дата</span>
          <img
            name="date"
            className="tableview_requests__img"
            onClick={changeSortOrder}
            src={sortIcon}
          />
        </div>
        <div className="tableview_requests__col">Продукция</div>
        <div className="tableview_requests__col">Фасовка</div>
        <div className="tableview_requests__col">Количество</div>
        <div className="tableview_requests__col">Кодовое слово</div>
        <div className="tableview_requests__col">Ответственный</div>
        <div className="tableview_requests__col">Статус</div>
        <div className="tableview_requests__col">Действия</div>
      </div>
      {isLoading && (
        <TableDataLoading
          minHeight="50px"
          className="tableview_requests__row tableview_requests__row--even"
        />
      )}
      {sortRequests(props.data).map((request, request_id) => (
        <div
          key={request_id}
          className={
            'tableview_requests__row ' +
            ((request.status === 'Проблема' &&
              'tableview_requests__row--status_problem') ||
              (request.status === 'Материалы' &&
                'tableview_requests__row--status_materials') ||
              (request.status === 'Ожидание' &&
                'tableview_requests__row--status_waiting') ||
              (request.status === 'В производстве' &&
                'tableview_requests__row--status_in_production') ||
              (request.status === 'Готово' &&
                'tableview_requests__row--status_ready') ||
              (request.status === 'Частично готово' &&
                'tableview_requests__row--status_ready') ||
              (request.status === 'Отгружено' &&
                'tableview_requests__row--status_shipped') ||
              (request.status === 'Приоритет' &&
                'tableview_requests__row--status_priority') ||
              (request.status === 'Завершено' &&
                'tableview_requests__row--status_completed'))
          }
        >
          <div className="tableview_requests__col">
            {formatDateString(request.date)}
          </div>
          <div className="tableview_requests__col">
            {request.requestProducts
              .sort((a, b) => {
                if (a.name < b.name) {
                  return -1
                }
                if (a.name > b.name) {
                  return 1
                }
                return 0
              })
              .map((item, index) => {
                return (
                  <div
                    className="tableview_requests__sub_row"
                    style={{
                      height: `calc(${100 / request.requestProducts.length}%)`,
                    }}
                  >
                    <div className="tableview_requests__sub_col">
                      {item.name}
                    </div>
                    <div className="tableview_requests__sub_col">
                      {item.packaging}
                    </div>
                    <div className="tableview_requests__sub_col">
                      {item.quantity}
                    </div>
                  </div>
                )
              })}
          </div>
          <div className="tableview_requests__col">{request.codeWord}</div>
          <div className="tableview_requests__col">{request.responsible}</div>
          <div className="tableview_requests__col">
            <select
              id={request.id}
              className="tableview_requests__status_select"
              value={request.status}
              onChange={handleStatusChange}
            >
              {requestStatuses.map((status) => {
                if (props.userHasAccess(status.access)) {
                  return <option>{status.name}</option>
                } else {
                  return (
                    <option style={{ display: `none` }}>{status.name}</option>
                  )
                }
              })}
            </select>
          </div>
          <div className="tableview_requests__actions">
            <Link
              to={'/requests/view/' + request.id}
              className="tableview_requests__action"
            >
              Просмотр
            </Link>
            {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && (
              <Link
                to={'/requests/edit/' + request.id}
                className="tableview_requests__action"
              >
                Редактировать
              </Link>
            )}
            {props.userHasAccess(['ROLE_ADMIN']) && (
              <div
                data-id={request.id}
                className="tableview_requests__action"
                onClick={props.deleteItem}
              >
                Удалить
              </div>
            )}
            {props.userHasAccess(['ROLE_ADMIN']) && (
              <div
                data-id={request.id}
                className="tableview_requests__action"
                onClick={() => props.transferRequest(request.id)}
              >
                Перенести
              </div>
            )}
            {props.userHasAccess(['ROLE_ADMIN']) && (
              <div
                data-id={request.id}
                className="tableview_requests__action"
                onClick={() => props.copyRequest(request.id)}
              >
                Копировать
              </div>
            )}
          </div>
        </div>
      ))} */}
    </div>
  )
}

export default TableView
