import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './GeneralPage.scss'

const GeneralPage = () => {
    const date = new Date();
    return (
        <div className="general-page">
            <div className="general-page__title">Главная страница</div>
            <div className="general-page__content">
                <div className="general-page__date">{'Дата: ' + date.getDate()
                    + '.' + (date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1))
                    + '.' + date.getFullYear()
                }</div>
                {/* <Link className="general-page__button" to="work-managment/record-time">Учесть рабочее время</Link> */}
            </div>
        </div>
    );
};

export default GeneralPage;