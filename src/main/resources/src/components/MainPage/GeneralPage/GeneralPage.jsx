import React, { useState, useEffect } from 'react';
import XLSX from 'xlsx';
import { AdminWorkspace } from '../lazyImports.jsx';
import { Link } from 'react-router-dom';
import './GeneralPage.scss';
import '../../../utils/MainWindow/MainWindow.scss';
import { formatDateString } from '../../../utils/functions.jsx';
import { getRecordedWorkByMonth, getWorkReportByEmployee } from '../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx';
import { getEmployeesByWorkshop } from '../../../utils/RequestsAPI/Employees.jsx';

const GeneralPage = (props) => {
    const [date, setDate] = useState(new Date());
    const [workshops, setWorkshops] = useState([
        'ЦехЛЭМЗ',
        'ЦехЛепсари',
        'ЦехЛиговский',
        'Офис',
        'Уволенные'
    ]);

    const exportCSVFile = (event) => {
        event.preventDefault();
        const dates = [[''], ['']];
        for (let i = 1; i < 32; i++)
            if (i < 16) dates[0].push(i);
            else dates[1].push(i);
        let dataWS;
        dataWS = XLSX.utils.aoa_to_sheet([dates[0]]);
        let globalIndex = 2;
        let employeesList = [];
        const allWorkshops = workshops.map(workshop => {
            console.log(workshop);
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
                // console.log(employeesList);
                const allEmployees = employeesList.map(item => {
                    return getWorkReportByEmployee(item.id, ((new Date()).getMonth() + 1))
                        .then(res => res.json())
                        .then(res => {
                            // console.log(res);
                            let employeeInfo = [[(res.employee.lastName + ' ' + res.employee.name + ' ' + res.employee.middleName)]];
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
                        // console.log('saving xlsx');
                        let wb = XLSX.utils.book_new(); //Создание новой workbook
                        XLSX.utils.book_append_sheet(wb, dataWS, 'Табель');
                        XLSX.writeFile(wb, 'табель.xlsx');
                    })
            })
            .then(() => {
            })

        // const allWorkshops = workshops.map(workshop => {
        //     console.log(workshop);
        //     return getEmployeesByWorkshop({
        //         workshop: workshop
        //     })
        //         .then(employees => employees.json())
        //         .then(employees => {
        //             const allEmployees = employees.map(item => {
        //                 return getWorkReportByEmployee(item.id, ((new Date()).getMonth() + 1))
        //                     .then(res => res.json())
        //                     .then(res => {
        //                         // console.log(res);
        //                         let employeeInfo = [[(res.employee.lastName + ' ' + res.employee.name + ' ' + res.employee.middleName)]];
        //                         dates[0].map(date => {
        //                             let check = null;
        //                             res.days.map(workDay => {
        //                                 if (workDay.day === (date + 1)) {
        //                                     // console.log(workDay.day, date);
        //                                      check = workDay.hours;
        //                                 }
        //                             })
        //                             if ((dates[0].length - 1) < employeeInfo[0].length) {
        //                                 return;
        //                             }
        //                             if (check === null) {
        //                                  employeeInfo[0].push('');
        //                             }
        //                             else {
        //                                  employeeInfo[0].push(check);
        //                             }

        //                         })
        //                         console.log([employeeInfo[0]]);
        //                         dataWS = XLSX.utils.sheet_add_aoa(dataWS, [employeeInfo[0]], { origin: ('A' + (globalIndex++)) });
        //                     })
        //             })
        //             Promise.all(allEmployees)
        //                 .then(() => {
        //                     console.log('все сотрудники цеха' + workshop);
        //                 })
        // })
        // })
        // Promise.all(allWorkshops)
        //     .then(() => {
        // console.log('saving xlsx');
        // let wb = XLSX.utils.book_new(); //Создание новой workbook
        // XLSX.utils.book_append_sheet(wb, dataWS, 'Табель');
        // XLSX.writeFile(wb, 'табель.xlsx');
        //     })
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
                        {props.userHasAccess(['ROLE_ADMIN']) && <div className="main-window__button" onClick={exportCSVFile}>Скачать Табель</div>}
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