import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './WorkManagementPage.scss';
import '../../../../../utils/MainWindow/MainWindow.scss';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
// import viewSVG from '../../../../../../../../../assets/tableview/view.svg';
import deleteSVG from '../../../../../../../../../assets/tableview/delete.svg';
import editSVG from '../../../../../../../../../assets/tableview/edit.svg';
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx';
// import DownloadIcon from '../../../../../../../../../assets/download.png';
import { formatDateString } from '../../../../../utils/functions.jsx';
import { getRecordedWorkByDateRange, deleteRecordedWork, deleteProductFromRecordedWork } from '../../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx';
// import TableDataLoading from '../../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx';
import TableLoading from '../../../../../utils/TableView/TableLoading/TableLoading.jsx';

const WorkManagementPage = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [workItems, setWorkItems] = useState([]);
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
    const [dates, setDates] = useState({
        // start: new Date(new Date().setMonth((new Date()).getMonth() - 1)),
        // end: new Date()
        start: new Date(new Date().setDate((new Date()).getDate() - 1)),
        // start: new Date(),
        end: new Date()
    });
    const [isLoading, setIsLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState({
        curSort: 'date',
        date: 'asc'
    })
    const changeSortOrder = (event) => {
        const name = event.target.value.split(' ')[0];
        const order = event.target.value.split(' ')[1];
        setSortOrder({
            curSort: name,
            [name]: (sortOrder[name] === "desc" ? "asc" : "desc")
        })
    }

    const loadWorks = () => {
        setIsLoading(true);
        getRecordedWorkByDateRange(
            (dates.start.getDate()),
            (dates.start.getMonth() + 1),
            (dates.end.getDate()),
            (dates.end.getMonth() + 1)
        )
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setWorkItems([...res.map(item => {
                    return {
                        ...item,
                        openWorks: false
                    }
                })]);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        loadWorks();
        console.log(workItems);
    }, [])

    return (
        <div className="work-management-page">
            <div className="main-window">
                <div className="main-window__title">
                    <div className="main-window__title">
                        <span>Отчет производства</span>
                        {/* {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__button" onClick={() => { exportCSVFile() }}>
                            <img className="main-window__img" src={DownloadIcon} alt="" />
                            <span>Скачать Excel</span>
                        </div>} */}
                    </div>
                </div>
                <SearchBar
                    title="Поиск по записям"
                    placeholder="Введите запрос для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    <div className="work-management-page__date-pick">
                        <div className="work-management-page__date">
                            <InputDate
                                inputName="Начало:"
                                selected={Date.parse(dates.start)}
                                handleDateChange={(value) => {
                                    setDates({
                                        ...dates,
                                        start: value
                                    });
                                }}
                            />
                        </div>
                        <div className="work-management-page__date">
                            <InputDate
                                inputName="Конец:"
                                selected={Date.parse(dates.end)}
                                handleDateChange={(value) => {
                                    setDates({
                                        ...dates,
                                        end: value
                                    });
                                }}
                            />
                        </div>
                        <div
                            className="main-window__button"
                            onClick={() => loadWorks()}
                        >Применить фильтр</div>
                    </div>
                    <div className="work-management-page__workshop-pick">
                        {workshops.map((item, index) => {
                            if (props.userHasAccess(item.visibility)) {
                                return <div
                                    className={item.active ? "main-window__button" : "main-window__button main-window__button--inverted"}
                                    onClick={() => {
                                        let temp = workshops;
                                        temp.splice(index, 1, {
                                            ...temp[index],
                                            name: item.name,
                                            active: !item.active
                                        })
                                        setWorkshops([...temp]);
                                    }}
                                >{item.name}</div>
                            }
                        })}
                        <div className="main-window__amount_table">Всего: {workItems.length} записей</div>
                    </div>
                </div>
                <div className="main-window__sort-panel">
                    <span>Сортировка: </span>
                    <select onChange={changeSortOrder}>
                        <option value="date asc">По дате</option>
                        <option value="lastName desc">По алфавиту (А-Я)</option>
                        <option value="lastName asc">По алфавиту (Я-А)</option>
                        <option value="hours desc">По часам</option>
                    </select>
                </div>
                <div className="main-window__list">
                    {/* {isLoading && <TableDataLoading
                        className="main-window__list-item"
                    />} */}
                    <TableLoading
                        isLoading={isLoading}
                    />
                    {workshops.map(workshop => {
                        if (
                            workshop.active
                            && workItems.find(item => item.employee.workshop === workshop.name) !== undefined
                            && props.userHasAccess(workshop.visibility)
                        ) {
                            return <React.Fragment>
                                <div className="main-window__list-item main-window__list-item--divider">
                                    <span>{workshop.name}</span>
                                </div>
                                <div className="main-window__list-item main-window__list-item--header">
                                    <span>Должность</span>
                                    <span>ФИО</span>
                                    <span>Часы</span>
                                    <span>Подразделение</span>
                                    <span>Дата</span>
                                    <div className="main-window__actions">Действие</div>
                                </div>
                                {workItems.filter(item => {
                                    if (
                                        workshop.name === item.employee.workshop &&
                                        (item.employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            item.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            item.employee.middleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            item.employee.workshop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            formatDateString(new Date(item.year, (item.month - 1), item.day)).includes(searchQuery))
                                    ) {
                                        let check = false;
                                        workshops.map(workshop => {
                                            if (
                                                workshop.active && (workshop.name === item.employee.workshop) &&
                                                props.userHasAccess(workshop.visibility)
                                            ) {
                                                check = true;
                                                return;
                                            }
                                        })
                                        return check;
                                    }
                                }
                                ).sort((a, b) => {
                                    if (sortOrder.curSort === 'lastName') {
                                        if (a.employee[sortOrder.curSort] < b.employee[sortOrder.curSort]) {
                                            return (sortOrder[sortOrder.curSort] === "desc" ? 1 : -1);
                                        }
                                        if (a.employee[sortOrder.curSort] > b.employee[sortOrder.curSort]) {
                                            return (sortOrder[sortOrder.curSort] === "desc" ? -1 : 1);
                                        }
                                        return 0;
                                    } else {
                                        if (sortOrder.curSort === 'date') {
                                            if (new Date(a.year, (a.month - 1), a.day) < new Date(b.year, (b.month - 1), b.day)) {
                                                return (sortOrder[sortOrder.curSort] === "desc" ? 1 : -1);
                                            }
                                            if (new Date(b.year, (b.month - 1), b.day) > new Date(b.year, (b.month - 1), b.day)) {
                                                return (sortOrder[sortOrder.curSort] === "desc" ? -1 : 1);
                                            }
                                            return 0;
                                        }
                                        else {
                                            if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
                                                return (sortOrder[sortOrder.curSort] === "desc" ? 1 : -1);
                                            }
                                            if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
                                                return (sortOrder[sortOrder.curSort] === "desc" ? -1 : 1);
                                            }
                                            return 0;
                                        }
                                    }
                                }).map((workItem, workItemIndex) =>
                                    <React.Fragment>
                                        <div className="main-window__list-item" onClick={() => {
                                            let temp = workItems;
                                            let indexTemp = temp.indexOf(temp.find(item => item.id === workItem.id));
                                            temp.splice(indexTemp, 1, {
                                                ...workItem,
                                                openWorks: !workItem.openWorks
                                            });
                                            setWorkItems([...temp]);
                                        }}>
                                            <span><div className="main-window__mobile-text">Должность: </div>{workItem.employee.position}</span>
                                            <span>
                                                <div className="main-window__mobile-text">ФИО: </div>
                                                <div className="main-window__text">{workItem.employee.lastName + ' ' + workItem.employee.name + ' ' + workItem.employee.middleName}</div>
                                            </span>
                                            <span><div className="main-window__mobile-text">Часы: </div>{workItem.hours}</span>
                                            <span><div className="main-window__mobile-text">Подразделение: </div>{workItem.employee.workshop}</span>
                                            <span><div className="main-window__mobile-text">Дата: </div>{formatDateString(new Date(workItem.year, (workItem.month - 1), workItem.day))}</span>
                                            <div className="main-window__actions">
                                                <Link to={"work-managment/record-time/edit/" + workItem.id} className="main-window__action" title="Редактировать">
                                                    <img className="main-window__img" src={editSVG} />
                                                </Link>
                                                <div className="main-window__action" onClick={() => {
                                                    const deletedProducts = workItem.workControlProduct.map(product => {
                                                        return deleteProductFromRecordedWork(workItem.id, product.product.id)
                                                    })
                                                    Promise.all(deletedProducts)
                                                        .then(() => {
                                                            deleteRecordedWork(workItem.id)
                                                                .then(() => {
                                                                    loadWorks()
                                                                })
                                                        })
                                                }} title="Удалить">
                                                    <img className="main-window__img" src={deleteSVG} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={workItem.openWorks ? "main-window__list-options" : "main-window__list-options main-window__list-options--hidden"}>
                                            <span><div className="main-window__mobile-text">Тип работы: </div>{workItem.workList.work} : {workItem.hours} часов</span>
                                            {workItem.workControlProduct.length > 0 && <div className="main-window__list-item main-window__list-item--header">
                                                <span>Название</span>
                                                <span>Кол-во</span>
                                                {/* <span>Часы</span> */}
                                            </div>}
                                            {workItem.workControlProduct.map(item => {
                                                return <div className="main-window__list-item">
                                                    <span><div className="main-window__mobile-text">Название: </div>{item.product.name}</span>
                                                    <span><div className="main-window__mobile-text">Кол-во: </div>{item.quantity}</span>
                                                    {/* <span><div className="main-window__mobile-text">Часы: </div>{workItem.hours}</span> */}
                                                </div>
                                            })}
                                        </div>
                                    </React.Fragment>
                                )
                                }
                            </React.Fragment>
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default WorkManagementPage;