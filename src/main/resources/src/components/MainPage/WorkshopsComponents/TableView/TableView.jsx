import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import viewSVG from '../../../../../../../../assets/tableview/view.svg'
import editSVG from '../../../../../../../../assets/tableview/edit.svg'
import printSVG from '../../../../../../../../assets/tableview/print.svg'
import deleteSVG from '../../../../../../../../assets/tableview/delete.svg'
import downloadSVG from '../../../../../../../../assets/download.svg'
import copySVG from '../../../../../../../../assets/tableview/copy.svg'
import transferSVG from '../../../../../../../../assets/tableview/transfer.svg'
import TruckSVG from '../../../../../../../../assets/sidemenu/truck.inline.svg'
import './TableView.scss'
import pdfMake from 'pdfmake'
import html2canvas from 'html2canvas'

import {
  editRequestStatus,
  editProductStatusToRequest,
  editRequest,
} from '../../../../utils/RequestsAPI/Requests.jsx'

import {
  formatDateString,
  addSpaceDelimiter,
  createLabelForProduct,
  dateDiffInDays,
} from '../../../../utils/functions.jsx'
import {
  requestStatuses,
  productsStatuses,
  workshops,
} from '../workshopVariables.js'
import { getRequestPdfText } from '../../../../utils/pdfFunctions.jsx'
import LabelPrint from '../LabelPrint/LabelPrint.jsx'
import PlaceholderLoading from '../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'

