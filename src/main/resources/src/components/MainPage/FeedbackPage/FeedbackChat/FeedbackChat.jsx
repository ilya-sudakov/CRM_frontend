import React, { useEffect, useState } from 'react'
import './FeedbackChat.scss'
import sendSVG from '../../../../../../../../assets/chat/send.svg'
import arrowUpSVG from '../../../../../../../../assets/chat/unread_messages__arrow-up.svg'
import '../../../../utils/Form/Form.scss'
import {
  formatDateString,
  formatDateStringWithTime,
  formatDateStringToTime,
} from '../../../../utils/functions.jsx'

const FeedbackChat = (props) => {
  const [newMessage, setNewMessage] = useState('')
  // const [newMessagesAmount, setNewMessagesAmount] = useState(0)
  const [showNewMessages, setShowNewMessages] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let list = document.getElementsByClassName('feedback-chat__list')[0]
    list.scrollTop = list.scrollHeight
    if (!isLoaded) {
      // console.log(props.isRead)
      if (props.isRead === false) {
        setShowNewMessages(true)
        setIsLoaded(true)
      }
    }
    //Отмечаем все непрочитанные сообщения - прочитанными
    if (
      props.messages[props.messages.length - 1]?.author !==
        props.userData.username &&
      showNewMessages === true &&
      isLoaded
    ) {
      // console.log(123);
      props.handleReadMessages()
      setTimeout(() => {
        setShowNewMessages(false)
      }, 5000)
    }
  }, [props.messages, props.isRead, isLoaded])

  return (
    <div className="feedback-chat">
      <div className="feedback-chat__title">Обсуждение</div>
      <div>{'Всего сообщений: ' + props.messages.length}</div>
      <div className="feedback-chat__list">
        {props.messages.length === 0 && <div>Нет сообщений...</div>}
        {props.messages
          .sort((a, b) => {
            if (new Date(a.date) < new Date(b.date)) {
              return -1
            }
            if (new Date(a.date) > new Date(b.date)) {
              return 1
            }
            return 0
          })
          .map((message, index) => {
            //  if (index === props.messages.length - 5) {
            //    return (
            //      <React.Fragment>
            //        <div
            //         className={
            //         showNewMessages
            //         ? 'feedback-chat__divider'
            //            : 'feedback-chat__divider feedback-chat__divider--hidden'
            //           }
            //        >
            //          <span>Новые сообщения</span>
            //         </div>
            //        <div className="feedback-chat__message">
            //           {(index === 0 ||
            //            (index > 0 &&
            //                props.messages[index - 1].author !==
            //                 message.author)) && (
            //             <div
            //              data-letters={
            //                 message.author[0] +
            //                message.author[1] +
            //                message.author[2]
            //              }
            //            ></div>
            //          )}
            //           {/* {(index === 0 || (index > 0 && props.messages[index - 1].author !== message.author)) && <img className="feedback-chat__img" src={sendSVG} alt="" />} */}
            //          <div className="feedback-chat__header">
            //            {(index === 0 ||
            //             (index > 0 &&
            //                props.messages[index - 1].author !==
            //                 message.author)) && (
            //               <div className="feedback-chat__author">
            //               {message.author}
            //              </div>
            //         )}
            //         <div className="feedback-chat__date">
            //           {new Date().getDate() +
            //              '.' +
            //              (new Date().getMonth() + 1) ===
            //             new Date(message.date).getDate() +
            //              '.' +
            //               (new Date(message.date).getMonth() + 1)
            //               ? formatDateStringToTime(message.date)
            //                : formatDateStringWithTime(message.date)}
            //                //           </div>
            //         </div>
            //          <div className="feedback-chat__text">{message.text}</div>
            //        </div>
            //      </React.Fragment>
            //   )
            //} else
            return (
              <div className="feedback-chat__message">
                {(index === 0 ||
                  (index > 0 &&
                    props.messages[index - 1].author !== message.author)) && (
                  <div
                    data-letters={
                      message.author[0] + message.author[1] + message.author[2]
                    }
                  ></div>
                )}
                {/* {(index === 0 || (index > 0 && props.messages[index - 1].author !== message.author)) && <img className="feedback-chat__img" src={sendSVG} alt="" />} */}
                {!(
                  index > 0 &&
                  formatDateStringWithTime(props.messages[index - 1].date) ===
                    formatDateStringWithTime(message.date) &&
                  props.messages[index - 1]?.author === message.author
                ) && (
                  <div className="feedback-chat__header">
                    {(index === 0 ||
                      (index > 0 &&
                        props.messages[index - 1].author !==
                          message.author)) && (
                      <div className="feedback-chat__author">
                        {message.author}
                      </div>
                    )}
                    <div className="feedback-chat__date">
                      {new Date().getDate() +
                        '.' +
                        (new Date().getMonth() + 1) ===
                      new Date(message.date).getDate() +
                        '.' +
                        (new Date(message.date).getMonth() + 1)
                        ? formatDateStringToTime(message.date)
                        : formatDateStringWithTime(message.date)}
                    </div>
                  </div>
                )}
                <div className="feedback-chat__text">{message.text}</div>
              </div>
            )
          })}
        {(props.messages[props.messages.length - 1]?.author !==
          props.userData.username &&
          props.messages.length !== 0) && (
          <div
            className={
              showNewMessages
                ? 'feedback-chat__divider'
                : 'feedback-chat__divider feedback-chat__divider--hidden'
            }
          >
            <span>Новые сообщения</span>
            <img className="feedback-chat__img" src={arrowUpSVG} />
          </div>
        )}
      </div>
      <div className="feedback-chat__input">
        <input
          type="text"
          placeholder="Напишите что-нибудь..."
          onChange={(event) => {
            const value = event.target.value
            setNewMessage(value)
          }}
          value={newMessage}
        />
        <button
          className="feedback-chat__button"
          onClick={(event) => {
            event.preventDefault()
            // console.log(newMessage);
            props.handleSubmit(newMessage)
            setNewMessage('')
          }}
        >
          <span>Отправить</span>
          <img className="feedback-chat__img" src={sendSVG} alt="" />
        </button>
      </div>
    </div>
  )
}

export default FeedbackChat
