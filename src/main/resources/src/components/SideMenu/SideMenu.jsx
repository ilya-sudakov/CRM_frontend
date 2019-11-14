import React from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.scss';

const SideMenu = (props) => {
    return (
        <div className={props.hidden ? "sidemenu--hidden" : "sidemenu"}>
            <div className="sidemenu__item">
                <Link className="sidemenu__link" to="/">Главная</Link>
            </div>
            <div className="sidemenu__item">
                <Link className="sidemenu__link" to="/clients">Клиенты</Link>
                <Link to="/clients/new" className="sidemenu__addButton">+</Link>
            </div>
            <div className="sidemenu__item">
                <Link className="sidemenu__link" to="/contracts">Договоры</Link>
                {/* <Link to="/contracts/new" className="sidemenu__addButton">+</Link> */}
            </div>
            <div className="sidemenu__item" >
                <Link className="sidemenu__link" to="/requests">Заявки</Link>
                <Link to="/requests/new" className="sidemenu__addButton">+</Link>
            </div>
        </div>
    );
};

export default SideMenu;