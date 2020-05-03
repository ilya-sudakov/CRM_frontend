import React, { useState, useEffect } from 'react'
import sortIcon from '../../../../../../../../../assets/tableview/sort_icon.png'
import okSVG from '../../../../../../../../../assets/tableview/ok.svg'
import './TableView.scss'
import '../../../../../utils/MainWindow/MainWindow.scss'

const TableView = (props) => {
  const [sortOrder, setSortOrder] = useState({
    curSort: 'work',
    id: 'desc',
  })

  const changeSortOrder = (event) => {
    const name = event.target.getAttribute('name')
    setSortOrder({
      curSort: name,
      [name]: sortOrder[name] === 'desc' ? 'asc' : 'desc',
    })
  }

  const searchQuery = (data) => {
    const query = props.searchQuery.toLowerCase()
    return data.filter(
      (item) =>
        item.work.toLowerCase().includes(query) ||
        item.id.toString().includes(query),
    )
  }

  const sortProducts = (data) => {
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
    props.setShowWindow(false)
  }, [props.fullName])

  return (
    <div className="tableview-work">
      <div className="main-window">
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <span>Название</span>
            <span>Тип</span>
            <div className="main-window__actions">Действия</div>
          </div>
          {sortProducts(props.data).map((work, work_id) => (
            <div key={work_id} className="main-window__list-item">
              <span>{work.work}</span>
              <span>{work.typeOfWork}</span>
              <div className="main-window__actions">
                <div
                  data-id={work.id}
                  className="main-window__action"
                  title="Выбрать"
                  onClick={() => {
                    props.selectWork(work.work, work.id, work.typeOfWork)
                  }}
                >
                  {/* Выбрать */}
                  <img className="main-window__img" src={okSVG} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TableView
