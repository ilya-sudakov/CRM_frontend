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
    const [workshops, setWorkshops] = useState([
        {
            name: 'ЦехЛЭМЗ',
            visibility: ['ROLE_ADMIN', 'ROLE_LEMZ', 'ROLE_DISPATCHER'],
            active: true
        },
        {
            name: 'ЦехЛепсари',
            visibility: ['ROLE_ADMIN', 'ROLE_LEPSARI', 'ROLE_DISPATCHER'],
            active: true
        },
        {
            name: 'ЦехЛиговский',
            visibility: ['ROLE_ADMIN', 'ROLE_LIGOVSKIY', 'ROLE_DISPATCHER', 'ROLE_MANAGER'],
            active: true
        },
        {
            name: 'Офис',
            visibility: ['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_MANAGER', 'ROLE_ENGINEER'],
            active: true
        }
    ]);

    useEffect(() => {
        let abortController = new AbortController();
        setIsLoading(true);
        getRecordedWorkByDay((new Date()).getMonth() + 1, (new Date()).getDate() - 1, abortController.signal)
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                setRecordedWork(res);
                setIsLoading(false);
            })
        return function cancel() {
            abortController.abort();
        };
    }, [])

    return (
        <div className="work-management">
            <div className="work-management__title">
                <div className="work-management__date">{formatDateString(new Date(new Date().setDate(new Date().getDate() - 1)))}</div>
                <span>{
                    (
                        props.userHasAccess(['ROLE_ADMIN'])
                            ? 'Сводка дня'
                            : (props.userHasAccess(['ROLE_DISPATCHER']) || props.userHasAccess(['ROLE_MANAGER']))
                                ? 'Офис'
                                : props.userHasAccess(['ROLE_LEPSARI'])
                                    ? 'ЦехЛепсари'
                                    : props.userHasAccess(['ROLE_LEMZ'])
                                        ? 'ЦехЛЭМЗ'
                                        : props.userHasAccess(['ROLE_LIGOVSKIY'])
                                            ? 'ЦехЛиговский'
                                            : props.userHasAccess(['ROLE_ENGINEER']) && 'Инженер'
                    )
                }</span>
                <div className="work-management__button work-management__button--inverted" onClick={() => {
                    props.history.push("/work-managment");
                }}>Открыть</div>
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
                            {recordedWork.filter(item => {
                                if (
                                    item.employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    item.hours.toString().includes(searchQuery) ||
                                    item.employee.workshop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    item.employee.workshop.toLowerCase().includes(searchQuery.toLowerCase())
                                ) {
                                    let check = false;
                                    workshops.map(workshop => {
                                        if (workshop.name === item.employee.workshop && props.userHasAccess(workshop.visibility)) {
                                            check = true;
                                            return;
                                        }
                                    })
                                    return check;
                                }
                            }).map((item) => (
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