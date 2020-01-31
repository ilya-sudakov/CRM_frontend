import React, { useState } from 'react';
import './WorkManagementPage.scss';
import '../../../../../utils/MainWindow/MainWindow.scss';
import SearchBar from '../../../SearchBar/SearchBar.jsx';

const WorkManagementPage = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <div className="work-management-page">
            <div className="main-window">
                <div className="main-window__header">
                    <div className="main-window__title">Учет рабочего времени</div>
                </div>
                <SearchBar
                    title="Поиск по записям"
                    placeholder="Введите запрос для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="main-window__amount_table">Всего: {0} записей</div>
                </div>
            </div>
        </div>
    );
};

export default WorkManagementPage;