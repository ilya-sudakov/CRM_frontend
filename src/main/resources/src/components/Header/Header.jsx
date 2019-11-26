import React, { useState, useEffect } from 'react';
import profileSVG from '../../../../../../assets/header/profile.svg';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = (props) => {
    const sideMenuClickDesktop = () => {
        props.setSideMenu(!props.sideMenu);
    }

    const clickProfileMenu = () => {
        const menu = document.getElementsByClassName("header__profile_menu")[0];
        menu.classList.contains("header__profile_menu--hidden") 
        ? menu.classList.remove("header__profile_menu--hidden")
        : menu.classList.add("header__profile_menu--hidden");
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
                    <div className="header__profile_data" onClick={clickProfileMenu}>
                        <img className="header__userimg" src={profileSVG} alt="" />
                        <div>
                            <div className="header__username">{props.userData.username}</div>
                            <div className="header__email">{props.userData.email}</div>
                        </div>
                    </div>
                    <div className="header__profile_menu header__profile_menu--hidden">
                        <Link to="/profile/users" className="header__profile_item">Управление пользователями</Link>
                    </div>
                </div>
                <Link className="header__item header__item--button" to="/login">
                    Выйти
                </Link>
            </div>
        </div>
    );
}

export default Header;