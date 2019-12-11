import React, { useEffect, useState } from 'react';
import './NewEmployee.scss';
import { addEmployee } from '../../../../../utils/utilsAPI.jsx';

const NewEmployee = (props) => {
    const [employeeInputs, setEmployeeInputs] = useState({
        name: '',
        lastName: '',
        middleName: '',
        yearOfBirth: '',
        citizenship: '',
        position: '',
        workshop: 'ЦехЛЭМЗ',
        passportScan: [],
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
        passportScan: '',
        comment: '',
        relevance: ''
    })
    const [nameValid, setNameValid] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'name':
                setNameValid(value !== "");
                break;
        }
    }

    const formIsValid = () => {
        if (nameValid) {
            return true;
        }
        else {
            alert("Форма не заполнена");
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        formIsValid() && addEmployee(employeeInputs)
            .then(() => props.history.push("/dispatcher/employees"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setEmployeeInputs({
            ...employeeInputs,
            [name]: value
        })
    }

    const [imgName, setImgName] = useState([]);
    const handleFileInputChange = (event) => {
        let regex = /.+\.(jpeg|jpg|png|img)/;
        let file = Array.from(event.target.files);
        file.map((photo) => {
            if (photo.name.match(regex) !== null) {
                let prevNames = imgName;
                prevNames.push(photo.name);
                setImgName(
                    prevNames
                );
                let reader = new FileReader();
                reader.onloadend = (() => {
                    let prevScans = employeeInputs.passportScan;
                    prevScans.push(reader.result);
                    setEmployeeInputs({
                        ...employeeInputs,
                        passportScan: prevScans
                    })
                });
                reader.readAsDataURL(photo);
            }
        })
    }

    useEffect(() => {
        document.title = "Добавление сотрудника";
    }, [])
    return (
        <div className="new_employee">
            <div className="new_employee__title">Новый сотрудник</div>
            <form className="new_employee__form">
                <div className="new_employee__item">
                    <div className="new_employee__input_name">Имя*</div>
                    <div className="new_employee__input_field">
                        <input type="text"
                            name="name"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="new_employee__item">
                    <div className="new_employee__input_name">Фамилия*</div>
                    <div className="new_employee__input_field">
                        <input type="text"
                            name="lastName"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="new_employee__item">
                    <div className="new_employee__input_name">Отчество*</div>
                    <div className="new_employee__input_field">
                        <input type="text"
                            name="middleName"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="new_employee__item">
                    <div className="new_employee__input_name">Год рождения*</div>
                    <div className="new_employee__input_field">
                        <input type="text"
                            name="yearOfBirth"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="new_employee__item">
                    <div className="new_employee__input_name">Гражданство*</div>
                    <div className="new_employee__input_field">
                        <input type="text"
                            name="citizenship"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="new_employee__item">
                    <div className="new_employee__input_name">Цех*</div>
                    <div className="new_employee__input_field">
                        <select
                            name="workshop"
                            onChange={handleInputChange}
                            defaultValue={employeeInputs.workshop}
                        >
                            <option value="ЦехЛЭМЗ">ЦехЛЭМЗ</option>
                            <option value="ЦехЛепсари">ЦехЛепсари</option>
                            <option value="ЦехЛиговский">ЦехЛиговский</option>
                        </select>
                    </div>
                </div>
                <div className="new_employee__item">
                    <div className="new_employee__input_name">Должность*</div>
                    <div className="new_employee__input_field">
                        <input type="text"
                            name="position"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="new_employee__item">
                    <div className="new_employee__input_name">Паспорт*</div>
                    <div className="new_employee__file_upload">
                        <div className="new_employee__file_name">
                            {imgName.map((photo) => {
                                return (
                                    <div>
                                        {photo}
                                    </div>
                                )
                            })}
                        </div>
                        <label className="new_employee__label" htmlFor="file">
                            Загрузить файл
                                {/* <img className="logo" src={fileUploadImg} alt="" /> */}
                        </label>
                        <input type="file" name="passportScan" id="file" onChange={handleFileInputChange} />
                    </div>
                </div>
                <div className="new_employee__item">
                    <div className="new_employee__input_name">Комментарий*</div>
                    <div className="new_employee__input_field">
                        <input type="text"
                            name="comment"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="new_employee__item">
                    <div className="new_employee__input_name">Актуальность*</div>
                    <div className="new_employee__input_field">
                        <select
                            name="relevance"
                            onChange={handleInputChange}
                            defaultValue={employeeInputs.relevance}
                        >
                            <option value="Работает">Работает</option>
                            <option value="Уволен">Уволен</option>
                        </select>
                    </div>
                </div>
                <div className="new_employee__input_hint">* - поля, обязательные для заполнения</div>
                <input className="new_employee__submit" type="submit" onClick={handleSubmit} value="Добавить сотрудника" />
            </form>
        </div>
    );
};

export default NewEmployee;