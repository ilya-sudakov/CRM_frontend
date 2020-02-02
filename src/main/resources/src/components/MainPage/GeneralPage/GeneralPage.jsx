import React, { useState, useEffect } from 'react';
import XLSX from 'xlsx';
import { AdminWorkspace } from '../lazyImports.jsx';
import { Link } from 'react-router-dom';
import './GeneralPage.scss';
import '../../../utils/MainWindow/MainWindow.scss';
import { formatDateString } from '../../../utils/functions.jsx';

const GeneralPage = (props) => {
    const [date, setDate] = useState(new Date());

    const exportCSVFile = (event) => {

        // event.preventDefault();
        let dataLEMZ = [
            {
                fullName: 'Иван Иванов Иванович',
                hours: 8
            },
            {
                fullName: 'Иван Иванов Иванови3ч',
                hours: 3
            },
            {
                fullName: 'Иван Ива44нов Иванови3ч',
                hours: 4
            }
        ];
        let dataLepsari = [
            {
                fullName: ' Иванов Иванович',
                hours: 8
            },
            {
                fullName: 'Иван Иванови3ч',
                hours: 9
            },
            {
                fullName: 'Иван Ива44нов Иванови3ч',
                hours: 4
            }
        ];
        const dates = [[], []];
        for (let i = 1; i < 32; i++)
            if (i < 16) dates[0].push(i);
            else dates[1].push(i);
        console.log(dates);
        //Сегодняшнее число
        let dataWS;
        dataWS = XLSX.utils.aoa_to_sheet([dates[0]]);
        dataWS = XLSX.utils.sheet_add_aoa([dates[1]]);
        // dataWS = XLSX.utils.aoa_to_sheet([[formatDateString(date)]]);
        // dataWS = XLSX.utils.sheet_add_aoa(dataWS, [['ФИО работника', 'Часы']], { origin: 'A3' });
        // dataWS = XLSX.utils.sheet_add_aoa(dataWS, [['ЦехЛЭМЗ']], { origin: 'A5' });
        // dataWS = XLSX.utils.sheet_add_json(dataWS, dataLEMZ, { origin: 'A6', skipHeader: true }); //from json to sheet
        // dataWS = XLSX.utils.sheet_add_aoa(dataWS, [['ЦехЛепсари']], { origin: ('A' + (dataLEMZ.length + 7)) });
        // dataWS = XLSX.utils.sheet_add_json(dataWS, dataLepsari, { origin: ('A' + (dataLEMZ.length + 8)), skipHeader: true }); //from json to sheet
        //Кастомные заголовки
        // dataWS.A3.v = "ФИО работника";
        // dataWS.B3.v = "Часы";
        //Авто определение ширины столбцов
        // let objectMaxLength = [];
        // for (let i = 0; i < dataLEMZ.length; i++) {
        //     let value = Object.values(dataLEMZ[i]);
        //     for (let j = 0; j < value.length; j++) {
        //         if (typeof value[j] == "number") {
        //             objectMaxLength[j] = 10;
        //         } else {
        //             objectMaxLength[j] =
        //                 objectMaxLength[j] >= value[j].length
        //                     ? objectMaxLength[j]
        //                     : value[j].length;
        //         }
        //     }
        // }
        // var wscols = [
        //     { width: objectMaxLength[0] },  // first column
        //     { width: objectMaxLength[1] }, // second column
        // ];
        // //Новая ширина столбцов
        // dataWS["!cols"] = wscols;
        // //merge ячеек A1 и B1
        // const mergeCols = [
        //     { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
        //     { s: { r: 4, c: 0 }, e: { r: 4, c: 1 } },
        //     { s: { r: (dataLEMZ.length + 6), c: 0 }, e: { r: (dataLEMZ.length + 6), c: 1 } }
        // ];
        // dataWS["!merges"] = mergeCols;
        let wb = XLSX.utils.book_new(); //Создание новой workbook
        XLSX.utils.book_append_sheet(wb, dataWS, 'Табель');
        XLSX.writeFile(wb, 'табель.xlsx');
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