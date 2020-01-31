import React, { useEffect, useState } from 'react';
import './WorkManagement.scss';
import { Link } from 'react-router-dom';
import searchImg from '../../../../../../../../assets/searchbar/search.svg';
import { getRecordedWorks, getRecordedWorkByMonth } from '../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx';

const WorkManagement = (props) => {
    const [recordedWork, setRecordedWork] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getRecordedWorkByMonth(new Date().getMonth() + 1)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setRecordedWork(res);
            })
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
                    }}>
                        <img className="work-management__img" src={searchImg} alt="" />
                        <span>Поиск</span>
                    </button>
                </div>
                {
                    (recordedWork.length === 0)
                        ? <div className="work-management__info">Нет записей о проведенной работе за сегодня!</div>
                        : <div className="work-management__list">
                            {recordedWork.filter(item => (
                                item.employee.lastName.includes(searchQuery) ||
                                item.hours.toString().includes(searchQuery) ||
                                item.employee.workshop.includes(searchQuery)
                            )).map((item) => (
                                <Link className="work-management__item" to={'/work-managment/record-time/edit/' + item.id}>
                                    <div>{item.employee.lastName + ' ' + item.employee.name + ' ' + item.employee.middleName}</div>
                                    <div>Время работы: {item.hours} часов</div>
                                    <div>{item.employee.workshop}</div>
                                </Link>
                            ))}
                        </div>
                }
            </div>
        </div>
    );
};

export default WorkManagement;