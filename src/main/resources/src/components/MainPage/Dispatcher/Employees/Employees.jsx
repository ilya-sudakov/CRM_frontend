import React, { useState, useEffect } from 'react';
import './Employees.scss';
import '../../../../utils/MainWindow/MainWindow.scss';
import SearchBar from '../../SearchBar/SearchBar.jsx';
import TableView from './TableView/TableView.jsx';
import PrintIcon from '../../../../../../../../assets/print.png';
import pdfMake from 'pdfmake';
import { getEmployeesListPdfText } from '../../../../utils/functions.jsx';
import { getEmployees, deleteEmployee, getEmployeesByWorkshop } from '../../../../utils/RequestsAPI/Employees.jsx';
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';

const Employees = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [employees, setEmployees] = useState([]);
    const [workshops, setWorkshops] = useState([
        'ЦехЛЭМЗ',
        'ЦехЛепсари',
        'ЦехЛиговский',
        'Офис',
        'Уволенные'
    ]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = "Сотрудники";
        loadEmployees();
    }, []);

    const loadEmployees = () => {
        setIsLoading(true);
        //Динамический
        let emplArr = [];
        const temp = workshops.map((item) => {
            let workshop = {
                workshop: item
            };
            return getEmployeesByWorkshop(workshop)
                .then(res => res.json())
                .then(res => {
                    res.map(item => emplArr.push(item));
                    setEmployees([...emplArr]);
                })
        })
        Promise.all(temp)
            .then(() => {
                setIsLoading(false);
            })
        //Стандартный способ
        // getEmployees()
        //     .then(res => res.json())
        //     .then(res => {
        //         // console.log(res);
        //         setEmployees(res);
        //     })
        //     .catch(error => {
        //         console.log(error);                
        //     })
    }

    const printEmployeesList = () => {
        let dd = getEmployeesListPdfText(employees.sort((a, b) => {
            if (a.lastName < b.lastName) {
                return -1;
            }
            else return 1;
        }), workshops);
        pdfMake.createPdf(dd).print();
    }

    const deleteItem = (event) => {
        const id = event.target.dataset.id;
        deleteEmployee(id)
            .then(() => loadEmployees())
    }

    return (
        <div className="employees">
            <div className="main-window">
                <div className="main-window__title">Сотрудники</div>
                <SearchBar
                    title="Поиск сотрудников"
                    placeholder="Введите фамилию сотрудника для поиска..."
                    setSearchQuery={setSearchQuery}
                />
                <div className="main-window__info-panel">
                    {isLoading ? <ImgLoader /> : <div className="main-window__button" onClick={printEmployeesList}>
                        <img className="main-window__img" src={PrintIcon} alt="" />
                        <span>Печать списка</span>
                    </div>}
                    <div className="main-window__amount_table">Всего: {employees.length} записей</div>
                </div>
                <TableView
                    data={employees}
                    searchQuery={searchQuery}
                    userHasAccess={props.userHasAccess}
                    deleteItem={deleteItem}
                />
            </div>
        </div>
    )
}

export default Employees;