const TableView = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState({
    name: '',
    link: '',
  })
  const [labelIsHidden, setLabelIsHidden] = useState(true)
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

  const saveCanvasAsImage = (canvas, fileName) => {
    canvas.toBlob(
      function (blob) {
        // получаем содержимое как JPEG Blob
        let link = document.createElement('a')
        link.download = fileName
        link.href = URL.createObjectURL(blob)
        link.click()
        // удаляем ссылку на Blo
        URL.revokeObjectURL(link.href)
      },
      'image/jpeg',
      1,
    )
  }

  const downloadImage = async (product) => {
    setSelectedProduct({
      ...product,
    })
    setLabelIsHidden(false)
    const element = document.getElementById('label')
    setTimeout(async () => {
      await html2canvas(element, {
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        scrollY: 0,
        scrollX: 0,
      }).then((canvas) => {
        setLabelIsHidden(true)
        // saveCanvas(canvas)
        saveCanvasAsImage(
          canvas,
          `${formatDateString(new Date())}_${product.name}.jpeg`,
        )
      })
    }, 1500)
  }

  const handleStatusChange = (event) => {
    const status = event.target.value
    const id = event.target.getAttribute('id')
    const index = event.target.getAttribute('index')
    const sum = Number.parseFloat(event.target.getAttribute('sum'))

    //проверяем, указана ли положительная сумма
    if (status === 'Завершено') {
      if (
        sum !== 0 &&
        sum !== null &&
        !Number.isNaN(sum) &&
        sum !== undefined
      ) {
        return changeStatus(status, id)
      } else {
        return alert('Введите сумму заказа для изменения статуса!')
      }
    }

    //Если статус-отгружено, тогда ставим дату отгрузки - сегодняшнее число
    if (status === 'Отгружено') {
      const selectedItem = requests.find(
        (item) => item.id === Number.parseInt(id),
      )
      console.log(selectedItem)
      if (selectedItem) {
        return editRequest(
          {
            ...selectedItem,
            status: status,
            shippingDate: new Date(),
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
    }

    //default изменение, если пред. не совпало
    return changeStatus(status, id)
  }

  const changeStatus = (status, id) => {
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

  useEffect(() => {
    if (props.data) {
      setRequests(props.data)
      setIsLoading(false)
    }
  }, [
    props.data,
    requests,
    props.isLoading,
    props.requestsByDate,
    selectedProduct,
  ])

  const printRequest = (request) => {
    let dd = getRequestPdfText(
      request.date,
      request.requestProducts,
      request.client ? request.client.name : request.codeWord,
      workshops[props.workshopName].name,
      request.id,
    )
    pdfMake.createPdf(dd).print()
  }

  const printRequests = (requests, displayColumns) => {
    return requests.map((request, index) => (
      <div
        className={
          'main-window__list-item main-window__list-item--' +
          requestStatuses.find(
            (item) =>
              item.name === request.status || item.oldName === request.status,
          )?.className +
          ' ' +
          (request?.[workshopsFuncs[props.workshopName].productsName]?.length >
          1
            ? 'main-window__list-item--multiple-items'
            : '') +
          (request.factory === undefined ||
          request.factory === 'requests' ||
          request.factory === null
            ? ' main-window__list-item--message main-window__list-item--warning'
            : '')
        }
        data-msg="Напоминание! Заявка не перенесена в один из цехов"
        key={request.id}
        id={request.id}
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
                    <div className="main-window__mobile-text">Название:</div>
                    {product.name}
                  </span>
                  <span>
                    <div className="main-window__mobile-text">Упаковка:</div>
                    {product.packaging}
                  </span>
                  <span>
                    <div className="main-window__mobile-text">Кол-во:</div>
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
                    <div className="main-window__mobile-text">Статус:</div>
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
                  <span
                    onClick={() => downloadImage(product)}
                    title="Скачать этикетку"
                  >
                    <div className="main-window__mobile-text">
                      Скачать этикетку
                    </div>
                    <img className="main-window__img" src={downloadSVG} />
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
              sum={request.sum}
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
                    <option style={{ display: `none` }}>{status.name}</option>
                  )
                }
              })}
            </select>
          </span>
        )}
        {displayColumns['date-shipping'].visible && (
          <span className="requests__column--date-shipping">
            <div className="main-window__mobile-text">Дата отгрузки:</div>
            {request.status === 'Отгружено' ||
            request.status === 'Завершено' ? (
              <div
                className={`main-window__reminder ${
                  Math.abs(
                    dateDiffInDays(
                      new Date(request.date),
                      new Date(request.shippingDate),
                    ),
                  ) > 7
                    ? ''
                    : 'main-window__reminder--positive'
                }`}
              >
                {Math.abs(
                  dateDiffInDays(
                    new Date(request.date),
                    new Date(request.shippingDate),
                  ),
                ) > 7 ? (
                  <div>&#x2713;</div>
                ) : (
                  <div>&#x2713;</div>
                )}
                <div>
                  {formatDateString(
                    request.shippingDate === null ||
                      request.shippingDate === undefined
                      ? new Date()
                      : request.shippingDate,
                  )}
                </div>
              </div>
            ) : new Date(request.shippingDate) < new Date() ? (
              <div className="main-window__reminder main-window__reminder--info">
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
          <span title={request.comment} className="requests__column--comment">
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
              onClick={() => printRequest(request)}
            >
              <img className="main-window__img" src={printSVG} />
            </div>
          )}
          {request.status !== 'Завершено' && request.status !== 'Отгружено' ? (
            <Link
              to={
                props.workshopName === 'requests'
                  ? `/requests/ship/${request.id}`
                  : `/${props.workshopName}/workshop-${props.workshopName}/ship/${request.id}`
              }
              className="main-window__action"
              title="Отгрузить продукцию"
            >
              <TruckSVG className="main-window__img" />
            </Link>
          ) : null}
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
    ))
  }

  return (
    <div className="tableview-workshops">
      <div className="main-window">
        <LabelPrint
          name={selectedProduct.name}
          link={selectedProduct.link}
          isHidden={labelIsHidden}
        />
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <div className="main-window__list-col">
              <div className="main-window__list-col-row">
                <span>Продукция</span>
                <span></span>
                <span></span>
              </div>
            </div>
            <span className="requests__column--client">Кодовое слово</span>
            <span className="requests__column--responsible">Ответственный</span>
            <span className="requests__column--status">Статус заявки</span>
            <span className="requests__column--date-shipping">
              Дата отгрузки
            </span>
            <span className="requests__column--comment">Комментарий</span>
            <div className="main-window__actions">Действия</div>
          </div>
          {props.isLoading && (
            <PlaceholderLoading
              itemClassName="main-window__list-item"
              minHeight="3rem"
              items={15}
            />
          )}
          {props.dates.map((date) => {
            let filteredReqs = requests.filter(
              (request) =>
                formatDateString(new Date(request.date)) ===
                formatDateString(new Date(date)),
            )

            if (filteredReqs.length > 0) {
              return (
                <>
                  <div className="main-window__table-date">
                    {formatDateString(new Date(date))}
                  </div>
                  {printRequests(filteredReqs, {
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
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default TableView
