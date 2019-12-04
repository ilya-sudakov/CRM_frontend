import React from 'react';
import { Link } from 'react-router-dom';
import './NotAllowedPage.scss';

const NotAllowedPage = () => {
    return(
        <div className="page_not_allowed">
            <div className="page_not_allowed__title">Доступ на эту страницу запрещен</div>
            <Link className="page_not_allowed__button" to="/requests">На главную</Link>
        </div>
    )
}

export default NotAllowedPage;