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
        const overlay = document.getElementsByClassName("main_page__overlay")[0];
        if (menu.classList.contains("header__profile_menu--hidden")) {
            menu.classList.remove("header__profile_menu--hidden");
            overlay.classList.remove("main_page__overlay--hidden");
        }
        else {
            menu.classList.add("header__profile_menu--hidden");
            overlay.classList.add("main_page__overlay--hidden");
        }
    }

    const clickOverlay = (event) => {
        const overlay = document.getElementsByClassName("main_page__overlay")[0];
        if (!overlay.classList.contains("main_page__overlay--hidden")) {
            overlay.classList.add("main_page__overlay--hidden");
            clickProfileMenu();
        }
    }

    return (
        <div className="header">
            <div className="main_page__overlay main_page__overlay--hidden" onClick={clickOverlay}></div>
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
                    <div className="header__profile_data" onClick={props.userHasAccess(["ROLE_ADMIN"]) ? clickProfileMenu : null}>
                        <img className="header__userimg" src={profileSVG} alt="" />
                        <div>
                            <div className="header__username">{props.userData.username}</div>
                            <div className="header__email">{
                                props.userData.roles[0] && (props.userData.roles[0].name === "ROLE_ADMIN" ? 'Администратор' :
                                    props.userData.roles[0].name === "ROLE_MANAGER" ? 'Менеджер' :
                                        props.userData.roles[0].name === "ROLE_DISPATCHER" ? 'Диспетчер' :
                                            props.userData.roles[0].name === "ROLE_ENGINEER" ? 'Инженер' :
                                                props.userData.roles[0].name === "ROLE_WORKSHOP" ? 'Цех' :
                                                    null)
                            }</div>
                        </div>
                    </div>
                    {props.userHasAccess(["ROLE_ADMIN"]) && <div className="header__profile_menu header__profile_menu--hidden">
                        <Link to="/profile/users" className="header__profile_item" onClick={clickProfileMenu}>Управление пользователями</Link>
                        <Link to="/profile/login-history" className="header__profile_item" onClick={clickProfileMenu}>История входов</Link>
                    </div>}
                </div>
                <Link className="header__item header__item--button" to="/login">
                    Выйти
                </Link>
            </div>
        </div>
    );
}

export default Header;