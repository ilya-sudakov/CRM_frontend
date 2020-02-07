import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import XLSX from 'xlsx';
import './WorkManagementPage.scss';
import '../../../../../utils/MainWindow/MainWindow.scss';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx';
import DownloadIcon from '../../../../../../../../../assets/download.png';
import { formatDateString } from '../../../../../utils/functions.jsx';
import { getRecordedWorkByDateRange, deleteRecordedWork, deleteProductFromRecordedWork } from '../../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx';
import TableDataLoading from '../../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx';

const WorkManagementPage = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [workItems, setWorkItems] = useState([]);
    const [workshops, setWorkshops] = useState([
        {
            name: 'ЦехЛЭМЗ',
            active: true
        },
        {
            name: 'ЦехЛепсари',
            active: true
        },
        {
            name: 'ЦехЛиговский',
            active: true
        },
        {
            name: 'Офис',
            active: true
        }
    ]);
    const [dates, setDates] = useState({
        start: new Date(new Date().setMonth((new Date()).getMonth() - 1)),
        end: new Date()
    });
    const [sortOrder, setSortOrder] = useState({
        curSort: 'lastName',
        date: 'desc'
    })
    const [isLoading, setIsLoading] = useState(false);
    const changeSortOrder = (event) => {
        const name = event.target.value.split(' ')[0];
        const order = event.target.value.split(' ')[1];
        setSortOrder({
            curSort: name,
            [name]: (sortOrder[name] === "desc" ? "asc" : "desc")
        })
    }

    // const exportCSVFile = () => {
    //     let dataLEMZ = [
    //         {
    //             fullName: 'Иван Иванов Иванович',
    //             hours: 8
    //         },
    //         {
    //             fullName: 'Иван Иванов Иванови3ч',
    //             hours: 3
    //         },
    //         {
    //             fullName: 'Иван Ива44нов Иванови3ч',
    //             hours: 4
    //         }
    //     ];
    //     let dataLepsari = [
    //         {
    //             fullName: ' Иванов Иванович',
    //             hours: 8
    //         },
    //         {
    //             fullName: 'Иван Иванови3ч',
    //             hours: 9
    //         },
    //         {
    //             fullName: 'Иван Ива44нов Иванови3ч',
    //             hours: 4
    //         }
    //     ];
    //     //Сегодняшнее число
    //     let dataWS;
    //     dataWS = XLSX.utils.aoa_to_sheet([[formatDateString(dates.start)]]);
    //     dataWS = XLSX.utils.sheet_add_aoa(dataWS, [['ФИО работника', 'Часы']], { origin: 'A3' });
    //     dataWS = XLSX.utils.sheet_add_aoa(dataWS, [['ЦехЛЭМЗ']], { origin: 'A5' });
    //     dataWS = XLSX.utils.sheet_add_json(dataWS, dataLEMZ, { origin: 'A6', skipHeader: true }); //from json to sheet
    //     dataWS = XLSX.utils.sheet_add_aoa(dataWS, [['ЦехЛепсари']], { origin: ('A' + (dataLEMZ.length + 7)) });
    //     dataWS = XLSX.utils.sheet_add_json(dataWS, dataLepsari, { origin: ('A' + (dataLEMZ.length + 8)), skipHeader: true }); //from json to sheet
    //     //Кастомные заголовки
    //     // dataWS.A3.v = "ФИО работника";
    //     // dataWS.B3.v = "Часы";
    //     //Авто определение ширины столбцов
    //     let objectMaxLength = [];
    //     for (let i = 0; i < dataLEMZ.length; i++) {
    //         let value = Object.values(dataLEMZ[i]);
    //         for (let j = 0; j < value.length; j++) {
    //             if (typeof value[j] == "number") {
    //                 objectMaxLength[j] = 10;
    //             } else {
    //                 objectMaxLength[j] =
    //                     objectMaxLength[j] >= value[j].length
    //                         ? objectMaxLength[j]
    //                         : value[j].length;
    //             }
    //         }
    //     }
    //     var wscols = [
    //         { width: objectMaxLength[0] },  // first column
    //         { width: objectMaxLength[1] }, // second column
    //     ];
    //     //Новая ширина столбцов
    //     dataWS["!cols"] = wscols;
    //     //merge ячеек A1 и B1
    //     const mergeCols = [
    //         { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
    //         { s: { r: 4, c: 0 }, e: { r: 4, c: 1 } },
    //         { s: { r: (dataLEMZ.length + 6), c: 0 }, e: { r: (dataLEMZ.length + 6), c: 1 } }
    //     ];
    //     dataWS["!merges"] = mergeCols;
    //     let wb = XLSX.utils.book_new(); //Создание новой workbook
    //     XLSX.utils.book_append_sheet(wb, dataWS, 'Табель');
    //     XLSX.writeFile(wb, 'табель.xlsx');
    // }

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
                setWorkItems(res);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        loadWorks();
    }, [])

    return (
        <div className="work-management-page">
            <div className="main-window">
                <div className="main-window__title">
                    <div className="main-window__title">
                        <span>Учет рабочего времени</span>
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
                    </div>
                    <div className="work-management-page__workshop-pick">
                        {workshops.map((item, index) => <div
                            className={item.active ? "main-window__button" : "main-window__button main-window__button--inverted"}
                            onClick={() => {
                                let temp = workshops;
                                temp.splice(index, 1, {
                                    name: item.name,
                                    active: !item.active
                                })
                                setWorkshops([...temp]);
                            }}
                        >{item.name}</div>)}
                        <div className="main-window__amount_table">Всего: {workItems.length} записей</div>
                        <div
                            className="main-window__button"
                            onClick={() => loadWorks()}
                        >Применить фильтр</div>
                    </div>
                </div>
                <div className="main-window__sort-panel">
                    <span>Сортировка: </span>
                    <select onChange={changeSortOrder}>
                        <option value="lastName desc">По алфавиту (А-Я)</option>
                        <option value="lastName asc">По алфавиту (Я-А)</option>
                        <option value="hours desc">По часам</option>
                    </select>
                </div>
                <div className="work-management-page__list">
                    <div className="work-management-page__item work-management-page__item--header">
                        <span>ФИО</span>
                        <span>Часы</span>
                        <span>Подразделение</span>
                        <span>Дата</span>
                        <div className="work-management-page__actions">Действие</div>
                    </div>
                    {isLoading && <TableDataLoading
                        className="work-management-page__item"
                    />}
                    {workItems.filter(item => {
                        if (
                            item.employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.employee.middleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.employee.workshop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            formatDateString(new Date(item.year, (item.month - 1), item.day)).includes(searchQuery)
                        ) {
                            let check = false;
                            workshops.map(workshop => {
                                if (workshop.active && (workshop.name === item.employee.workshop)) {
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
                            if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
                                return (sortOrder[sortOrder.curSort] === "desc" ? 1 : -1);
                            }
                            if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
                                return (sortOrder[sortOrder.curSort] === "desc" ? -1 : 1);
                            }
                            return 0;
                        }
                    }).map(workItem =>
                        <div className="work-management-page__item">
                            <span>
                                <div className="work-management-page__mobile-text">ФИО: </div>
                                <div className="work-management-page__text">{workItem.employee.lastName + ' ' + workItem.employee.name + ' ' + workItem.employee.middleName}</div>
                            </span>
                            <span><div className="work-management-page__mobile-text">Часы: </div>{workItem.hours}</span>
                            <span><div className="work-management-page__mobile-text">Подразделение: </div>{workItem.employee.workshop}</span>
                            <span><div className="work-management-page__mobile-text">Дата: </div>{formatDateString(new Date(workItem.year, (workItem.month - 1), workItem.day))}</span>
                            <div className="work-management-page__actions">
                                {/* <div className="work-management-page__mobile-text">Действия: </div> */}
                                <Link to={"work-managment/record-time/edit/" + workItem.id} className="work-management-page__action">Редактировать</Link>
                                <div className="work-management-page__action" onClick={() => {
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
                                }}>Удалить</div>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default WorkManagementPage;