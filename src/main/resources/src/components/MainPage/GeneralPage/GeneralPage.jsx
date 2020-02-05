import React, { useState, useEffect } from 'react';
import XLSX from 'xlsx';
import { AdminWorkspace } from '../lazyImports.jsx';
import { Link } from 'react-router-dom';
import './GeneralPage.scss';
import '../../../utils/MainWindow/MainWindow.scss';
import { formatDateString } from '../../../utils/functions.jsx';
import DownloadIcon from '../../../../../../../assets/download.png';
import { getRecordedWorkByMonth, getWorkReportByEmployee } from '../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx';
import { getEmployeesByWorkshop } from '../../../utils/RequestsAPI/Employees.jsx';
import ImgLoader from '../../../utils/TableView/ImgLoader/ImgLoader.jsx';

const GeneralPage = (props) => {
    const [date, setDate] = useState(new Date());
    const [workshops, setWorkshops] = useState([
        'ЦехЛЭМЗ',
        'ЦехЛепсари',
        'ЦехЛиговский',
        'Офис',
        'Уволенные'
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const exportCSVFile = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const dates = [[''], ['']];
        for (let i = 1; i < new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 0).getDate() + 1; i++)
            if (i < 16) dates[0].push(i);
            else dates[1].push(i);
        let dataWS;
        const months = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ]
        dataWS = XLSX.utils.aoa_to_sheet([['Табель - ' + (months[new Date().getMonth()])]]);
        dataWS = XLSX.utils.sheet_add_aoa(dataWS, [dates[0]], { origin: 'A3'});
        let globalIndex = 4;
        let employeesList = [];
        let employeesWorksList = [];
        const allWorkshops = workshops.map(workshop => {
            // console.log(workshop);
            return getEmployeesByWorkshop({
                workshop: workshop
            })
                .then(employees => employees.json())
                .then(employees => {
                    employeesList.push(...employees);
                })
        })
        Promise.all(allWorkshops)
            .then(() => {
                const allEmployees = employeesList.sort((a, b) => {
                    if (a.lastName < b.lastName) {
                        return -1;
                    }
                    if (a.lastName > b.lastName) {
                        return 1;
                    }
                    return 0;
                }).map(item => {
                    return getWorkReportByEmployee(item.id, ((new Date()).getMonth() + 1))
                        .then(res => res.json())
                        .then(res => {
                            // console.log(res);
                            employeesWorksList.push(res);
                            let employeeInfo = [[(item.lastName + ' ' + item.name + ' ' + item.middleName)]];
                            dates[0].map(date => {
                                let check = null;
                                res.days.map(workDay => {
                                    if (workDay.day === (date + 1)) {
                                        // console.log(workDay.day, date);
                                        check = workDay.hours;
                                    }
                                })
                                if ((dates[0].length - 1) < employeeInfo[0].length) {
                                    return;
                                }
                                if (check === null) {
                                    return employeeInfo[0].push('');
                                }
                                else {
                                    return employeeInfo[0].push(check);
                                }

                            })
                            // console.log([employeeInfo[0]]);
                            dataWS = XLSX.utils.sheet_add_aoa(dataWS, [employeeInfo[0]], { origin: ('A' + (globalIndex++)) });
                        })
                })
                Promise.all(allEmployees)
                    .then(() => {
                        dataWS = XLSX.utils.sheet_add_aoa(dataWS, [dates[1]], { origin: ('A' + ((globalIndex++) + 1)) });
                        globalIndex++;
                        const allEmployees = employeesWorksList.sort((a, b) => {
                            if (a.employee.lastName < b.employee.lastName) {
                                return -1;
                            }
                            if (a.employee.lastName > b.employee.lastName) {
                                return 1;
                            }
                            return 0;
                        }).map((res, index) => {
                            // console.log(res);
                            let employeeInfo = [[(res.employee.lastName + ' ' + res.employee.name + ' ' + res.employee.middleName)]];
                            dates[1].map(date => {
                                let check = null;
                                res.days.map(workDay => {
                                    if (workDay.day === (date + 1)) {
                                        // console.log(workDay.day, date);
                                        check = workDay.hours;
                                    }
                                })
                                if ((dates[0].length - 1) < employeeInfo[0].length) {
                                    return;
                                }
                                if (check === null) {
                                    employeeInfo[0].push('');
                                }
                                else {
                                    employeeInfo[0].push(check);
                                }
                            })
                            dataWS = XLSX.utils.sheet_add_aoa(dataWS, [employeeInfo[0]], { origin: ('A' + (globalIndex++)) });
                        })
                        Promise.all(allEmployees)
                            .then(() => {
                                // console.log([employeeInfo[0]]);
                                var wscols = [
                                    { width: 25 },  // first column
                                ];
                                //Новая ширина столбцов
                                dataWS["!cols"] = wscols;
                                let wb = XLSX.utils.book_new(); //Создание новой workbook
                                XLSX.utils.book_append_sheet(wb, dataWS, 'Табель');
                                XLSX.writeFile(wb, 'Табель-' + (
                                    (months[(new Date()).getMonth()])
                                ) + '_' + ((new Date()).getFullYear()) + '.xlsx');
                                setIsLoading(false);
                            })
                    })
            })
    }

    useEffect(() => {
        document.title = "Главная страница";
    })

    return (
        <div className="general-page">
            <div className="main-window">
                <div className="main-window__title">Главная страница</div>
                <div className="main-window__content">
                    <div className="main-window__date">{'Дата: ' + formatDateString(date)}</div>
                    <div className="main-window__control-panel">
                        {props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_MANAGER']) && <Link className="main-window__button" to="work-managment/record-time/new">Учесть рабочее время</Link>}
                        {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__button" onClick={exportCSVFile}>
                            <img className="main-window__img" src={DownloadIcon} alt="" />
                            <span>Скачать Табель</span>
                        </div>}
                        {props.userHasAccess(['ROLE_ADMIN']) && isLoading && <ImgLoader />}
                    </div>
                    {
                        props.userHasAccess(['ROLE_ADMIN', 'ROLE_DISPATCHER', 'ROLE_MANAGER']) && <AdminWorkspace
                            userHasAccess={props.userHasAccess}
                        />
                    }
                </div>
            </div>
        </div>
    );
};

export default GeneralPage;