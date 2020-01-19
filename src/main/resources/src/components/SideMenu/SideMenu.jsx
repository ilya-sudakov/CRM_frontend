import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import plusImg from '../../../../../../assets/sidemenu/plus_icon.svg'
import './SideMenu.scss';

const SideMenu = (props) => {
    return (
        <div className={props.hidden ? "sidemenu--hidden" : "sidemenu"}>
            {(props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && (props.location.pathname.includes("/clients")) ||
                (props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && props.location.pathname.includes("/requests")) ||
                (props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && props.location.pathname.includes("/products")) ||
                (props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEMZ']) && props.location.pathname.includes("/workshop-lemz")) ||
                (props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEPSARI']) && props.location.pathname.includes("/workshop-lepsari")) ||
                (props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP']) && props.location.pathname.includes("/workshop-storage")) ||
                (props.userHasAccess(['ROLE_ADMIN']) && props.location.pathname.includes("/profile/users")) ||
                (props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']) && props.location.pathname.includes("/dispatcher/general-tasks")) ||
                (props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']) && props.location.pathname.includes("/dispatcher/employees")) ||
                (props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']) && props.location.pathname.includes("/dispatcher/transportation")) ||
                (props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']) && props.location.pathname.includes("/work-list"))
            ) ?
                (
                    <Link className="sidemenu__item--add" to={
                        props.location.pathname.includes("/clients") ? "/clients/new"
                            : props.location.pathname.includes("/requests") ? "/requests/new"
                                : props.location.pathname.includes("/products") ? "/products/new"
                                    : props.location.pathname.includes("/workshop-lemz") ? "/workshop-lemz/new"
                                        : props.location.pathname.includes("/workshop-lepsari") ? "/workshop-lepsari/new"
                                            : props.location.pathname.includes("/workshop-storage") ? "/workshop-storage/new"
                                                : props.location.pathname.includes("/profile/users") ? "/profile/users/new"
                                                    : props.location.pathname.includes("/dispatcher/general-tasks") ? "/dispatcher/general-tasks/new"
                                                        : props.location.pathname.includes("/dispatcher/employees") ? "/dispatcher/employees/new"
                                                            : props.location.pathname.includes("/dispatcher/transportation") ? "/dispatcher/transportation/new"
                                                                : props.location.pathname.includes("/work-list") ? "/work-list/new"
                                                                    : ''
                    }>
                        <span>{props.location.pathname.includes("/clients") ? "Добавить клиента"
                            : props.location.pathname.includes("/requests") ? "Добавить заявку"
                                : props.location.pathname.includes("/products") ? "Добавить продукцию"
                                    : props.location.pathname.includes("/workshop-lemz") ? "Добавить заявку"
                                        : props.location.pathname.includes("/workshop-lepsari") ? "Добавить заявку"
                                            : props.location.pathname.includes("/workshop-storage") ? "Добавить деталь"
                                                : props.location.pathname.includes("/profile/users") ? "Добавить пользователя"
                                                    : props.location.pathname.includes("/dispatcher/general-tasks") ? "Добавить задачу"
                                                        : props.location.pathname.includes("/dispatcher/employees") ? "Добавить сотрудника"
                                                            : props.location.pathname.includes("/dispatcher/transportation") ? "Добавить транспортировку"
                                                                : props.location.pathname.includes("/work-list") ? "Добавить работу"
                                                                    : ''
                        }</span>
                    </Link>
                )
                : null
            }

            {
                props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP']) && <div className={props.location.pathname.length === 1 ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                    <Link className="sidemenu__link" to="/">Главная</Link>
                </div>
            }
            {
                props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <div className={props.location.pathname.includes("/clients") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                    <Link className="sidemenu__link" to="/clients">Клиенты (Для теста)</Link>
                    {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <Link to="/clients/new" className="sidemenu__addButton">
                        <img className="sidemenu__img" src={plusImg} />
                    </Link>}
                </div>
            }
            {
                props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <div className={props.location.pathname.includes("/contracts") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                    <Link className="sidemenu__link" to="/contracts">Договоры (Для теста)</Link>
                </div>
            }
            {
                props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <div className={props.location.pathname.includes("/requests") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                    <Link className="sidemenu__link" to="/requests">Заявки</Link>
                    {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <Link to="/requests/new" className="sidemenu__addButton">
                        <img className="sidemenu__img" src={plusImg} />
                    </Link>}
                </div>
            }
            {
                props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP']) && <div className={props.location.pathname.includes("/products") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                    <Link className="sidemenu__link" to="/products">Продукция</Link>
                    {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <Link to="/products/new" className="sidemenu__addButton">
                        <img className="sidemenu__img" src={plusImg} />
                    </Link>}
                </div>
            }
            {
                props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEMZ']) && <div className={props.location.pathname.includes("/workshop-lemz") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                    <Link className="sidemenu__link" to="/workshop-lemz">Очередь производства ЛЭМЗ</Link>
                    {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEMZ']) && <Link to="/workshop-lemz/new" className="sidemenu__addButton">
                        <img className="sidemenu__img" src={plusImg} />
                    </Link>}
                </div>
            }
            {
                props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEPSARI']) && <div className={props.location.pathname.includes("/workshop-lepsari") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                    <Link className="sidemenu__link" to="/workshop-lepsari">Очередь производства Лепсари</Link>
                    {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_LEPSARI']) && <Link to="/workshop-lepsari/new" className="sidemenu__addButton">
                        <img className="sidemenu__img" src={plusImg} />
                    </Link>}
                </div>
            }
            {
                props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']) && <div className={props.location.pathname.includes("/dispatcher/rigging") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                    <Link className="sidemenu__link" to="/dispatcher/rigging/stamp">Оснастка</Link>
                    {/* {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']) && <Link to="/dispatcher/rigging/new" className="sidemenu__addButton">
                    <img className="sidemenu__img" src={plusImg} />
                </Link>} */}
                </div>
            }
            {
                props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER']) && <div className={props.location.pathname.includes("/dispatcher/transportation") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                    <Link className="sidemenu__link" to="/dispatcher/transportation">Реестр транспортировок</Link>
                    {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER']) && <Link to="/dispatcher/transportation/new" className="sidemenu__addButton">
                        <img className="sidemenu__img" src={plusImg} />
                    </Link>}
                </div>
            }
            {
                props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER']) && <div className={props.location.pathname.includes("/dispatcher/employees") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                    <Link className="sidemenu__link" to="/dispatcher/employees">Сотрудники</Link>
                    {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER']) && <Link to="/dispatcher/employees/new" className="sidemenu__addButton">
                        <img className="sidemenu__img" src={plusImg} />
                    </Link>}
                </div>
            }
            {
                props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER', 'ROLE_MANAGER', 'ROLE_WORKSHOP']) && <div className={props.location.pathname.includes("/dispatcher/general-tasks") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                    <Link className="sidemenu__link" to="/dispatcher/general-tasks">Основные задачи</Link>
                    {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']) && <Link to="/dispatcher/general-tasks/new" className="sidemenu__addButton">
                        <img className="sidemenu__img" src={plusImg} />
                    </Link>}
                </div>
            }
            {
                props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER', 'ROLE_MANAGER']) && <div className={props.location.pathname.includes("/work-list") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                    <Link className="sidemenu__link" to="/work-list">Работы</Link>
                    {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']) && <Link to="/work-list/new" className="sidemenu__addButton">
                        <img className="sidemenu__img" src={plusImg} />
                    </Link>}
                </div>
            }
            {
                props.userHasAccess(['ROLE_ADMIN', 'ROLE_ENGINEER', 'ROLE_MANAGER', 'ROLE_WORKSHOP']) && <div className={props.location.pathname.includes("/workshop-storage") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                    <Link className="sidemenu__link" to="/workshop-storage">Склад</Link>
                    {props.userHasAccess(['ROLE_ADMIN', 'ROLE_ENGINEER', 'ROLE_MANAGER', 'ROLE_WORKSHOP']) && <Link to="/workshop-storage/new" className="sidemenu__addButton">
                        <img className="sidemenu__img" src={plusImg} />
                    </Link>}
                </div>
            }
        </div>
    );
};

export default withRouter(SideMenu);