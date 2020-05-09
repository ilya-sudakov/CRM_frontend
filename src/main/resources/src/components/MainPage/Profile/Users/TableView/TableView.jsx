import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import editSVG from '../../../../../../../../../assets/tableview/edit.svg'
import deleteSVG from '../../../../../../../../../assets/tableview/delete.svg'
import './TableView.scss'
import TableDataLoading from '../../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx'
import { changeSortOrder } from '../../../../../utils/functions.jsx'

const TableView = (props) => {
  const [sortOrder, setSortOrder] = useState({
    curSort: 'username',
    username: 'asc',
  })

  const searchQuery = (data) => {
    return data.filter((item) =>
      item.username.toLowerCase().includes(props.searchQuery.toLowerCase()),
    )
  }

  const sortUsers = (data) => {
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

  useEffect(() => {}, [props.data])

  return (
    <div className="tableview_users">
      <div className="main-window">
        <div className="main-window__sort-panel">
          <span>Сортировка: </span>
          <select
            onChange={(event) => {
              setSortOrder(changeSortOrder(event))
            }}
          >
            <option value="username asc">По имени (А-Я)</option>
            <option value="username desc">По имени (Я-А)</option>
          </select>
        </div>
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <span>Имя пользователя</span>
            <span>Эл. почта</span>
            <span>Роль</span>
            <div className="main-window__actions">Действия</div>
          </div>
          {props.isLoading && (
            <TableDataLoading
              minHeight="50px"
              className="main-window__list-item"
            />
          )}
          {sortUsers(props.data).map((user, user_id) => (
            <div key={user_id} className="main-window__list-item">
              <span>
                <div className="main-window__mobile-text">
                  Имя пользователя:
                </div>
                {user.username}
              </span>
              <span>
                <div className="main-window__mobile-text">Эл. почта:</div>
                {user.email}
              </span>
              <span>
                <div className="main-window__mobile-text">Роль:</div>
                {user.roles.map((item) => {
                  return item.name === 'ROLE_ADMIN'
                    ? 'Руководитель '
                    : item.name === 'ROLE_MANAGER'
                    ? 'Менеджер1 '
                    : item.name === 'ROLE_USER'
                    ? 'Пользователь '
                    : item.name === 'ROLE_DISPATCHER'
                    ? 'Диспетчер '
                    : item.name === 'ROLE_ENGINEER'
                    ? 'Инженер '
                    : item.name === 'ROLE_LEMZ'
                    ? 'Цех ЛЭМЗ '
                    : item.name === 'ROLE_LEPSARI'
                    ? 'Цех Лепсари '
                    : item.name === 'ROLE_LIGOVSKIY'
                    ? 'Цех Лиговский '
                    : null
                })}
              </span>
              <div className="main-window__actions">
                <Link
                  className="main-window__action"
                  to={'/profile/users/edit/' + user.id}
                  title="Редактировать пользователя"
                >
                  <img className="main-window__img" src={editSVG} />
                </Link>
                {props.userHasAccess(['ROLE_ADMIN']) && (
                  <div
                    className="main-window__action"
                    onClick={() => {
                      props.deleteItem(user.id)
                    }}
                    title="Удалить пользователя"
                  >
                    <img className="main-window__img" src={deleteSVG} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* //!OLD DESIGN */}
      {/* <div className="tableview_users__row tableview_users__row--header">
        <div className="tableview_users__col">Имя пользователя</div>
        <div className="tableview_users__col">Эл. почта</div>
        <div className="tableview_users__col">Роль</div>
        <div className="tableview_users__col">Действия</div>
      </div>
      {props.isLoading && (
        <TableDataLoading
          minHeight="50px"
          className="tableview_users__row tableview_users__row--even"
        />
      )}
      {sortUsers(props.data).map((user, user_id) => (
        <div
          key={user_id}
          className="tableview_users__row tableview_users__row--even"
        >
          <div className="tableview_users__col">{user.username}</div>
          <div className="tableview_users__col">{user.email}</div>
          <div className="tableview_users__col">
            {user.roles.map((item) => {
              return item.name === 'ROLE_ADMIN'
                ? 'Руководитель '
                : item.name === 'ROLE_MANAGER'
                ? 'Менеджер1 '
                : item.name === 'ROLE_USER'
                ? 'Пользователь '
                : item.name === 'ROLE_DISPATCHER'
                ? 'Диспетчер '
                : item.name === 'ROLE_ENGINEER'
                ? 'Инженер '
                : item.name === 'ROLE_LEMZ'
                ? 'Цех ЛЭМЗ '
                : item.name === 'ROLE_LEPSARI'
                ? 'Цех Лепсари '
                : item.name === 'ROLE_LIGOVSKIY'
                ? 'Цех Лиговский '
                : null
            })}
          </div>
          <div className="tableview_users__actions">
            <Link
              className="tableview_users__action"
              to={'/profile/users/edit/' + user.id}
            >
              Редактировать
            </Link>
            {props.userHasAccess(['ROLE_ADMIN']) && (
              <div
                data-id={user.id}
                className="tableview_users__action"
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
