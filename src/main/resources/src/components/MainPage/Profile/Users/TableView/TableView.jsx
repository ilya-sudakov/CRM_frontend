import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import editSVG from '../../../../../../../../../assets/tableview/edit.svg'
import deleteSVG from '../../../../../../../../../assets/tableview/delete.svg'
import './TableView.scss'
import { changeSortOrder } from '../../../../../utils/functions.jsx'
import PlaceholderLoading from '../../../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'

const TableView = (props) => {

  useEffect(() => {}, [props.data])

  return (
    <div className="tableview_users">
      <div className="main-window">
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            <span>Имя пользователя</span>
            <span>Эл. почта</span>
            <span>Роль</span>
            <div className="main-window__actions">Действия</div>
          </div>
          {props.isLoading && (
            <PlaceholderLoading
              itemClassName="main-window__list-item"
              minHeight="30px"
              items={10}
            />
          )}
          {props.data.map((user, user_id) => (
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
    </div>
  )
}

export default TableView
