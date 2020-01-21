import React, { useState, useEffect } from 'react';
import './RecordWork.scss';
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';
import SelectEmployee from '../../../Dispatcher/Employees/SelectEmployee/SelectEmployee.jsx';
import SelectWork from '../SelectWork/SelectWork.jsx';

const RecordWork = (props) => {
    const [worktimeInputs, setWorkTimeInputs] = useState({
        date: new Date(),
        employee: '',
        works: ''
    })
    const [workTimeErrors, setWorkTimeErrors] = useState({
        date: false,
        employee: false,
        works: false
    })
    const [validInputs, setValidInputs] = useState({
        date: true,
        employee: false,
        works: false
    })
    const [showError, setShowError] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'date':
                setValidInputs({
                    ...validInputs,
                    date: (value !== null)
                });
                break;
            default:
                setValidInputs({
                    ...validInputs,
                    [fieldName]: (value !== "")
                });
                break;
        }
    }

    const formIsValid = () => {
        let check = true;
        let newErrors = Object.assign({
            date: false,
            employee: false,
            works: false
        });
        for (let item in validInputs) {
            if (validInputs[item] === false) {
                check = false;
                newErrors = Object.assign({
                    ...newErrors,
                    [item]: true
                })
            }
        }
        setWorkTimeErrors(newErrors);
        if (check === true) {
            return true;
        }
        else {
            setShowError(true);
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let id = 0;
        console.log(worktimeInputs);
        formIsValid() && addRequest(requestInputs)
            .then(res => res.json())
            .then(res => {
                id = res.id;
            })
            .then(() => {
                const productsArr = requestInputs.requestProducts.map((item) => {
                    return addProductsToRequest({
                        requestId: id,
                        quantity: item.quantity,
                        packaging: item.packaging,
                        name: item.name
                    })
                })
                Promise.all(productsArr)
                    .then(() => props.history.push("/"))
            })
            .catch(error => {
                alert('Ошибка при добавлении записи');
                // setShowError(true);
                console.log(error);
            })
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setWorkTimeInputs({
            ...worktimeInputs,
            [name]: value
        })
        setWorkTimeErrors({
            ...workTimeErrors,
            [name]: false
        })
    }

    useEffect(() => {
        document.title = "Создание заявки";
    })

    return (
        <div className="record-work">
            <div className="record-work__title">Новая запись о работе</div>
            <form className="record-work__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputDate
                    inputName="Дата"
                    required
                    error={workTimeErrors.date}
                    name="date"
                    selected={worktimeInputs.date}
                    handleDateChange={(date) => {
                        validateField("date", date);
                        setWorkTimeInputs({
                            ...worktimeInputs,
                            date: date
                        })
                        setWorkTimeErrors({
                            ...workTimeErrors,
                            date: false
                        })
                    }}
                    errorsArr={workTimeErrors}
                    setErrorsArr={setWorkTimeErrors}
                />
                {/* Список сотрудников */}
                <SelectEmployee
                    inputName="Выбор сотрудника"
                    required
                    error={workTimeErrors.employee}
                    userHasAccess={props.userHasAccess}
                    name="employee"
                    handleEmployeeChange={(value) => {
                        validateField("employee", value);
                        setWorkTimeInputs({
                            ...worktimeInputs,
                            employee: value
                        })
                        setWorkTimeErrors({
                            ...workTimeErrors,
                            employee: false
                        })
                    }}
                    errorsArr={workTimeErrors}
                    setErrorsArr={setWorkTimeErrors}
                    readOnly
                />
                {/* Создание работы */}
                {/* <InputText
                    inputName="Работы"
                    required
                    error={workTimeErrors.works}
                    name="works"
                    handleInputChange={handleInputChange}
                    errorsArr={workTimeErrors}
                    setErrorsArr={setWorkTimeErrors}
                /> */}
                <div className="record-work__item">
                    <div className="record-work__input_name">Работа*</div>
                    <div className="record-work__input_field">
                        <SelectWork
                            handleWorkChange={null}
                        />
                    </div>
                </div>
                <div className="record-work__input_hint">* - поля, обязательные для заполнения</div>
                <input className="record-work__submit" type="submit" onClick={handleSubmit} value="Создать запись" />
            </form>
        </div>
    );
};

export default RecordWork;