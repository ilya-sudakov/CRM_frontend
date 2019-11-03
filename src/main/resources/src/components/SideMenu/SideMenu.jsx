import React from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.scss';

const SideMenu = (props) => {
    return (
        <div className="sidemenu">
            <Link className="sidemenu__item" to="/">Главная</Link>
            <Link className="sidemenu__item" to="/clients">Клиенты</Link>
            <Link className="sidemenu__item" to="/contracts">Договоры</Link>
            <Link className="sidemenu__item" to="/requests">Заявки</Link>
        </div>
    );
};

export default SideMenu;