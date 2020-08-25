import React, { useState, useEffect } from 'react'
import './FeedbackPage.scss'
import '../../../utils/MainWindow/MainWindow.scss'
import SearchBar from '../SearchBar/SearchBar.jsx'
import unreadMessagesSVG from '../../../../../../../assets/chat/unread_messages__mail_icon.svg'
import deleteSVG from '../../../../../../../assets/tableview/delete.svg'
import { Link } from 'react-router-dom'
import {
  formatDateString,
  formatDateStringWithTime,
} from '../../../utils/functions.jsx'
import {
  getFeedback,
  deleteFeedbackById,
} from '../../../utils/RequestsAPI/Feedback/feedback.js'
import {
  getMessagesByDiscussionId,
  deleteMessage,
} from '../../../utils/RequestsAPI/Feedback/messages.js'
import FloatingPlus from '../../../utils/MainWindow/FloatingPlus/FloatingPlus.jsx'
import PlaceholderLoading from '../../../utils/TableView/PlaceholderLoading/PlaceholderLoading.jsx'

const FeedbackPage = (props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [statuses, setStatuses] = useState([
    {
      className: 'waiting',
      name: 'Ожидание ответа',
      visible: true,
    },
    {
      className: 'in-progress',
      name: 'В процессе',
      visible: true,
    },
    {
      className: 'completed',
      name: 'Завершенные',
      visible: false,
    },
    {
      className: 'urgent',
      name: 'Срочно',
      visible: true,
    },
    {
      className: 'testing',
      name: 'Тестирование',
      visible: true,
    },
  ])

  const [userCategories, setUserCategories] = useState([
    {
      name: 'Все',
      filteredRoles: [],
      active: true,
    },
    {
      name: 'Руководитель',
      filteredRoles: ['dev', 'Алексей', 'test'],
      active: false,
    },
    {
      name: 'Диспетчер',
      filteredRoles: ['Диспетчер'],
      active: false,
    },
    {
      name: 'Менеджер',
      filteredRoles: ['Иван', 'Менеджер1'],
      active: false,
    },
    {
      name: 'Цеха',
      filteredRoles: ['ЦехЛЭМЗ', 'ЦехЛепсари', 'ЦехЛиговский'],
      active: false,
    },
  ])

  useEffect(() => {
    document.title = 'Обсуждения'
    let abortController = new AbortController()
    loadData(abortController.signal)
    return function cancel() {
      abortController.abort()
    }
  }, [])

  const loadData = (signal) => {
    getFeedback(signal)
      .then((res) => res.json())
      .then((res) => {
        setMessages(res)
        setIsLoading(false)
      })
  }

  return (
    <div className="feedback-page">
      <div className="main-window">
        <div className="main-window__title">Обратная связь</div>
        <FloatingPlus
          linkTo="/feedback/new"
          visibility={[
            'ROLE_ADMIN',
            'ROLE_WORKSHOP',
            'ROLE_DISPATCHER',
            'ROLE_MANAGER',
          ]}
        />
        <SearchBar
          // title="Обратная связь"
          placeholder="Введите запрос для поиска..."
          setSearchQuery={setSearchQuery}
        />
        <div className="main-window__info-panel">
          <div className="main-window__status-panel">
            <div>Фильтр по статусам: </div>
            {statuses.map((status, index) => {
              return (
                <div
                  className={
                    (status.visible
                      ? 'main-window__button'
                      : 'main-window__button main-window__button--inverted') +
                    ' main-window__list-item--' +
                    status.className
                  }
                  onClick={() => {
                    let temp = statuses
                    temp.splice(index, 1, {
                      ...status,
                      visible: !status.visible,
                    })
                    setStatuses([...temp])
                  }}
                >
                  {status.name}
                </div>
              )
            })}
          </div>
          <div className="main-window__amount_table">
            Всего: {messages.length} записей
          </div>
        </div>
        <div className="main-window__filter-pick">
          <div>Фильтр по категориям: </div>
          {userCategories.map((category, index) => {
            return (
              <div
                className={
                  category.active
                    ? 'main-window__button'
                    : 'main-window__button main-window__button--inverted'
                }
                onClick={() => {
                  let temp = userCategories
                  temp = userCategories.map((item, tempIndex) => {
                    if (index === tempIndex) {
                      return {
                        ...item,
                        active: true,
                      }
                    }
                    return {
                      ...item,
                      active: false,
                    }
                  })
                  setUserCategories([...temp])
                }}
              >
                {category.name}
              </div>
            )
          })}
        </div>
        <div className="main-window__list">
          <div className="main-window__list-item main-window__list-item--header">
            {/* <span>Обсуждения</span>
            <div className="main-window__actions">Действие</div> */}
          </div>
          {isLoading && (
            <PlaceholderLoading
              itemClassName="main-window__list-item"
              minHeight="60px"
              items={10}
            />
          )}
          {messages
            .filter((item) => {
              const temp = userCategories.find((category) => category.active)
              if (temp.filteredRoles.length === 0) {
                return true
              } else {
                return temp.filteredRoles.includes(item.author)
              }
            })
            .filter((item) => {
              if (
                item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                formatDateString(item.date)
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                item.subject.toLowerCase().includes(searchQuery.toLowerCase())
              ) {
                let check = false
                statuses.map((status) => {
                  if (status.visible && status.className === item.status) {
                    check = true
                    return
                  }
                })
                return check
              }
            })
            .sort((a, b) => {
              if (a.date < b.date) {
                return 1
              }
              if (a.date > b.date) {
                return -1
              }
              return 0
            })
            .map((item, index) => {
              if (
                item.author === props.userData.username ||
                props.userHasAccess(['ROLE_ADMIN'])
              ) {
                return (
                  <Link
                    className={
                      'main-window__list-item' +
                      ' main-window__list-item--' +
                      item.status
                    }
                    to={'/feedback/view/' + item.id}
                  >
                    <span
                      className="feedback-page__avatar"
                      data-username={
                        item.author[0] + item.author[1] + item.author[2]
                      }
                    >
                      {item.author[0] + item.author[1] + item.author[2]}
                    </span>
                    <div className="main-window__list-col">
                      <span title={item.subject}>
                        <div className="main-window__mobile-text">Тема: </div>
                        {item.subject}
                      </span>
                      <span>
                        <div className="main-window__mobile-text">
                          Пользователь:{' '}
                        </div>
                        {item.author}
                      </span>
                      <span>
                        <div className="main-window__mobile-text">Дата: </div>
                        {formatDateStringWithTime(item.date)}
                      </span>
                      {item.isRead === false && (
                        <div
                          className="feedback-page__info-message"
                          title="Новые сообщения"
                        >
                          <div className="main-window__mobile-text">
                            Новые сообщения
                          </div>
                          {/* Новые сообщения */}
                          <img
                            className="main-window__img"
                            src={unreadMessagesSVG}
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                    <div className="main-window__actions">
                      {/* <div
                        className="main-window__action"
                        title="Просмотр чата"
                      >
                        <img className="main-window__img" src={viewSVG} />
                      </div> */}
                      {props.userHasAccess(['ROLE_ADMIN']) && (
                        <div
                          className="main-window__action"
                          title="Удаление чата"
                          onClick={(event) => {
                            event.preventDefault()
                            getMessagesByDiscussionId(item.id)
                              .then((res) => res.json())
                              .then((res) => {
                                return Promise.all(
                                  res.map((message) => {
                                    return deleteMessage(message.id)
                                  }),
                                )
                              })
                              .then(() => {
                                return deleteFeedbackById(item.id)
                              })
                              .then(() => {
                                return loadData()
                              })
                          }}
                        >
                          <img className="main-window__img" src={deleteSVG} />
                        </div>
                      )}
                    </div>
                  </Link>
                )
              }
            })}
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage
