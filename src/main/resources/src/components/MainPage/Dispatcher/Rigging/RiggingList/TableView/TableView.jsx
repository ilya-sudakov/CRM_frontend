import React, { useState } from 'react'
import './TableView.scss'

import chevronDownSVG from '../../../../../../../../../../assets/tableview/chevron-down.svg'

const TableView = (props) => {
  const [workshops, setWorkshops] = useState([
    { name: 'ЦехЛЭМЗ', alternative: 'ЛЭМЗ', isMinimized: false },
    { name: 'ЦехЛиговский', alternative: 'Лиговский', isMinimized: false },
    { name: 'ЦехЛепсари', alternative: 'Лепсари', isMinimized: false },
    { name: 'Главный инженер', alternative: 'А.И.', isMinimized: false },
  ])

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
        {workshops
          .filter(
            (workshop) =>
              props.data.filter(
                (item) =>
                  item.location === workshop.name ||
                  item.location === workshop.alternative,
              ).length > 0,
          )
          .map((workshop, workshopIndex) => (
            <>
              <div
                className="main-window__list-item main-window__list-item--divider"
                onClick={() => {
                  let temp = workshops
                  temp[workshopIndex].isMinimized = !temp[workshopIndex]
                    .isMinimized
                  setWorkshops([...temp])
                }}
              >
                <span>
                  {workshop.name}
                  <img
                    className={
                      workshop.isMinimized
                        ? 'main-window__img'
                        : 'main-window__img main-window__img--rotated'
                    }
                    src={chevronDownSVG}
                  />
                </span>
              </div>
              <div className="main-window__list-item main-window__list-item--header">
                <span>Артикул</span>
                <span>Название</span>
                <span>Кол-во</span>
                <span>Комментарий</span>
                {/* <span>Статус</span> */}
                <div className="main-window__actions">Действия</div>
              </div>
              {props.data
                .filter(
                  (item) =>
                    item.location === workshop.name ||
                    item.location === workshop.alternative,
                )
                .map((item) => {
                  if (!workshop.isMinimized) {
                    return (
                      <div className="main-window__list-item">
                        <span>
                          <div className="main-window__mobile-text">
                            Артикул:
                          </div>
                          {item.number}
                        </span>
                        <span>
                          <div className="main-window__mobile-text">
                            Название:
                          </div>
                          {item.name}
                        </span>
                        <span>
                          <div className="main-window__mobile-text">
                            Кол-во:
                          </div>
                          {item.amount}
                        </span>
                        <span>
                          <div className="main-window__mobile-text">
                            Комментарий:
                          </div>
                          {item.comment}
                        </span>
                        {/* <span>
                      <div className="main-window__mobile-text">Статус</div>
                      {temp.status.current.statusName}
                    </span> */}
                        <div className="main-window__actions">
                          <div className="main-window__action">Просмотр</div>
                          <div className="main-window__action">
                            Редактировать
                          </div>
                        </div>
                      </div>
                    )
                  }
                })}
            </>
          ))}
      </div>
    </div>
  )
}

export default TableView
