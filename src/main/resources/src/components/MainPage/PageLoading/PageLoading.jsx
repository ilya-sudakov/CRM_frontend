import React from 'react';
import './PageLoading.scss';

const PageLoading = () => {
    return (
        <div className="page_loading">
            <div className="page_loading__title">Идет загрузка...</div>
            <div class="lds-ellipsis">
                <div></div><div></div><div></div><div></div>
            </div>
        </div>
    )
}

export default PageLoading;