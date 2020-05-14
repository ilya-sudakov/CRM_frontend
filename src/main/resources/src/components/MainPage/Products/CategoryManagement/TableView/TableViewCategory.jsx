import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../../../../utils/MainWindow/MainWindow.scss'
import editSVG from '../../../../../../../../../assets/tableview/edit.svg'
import deleteSVG from '../../../../../../../../../assets/tableview/delete.svg'
import okSVG from '../../../../../../../../../assets/tableview/ok.svg'
import sortIcon from '../../../../../../../../../assets/tableview/sort_icon.png'
import './TableViewCategory.scss'

const TableViewCategory = (props) => {
  const [sortOrder, setSortOrder] = useState({
    curSort: 'name',
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
        item.category.toLowerCase().includes(query) ||
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
    props.setShowWindow && props.setShowWindow(false)
  }, [props.data, props.closeWindow])

  return (
    <div className="tableview-category">
      <div className="main-window">
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <span>
              {/* <div className="main-window__mobile-text">Название:</div> */}
              Название
            </span>
            <div className="main-window__actions">
              {/* <div className="main-window__mobile-text">Название:</div> */}
              Действия
            </div>
          </div>
          {sortProducts(props.data).map((category, category_id) => {
            return (
              <div key={category_id} className="main-window__list-item">
                <span>
                  <div className="main-window__mobile-text">Название:</div>
                  {category.category}
                </span>
                <div className="main-window__actions">
                  {props.userHasAccess &&
                    props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && (
                      <Link
                        to={'/products/category/edit/' + category.id}
                        className="main-window__action"
                        title="Редактировать категорию"
                      >
                        {/* Редактировать */}
                        <img className="main-window__img" src={editSVG} />
                      </Link>
                    )}
                  {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN']) && (
                    <div
                      data-id={category.id}
                      className="main-window__action"
                      title="Удалить категорию"
                      onClick={props.deleteItem}
                    >
                      {/* Удалить */}
                      <img className="main-window__img" src={deleteSVG} />
                    </div>
                  )}
                  {props.selectCategory && (
                    <div
                      data-id={category.id}
                      className="main-window__action"
                      title="Выбрать категорию"
                      onClick={() => {
                        props.selectCategory(category.category)
                        props.setCloseWindow(!props.closeWindow)
                      }}
                    >
                      {/* Выбрать */}
                      <img className="main-window__img" src={okSVG} />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* <div className="tableview-category__row tableview-category__row--header">
        <div className="tableview-category__col">Название</div>
        <div className="tableview-category__col">Действия</div>
      </div>
      {sortProducts(props.data).map((category, category_id) => (
        <div
          key={category_id}
          className="tableview-category__row tableview-category__row--even"
        >
          <div className="tableview-category__col">{category.category}</div>
          <div className="tableview-category__actions">
            {props.userHasAccess &&
              props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && (
                <Link
                  to={'/products/category/edit/' + category.id}
                  className="tableview-category__action"
                >
                  Редактировать
                </Link>
              )}
            {props.userHasAccess && props.userHasAccess(['ROLE_ADMIN']) && (
              <div
                data-id={category.id}
                className="tableview-category__action"
                onClick={props.deleteItem}
              >
                Удалить
              </div>
            )}
            {props.selectCategory && (
              <div
                data-id={category.id}
                className="tableview-category__action"
                onClick={() => {
                  props.selectCategory(category.category)
                  props.setCloseWindow(!props.closeWindow)
                }}
              >
                Выбрать
              </div>
            )}
          </div>
        </div>
      ))} */}
    </div>
  )
}

export default TableViewCategory
