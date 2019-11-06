import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = (props) => {
    return (
        <div className="header">
            <div className="header__company">
                <div className="header__logo">
                    Лого
                </div>
                <div className="header__name">
                    Osfix
                </div>
            </div>
            <div className="header__menu">
                <div className="header__item header__item--user">
                    <div className="header__username">{props.userData.name}</div>
                    <div className="header__email">{props.userData.email}</div>
                </div>
                <Link className="header__item" to="/login">
                    Выход
                </Link>
            </div>
        </div>
    );
}

export default Header;