import React, { useEffect, useState } from 'react';
import './EditEmployee.scss';
import { getEmployeeById, editEmployee } from '../../../../../utils/utilsAPI.jsx';

const EditEmployee = (props) => {
    const [employeeInputs, setEmployeeInputs] = useState({
        name: '',
        lastName: '',
        middleName: '',
        yearOfBirth: '',
        citizenship: '',
        position: '',
        workshop: 'ЦехЛЭМЗ',
        passportScan1: '',
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
    const [employeeId, setEmployeeId] = useState(1);
    const [nameValid, setNameValid] = useState(true);

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
        formIsValid() && editEmployee(employeeInputs, employeeId)
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

    useEffect(() => {
        document.title = "Редактирование сотрудника";
        const id = props.history.location.pathname.split("/dispatcher/employees/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс сотрудника!');
            props.history.push("/dispatcher/employees");
        } else {
            setEmployeeId(id);
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

    // const [imgName, setImgName] = useState([]);
    const [imgName, setImgName] = useState('');
    const handleFileInputChange = (event) => {
        let regex = /.+\.(jpeg|jpg|png|img)/;
        let file = Array.from(event.target.files);
        file.map((photo, index) => {
            if (photo.name.match(regex) !== null && index === 0) {
                // let prevNames = imgName;
                // prevNames.push(photo.name);
                // setImgName(prevNames);
                setImgName(photo.name)
                let reader = new FileReader();
                reader.onloadend = (() => {
                    // let prevScans = employeeInputs.passportScan1;
                    // prevScans.push(reader.result);
                    setEmployeeInputs({
                        ...employeeInputs,
                        passportScan1: reader.result
                    })
                });
                reader.readAsDataURL(photo);
            }
        })
    }

    return (
        <div className="edit_employee">
            <div className="edit_employee__title">Редактирование сотрудника</div>
            <form className="edit_employee__form">
                <div className="edit_employee__item">
                    <div className="edit_employee__input_name">Имя*</div>
                    <div className="edit_employee__input_field">
                        <input type="text"
                            name="name"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={employeeInputs.name}
                        />
                    </div>
                </div>
                <div className="edit_employee__item">
                    <div className="edit_employee__input_name">Фамилия*</div>
                    <div className="edit_employee__input_field">
                        <input type="text"
                            name="lastName"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={employeeInputs.lastName}
                        />
                    </div>
                </div>
                <div className="edit_employee__item">
                    <div className="edit_employee__input_name">Отчество*</div>
                    <div className="edit_employee__input_field">
                        <input type="text"
                            name="middleName"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={employeeInputs.middleName}
                        />
                    </div>
                </div>
                <div className="edit_employee__item">
                    <div className="edit_employee__input_name">Год рождения*</div>
                    <div className="edit_employee__input_field">
                        <input type="text"
                            name="yearOfBirth"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={employeeInputs.yearOfBirth}
                        />
                    </div>
                </div>
                <div className="edit_employee__item">
                    <div className="edit_employee__input_name">Гражданство*</div>
                    <div className="edit_employee__input_field">
                        <input type="text"
                            name="citizenship"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={employeeInputs.citizenship}
                        />
                    </div>
                </div>
                <div className="edit_employee__item">
                    <div className="edit_employee__input_name">Цех*</div>
                    <div className="edit_employee__input_field">
                        <select
                            name="workshop"
                            onChange={handleInputChange}
                            value={employeeInputs.workshop}
                        >
                            <option value="ЦехЛЭМЗ">ЦехЛЭМЗ</option>
                            <option value="ЦехЛепсари">ЦехЛепсари</option>
                            <option value="ЦехЛиговский">ЦехЛиговский</option>
                        </select>
                    </div>
                </div>
                <div className="edit_employee__item">
                    <div className="edit_employee__input_name">Должность*</div>
                    <div className="edit_employee__input_field">
                        <input type="text"
                            name="position"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={employeeInputs.position}
                        />
                    </div>
                </div>
                {employeeInputs.passportScan1 && <div className="edit_employee__item">
                    <div className="edit_employee__input_name">Паспорт</div>
                    <div className="edit_employee__passport_img">
                        {/* {employeeInputs.passportScan.map((photo) => (
                            <img src={photo} alt=""/>
                        ))} */}
                        <img src={employeeInputs.passportScan1} alt="" />
                    </div>
                </div>}
                <div className="edit_employee__item">
                    <div className="edit_employee__input_name">Паспорт*</div>
                    <div className="edit_employee__file_upload">
                        <div className="edit_employee__file_name">
                            {/* {imgName.map((photo) => {
                                return (
                                    <div>
                                        {photo}
                                    </div>
                                )
                            })} */}
                            {imgName}
                        </div>
                        <label className="edit_employee__label" htmlFor="file">
                            Загрузить файл
                                {/* <img className="logo" src={fileUploadImg} alt="" /> */}
                        </label>
                        <input type="file" name="passportScan1" id="file" onChange={handleFileInputChange} />
                    </div>
                </div>
                <div className="edit_employee__item">
                    <div className="edit_employee__input_name">Комментарий*</div>
                    <div className="edit_employee__input_field">
                        <input type="text"
                            name="comment"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={employeeInputs.comment}
                        />
                    </div>
                </div>
                <div className="edit_employee__item">
                    <div className="edit_employee__input_name">Актуальность*</div>
                    <div className="edit_employee__input_field">
                        <select
                            name="relevance"
                            onChange={handleInputChange}
                            value={employeeInputs.relevance}
                        >
                            <option value="Работает">Работает</option>
                            <option value="Уволен">Уволен</option>
                        </select>
                    </div>
                </div>
                <div className="edit_employee__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_employee__submit" type="submit" onClick={handleSubmit} value="Изменить сотрудника" />
            </form>
        </div>
    );
};

export default EditEmployee;