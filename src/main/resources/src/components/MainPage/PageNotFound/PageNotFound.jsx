import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.scss';

const PageNotFound = () => {
    return(
        <div className="page_not_found">
            <div className="page_not_found__title">Страница не найдена</div>
            <Link className="page_not_found__button" to="/requests">На главную</Link>
        </div>
    )
}

export default PageNotFound;