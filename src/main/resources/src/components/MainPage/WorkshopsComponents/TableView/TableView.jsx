import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import viewSVG from '../../../../../../../../assets/tableview/view.svg'
import editSVG from '../../../../../../../../assets/tableview/edit.svg'
import printSVG from '../../../../../../../../assets/tableview/print.svg'
import deleteSVG from '../../../../../../../../assets/tableview/delete.svg'
import copySVG from '../../../../../../../../assets/tableview/copy.svg'
import transferSVG from '../../../../../../../../assets/tableview/transfer.svg'
import './TableView.scss'
import pdfMake from 'pdfmake'

import {
  editRequestStatus,
  editProductStatusToRequest,
} from '../../../../utils/RequestsAPI/Requests.jsx'

import {
  formatDateString,
  addSpaceDelimiter,
  createLabelForProduct,
} from '../../../../utils/functions.jsx'
import TableDataLoading from '../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx'
import {
  requestStatuses,
  productsStatuses,
  workshops,
} from '../workshopVariables.js'
import { getRequestPdfText } from '../../../../utils/pdfFunctions.jsx'

const TableView = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState({
    curSort: 'date',
    date: 'desc',
  })
  const [requests, setRequests] = useState([])

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
    const index = event.target.getAttribute('index')
    console.log(status)
    if (
      (props.data[index].sum !== 0 &&
        props.data[index].sum !== null &&
        props.data[index].sum !== undefined &&
        status === 'Завершено') ||
      status !== 'Завершено'
    ) {
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
    } else {
      alert('Введите сумму заказа для изменения статуса!')
    }
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
  }, [props.data, requests, props.isLoading, props.requestsByDate])

  const printRequest = (index) => {
    let dd = getRequestPdfText(
      requests[index].date,
      requests[index].requestProducts,
      requests[index].codeWord,
      workshops[props.workshopName].name,
      requests[index].id,
    )
    pdfMake.createPdf(dd).print()
  }

  const printRequests = (requests, displayColumns) => {
    return (
      <>
        {sortRequests(requests).map((request, index) => (
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
                  : '') +
                (request.factory === undefined ||
                request.factory === 'requests' ||
                request.factory === null
                  ? ' main-window__list-item--message main-window__list-item--warning'
                  : '')
              }
              data-msg="Напоминание! Заявка не перенесена в один из цехов"
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
              style={{
                paddingBottom:
                  props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) &&
                  props.workshopName === 'requests'
                    ? '30px'
                    : '5px',
              }}
            >
              {displayColumns['date'].visible && (
                <span className="requests__column--date">
                  <div className="main-window__mobile-text">Дата:</div>
                  {formatDateString(request.date)}
                </span>
              )}
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
                        <span onClick={() => createLabelForProduct(product)}>
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
                          {`${addSpaceDelimiter(product.quantity)} шт.`}
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
              {displayColumns['client'].visible && (
                <span className="requests__column--client">
                  <div className="main-window__mobile-text">Кодовое слово:</div>
                  {request.client ? (
                    <Link
                      target="_blank"
                      className="main-window__link"
                      to={`/clients/view/${request.client.id}`}
                    >
                      {request.client.name}
                    </Link>
                  ) : (
                    request.codeWord
                  )}
                </span>
              )}
              {displayColumns['responsible'].visible && (
                <span className="requests__column--responsible">
                  <div className="main-window__mobile-text">Ответственный:</div>
                  {request.responsible}
                </span>
              )}
              {displayColumns['status'].visible && (
                <span
                  className={
                    'main-window__list-item--' +
                    requestStatuses.find(
                      (item) =>
                        item.name === request.status ||
                        item.oldName === request.status,
                    )?.className +
                    ' requests__column--status'
                  }
                >
                  <div className="main-window__mobile-text">Статус заявки:</div>
                  <select
                    id={request.id}
                    index={index}
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
              )}
              {displayColumns['date-shipping'].visible && (
                <span className="requests__column--date-shipping">
                  <div className="main-window__mobile-text">Дата отгрузки:</div>
                  {new Date(request.shippingDate) < new Date() &&
                  request.status !== 'Завершено' ? (
                    <div className="main-window__reminder">
                      <div>!</div>
                      <div>
                        {formatDateString(
                          request.shippingDate === null ||
                            request.shippingDate === undefined
                            ? new Date()
                            : request.shippingDate,
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="main-window__date">
                      {formatDateString(
                        request.shippingDate === null ||
                          request.shippingDate === undefined
                          ? new Date()
                          : request.shippingDate,
                      )}
                    </div>
                  )}
                </span>
              )}
              {displayColumns['comment'].visible && (
                <span
                  title={request.comment}
                  className="requests__column--comment"
                >
                  <div className="main-window__mobile-text">Комментарий:</div>
                  {request.comment}
                </span>
              )}
              {displayColumns['price'].visible &&
                props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && (
                  <span className="requests__column--price">
                    {/* <div className="main-window__mobile-text">Цена:</div> */}
                    {`Сумма заказа: ${
                      request.sum ? addSpaceDelimiter(request.sum) : 0
                    } руб.`}
                  </span>
                )}
              <div className="main-window__actions">
                {props.workshopName !== 'requests' && (
                  <div
                    className="main-window__action"
                    title="Печать заявки"
                    onClick={() => printRequest(index)}
                  >
                    <img className="main-window__img" src={printSVG} />
                  </div>
                )}
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
                {props.transferRequest && props.userHasAccess(['ROLE_ADMIN']) && (
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
      </>
    )
  }

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
          {props.isLoading && (
            <TableDataLoading
              minHeight="50px"
              className="main-window__list-item"
            />
          )}
          {false ? ( //Временно sortOrder.curSort === 'date'
            <>
              <div className="main-window__list-item main-window__list-item--header">
                {/* {displayColumns['date'].visible && (
                  <span className="requests__column--date">Дата</span>
                )} */}
                <div className="main-window__list-col">
                  <div className="main-window__list-col-row">
                    <span>Продукция</span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <span className="requests__column--client">Кодовое слово</span>
                <span className="requests__column--responsible">
                  Ответственный
                </span>
                <span className="requests__column--status">Статус заявки</span>
                <span className="requests__column--date-shipping">
                  Дата отгрузки
                </span>
                <span className="requests__column--comment">Комментарий</span>
                <div className="main-window__actions">Действия</div>
              </div>
              {Object.entries(props.requestsByDate)
                .sort((a, b) => {
                  a = new Date(a[0])
                  b = new Date(b[0])
                  if (a < b) {
                    return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1
                  }
                  if (a > b) {
                    return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1
                  }
                  return 0
                })
                .map((date) =>
                  date[1].length > 0 ? (
                    <>
                      <div className="main-window__table-date">
                        {formatDateString(date[0])}
                      </div>
                      {printRequests(date[1], {
                        date: {
                          visible: false,
                        },
                        client: {
                          visible: true,
                        },
                        responsible: {
                          visible: true,
                        },
                        status: {
                          visible: true,
                        },
                        'date-shipping': {
                          visible: true,
                        },
                        comment: {
                          visible: true,
                        },
                        price: {
                          visible: props.workshopName === 'requests',
                        },
                      })}
                    </>
                  ) : null,
                )}
            </>
          ) : (
            <>
              <div className="main-window__list-item main-window__list-item--header">
                <span className="requests__column--date">Дата</span>
                <div className="main-window__list-col">
                  <div className="main-window__list-col-row">
                    <span>Продукция</span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <span className="requests__column--client">Кодовое слово</span>
                <span className="requests__column--responsible">
                  Ответственный
                </span>
                <span className="requests__column--status">Статус заявки</span>
                <span className="requests__column--date-shipping">
                  Дата отгрузки
                </span>
                <span className="requests__column--comment">Комментарий</span>
                <div className="main-window__actions">Действия</div>
              </div>
              {printRequests(requests, {
                date: {
                  visible: true,
                },
                client: {
                  visible: true,
                },
                responsible: {
                  visible: true,
                },
                status: {
                  visible: true,
                },
                'date-shipping': {
                  visible: true,
                },
                comment: {
                  visible: true,
                },
                price: {
                  visible: props.workshopName === 'requests',
                },
              })}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TableView
