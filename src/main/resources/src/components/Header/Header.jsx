import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = (props) => {
    const sideMenuClickDesktop = () => {
        props.setSideMenu(!props.sideMenu);
    }

    return (
        <div className="header">
            <div className="header__company">
                <div className="header__sidemenu" onClick={sideMenuClickDesktop}>
                    <div className="linesWrapper">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="header__name">
                        Меню
                    </div>
                </div>
                {/* <div className="header__logo">
                    Лого
                </div> */}
                {/* <div className="header__name">
                    Компания
                </div> */}
            </div>
            <div className="header__menu">
                <div className="header__item header__item--user">
                    <div className="header__username">{props.userData.username}</div>
                    <div className="header__email">{props.userData.email}</div>
                </div>
                <Link className="header__item header__item--button" to="/login">
                    Выйти
                </Link>
            </div>
        </div>
    );
}

export default Header;