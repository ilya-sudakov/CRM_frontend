import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  formatDateString,
  addSpaceDelimiter,
} from '../../../../../utils/functions.jsx'
import './TableView.scss'
import editSVG from '../../../../../../../../../assets/tableview/edit.svg'
import deleteSVG from '../../../../../../../../../assets/tableview/delete.svg'
import PlaceholderLoading from '../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'

const TableView = (props) => {
  const [sortOrder, setSortOrder] = useState({
    curSort: 'date',
    date: 'asc',
  })
  const [isLoading, setIsLoading] = useState(true)

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
    return data.filter(
      (item) =>
        item.cargo.toLowerCase().includes(query) ||
        formatDateString(item.date).includes(query) ||
        item.sender.toLowerCase().includes(query) ||
        item.recipient.toLowerCase().includes(query) ||
        item.driver.toLowerCase().includes(query) ||
        item.id.toString().includes(query),
    )
  }

  useEffect(() => {
    props.data.length > 0 && setIsLoading(false)
  }, [props.data])

  const sortTransportations = (data) => {
    return searchQuery(data).sort((a, b) => {
      if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === 'desc' ? -1 : 1
      }
      if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
        return sortOrder[sortOrder.curSort] === 'desc' ? 1 : -1
      }
      return 0
    })
  }

  return (
    <div className="tableview_transportation">
      <div className="main-window">
        <div className="main-window__sort-panel">
          <span>Сортировка: </span>
          <select onChange={changeSortOrder}>
            <option value="date asc">По дате</option>
          </select>
        </div>
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <span>Дата</span>
            <span>Товар</span>
            <span>Кол-во</span>
            <span>Откуда</span>
            <span>Куда</span>
            <span>Водитель</span>
            <div className="main-window__actions">Действия</div>
          </div>
          {props.isLoading && (
            <PlaceholderLoading
              itemClassName="main-window__list-item"
              minHeight="35px"
              items={15}
            />
          )}
          {sortTransportations(props.data).map(
            (transportation, transportation_id) => (
              <div key={transportation_id} className="main-window__list-item">
                <span>
                  <div className="main-window__mobile-text">Дата:</div>
                  {formatDateString(transportation.date)}
                </span>
                <span>
                  <div className="main-window__mobile-text">Товар:</div>
                  {transportation.cargo}
                </span>
                <span>
                  <div className="main-window__mobile-text">Кол-во:</div>
                  {addSpaceDelimiter(transportation.quantity)}
                </span>
                <span>
                  <div className="main-window__mobile-text">Откуда:</div>
                  {transportation.sender}
                </span>
                <span>
                  <div className="main-window__mobile-text">Куда:</div>
                  {transportation.recipient}
                </span>
                <span>
                  <div className="main-window__mobile-text">Водитель:</div>
                  {transportation.driver}
                </span>
                <div className="main-window__actions">
                  <Link
                    to={'/dispatcher/transportation/edit/' + transportation.id}
                    className="main-window__action"
                    title="Редактировать запись"
                  >
                    {/* Редактировать */}
                    <img className="main-window__img" src={editSVG} />
                  </Link>
                  {props.userHasAccess(['ROLE_ADMIN']) && (
                    <div
                      className="main-window__action"
                      onClick={() => props.deleteItem(transportation.id)}
                      title="Удалить запись"
                    >
                      {/* Удалить */}
                      <img className="main-window__img" src={deleteSVG} />
                    </div>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  )
}

export default TableView
