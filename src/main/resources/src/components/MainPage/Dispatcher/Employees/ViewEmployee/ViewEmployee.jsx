import React, { useEffect, useState } from 'react';
import './ViewEmployee.scss';
import { getEmployeeById } from '../../../../../utils/utilsAPI.jsx';

const ViewEmployee = (props) => {
    const [employeeInputs, setEmployeeInputs] = useState({
        name: '',
        lastName: '',
        middleName: '',
        yearOfBirth: '',
        citizenship: '',
        position: '',
        workshop: 'ЦехЛЭМЗ',
        passportScan1: [],
        comment: '',
        relevance: 'Работает'
    })
    const [productErrors, setProductErrors] = useState({
        name: '',
        lastName: '',
        middleName: '',
        yearOfBirth: '',
        citizenship: '',
        position: '',
        workshop: '',
        passportScan1: '',
        comment: '',
        relevance: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        props.history.push("/dispatcher/employees");
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setEmployeeInputs({
            ...employeeInputs,
            [name]: value
        })
    }

    useEffect(() => {
        document.title = "Просмотр сотрудника";
        const id = props.history.location.pathname.split("/dispatcher/employees/view/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс сотрудника!');
            props.history.push("/dispatcher/employees");
        } else {
            getEmployeeById(id)
                .then(res => res.json())
                .then(oldRequest => {
                    setEmployeeInputs({
                        name: oldRequest.name,
                        lastName: oldRequest.lastName,
                        middleName: oldRequest.middleName,
                        yearOfBirth: oldRequest.yearOfBirth,
                        citizenship: oldRequest.citizenship,
                        position: oldRequest.position,
                        workshop: oldRequest.workshop,
                        passportScan1: oldRequest.passportScan1,
                        comment: oldRequest.comment,
                        relevance: oldRequest.relevance
                    });
                })
                .catch(error => {
                    console.log(error);
                    alert('Неправильный индекс сотрудника!');
                    props.history.push("/dispatcher/employees");
                })
        }
    }, [])

    return (
        <div className="view_employee">
            <div className="view_employee__title">Просмотр сотрудника</div>
            <form className="view_employee__form">
                <div className="view_employee__item">
                    <div className="view_employee__input_name">Имя</div>
                    <div className="view_employee__input_field">
                        <input type="text"
                            name="name"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={employeeInputs.name}
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_employee__item">
                    <div className="view_employee__input_name">Фамилия</div>
                    <div className="view_employee__input_field">
                        <input type="text"
                            name="lastName"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={employeeInputs.lastName}
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_employee__item">
                    <div className="view_employee__input_name">Отчество</div>
                    <div className="view_employee__input_field">
                        <input type="text"
                            name="middleName"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={employeeInputs.middleName}
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_employee__item">
                    <div className="view_employee__input_name">Год рождения</div>
                    <div className="view_employee__input_field">
                        <input type="text"
                            name="yearOfBirth"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={employeeInputs.yearOfBirth}
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_employee__item">
                    <div className="view_employee__input_name">Гражданство</div>
                    <div className="view_employee__input_field">
                        <input type="text"
                            name="citizenship"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={employeeInputs.citizenship}
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_employee__item">
                    <div className="view_employee__input_name">Цех</div>
                    <div className="view_employee__input_field">
                        <input type="text"
                            name="workshop"
                            onChange={handleInputChange}
                            value={employeeInputs.workshop}
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_employee__item">
                    <div className="view_employee__input_name">Должность</div>
                    <div className="view_employee__input_field">
                        <input type="text"
                            name="position"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={employeeInputs.position}
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_employee__item">
                    <div className="view_employee__input_name">Комментарий</div>
                    <div className="view_employee__input_field">
                        <input type="text"
                            name="comment"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={employeeInputs.comment}
                            readOnly
                        />
                    </div>
                </div>
                {employeeInputs.passportScan1 && <div className="view_employee__item">
                    <div className="view_employee__input_name">Паспорт</div>
                    <div className="view_employee__passport_img">
                        {/* {employeeInputs.passportScan.map((photo) => (
                            <img src={photo} alt=""/>
                        ))} */}
                        <img src={employeeInputs.passportScan1} alt="" />
                    </div>
                </div>}
                <div className="view_employee__item">
                    <div className="view_employee__input_name">Актуальность</div>
                    <div className="view_employee__input_field">
                        <input type="text"
                            name="relevance"
                            onChange={handleInputChange}
                            value={employeeInputs.relevance}
                            readOnly
                        />
                    </div>
                </div>
                <input className="view_employee__submit" type="submit" onClick={handleSubmit} value="Вернуться назад" />
            </form>
        </div>
    );
};

export default ViewEmployee;