import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import viewSVG from '../../../../../../../../assets/tableview/view.svg'
import editSVG from '../../../../../../../../assets/tableview/edit.svg'
import deleteSVG from '../../../../../../../../assets/tableview/delete.svg'
import copySVG from '../../../../../../../../assets/tableview/copy.svg'
import transferSVG from '../../../../../../../../assets/tableview/transfer.svg'
import './TableView.scss'

import {
  editRequestStatus,
  editProductStatusToRequest,
} from '../../../../utils/RequestsAPI/Requests.jsx'
import {
  editProductStatusToRequestLEMZ,
  editRequestLEMZStatus,
} from '../../../../utils/RequestsAPI/Workshop/LEMZ.jsx'

import {
  formatDateString,
  addSpaceDelimiter,
} from '../../../../utils/functions.jsx'
import TableDataLoading from '../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx'
import {
  editRequestLepsariStatus,
  editProductStatusToRequestLepsari,
} from '../../../../utils/RequestsAPI/Workshop/Lepsari.jsx'
import { requestStatuses, productsStatuses } from '../workshopVariables.js'

const TableView = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState({
    curSort: 'date',
    date: 'desc',
  })
  const [requests, setRequests] = useState([])

  // const [workshopsFuncs, setWorkshopsFuncs] = useState({
  //   requests: {
  //     productsName: 'requestProducts',
  //     request: (body, id) => editRequestStatus(body, id),
  //     product: (body, id) => editProductStatusToRequest(body, id),
  //   },
  //   lemz: {
  //     productsName: 'lemzProducts',
  //     request: (body, id) => editRequestLEMZStatus(body, id),
  //     product: (body, id) => editProductStatusToRequestLEMZ(body, id),
  //   },
  //   lepsari: {
  //     productsName: 'lepsariProducts',
  //     request: (body, id) => editRequestLepsariStatus(body, id),
  //     product: (body, id) => editProductStatusToRequestLepsari(body, id),
  //   },
  // })

  const [workshopsFuncs, setWorkshopsFuncs] = useState({
    requests: {
      productsName: 'requestProducts',
      request: (body, id) => editRequestStatus(body, id),
      product: (body, id) => editProductStatusToRequest(body, id),
    },
    lemz: {
      productsName: 'requestProducts',
      request: (body, id) => editRequestStatus(body, id),
      product: (body, id) => editProductStatusToRequest(body, id),
    },
    lepsari: {
      productsName: 'requestProducts',
      request: (body, id) => editRequestStatus(body, id),
      product: (body, id) => editProductStatusToRequest(body, id),
    },
  })

  const changeSortOrder = (event) => {
    const name = event.target.value.split(' ')[0]
    const order = event.target.value.split(' ')[1]
    setSortOrder({
      curSort: name,
      [name]: order,
    })
  }

  const handleStatusChange = (event) => {
    const status = event.target.value
    const id = event.target.getAttribute('id')
    return workshopsFuncs[props.workshopName]
      .request(
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

  const handleProductStatusChange = (productId, status) => {
    workshopsFuncs[props.workshopName]
      .product(
        {
          status: status,
        },
        productId,
      )
      .then(() => {
        props.loadData()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const searchQuery = (data) => {
    const query = props.searchQuery.toLowerCase()
    return data.filter((item) => {
      return item[workshopsFuncs[props.workshopName].productsName].length !==
        0 &&
        item[workshopsFuncs[props.workshopName].productsName][0].name !== null
        ? item[workshopsFuncs[props.workshopName].productsName][0].name
            .toLowerCase()
            .includes(query) ||
            item.id.toString().includes(query) ||
            formatDateString(item.date).includes(query) ||
            item.codeWord.toLowerCase().includes(query) ||
            item.status.toLowerCase().includes(query) ||
            item.responsible.toLowerCase().includes(query) ||
            formatDateString(item.shippingDate).includes(query)
        : item.status.toLowerCase().includes(query)
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
    <div className="tableview-workshops">
      <div className="main-window">
        <div className="main-window__sort-panel">
          <span>Сортировка: </span>
          <select onChange={changeSortOrder}>
            <option value="date desc">По дате (убыв.)</option>
            <option value="date asc">По дате (возр.)</option>
            <option value="codeWord asc">По клиенту (А-Я)</option>
            <option value="codeWord desc">По клиенту (Я-А)</option>
            <option value="shippingDate desc">По дате отгрузки (убыв.)</option>
            <option value="shippingDate asc">По дате отгрузки (возр.)</option>
          </select>
        </div>
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <span>Дата</span>
            <div className="main-window__list-col">
              <div className="main-window__list-col-row">
                <span>Продукция</span>
                <span></span>
                <span></span>
              </div>
            </div>
            <span>Кодовое слово</span>
            <span>Ответственный</span>
            <span>Статус заявки</span>
            <span>Дата отгрузки</span>
            <span>Комментарий</span>
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
                  requestStatuses.find(
                    (item) =>
                      item.name === request.status ||
                      item.oldName === request.status,
                  )?.className +
                  ' ' +
                  (request?.[workshopsFuncs[props.workshopName].productsName]
                    ?.length > 1
                    ? 'main-window__list-item--multiple-items'
                    : '')
                }
                onClick={(event) => {
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
                key={request.id}
              >
                <span>
                  <div className="main-window__mobile-text">Дата:</div>
                  {formatDateString(request.date)}
                </span>
                <div className="main-window__list-col">
                  <div className="main-window__list-col-row main-window__list-col-row--header">
                    <span>Название</span>
                    <span>Упаковка</span>
                    <span>Кол-во</span>
                    <span>Статус</span>
                  </div>
                  {request?.[workshopsFuncs[props.workshopName].productsName]
                    .sort((a, b) => {
                      if (a.name < b.name) {
                        return -1
                      }
                      if (a.name > b.name) {
                        return 1
                      }
                      return 0
                    })
                    .map((product) => {
                      return (
                        <div
                          className={`main-window__list-col-row main-window__list-item--${
                            productsStatuses.find(
                              (item) =>
                                item.className === product.status ||
                                item.oldName === product.status,
                            )?.className
                          }`}
                        >
                          <span>
                            <div className="main-window__mobile-text">
                              Название:
                            </div>
                            {product.name}
                          </span>
                          <span>
                            <div className="main-window__mobile-text">
                              Упаковка:
                            </div>
                            {product.packaging}
                          </span>
                          <span>
                            <div className="main-window__mobile-text">
                              Кол-во:
                            </div>
                            {addSpaceDelimiter(product.quantity)}
                          </span>
                          <span
                            className={
                              'main-window__list-item--' +
                              productsStatuses.find(
                                (item) =>
                                  item.className === product.status ||
                                  item.oldName === product.status,
                              )?.className
                            }
                          >
                            <div className="main-window__mobile-text">
                              Статус:
                            </div>
                            <select
                              // id={product.id}
                              className="main-window__status_select"
                              value={product.status}
                              onChange={(event) =>
                                handleProductStatusChange(
                                  product.id,
                                  event.target.value,
                                )
                              }
                            >
                              {productsStatuses.map((status) => (
                                <option
                                  value={
                                    status.oldName === product.status
                                      ? status.oldName
                                      : status.className
                                  }
                                >
                                  {status.name}
                                </option>
                              ))}
                            </select>
                          </span>
                        </div>
                      )
                    })}
                </div>
                <span>
                  <div className="main-window__mobile-text">Кодовое слово:</div>
                  {request.codeWord}
                </span>
                <span>
                  <div className="main-window__mobile-text">Ответственный:</div>
                  {request.responsible}
                </span>
                <span
                  className={
                    'main-window__list-item--' +
                    requestStatuses.find(
                      (item) =>
                        item.name === request.status ||
                        item.oldName === request.status,
                    )?.className
                  }
                >
                  <div className="main-window__mobile-text">Статус заявки:</div>
                  <select
                    id={request.id}
                    className="main-window__status_select"
                    value={request.status}
                    onChange={handleStatusChange}
                  >
                    {requestStatuses.map((status) => {
                      if (props.userHasAccess(status.access)) {
                        return (
                          <option
                            value={
                              status.oldName === request.status
                                ? status.oldName
                                : status.name
                            }
                          >
                            {status.name}
                          </option>
                        )
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
                <span>
                  <div className="main-window__mobile-text">Дата отгрузки:</div>
                  {new Date(request.shippingDate) < new Date() &&
                  request.status !== 'Завершено' ? (
                    <div className="main-window__reminder">
                      <div>!</div>
                      <div>{formatDateString(request.shippingDate)}</div>
                    </div>
                  ) : (
                    <div className="main-window__date">
                      {formatDateString(request.shippingDate || new Date())}
                    </div>
                  )}
                </span>
                <span title={request.comment}>
                  <div className="main-window__mobile-text">Комментарий:</div>
                  {request.comment}
                </span>
                <div className="main-window__actions">
                  <Link
                    to={
                      props.workshopName === 'requests'
                        ? `/requests/view/${request.id}`
                        : `/${props.workshopName}/workshop-${props.workshopName}/view/${request.id}`
                    }
                    className="main-window__action"
                    title="Просмотр заявки"
                  >
                    <img className="main-window__img" src={viewSVG} />
                  </Link>
                  {props.userHasAccess([
                    'ROLE_ADMIN',
                    'ROLE_MANAGER',
                    'ROLE_WORKSHOP',
                  ]) && (
                    <Link
                      to={
                        props.workshopName === 'requests'
                          ? `/requests/edit/${request.id}`
                          : `/${props.workshopName}/workshop-${props.workshopName}/edit/${request.id}`
                      }
                      className="main-window__action"
                      title="Редактирование заявки"
                    >
                      <img className="main-window__img" src={editSVG} />
                    </Link>
                  )}
                  {props.userHasAccess(['ROLE_ADMIN']) && (
                    <div
                      data-id={request.id}
                      className="main-window__action"
                      title="Удаление заявки"
                      onClick={(event) => props.deleteItem(event)}
                    >
                      <img className="main-window__img" src={deleteSVG} />
                    </div>
                  )}
                  {props.transferRequest &&
                    props.userHasAccess(['ROLE_ADMIN']) && (
                      <div
                        data-id={request.id}
                        className="main-window__action"
                        title="Перенос заявки"
                        onClick={(event) => {
                          event.preventDefault()
                          props.transferRequest(request.id)
                        }}
                      >
                        <img className="main-window__img" src={transferSVG} />
                      </div>
                    )}
                  {props.copyRequest && props.userHasAccess(['ROLE_ADMIN']) && (
                    <div
                      data-id={request.id}
                      className="main-window__action"
                      title="Копирование заявки"
                      onClick={() => props.copyRequest(request.id)}
                    >
                      <img className="main-window__img" src={copySVG} />
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TableView
