import React, { useState, useEffect } from 'react'
import {
  formatDateString,
  formatDateStringToTime,
  formatDateStringWithTime,
} from '../../../../utils/functions.jsx'
import deleteSVG from '../../../../../../../../assets/select/delete.svg'
import './Notifications.scss'

const Notifications = (props) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: 'Уведомление1',
      expirationTime: new Date(),
      read: false,
    },
    {
      id: 2,
      name: 'Уведомление2',
      expirationTime: new Date(),
      read: true,
    },
    {
      id: 3,
      name: 'Уведомление3',
      expirationTime: new Date(),
      read: false,
    },
  ])
  const [allMessagesMarked, setAllMessagesMarked] = useState(false)
  const [messagesMarked, setMessagesMarked] = useState(false)

  const deleteNotification = (id) => {
    //API
    let newNotifications = notifications
    newNotifications.splice(id - 1, 1)
    setNotifications([...newNotifications])
    // markAllMessages(newNotifications)
  }

  useEffect(() => {
    //После рендера делаем непрочитанные уведомления - прочитанными
    if (!allMessagesMarked) {
      markAllMessages(notifications)
    }
  }, [notifications])

  const markAllMessages = (notifications) => {
    // notifications.map((element, index) => {
    //   return setTimeout(() => {
    //     if (!element.read) {
    //       let temp = notifications
    //       temp.splice(index, 1, {
    //         ...element,
    //         read: true,
    //       })
    //       setNotifications([...temp])
    //     }
    //     if (index === notifications.length - 1) {
    //       setAllMessagesMarked(true)
    //     }
    //   }, 4000 + index * 500)
    //   //API
    // })
  }

  return (
    <div className="notifications">
      <div className="notifications__title">Уведомления (Тест)</div>
      <div className="notifications__content">
        <div className="notifications__list">
          {notifications.map((item, index) => (
            <div
              className={
                item.read
                  ? 'notifications__item'
                  : 'notifications__item notifications__item--unread'
              }
            >
              <div className="notifications__description">{item.name}</div>
              <div className="notifications__description">
                {new Date().getDate() + '.' + (new Date().getMonth() + 1) ===
                new Date(item.expirationTime).getDate() +
                  '.' +
                  (new Date(item.expirationTime).getMonth() + 1)
                  ? formatDateStringToTime(item.expirationTime)
                  : formatDateStringWithTime(item.expirationTime)}
              </div>
              <img
                className="notifications__img"
                src={deleteSVG}
                alt=""
                onClick={() => {
                  deleteNotification(item.id)
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notifications
