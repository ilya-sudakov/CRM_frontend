import React, { useState, useEffect } from 'react';
import XLSX from 'xlsx';
import { AdminWorkspace } from '../lazyImports.jsx';
import { Link } from 'react-router-dom';

import './GeneralPage.scss'

const GeneralPage = (props) => {
    const [date, setDate] = useState(new Date());

    const exportCSVFile = (event) => {
        // event.preventDefault();
        let data = [
            {
                // date: 1,
                fullName: 'Иван Иванов Иванович',
                hours: 8
            },
            {
                // date: 2,
                fullName: 'Иван Иванов Иванови3ч',
                hours: 3
            },
            {
                // date: 3,
                fullName: 'Иван Ива44нов Иванови3ч',
                hours: 4
            }
        ];
        let dates = [];
        data.map((item) => {
            dates.push(item.date);
        });
        let dataWS;
        // let dataWS = XLSX.utils.aoa_to_sheet([dates]);
        dataWS = XLSX.utils.json_to_sheet(data); //from json to sheet
        //Кастомные заголовки
        // dataWS.A1.v = "Дата";
        dataWS.A1.v = "ФИО работника";
        dataWS.B1.v = "Часы";
        //Авто определение ширины столбцов
        let objectMaxLength = [];
        for (let i = 0; i < data.length; i++) {
            let value = Object.values(data[i]);
            for (let j = 0; j < value.length; j++) {
                if (typeof value[j] == "number") {
                    objectMaxLength[j] = 10;
                } else {
                    objectMaxLength[j] =
                        objectMaxLength[j] >= value[j].length
                            ? objectMaxLength[j]
                            : value[j].length;
                }
            }
        }
        var wscols = [
            { width: objectMaxLength[0] },  // first column
            { width: objectMaxLength[1] }, // second column
            // { width: objectMaxLength[2] }, //...
        ];
        //Новая ширина столбцов
        dataWS["!cols"] = wscols;
        let wb = XLSX.utils.book_new(); //Создание новой workbook
        XLSX.utils.book_append_sheet(wb, dataWS, 'Табель');
        XLSX.writeFile(wb, 'табель.xlsx');
    }

    useEffect(() => {
        document.title = "Главная страница";
    })

    return (
        <div className="general-page">
            <div className="general-page__title">Главная страница</div>
            <div className="general-page__content">
                <div className="general-page__date">{'Дата: ' + date.getDate()
                    + '.' + (date.getMonth() < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1))
                    + '.' + date.getFullYear()
                }</div>
                <div className="general-page__control-panel">
                    {props.userHasAccess(['ROLE_ADMIN']) && <Link className="general-page__button" to="work-managment/record-time/new">Учесть рабочее время</Link>}
                    {props.userHasAccess(['ROLE_ADMIN']) && <div className="general-page__button" onClick={exportCSVFile}>Скачать Табель</div>}
                </div>
                {
                    props.userHasAccess(['ROLE_ADMIN']) && <AdminWorkspace
                        userHasAccess={props.userHasAccess}
                    />
                }
            </div>
        </div>
    );
};

export default GeneralPage;