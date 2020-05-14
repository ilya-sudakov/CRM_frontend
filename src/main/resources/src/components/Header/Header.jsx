import React, { useState, useEffect } from 'react';
import profileSVG from '../../../../../../assets/header/profile1.svg';
import exitSVG from '../../../../../../assets/header/exit.svg';
import employeeSVG from '../../../../../../assets/header/employee.svg';
import logoSVG from '../../../../../../assets/header/logo.png';
import newLogoSVG from '../../../../../../assets/header/header__new_logo.png';
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
                    {/* <div className="header__name">
                        Меню
                    </div> */}
                </div>
                <Link className="header__link" to="/">
                    <img className="header__logo" src={newLogoSVG} alt="" />
                </Link>
                {/* <div className="header__name">
                    Ц.Р.М.
                </div> */}
            </div>
            <div className="header__menu">
                <div className="header__item header__item--user">
                    <div className="header__profile_data" onClick={props.userHasAccess(["ROLE_ADMIN"]) ? clickProfileMenu : null}>
                        {/* <div> */}
                            <div className="header__username">{props.userData.username}</div>
                            {/* <div className="header__email">{
                                props.userData.roles[0] && (props.userData.roles[0].name === "ROLE_ADMIN" ? 'Руководитель' :
                                    props.userData.roles[0].name === "ROLE_MANAGER" ? 'Менеджер' :
                                        props.userData.roles[0].name === "ROLE_DISPATCHER" ? 'Диспетчер' :
                                            props.userData.roles[0].name === "ROLE_ENGINEER" ? 'Инженер' :
                                                props.userData.roles[0].name === "ROLE_WORKSHOP" ? 'Цех' :
                                                    null)
                            }</div> */}
                        {/* </div> */}
                        <img className="header__userimg" src={profileSVG} alt="" />
                    </div>
                    {props.userHasAccess(["ROLE_ADMIN"]) && <div className="header__profile_menu header__profile_menu--hidden">
                        {/* <div className="header__profile_item" onClick={clickProfileMenu}>
                            <span>{props.userData.username}</span>
                        </div> */}
                        <Link to="/profile/users" className="header__profile_item" onClick={clickProfileMenu}>
                            <img className="header__img" src={employeeSVG} alt="" />
                            <span>Управление пользователями</span>
                        </Link>
                        <Link to="/profile/login-history" className="header__profile_item" onClick={clickProfileMenu}>
                            <img className="header__img" src={exitSVG} alt="" />
                            <span>История входов</span>
                        </Link>
                    </div>}
                </div>
                <Link className="header__item" to="/login">
                    {/* Выйти */}
                    <img className="header__img" src={exitSVG} alt="" />
                </Link>
            </div>
        </div>
    );
}

export default Header;