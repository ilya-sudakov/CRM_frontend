import React, { useState, useEffect } from 'react';
import './RecordWork.scss';
import { getUsers } from '../../../../../utils/RequestsAPI/Users.jsx';
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx';
import InputUser from '../../../../../utils/Form/InputUser/InputUser.jsx';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';
import SearchBar from '../../../SearchBar/SearchBar.jsx';
import FormWindow from '../../../../../utils/Form/FormWindow/FormWindow.jsx';

const RecordWork = (props) => {
    const [worktimeInputs, setWorkTimeInputs] = useState({
        date: new Date(),
        responsible: '',
        works: ''
    })
    const [workTimeErrors, setWorkTimeErrors] = useState({
        date: false,
        responsible: false,
        works: false
    })
    const [validInputs, setValidInputs] = useState({
        date: true,
        responsible: false,
        works: false
    })
    const [users, setUsers] = useState([]);
    const [showError, setShowError] = useState(false);
    const [showWindow, setShowWindow] = useState(false);
    const [searchQueryCategory, setSearchQueryCategory] = useState('');

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
            responsible: false,
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

    const handleDateChange = (date) => {
        validateField("date", date);
        setWorkTimeInputs({
            ...worktimeInputs,
            date: date
        })
        setWorkTimeErrors({
            ...workTimeErrors,
            date: false
        })
    }

    const handleResponsibleChange = (newResponsible) => {
        validateField("responsible", newResponsible)
        setWorkTimeInputs({
            ...worktimeInputs,
            responsible: newResponsible
        })
        setWorkTimeErrors({
            ...workTimeErrors,
            responsible: false
        })
    }

    useEffect(() => {
        document.title = "Создание заявки";
        getUsers()
            .then(res => res.json())
            .then(res => {
                setUsers(res);
            })
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
                    handleDateChange={handleDateChange}
                    errorsArr={workTimeErrors}
                    setErrorsArr={setWorkTimeErrors}
                />
                {/* Заменить на список сотрудников */}
                <button className="" onClick={(e) => {
                    e.preventDefault();
                    setShowWindow(!showWindow);
                }}>
                    Обзор
                </button>
                <FormWindow
                    title="Выбор сотрудника"
                    content={
                        <React.Fragment>
                            <SearchBar
                                title="Поиск по сотрудникам"
                                placeholder="Введите ФИО сотрудника для поиска для поиска..."
                                setSearchQuery={setSearchQueryCategory}
                            />
                        </React.Fragment>
                    }
                    // headerButton={{
                    //     name: 'Создать продукцию',
                    //     path: '/products/new'
                    // }}
                    showWindow={showWindow}
                    setShowWindow={setShowWindow}
                />
                {/* Создание работы */}
                <InputText
                    inputName="Работы"
                    required
                    error={workTimeErrors.works}
                    name="works"
                    handleInputChange={handleInputChange}
                    errorsArr={workTimeErrors}
                    setErrorsArr={setWorkTimeErrors}
                />
                <div className="record-work__input_hint">* - поля, обязательные для заполнения</div>
                <input className="record-work__submit" type="submit" onClick={handleSubmit} value="Создать запись" />
            </form>
        </div>
    );
};

export default RecordWork;