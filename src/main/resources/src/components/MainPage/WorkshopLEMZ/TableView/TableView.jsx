import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import sortIcon from '../../../../../../../../assets/tableview/sort_icon.png'
import './TableView.scss'
import {
  editRequestLEMZStatus,
  editProductStatusToRequestLEMZ,
} from '../../../../utils/RequestsAPI/Workshop/LEMZ.jsx'
import { formatDateString } from '../../../../utils/functions.jsx'
import TableDataLoading from '../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx'

const TableView = (props) => {
  const [curPage, setCurPage] = useState('Открытые')
  const [isLoading, setIsLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState({
    curSort: 'date',
    date: 'desc',
  })
  //   const [requestStatuses, setRequestStatutes] = useState([
  //     {
  //       name: 'Проблема/Материалы',
  //       oldName: 'Проблема-материалы',
  //       access: ['ROLE_ADMIN', 'ROLE_WORKSHOP'],
  //     },
  //     {
  //       name: 'Завершено',
  //       access: ['ROLE_ADMIN'],
  //     },
  //     {
  //       name: 'Отгружено',
  //       access: ['ROLE_ADMIN', 'ROLE_WORKSHOP'],
  //     },
  //     {
  //       name: 'Готово к отгрузке',
  //       oldName: 'Готово',
  //       access: ['ROLE_ADMIN', 'ROLE_MANAGER'],
  //     },
  //     {
  //       name: 'В производстве',
  //       access: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP'],
  //     },
  //     {
  //       name: 'Ожидание',
  //       access: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP'],
  //     },
  //   ])
  const [requestStatuses, setRequestStatutes] = useState([
    {
      name: 'Проблема/Материалы',
      oldName: 'Проблема-материалы',
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
      name: 'Готово к отгрузке',
      oldName: 'Готово',
      className: 'ready',
      access: ['ROLE_ADMIN'],
    },
    {
      name: 'В производстве',
      className: 'in-production',
      access: [],
    },
    {
      name: 'Ожидание',
      className: 'waiting',
      access: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP'],
    },
  ])

  const changeSortOrder = (event) => {
    const name = event.target.getAttribute('name')
    setSortOrder({
      curSort: name,
      [name]: sortOrder[name] === 'desc' ? 'asc' : 'desc',
    })
  }

  const searchQuery = (data) => {
    const query = props.searchQuery.toLowerCase()
    //Временно
    return data
      .filter((item) => {
        if (curPage === 'Открытые') {
          if (item.status !== 'Завершено') return true
        } else {
          if (item.status === 'Завершено') return true
        }
      })
      .filter((item) => {
        return item.lemzProducts.length !== 0 &&
          item.lemzProducts[0].name !== null
          ? item.lemzProducts[0].name.toLowerCase().includes(query) ||
              item.id.toString().includes(query) ||
              formatDateString(item.date).includes(query) ||
              item.codeWord.toLowerCase().includes(query) ||
              item.status.toLowerCase().includes(query) ||
              item.responsible.toLowerCase().includes(query) ||
              formatDateString(item.shippingDate).includes(query)
          : item.status.toLowerCase().includes(query)
      })
    // return data.filter(item => {
    //     return (
    //         (item.lemzProducts.length !== 0 && item.lemzProducts[0].name !== null)
    //             ? (
    //                 item.lemzProducts[0].name.toLowerCase().includes(query) ||
    //                 item.id.toString().includes(query) ||
    //                 formatDateString(item.date).includes(query) ||
    //                 item.codeWord.toLowerCase().includes(query) ||
    //                 item.status.toLowerCase().includes(query) ||
    //                 item.responsible.toLowerCase().includes(query) ||
    //                 formatDateString(item.shippingDate).includes(query)
    //             )
    //             : item.status.toLowerCase().includes(query)
    //     )
    // })
  }

  const handleStatusChange = (event) => {
    const status = event.target.value
    const id = event.target.getAttribute('id')
    editRequestLEMZStatus(
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

  const handleProductStatusChange = (event) => {
    const status = event.target.value
    const id = event.target.getAttribute('id')
    editProductStatusToRequestLEMZ(
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
    // return searchQuery(data).sort((a, b) => {

    //     if ((a[sortOrder.curSort] < b[sortOrder.curSort]) & (a.status === "Завершено" || b.status === "Завершено") === false) {
    //         return (sortOrder[sortOrder.curSort] === "desc" ? 1 : -1);
    //     }
    //     else if (a.status === "Завершено") {
    //         return 1;
    //     }
    //     else if (b.status === "Завершено") {
    //         return -1
    //     }

    //     if (a[sortOrder.curSort] > b[sortOrder.curSort] & (a.status === "Завершено" || b.status === "Завершено") === false) {
    //         return (sortOrder[sortOrder.curSort] === "desc" ? -1 : 1);
    //     }
    //     else if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
    //         return 1;
    //     }
    //     return 0;
    // });
  }

  useEffect(() => {
    props.data.length > 0 && setIsLoading(false)
  }, [props.data])

  return (
    <div className="tableview_requests_LEMZ">
      <div className="tableview_requests_LEMZ__menu">
        <div
          className={
            curPage === 'Открытые'
              ? 'tableview_requests_LEMZ__item--active tableview_requests_LEMZ__item'
              : 'tableview_requests_LEMZ__item'
          }
          onClick={() => setCurPage('Открытые')}
        >
          Открытые
        </div>
        <div
          className={
            curPage === 'Завершено'
              ? 'tableview_requests_LEMZ__item--active tableview_requests_LEMZ__item'
              : 'tableview_requests_LEMZ__item'
          }
          onClick={() => setCurPage('Завершено')}
        >
          Завершено
        </div>
      </div>
      <div className="tableview_requests_LEMZ__row tableview_requests_LEMZ__row--header">
        {/* <div className="tableview_requests_LEMZ__col">
                    <span>ID</span>
                    <img name="id" className="tableview_requests_LEMZ__img" onClick={changeSortOrder} src={sortIcon} />
                </div> */}
        <div className="tableview_requests_LEMZ__col">
          <span>Дата</span>
          <img
            name="date"
            className="tableview_requests_LEMZ__img"
            onClick={changeSortOrder}
            src={sortIcon}
          />
        </div>
        <div className="tableview_requests_LEMZ__col">Продукция</div>
        <div className="tableview_requests_LEMZ__col">Фасовка</div>
        <div className="tableview_requests_LEMZ__col">Количество</div>
        <div className="tableview_requests_LEMZ__col">Кодовое слово</div>
        <div className="tableview_requests_LEMZ__col">Ответственный</div>
        <div className="tableview_requests_LEMZ__col">Статус</div>
        <div className="tableview_requests_LEMZ__col">
          <span>Дата отгрузки</span>
          <img
            name="shippingDate"
            className="tableview_requests_LEMZ__img"
            onClick={changeSortOrder}
            src={sortIcon}
            alt=""
          />
        </div>
        <div className="tableview_requests_LEMZ__col">Комментарий</div>
        <div className="tableview_requests_LEMZ__col">Действия</div>
      </div>
      {isLoading && (
        <TableDataLoading
          minHeight="50px"
          className="tableview_requests_LEMZ__row tableview_requests_LEMZ__row--even"
        />
      )}
      {sortRequests(props.data).map((request, request_id) => (
        <div
          key={request_id}
          className={
            'tableview_requests_LEMZ__row tableview_requests_LEMZ__row--status_' +
            requestStatuses.find((item) => {
              return (
                item.name === request.status || item.oldName === request.status
              )
            })?.className
          }
          style={{
            'min-height': `calc((2rem * (${request.lemzProducts.length + 1})))`,
          }}
        >
          {/* <div className="tableview_requests_LEMZ__col">{request.id}</div> */}
          <div className="tableview_requests_LEMZ__col">
            {formatDateString(request.date)}
          </div>
          <div className="tableview_requests_LEMZ__col">
            <div
              className="tableview_requests_LEMZ__sub_row"
              style={{ height: `calc(${100 / request.lemzProducts.length}%)` }}
            >
              <div className="tableview_requests_LEMZ__sub_col">
                {request.codeWord + ' - ' + request.lemzProducts[0].name}
              </div>
              <div className="tableview_requests_LEMZ__sub_col"></div>
              <div className="tableview_requests_LEMZ__sub_col"></div>
            </div>
            {request.lemzProducts
              .sort((a, b) => {
                if (a.name < b.name) {
                  return -1
                }
                if (a.name > b.name) {
                  return 1
                }
                if (a.name === b.name && a.id < b.id) {
                  return -1
                }
                if (a.name === b.name && a.id > b.id) {
                  return 1
                }
                return 0
              })
              .map((item, index) => {
                return (
                  <div
                    className={
                      'tableview_requests_LEMZ__sub_row tableview_requests_LEMZ__row--status-product--' +
                      (item.status ? item.status : 'production')
                    }
                    style={{
                      height: `calc(${100 / request.lemzProducts.length}%)`,
                    }}
                  >
                    <div className="tableview_requests_LEMZ__sub_col">
                      {item.name}
                    </div>
                    <div className="tableview_requests_LEMZ__sub_col">
                      {item.packaging}
                    </div>
                    <div className="tableview_requests_LEMZ__sub_col">
                      {item.quantity}
                    </div>
                  </div>
                )
              })}
          </div>
          <div className="tableview_requests_LEMZ__col">{request.codeWord}</div>
          <div className="tableview_requests_LEMZ__col">
            {request.responsible}
          </div>
          <div className="tableview_requests_LEMZ__col">
            {/* <select
                            id={request.id}
                            className="tableview_requests_LEMZ__status_select"
                            defaultValue={request.status}
                            onChange={handleStatusChange}
                        >
                            <option>Приоритет</option>
                            <option>Проблема</option>
                            <option>Материалы</option>
                            <option>Ожидание</option>
                            <option>В производстве</option>
                            <option>Готово</option>
                            <option>Отгружено</option>
                            <option>Частично готово</option>
                            <option>Завершено</option>
                        </select> */}
            <div
              className="tableview_requests_LEMZ__sub_row"
              style={{ height: `calc(${100 / request.lemzProducts.length}%)` }}
            >
              <div className="tableview_requests_LEMZ__sub_col">
                <select
                  id={request.id}
                  className="tableview_requests_LEMZ__status_select"
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
              </div>
            </div>
            {request.lemzProducts.map((item, index) => {
              return (
                <div
                  className="tableview_requests_LEMZ__sub_row"
                  style={{
                    height: `calc(${100 / request.lemzProducts.length}%)`,
                  }}
                >
                  <div className="tableview_requests_LEMZ__sub_col">
                    <select
                      id={item.id}
                      className="tableview_requests_LEMZ__status_select"
                      value={item.status}
                      onChange={handleProductStatusChange}
                    >
                      <option value="production">В работе</option>
                      <option value="completed">Завершено</option>
                      <option value="defect">Брак</option>
                    </select>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="tableview_requests_LEMZ__col">
            {request.shippingDate && formatDateString(request.shippingDate)}
          </div>
          <div className="tableview_requests_LEMZ__col">{request.comment}</div>
          <div className="tableview_requests_LEMZ__actions">
            <Link
              to={'/lemz/workshop-lemz/view/' + request.id}
              className="tableview_requests_LEMZ__action"
            >
              Просмотр
            </Link>
            {props.userHasAccess([
              'ROLE_ADMIN',
              'ROLE_MANAGER',
              'ROLE_WORKSHOP',
            ]) && (
              <Link
                to={'/lemz/workshop-lemz/edit/' + request.id}
                className="tableview_requests_LEMZ__action"
              >
                Редактировать
              </Link>
            )}
            {props.userHasAccess(['ROLE_ADMIN']) && (
              <div
                data-id={request.id}
                className="tableview_requests_LEMZ__action"
                onClick={props.deleteItem}
              >
                Удалить
              </div>
            )}
            {props.userHasAccess(['ROLE_ADMIN']) && (
              <div
                data-id={request.id}
                className="tableview_requests_LEMZ__action"
                onClick={() => props.copyRequest(request.id)}
              >
                Копировать
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TableView
