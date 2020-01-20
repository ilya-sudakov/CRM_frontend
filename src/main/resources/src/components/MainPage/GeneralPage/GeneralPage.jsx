import React, { useState, useEffect } from 'react';
import { AdminWorkspace } from '../lazyImports.jsx';
import { Link } from 'react-router-dom';

import './GeneralPage.scss'

const GeneralPage = (props) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        document.title = "Главная страница";
    })

    return (
        <div className="general-page">
            <div className="general-page__title">Главная страница</div>
            <div className="general-page__content">
                <div className="general-page__date">{'Дата: ' + date.getDate()
                    + '.' + (date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1))
                    + '.' + date.getFullYear()
                }</div>
                {props.userHasAccess(['ROLE_ADMIN']) && <Link className="general-page__button" to="work-managment/record-time/new">Учесть рабочее время</Link>}
                {
                    props.userHasAccess(['ROLE_ADMIN']) && <AdminWorkspace
                        userHasAccess={props.userHasAccess}
                    />
                }
            </div>
        </div>
    );
};

export default GeneralPage;