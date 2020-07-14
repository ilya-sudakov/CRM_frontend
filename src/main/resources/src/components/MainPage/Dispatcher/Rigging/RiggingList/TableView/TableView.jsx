import React from 'react'
import './TableView.scss'

const TableView = (props) => {
  const workshops = [
    { name: 'ЦехЛЭМЗ', alternative: 'ЛЭМЗ' },
    { name: 'ЦехЛиговский', alternative: 'Лиговский' },
    { name: 'ЦехЛепсари', alternative: 'Лепсари' },
  ]

  const temp = {
    status: {
      current: {
        statusName: 'Распил/Габариты',
        date: new Date(),
        worker: 'Борис',
        comment: 'Комментарий',
      },
    },
  }

  return (
    <div className="rigging-list-tableview">
      <div className="main-window__list">
        {workshops.map((workshop) => (
          <>
            <div className="rigging-list-tableview__workshop">
              {workshop.name}
            </div>
            <div className="main-window__list-item main-window__list-item--header">
              <span>Артикул</span>
              <span>Название</span>
              <span>Кол-во</span>
              <span>Комментарий</span>
              <span>Статус</span>
              <div className="main-window__actions">Действия</div>
            </div>
            {props.data.map((item) => {
              return (
                (item.location === workshop.name ||
                  item.location === workshop.alternative) && (
                  <div className="main-window__list-item">
                    <span>
                      <div className="main-window__mobile-text">Артикул</div>
                      {item.number}
                    </span>
                    <span>
                      <div className="main-window__mobile-text">Название</div>
                      {item.name}
                    </span>
                    <span>
                      <div className="main-window__mobile-text">Кол-во</div>
                      {item.amount}
                    </span>
                    <span>
                      <div className="main-window__mobile-text">
                        Комментарий
                      </div>
                      {item.comment}
                    </span>
                    <span>
                      <div className="main-window__mobile-text">Статус</div>
                      {temp.status.current.statusName}
                    </span>
                    <div className="main-window__actions">
                      <div className="main-window__action">Просмотр</div>
                    </div>
                  </div>
                )
              )
            })}
          </>
        ))}
      </div>
    </div>
  )
}

export default TableView
