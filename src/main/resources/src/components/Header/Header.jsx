import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
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
                <Link className="header__item" to="/login" >
                    Выход
                </Link>
            </div>
        </div>
    );
}

export default Header;