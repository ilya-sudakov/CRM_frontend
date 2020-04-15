import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sortIcon from '../../../../../../../../../assets/tableview/sort_icon.png';
import pdfMake from 'pdfmake';
import './TableView.scss';
import { formatDateString } from '../../../../../utils/functions.jsx';
import { getEmployeesByWorkshopListPdfText } from '../../../../../utils/pdfFunctions.jsx';
import TableDataLoading from '../../../../../utils/TableView/TableDataLoading/TableDataLoading.jsx';

const TableView = (props) => {
    const [workshops, setWorkshops] = useState([
        'ЦехЛЭМЗ',
        'ЦехЛепсари',
        'ЦехЛиговский',
        'Офис',
        'Уволенные'
    ]);
    const [workshopsVisible, setWorkshopsVisible] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState({
        curSort: 'id',
        date: 'desc'
    })

    const changeSortOrder = (event) => {
        const name = event.target.getAttribute("name");
        setSortOrder({
            curSort: name,
            [name]: (sortOrder[name] === "desc" ? "asc" : "desc")
        })
    }

    const searchQuery = (data) => {
        const query = props.searchQuery.toLowerCase();
        return data.filter(item => (
            item.lastName.toLowerCase().includes(query) ||
            item.name.toLowerCase().includes(query) ||
            item.middleName.toLowerCase().includes(query) ||
            item.id.toString().includes(query) ||
            item.yearOfBirth.toString().includes(query) ||
            item.citizenship.toLowerCase().includes(query) ||
            item.workshop.toLowerCase().includes(query) ||
            item.position.toLowerCase().includes(query) ||
            item.comment.toLowerCase().includes(query) ||
            item.relevance.toLowerCase().includes(query)
        ))
    }

    const sortEmployees = (data) => {
        return searchQuery(data).sort((a, b) => {
            if (a[sortOrder.curSort] < b[sortOrder.curSort]) {
                return (sortOrder[sortOrder.curSort] === "desc" ? 1 : -1);
            }
            if (a[sortOrder.curSort] > b[sortOrder.curSort]) {
                return (sortOrder[sortOrder.curSort] === "desc" ? -1 : 1);
            }
            return 0;
        })
    }

    const checkWorkshop = (index) => {
        index = Number.parseInt(index);
        return workshopsVisible.map((element, element_index) => {
            if (element.id == index) {
                let temp2 = Object.assign({
                    id: index,
                    hidden: !element.hidden
                })
                return temp2;
            }
            return (element);
        })
    }

    const isWorkshopHidden = (index) => {
        index = Number.parseInt(index);
        let check = true;
        workshopsVisible.map((element) => {
            if (element.id === index) {
                check = element.hidden;
            }
        })
        return check;
    }

    const handleClickWorkshop = (event) => {
        let id = event.currentTarget.getAttribute('id');
        setWorkshopsVisible([...checkWorkshop(id)]);
    }

    useEffect(() => {
        if (workshopsVisible.length === 0) {
            let temp = [];
            workshops.map((element, index) => (
                temp.push({
                    id: index,
                    hidden: true
                })
            ));
            setWorkshopsVisible([
                ...temp,
            ]);
        }
        props.data.length > 0 && setIsLoading(false);
    }, [props.data])

    return (
        <div className="tableview_employees">
            <div className="tableview_employees__row tableview_employees__row--header">
                <div className="tableview_employees__col">ФИО</div>
                <div className="tableview_employees__col">
                    <span>Дата рождения</span>
                    <img name="yearOfBirth" className="tableview_employees__img" onClick={changeSortOrder} src={sortIcon} />
                </div>
                <div className="tableview_employees__col">Гражданство</div>
                <div className="tableview_employees__col">Подразделение</div>
                <div className="tableview_employees__col">Должность</div>
                <div className="tableview_employees__col">Комментарий</div>
                <div className="tableview_employees__col">Актуальность</div>
                <div className="tableview_employees__col">Действия</div>
            </div>
            {/* {sortEmployees(props.data).map((employee, employee_id) => (
                <div key={employee_id} className={"tableview_employees__row " + (employee.id % 2 === 0 ? "tableview_employees__row--even" : "tableview_employees__row--odd")}>
                    <div className="tableview_employees__col">{employee.lastName + ' ' + employee.name + ' ' + employee.middleName}</div>
                    <div className="tableview_employees__col">{formatDateString(employee.yearOfBirth)}</div>
                    <div className="tableview_employees__col">{employee.citizenship}</div>
                    <div className="tableview_employees__col">{employee.workshop}</div>
                    <div className="tableview_employees__col">{employee.position}</div>
                    <div className="tableview_employees__col">{employee.comment}</div>
                    <div className="tableview_employees__col">{employee.relevance}</div>
                    <div className="tableview_employees__actions">
                        <Link to={"/dispatcher/employees/view/" + employee.id} className="tableview_employees__action">Просмотр</Link>
                        <Link to={"/dispatcher/employees/edit/" + employee.id} className="tableview_employees__action">Редактировать</Link>
                        {props.userHasAccess(['ROLE_ADMIN']) && <div data-id={employee.id} className="tableview_employees__action" onClick={props.deleteItem}>Удалить</div>}
                    </div>
                </div>
            ))} */}
            {workshops.map((item, index) => (
                <React.Fragment>
                    <div className="tableview_employees__row tableview_employees__row--even" id={index} onClick={handleClickWorkshop}>
                        <div className="tableview_employees__col"></div>
                        <div className="tableview_employees__col"></div>
                        <div className="tableview_employees__col"></div>
                        <div className="tableview_employees__col">{item}</div>
                        <div className="tableview_employees__col"></div>
                        <div className="tableview_employees__col"></div>
                        <div className="tableview_employees__col"></div>
                        <div className="tableview_employees__actions">
                            <div className="tableview_employees__action" onClick={() => {
                                let dd = getEmployeesByWorkshopListPdfText(props.data.filter(employee => ((item === employee.workshop && employee.relevance !== 'Уволен') || (item === 'Уволенные' && employee.relevance === 'Уволен'))), item);
                                pdfMake.createPdf(dd).print();
                            }}>Печать</div>
                        </div>
                    </div>
                    <div id={index} className={(isWorkshopHidden(index) === true)
                        ? "tableview_employees__employees tableview_employees__employees--hidden"
                        : "tableview_employees__employees"}>
                        {isLoading && <TableDataLoading
                            minHeight='50px'
                            className="tableview_employees__row tableview_employees__row--even"
                        />}
                        {sortEmployees(props.data).map((employee, employee_id) => (
                            ((item === employee.workshop && employee.relevance !== 'Уволен') || (item === 'Уволенные' && employee.relevance === 'Уволен')) && <div key={employee_id} className={"tableview_employees__row tableview_employees__row--odd"}>
                                <div className="tableview_employees__col">{employee.lastName + ' ' + employee.name + ' ' + employee.middleName}</div>
                                <div className="tableview_employees__col">{formatDateString(employee.yearOfBirth)}</div>
                                <div className="tableview_employees__col">{employee.citizenship}</div>
                                <div className="tableview_employees__col">{employee.workshop}</div>
                                <div className="tableview_employees__col">{employee.position}</div>
                                <div className="tableview_employees__col">{employee.comment}</div>
                                <div className="tableview_employees__col">{employee.relevance}</div>
                                <div className="tableview_employees__actions">
                                    <Link to={"/dispatcher/employees/view/" + employee.id} className="tableview_employees__action">Просмотр</Link>
                                    <Link to={"/dispatcher/employees/edit/" + employee.id} className="tableview_employees__action">Редактировать</Link>
                                    {props.userHasAccess(['ROLE_ADMIN']) && <div data-id={employee.id} className="tableview_employees__action" onClick={props.deleteItem}>Удалить</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}

export default TableView;