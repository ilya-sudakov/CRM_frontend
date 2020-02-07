import React, { useEffect, useState } from 'react';
import './WorkManagement.scss';
import { Link, withRouter } from 'react-router-dom';
import searchImg from '../../../../../../../../assets/searchbar/search.svg';
import { getRecordedWorks, getRecordedWorkByMonth, getRecordedWorkByDay } from '../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx';
import { formatDateString } from '../../../../utils/functions.jsx';
import TableDataLoading from '../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx';

const WorkManagement = (props) => {
    const [recordedWork, setRecordedWork] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setIsLoading(true);
        getRecordedWorkByDay((new Date()).getMonth() + 1, (new Date()).getDate())
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                setRecordedWork(res);
                setIsLoading(false);
            })
    }, [])

    return (
        <div className="work-management">
            <div className="work-management__title">
                <div className="work-management__date">{formatDateString(new Date())}</div>
                <span>{
                    'Учет рабочего времени - ' + (
                        props.userHasAccess(['ROLE_ADMIN'])
                            ? 'Сводка дня'
                            : props.userHasAccess(['ROLE_DISPATCHER'])
                                ? 'Офис'
                                : props.userHasAccess(['ROLE_LEPSARI'])
                                    ? 'ЦехЛепсари'
                                    : props.userHasAccess(['ROLE_LEMZ'])
                                        ? 'ЦехЛЭМЗ'
                                        : props.userHasAccess(['ROLE_WORKSHOP'])
                                            ? 'ЦехЛиговский'
                                            : props.userHasAccess(['ROLE_MANAGER'])
                                                ? 'Менеджер'
                                                : props.userHasAccess(['ROLE_ENGINEER']) && 'Инженер'
                    )
                }</span>
                <div className="work-management__button work-management__button--inverted" onClick={() => {
                    props.history.push("/work-managment");
                }}>Перейти</div>
            </div>
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
                        ? (isLoading
                            ? <TableDataLoading className="work-management__item" />
                            : <div className="work-management__info">Нет записей о проведенной работе за сегодня!</div>)
                        : <div className="work-management__list">
                            {recordedWork.filter(item => (
                                item.employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                item.hours.toString().includes(searchQuery) ||
                                item.employee.workshop.toLowerCase().includes(searchQuery.toLowerCase())
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

export default withRouter(WorkManagement);