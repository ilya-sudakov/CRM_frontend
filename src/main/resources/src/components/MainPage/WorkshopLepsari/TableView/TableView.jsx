import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import sortIcon from '../../../../../../../../assets/tableview/sort_icon.png'
import './TableView.scss'
import {
  editRequestLepsariStatus,
  editProductStatusToRequestLepsari,
} from '../../../../utils/RequestsAPI/Workshop/Lepsari.jsx'
import {
  formatDateString,
  addSpaceDelimiter,
} from '../../../../utils/functions.jsx'
import TableDataLoading from '../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx'

const TableView = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState({
    curSort: 'date',
    date: 'desc',
  })
  // const [requestStatuses, setRequestStatutes] = useState([
  //     {
  //         name: 'Проблема-материалы',
  //         access: ['ROLE_ADMIN', 'ROLE_WORKSHOP']
  //     },
  //     {
  //         name: 'Завершено',
  //         access: ['ROLE_ADMIN']
  //     },
  //     {
  //         name: 'Отгружено',
  //         access: ['ROLE_ADMIN', 'ROLE_WORKSHOP']
  //     },
  //     {
  //         name: 'Готово',
  //         access: ['ROLE_ADMIN', 'ROLE_MANAGER']
  //     },
  //     {
  //         name: 'В производстве',
  //         access: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP']
  //     },
  //     {
  //         name: 'Ожидание',
  //         access: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP']
  //     }
  // ]);

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
      access: ['ROLE_ADMIN', 'ROLE_WORKSHOP'],
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
    {
      name: 'Приоритет',
      className: 'priority',
      access: ['ROLE_ADMIN'],
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
    return data.filter((item) => {
      return item.lepsariProducts.length !== 0 &&
        item.lepsariProducts[0].name !== null
        ? item.lepsariProducts[0].name.toLowerCase().includes(query) ||
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
    editRequestLepsariStatus(
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
    editProductStatusToRequestLepsari(
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
    // console.log(props.data);
    props.data.length > 0 && setIsLoading(false)
  }, [props.data])

  return (
    <div className="tableview_requests_lepsari">
      <div className="tableview_requests_lepsari__row tableview_requests_lepsari__row--header">
        {/* <div className="tableview_requests_lepsari__col">
                    <span>ID</span>
                    <img name="id" className="tableview_requests_lepsari__img" onClick={changeSortOrder} src={sortIcon} />
                </div> */}
        <div className="tableview_requests_lepsari__col">
          <span>Дата</span>
          <img
            name="date"
            className="tableview_requests_lepsari__img"
            onClick={changeSortOrder}
            src={sortIcon}
          />
        </div>
        <div className="tableview_requests_lepsari__col">Продукция</div>
        <div className="tableview_requests_lepsari__col">Фасовка</div>
        <div className="tableview_requests_lepsari__col">Количество</div>
        <div className="tableview_requests_lepsari__col">Кодовое слово</div>
        <div className="tableview_requests_lepsari__col">Ответственный</div>
        <div className="tableview_requests_lepsari__col">Статус</div>
        <div className="tableview_requests_lepsari__col">
          <span>Дата отгрузки</span>
          <img
            name="shippingDate"
            className="tableview_requests_lepsari__img"
            onClick={changeSortOrder}
            src={sortIcon}
            alt=""
          />
        </div>
        <div className="tableview_requests_lepsari__col">Комментарий</div>
        <div className="tableview_requests_lepsari__col">Действия</div>
      </div>
      {isLoading && (
        <TableDataLoading
          minHeight="50px"
          className="tableview_requests_lepsari__row tableview_requests_lepsari__row--even"
        />
      )}
      {sortRequests(props.data).map((request, request_id) => (
        <React.Fragment>
          <div
            key={request_id}
            className={
              'tableview_requests_lepsari__row tableview_requests_lepsari__row--status_' +
              requestStatuses.find((item) => {
                return (
                  item.name === request.status ||
                  item.oldName === request.status
                )
              })?.className
            }
            style={{
              'min-height': `calc((2rem * (${
                request.lepsariProducts.length + 1
              })))`,
            }}
          >
            {/* <div className="tableview_requests_lepsari__col">{request.id}</div> */}
            <div className="tableview_requests_lepsari__col">
              {formatDateString(request.date)}
            </div>
            <div className="tableview_requests_lepsari__col">
              <div
                className="tableview_requests_lepsari__sub_row"
                style={{
                  height: `calc(${100 / request.lepsariProducts.length}%)`,
                }}
              >
                {request.lepsariProducts.length > 0 && (
                  <div className="tableview_requests_lepsari__sub_col">
                    {request.codeWord + ' - ' + request.lepsariProducts[0].name}
                  </div>
                )}
                {request.lepsariProducts.length > 0 && (
                  <div className="tableview_requests_lepsari__sub_col"></div>
                )}
                {request.lepsariProducts.length > 0 && (
                  <div className="tableview_requests_lepsari__sub_col"></div>
                )}
              </div>
              {request.lepsariProducts.length > 0 &&
                request.lepsariProducts
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
                          'tableview_requests_lepsari__sub_row tableview_requests_lepsari__row--status-product--' +
                          (item.status ? item.status : 'production')
                        }
                        style={{
                          height: `calc(${
                            100 / (request.lepsariProducts.length + 1)
                          }%)`,
                        }}
                      >
                        <div className="tableview_requests_lepsari__sub_col">
                          {item.name}
                        </div>
                        <div className="tableview_requests_lepsari__sub_col">
                          {item.packaging}
                        </div>
                        <div className="tableview_requests_lepsari__sub_col">
                          {addSpaceDelimiter(item.quantity)}
                        </div>
                      </div>
                    )
                  })}
            </div>
            <div className="tableview_requests_lepsari__col">
              {request.codeWord}
            </div>
            <div className="tableview_requests_lepsari__col">
              {request.responsible}
            </div>
            <div className="tableview_requests_lepsari__col">
              {/* <select
                                id={request.id}
                                className="tableview_requests_lepsari__status_select"
                                defaultValue={request.status}
                                onChange={handleStatusChange}
                            >
                                <option>Приоритет</option>
                                <option>Проблема</option>
                                <option>Материалы</option>
                                <option>Ожидание</option>
                                <option>В производстве</option>
                                <option>Готово</option>
                                <option>Частично готово</option>
                                <option>Отгружено</option>
                                <option>Завершено</option>
                            </select> */}
              <div
                className="tableview_requests_lepsari__sub_row"
                style={{
                  height: `calc(${100 / request.lepsariProducts.length}%)`,
                }}
              >
                <div className="tableview_requests_lepsari__sub_col">
                  <select
                    id={request.id}
                    className="tableview_requests_lepsari__status_select"
                    value={request.status}
                    onChange={handleStatusChange}
                  >
                    {/* <option>Приоритет</option>
                                        <option>Проблема</option>
                                        <option>Материалы</option>
                                        <option>Ожидание</option>
                                        <option>В производстве</option>
                                        <option>Готово</option>
                                        <option>Частично готово</option>
                                        <option>Отгружено</option>
                                        <option>Завершено</option> */}
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
                </div>
              </div>
              {request.lepsariProducts.length > 0 &&
                request.lepsariProducts.map((item, index) => {
                  return (
                    <div
                      className={'tableview_requests_lepsari__sub_row'}
                      style={{
                        height: `calc(${
                          100 / (request.lepsariProducts.length + 1)
                        }%)`,
                      }}
                    >
                      <div className="tableview_requests_lepsari__sub_col">
                        <select
                          id={item.id}
                          className="tableview_requests_lepsari__status_select"
                          value={item.status}
                          onChange={handleProductStatusChange}
                        >
                          <option value="production">В работе</option>
                          <option value="completed">Завершено</option>
                          <option value="defect">Приоритет</option>
                        </select>
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className="tableview_requests_lepsari__col">
              {request.shippingDate && formatDateString(request.shippingDate)}
            </div>
            <div className="tableview_requests_lepsari__col">
              {request.comment}
            </div>
            <div className="tableview_requests_lepsari__actions">
              <Link
                to={'/lepsari/workshop-lepsari/view/' + request.id}
                className="tableview_requests_lepsari__action"
              >
                Просмотр
              </Link>
              {props.userHasAccess([
                'ROLE_ADMIN',
                'ROLE_MANAGER',
                'ROLE_WORKSHOP',
              ]) && (
                <Link
                  to={'/lepsari/workshop-lepsari/edit/' + request.id}
                  className="tableview_requests_lepsari__action"
                >
                  Редактировать
                </Link>
              )}
              {props.userHasAccess(['ROLE_ADMIN']) && (
                <div
                  data-id={request.id}
                  className="tableview_requests_lepsari__action"
                  onClick={props.deleteItem}
                >
                  Удалить
                </div>
              )}
              {props.userHasAccess(['ROLE_ADMIN']) && (
                <div
                  data-id={request.id}
                  className="tableview_requests_lepsari__action"
                  onClick={() => props.copyRequest(request.id)}
                >
                  Копировать
                </div>
              )}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default TableView
