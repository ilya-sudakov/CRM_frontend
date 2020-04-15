import React, { useState, useEffect } from 'react';
import { formatDateString } from '../../../../utils/functions.jsx';
import deleteSVG from '../../../../../../../../assets/select/delete.svg';
import './Notifications.scss';

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
        }
    ])

    const deleteNotification = (event) => {
        let id = Number.parseInt(event.target.getAttribute('id'));
        //API
        let newNotifications = [];
        notifications.map((item) => {
            if (item.id !== id) {
                newNotifications.push(item);
            }
        })
        setNotifications([...newNotifications]);
    }

    useEffect(() => {
        // console.log(notifications);

        //После рендера делаем непрочитанные уведомления - прочитанными
        let unreadNotifications = Array.from(document.getElementsByClassName('notifications__item notifications__item--unread'));
        unreadNotifications.forEach((element, index) => {
            setTimeout(() => element.classList.remove('notifications__item--unread'), (4000 + index * 500));
            //API
        })
        // let newNotifications = notifications;
        // const temp = notifications.map((item, index) => {
        //     if (item.read === false) {
        //         return setTimeout(() => {
        //             newNotifications.splice(index, 1, {
        //                 ...item, 
        //                 read: true
        //             })
        //             setNotifications([...newNotifications]);
        //         }, (4000 + index * 500));
        //     }
        // })
    }, [notifications])

    return (
        <div className="notifications">
            <div className="notifications__title">Уведомления (Тест)</div>
            <div className="notifications__content">
                <div className="notifications__list">
                    {notifications.map((item, index) => (
                        <div className={item.read ? "notifications__item" : "notifications__item notifications__item--unread"}>
                            <div className="notifications__description">{item.name}</div>
                            <div className="notifications__description">Дата: {formatDateString(item.expirationTime)}</div>
                            <img id={item.id} className="notifications__img" src={deleteSVG} alt="" onClick={deleteNotification} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;