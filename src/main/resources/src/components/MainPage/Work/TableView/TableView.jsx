import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import sortIcon from '../../../../../../../../assets/tableview/sort_icon.png'
import editSVG from '../../../../../../../../assets/tableview/edit.svg'
import deleteSVG from '../../../../../../../../assets/tableview/delete.svg'
import './TableView.scss'
import '../../../../utils/MainWindow/MainWindow.scss'
import PlaceholderLoading from '../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'

const TableView = (props) => {
  const [sortOrder, setSortOrder] = useState({
    curSort: 'work',
    id: 'desc',
  })
  const [isLoading, setIsLoading] = useState(true)

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
    props.data.length > 0 && setIsLoading(false)
  }, [props.data])

  return (
    <div className="tableview-work">
      <div className="main-window">
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <span>Название</span>
            <span>Тип</span>
            <div className="main-window__actions">Действия</div>
          </div>
          {isLoading && (
            <PlaceholderLoading
              itemClassName="main-window__list-item"
              minHeight="35px"
              items={8}
            />
          )}
          {sortProducts(props.data).map((work, work_id) => (
            <div key={work_id} className="main-window__list-item">
              <span>
                <div className="main-window__mobile-text">Название:</div>
                {work.work}
              </span>
              <span>
                <div className="main-window__mobile-text">Тип:</div>
                {work.typeOfWork}
              </span>
              <div className="main-window__actions">
                {props.userHasAccess &&
                  props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && (
                    <Link
                      to={'/work-list/edit/' + work.id}
                      className="main-window__action"
                      title="Редактирование"
                    >
                      <img className="main-window__img" src={editSVG} />
                      {/* Редактировать */}
                    </Link>
                  )}
                {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN']) && (
                  <div
                    data-id={work.id}
                    className="main-window__action"
                    title="Удаление"
                    onClick={props.deleteItem}
                  >
                    <img className="main-window__img" src={deleteSVG} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TableView
