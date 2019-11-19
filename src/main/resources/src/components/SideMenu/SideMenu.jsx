import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import plusImg from '../../../../../../assets/sidemenu/plus_icon.svg'
import './SideMenu.scss';

const SideMenu = (props) => {
    return (
        <div className={props.hidden ? "sidemenu--hidden" : "sidemenu"}>
            {props.location.pathname.includes("/clients") ||
                props.location.pathname.includes("/requests") ||
                props.location.pathname.includes("/products") ||
                props.location.pathname.includes("/production-line") ?
                (
                    <Link className="sidemenu__item--add" to={
                        props.location.pathname.includes("/clients") ? "/clients/new"
                            : props.location.pathname.includes("/requests") ? "/requests/new"
                                : props.location.pathname.includes("/production-line") ? "/production-line/new"
                                    : ''
                    }>
                        <span>{props.location.pathname.includes("/clients") ? "Добавить клиента"
                            : props.location.pathname.includes("/requests") ? "Добавить заявку"
                                : props.location.pathname.includes("/products") ? "Добавить продукцию"
                                    : props.location.pathname.includes("/production-line") ? "Добавить заявку"
                                        : ''
                        }</span>
                        {/* <img className="sidemenu__img" src={plusImg} /> */}
                    </Link>
                )
                : null
            }

            <div className={props.location.pathname.length === 1 ? "sidemenu__item--active" : "sidemenu__item"}>
                <Link className="sidemenu__link" to="/">Главная (Для теста)</Link>
            </div>
            <div className={props.location.pathname.includes("/clients") ? "sidemenu__item--active" : "sidemenu__item"}>
                <Link className="sidemenu__link" to="/clients">Клиенты (Для теста)</Link>
                <Link to="/clients/new" className="sidemenu__addButton">
                    <img className="sidemenu__img" src={plusImg} />
                </Link>
            </div>
            <div className={props.location.pathname.includes("/contracts") ? "sidemenu__item--active" : "sidemenu__item"}>
                <Link className="sidemenu__link" to="/contracts">Договоры (Для теста)</Link>
                {/* <Link to="/contracts/new" className="sidemenu__addButton">+</Link> */}
            </div>
            <div className={props.location.pathname.includes("/requests") ? "sidemenu__item--active" : "sidemenu__item"}>
                <Link className="sidemenu__link" to="/requests">Заявки</Link>
                <Link to="/requests/new" className="sidemenu__addButton">
                    <img className="sidemenu__img" src={plusImg} />
                </Link>
            </div>
            <div className={props.location.pathname.includes("/products") ? "sidemenu__item--active" : "sidemenu__item"}>
                <Link className="sidemenu__link" to="/products">Продукция (В разработке)</Link>
                <Link to="/products/new" className="sidemenu__addButton">
                    <img className="sidemenu__img" src={plusImg} />
                </Link>
            </div>
            <div className={props.location.pathname.includes("/production-line") ? "sidemenu__item--active" : "sidemenu__item"}>
                <Link className="sidemenu__link" to="/production-line">Очередь производства (В разработке)</Link>
                <Link to="/production-line/new" className="sidemenu__addButton">
                    <img className="sidemenu__img" src={plusImg} />
                </Link>
            </div>
        </div>
    );
};

export default withRouter(SideMenu);