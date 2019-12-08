import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import plusImg from '../../../../../../assets/sidemenu/plus_icon.svg'
import './SideMenu.scss';

const SideMenu = (props) => {
    return (
        <div className={props.hidden ? "sidemenu--hidden" : "sidemenu"}>
            {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && (props.location.pathname.includes("/clients") ||
                props.location.pathname.includes("/requests") ||
                props.location.pathname.includes("/products") ||
                props.location.pathname.includes("/workshop-lemz") ||
                props.location.pathname.includes("/profile/users")) ?
                (
                    <Link className="sidemenu__item--add" to={
                        props.location.pathname.includes("/clients") ? "/clients/new"
                            : props.location.pathname.includes("/requests") ? "/requests/new"
                                : props.location.pathname.includes("/products") ? "/products/new"
                                    : props.location.pathname.includes("/workshop-lemz") ? "/workshop-lemz/new"
                                        : props.location.pathname.includes("/profile/users") ? "/profile/users/new"
                                            : ''
                    }>
                        <span>{props.location.pathname.includes("/clients") ? "Добавить клиента"
                            : props.location.pathname.includes("/requests") ? "Добавить заявку"
                                : props.location.pathname.includes("/products") ? "Добавить продукцию"
                                    : props.location.pathname.includes("/workshop-lemz") ? "Добавить заявку"
                                        : props.location.pathname.includes("/profile/users") ? "Добавить пользователя"
                                            : ''
                        }</span>
                    </Link>
                )
                : null
            }

            {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <div className={props.location.pathname.length === 1 ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                <Link className="sidemenu__link" to="/">Главная (Для теста)</Link>
            </div>}
            {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <div className={props.location.pathname.includes("/clients") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                <Link className="sidemenu__link" to="/clients">Клиенты (Для теста)</Link>
                {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <Link to="/clients/new" className="sidemenu__addButton">
                    <img className="sidemenu__img" src={plusImg} />
                </Link>}
            </div>}
            {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <div className={props.location.pathname.includes("/contracts") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                <Link className="sidemenu__link" to="/contracts">Договоры (Для теста)</Link>
            </div>}
            {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <div className={props.location.pathname.includes("/requests") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                <Link className="sidemenu__link" to="/requests">Заявки</Link>
                {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <Link to="/requests/new" className="sidemenu__addButton">
                    <img className="sidemenu__img" src={plusImg} />
                </Link>}
            </div>}
            {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP']) && <div className={props.location.pathname.includes("/products") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                <Link className="sidemenu__link" to="/products">Продукция</Link>
                {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <Link to="/products/new" className="sidemenu__addButton">
                    <img className="sidemenu__img" src={plusImg} />
                </Link>}
            </div>}
            {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP']) && <div className={props.location.pathname.includes("/workshop-lemz") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                <Link className="sidemenu__link" to="/workshop-lemz">Очередь производства ЛЭМЗ</Link>
                {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER']) && <Link to="/workshop-lemz/new" className="sidemenu__addButton">
                    <img className="sidemenu__img" src={plusImg} />
                </Link>}
            </div>}
            {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']) && <div className={props.location.pathname.includes("/dispatcher/rigging") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                <Link className="sidemenu__link" to="/dispatcher/rigging">Оснастка</Link>
                {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']) && <Link to="/dispatcher/rigging/new" className="sidemenu__addButton">
                    <img className="sidemenu__img" src={plusImg} />
                </Link>}
            </div>}
            {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER']) && <div className={props.location.pathname.includes("/dispatcher/transportation") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                <Link className="sidemenu__link" to="/dispatcher/transportation">Реестр транспортировок</Link>
                {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER']) && <Link to="/dispatcher/transportation/new" className="sidemenu__addButton">
                    <img className="sidemenu__img" src={plusImg} />
                </Link>}
            </div>}
            {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']) && <div className={props.location.pathname.includes("/dispatcher/general-tasks") ? "sidemenu__item sidemenu__item--active" : "sidemenu__item"}>
                <Link className="sidemenu__link" to="/dispatcher/general-tasks">Основные задачи</Link>
                {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_ENGINEER']) && <Link to="/dispatcher/general-tasks/new" className="sidemenu__addButton">
                    <img className="sidemenu__img" src={plusImg} />
                </Link>}
            </div>}
        </div>
    );
};

export default withRouter(SideMenu);