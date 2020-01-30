import React, { useEffect, useState } from 'react';
import './WorkManagement.scss';
import { Link } from 'react-router-dom';

const WorkManagement = (props) => {
    const [recordedWork, setRecordedWork] = useState([
        {
            id: 1,
            responsible: 'Григорьев А. В.',
            workshop: 'ЦехЛЭМЗ',
            time: 8.5,
        },
        {
            id: 2,
            responsible: 'Константинов П. И.',
            workshop: 'ЦехЛепсари',
            time: 12,
        }
    ]);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {

    }, [])

    return (
        <div className="work-management">
            <div className="work-management__title">{
                'Учет рабочего времени - ' + (
                    props.userHasAccess(['ROLE_ADMIN'])
                        ? 'Сводка предприятия'
                        : props.userHasAccess(['ROLE_LEMZ'])
                            ? 'ЦехЛЭМЗ'
                            : 'ЦехЛепсари'
                )
            }</div>
            <div className="work-management__content">
                <div className="work-management__search-bar">
                    <input
                        type="text"
                        className="work-management__input"
                        placeholder="Введите данные работника для поиска..."
                        onKeyPress={(event) => {
                            // event.preventDefault();
                            event.key === 'Enter' && setSearchQuery(event.target.value);
                        }}
                    />
                    <button className="work-management__search-button" onClick={(event) => {
                        event.preventDefault();
                        setSearchQuery(document.getElementsByClassName('work-management__input')[0].value);
                    }}>Поиск</button>
                </div>
                {(recordedWork.length === 0) && <div className="work-management__info">Нет записей о проведенной работе за сегодня!</div>}
                <div className="work-management__list">
                    {recordedWork.filter(item => (
                        item.responsible.includes(searchQuery) ||
                        item.workshop.includes(searchQuery) ||
                        item.time.toString().includes(searchQuery)
                    )).map((item) => (
                        <Link className="work-management__item" to={'/work-managment/record-time/edit/' + item.id}>
                            <div>{item.responsible}</div>
                            <div>Время работы: {item.time} часов</div>
                            <div>{item.workshop}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkManagement;