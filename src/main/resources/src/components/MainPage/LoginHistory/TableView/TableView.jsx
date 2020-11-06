import React from 'react'
import './TableView.scss'

const TableView = (props) => {
  return (
    <div className="tableview-login-history">
      <div className="main-window__list-item main-window__list-item--header">
        <span>ID</span>
        <span>Пользователь</span>
        <span>Время</span>
        <div className="main-window__actions">Действия</div>
      </div>
      {props.data.map((work, work_id) => (
        <div key={work_id} className="main-window__list-item">
          <span>
            <div className="main-window__mobile-text">ID</div>
            {work.id}
          </span>
          <span>
            <div className="main-window__mobile-text">Пользователь</div>
            {work.username}
          </span>
          <span>
            <div className="main-window__mobile-text">Время</div>
            {work.date}
          </span>
          <div className="main-window__actions">
            <div
              data-id={work.id}
              className="main-window__action"
              onClick={props.deleteItem}
            >
              Удалить
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TableView
