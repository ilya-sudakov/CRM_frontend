import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import sortIcon from '../../../../../../../../assets/tableview/sort_icon.png'
import editIcon from '../../../../../../../../assets/tableview/edit.svg'
import deleteIcon from '../../../../../../../../assets/tableview/delete.svg'
import './TableView.scss'
import { addSpaceDelimiter } from '../../../../utils/functions.jsx'

const TableView = (props) => {
  const [sortOrder, setSortOrder] = useState({
    curSort: 'number',
    date: 'asc',
  })

  const changeSortOrder = (event) => {
    const name = event.target.getAttribute('name')
    setSortOrder({
      curSort: name,
      [name]: sortOrder[name] === 'desc' ? 'asc' : 'desc',
    })
  }

  const searchQuery = (data) => {
    let re = /[.,\s]/gi
    const query = props.searchQuery.toLowerCase()
    return data.filter(
      (item) =>
        item.id.toString().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.quantity.toLowerCase().includes(query) ||
        item.comment.toLowerCase().includes(query) ||
        item.number.toString().toLowerCase().includes(query),
    )
  }

  const sortParts = (data) => {
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
    <div className="tableview-storage">
      <div className="main-window__list">
        <div className="main-window__list-item main-window__list-item--header">
          <span>Номер</span>
          <span>Название</span>
          <span>Кол-во</span>
          <span>Комментарий</span>
          <div className="main-window__actions">Действия</div>
        </div>
        {sortParts(props.data).map((storage, storage_id) => {
          return (
            <div className="main-window__list-item">
              <span>
                <div className="main-window__mobile-text">Номер:</div>
                {storage.number}
              </span>
              <span>
                <div className="main-window__mobile-text">Название:</div>
                {storage.name}
              </span>
              <span>
                <div className="main-window__mobile-text">Кол-во:</div>
                {addSpaceDelimiter(storage.quantity)}
              </span>
              <span>
                <div className="main-window__mobile-text">Комментарий:</div>
                {storage.comment}
              </span>
              <div className="main-window__actions">
                <Link
                  to={
                    '/' +
                    props.workshopName +
                    '/workshop-storage/edit/' +
                    storage.id
                  }
                  className="main-window__action"
                >
                  <img className="main-window__img" src={editIcon} alt="" />
                </Link>
                {props.userHasAccess(['ROLE_ADMIN']) && (
                  <div
                    data-id={storage.id}
                    className="main-window__action"
                    onClick={props.deleteItem}
                  >
                    <img className="main-window__img" src={deleteIcon} alt="" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      {/* <div className="tableview_storage__row tableview_storage__row--header">
        <div className="tableview_storage__col">
          <span>ID</span>
          <img
            name="id"
            className="tableview_storage__img"
            onClick={changeSortOrder}
            src={sortIcon}
          />
        </div>
        <div className="tableview_storage__col">Номер</div>
        <div className="tableview_storage__col">Название</div>
        <div className="tableview_storage__col">Кол-во</div>
        <div className="tableview_storage__col">Комментарий</div>
        <div className="tableview_storage__col">Действия</div>
      </div>
      {sortParts(props.data).map((storage, storage_id) => (
        <div
          key={storage_id}
          className={'tableview_storage__row tableview_storage__row--even'}
        >
          <div className="tableview_storage__col">{storage.id}</div>
          <div className="tableview_storage__col">{storage.number}</div>
          <div className="tableview_storage__col">{storage.name}</div>
          <div className="tableview_storage__col">
            {addSpaceDelimiter(storage.quantity)}
          </div>
          <div className="tableview_storage__col">{storage.comment}</div>
          <div className="tableview_storage__actions">
            <Link
              to={'/lemz/workshop-storage/edit/' + storage.id}
              className="tableview_storage__action"
            >
              Редактировать
            </Link>
            {props.userHasAccess(['ROLE_ADMIN']) && (
              <div
                data-id={storage.id}
                className="tableview_storage__action"
                onClick={props.deleteItem}
              >
                Удалить
              </div>
            )}
          </div>
        </div>
      ))} */}
    </div>
  )
}

export default TableView
