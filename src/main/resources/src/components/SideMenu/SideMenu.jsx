import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import plusImg from '../../../../../../assets/sidemenu/plus.png'
import './SideMenu.scss';

const SideMenu = (props) => {
    const [sidemenuItems, setSidemenuItems] = useState([
        {
            pathname: '/',
            mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP'],
            name: "Главная"
        },
        {
            pathname: "/clients",
            mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            name: "Клиенты",
            addButtonRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            addButtonName: "Добавить клиента"
        },
        {
            pathname: "/contracts",
            mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            name: "Договоры"
        },
        {
            pathname: "/requests",
            name: "Заявки",
            mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            addButtonRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            addButtonName: "Добавить заявку"
        },
        {
            pathname: "/products",
            name: "Продукция",
            mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP'],
            addButtonRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            addButtonName: "Добавить продукцию"
        },
        {
            pathname: "/lemz/",
            linkTo: "/lemz/workshop-lemz",
            mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEMZ'],
            name: 'ЦехЛЭМЗ'
        },
        {
            pathname: "/lemz/workshop-lemz",
            mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEMZ'],
            addButtonRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEMZ'],
            addButtonName: "Добавить план производства"
        },
        {
            pathname: "/lepsari/",
            linkTo: "/lepsari/workshop-lepsari",
            mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEPSARI'],
            name: 'ЦехЛепсари'
        },
        {
            pathname: "/lepsari/workshop-lepsari",
            mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEPSARI'],
            addButtonRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEPSARI'],
            addButtonName: "Добавить план производства"
        },
        {
            pathname: "/lemz/workshop-storage",
            mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEMZ'],
            addButtonRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEMZ'],
            addButtonName: "Добавить деталь"
        },
        {
            pathname: "/lepsari/workshop-storage",
            mainRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEPSARI'],
            addButtonRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEPSARI'],
            addButtonName: "Добавить деталь"
        },
        {
            pathname: "/dispatcher/rigging/",
            linkTo: "/dispatcher/rigging/stamp",
            mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
            name: 'Оснастка'
        },
        {
            pathname: "/dispatcher/rigging/stamp",
            mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
            addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
            addButtonName: "Добавить штамп"
        },
        {
            pathname: "/dispatcher/rigging/machine",
            mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
            addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
            addButtonName: "Добавить станок"
        },
        {
            pathname: "/dispatcher/rigging/press-form",
            mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
            addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
            addButtonName: "Добавить пресс-форму"
        },
        {
            pathname: "/dispatcher/rigging/parts",
            mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
            addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
            addButtonName: "Добавить запчасть"
        },
        {
            pathname: "/profile/users",
            mainRoles: ['ROLE_ADMIN'],
            addButtonRoles: ['ROLE_ADMIN'],
            addButtonName: "Добавить пользователя"
        },
        {
            pathname: "/dispatcher/general-tasks",
            name: "Основные задачи",
            mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER', 'ROLE_MANAGER', 'ROLE_WORKSHOP'],
            addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
            addButtonName: "Добавить задачу"
        },
        {
            pathname: "/dispatcher/employees",
            name: "Сотрудники",
            mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
            addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
            addButtonName: "Добавить сотрудника"
        },
        {
            pathname: "/dispatcher/transportation",
            name: "Реестр транспортировок",
            mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
            addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
            addButtonName: "Добавить запись"
        },
        {
            pathname: "/work-list",
            name: "Список работ",
            mainRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER', 'ROLE_MANAGER'],
            addButtonRoles: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER'],
            addButtonName: "Добавить работу"
        },
    ])

    useEffect(() => {

    }, [])

    return (
        <div className={props.hidden ? "sidemenu--hidden" : "sidemenu"}>
            <div className="sidemenu__add-buttons">
                {
                    sidemenuItems.map((item) => {
                        return <Link className={(
                            item.addButtonName &&
                            props.userHasAccess(item.addButtonRoles) &&
                            props.location.pathname.includes(item.pathname)
                        ) ? "sidemenu__item--add" : "sidemenu__item--add sidemenu__item--hidden"
                        } to={item.pathname + '/new'} >
                            <span>{item.addButtonName}</span>
                        </Link>
                    })
                }
            </div>
            {
                sidemenuItems.map((item) => {
                    return (
                        props.userHasAccess(item.mainRoles) &&
                        item.name
                    ) && <div className={
                        (props.location.pathname.includes(item.pathname) && (item.pathname !== "/"))
                            ? "sidemenu__item sidemenu__item--active"
                            : (props.location.pathname.length === 1 && props.location.pathname.includes(item.pathname))
                                ? "sidemenu__item sidemenu__item--active"
                                : "sidemenu__item"
                    }>
                            <Link className="sidemenu__link" to={item.linkTo ? item.linkTo : item.pathname}>{item.name}</Link>
                            {(
                                item.addButtonName &&
                                props.userHasAccess(item.addButtonRoles)
                            ) && <Link to={item.pathname + '/new'} className="sidemenu__addButton">
                                    <img className="sidemenu__img" src={plusImg} />
                                </Link>}
                        </div>
                })
            }
        </div >
    );
};

export default withRouter(SideMenu);