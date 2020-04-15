import React, { useEffect, useState } from 'react';
import './NewTransportation.scss';
import '../../../../../utils/Form/Form.scss';
import { addTransportation } from '../../../../../utils/RequestsAPI/Transportation.jsx';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx';
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import ImgLoader from '../../../../../utils/TableView/ImgLoader/ImgLoader.jsx';

const NewTransportation = (props) => {
    const [transportationInputs, setTransportationInputs] = useState({
        date: new Date(),
        cargo: '',
        quantity: '',
        sender: 'ЦехЛЭМЗ',
        recipient: 'ЦехЛЭМЗ',
        driver: ''
    })
    const [transportationErrors, setTransportationErrors] = useState({
        date: false,
        cargo: false,
        sender: false,
        recipient: false,
        driver: false
    })
    const [validInputs, setValidInputs] = useState({
        date: true,
        cargo: false,
        sender: true,
        recipient: true,
        driver: false
    })
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'date':
                setValidInputs({
                    ...validInputs,
                    date: (value !== null)
                });
                break;
            default:
                if (validInputs[fieldName] !== undefined) {
                    setValidInputs({
                        ...validInputs,
                        [fieldName]: (value !== "")
                    })
                }
                break;
        }
    }

    const formIsValid = () => {
        let check = true;
        let newErrors = Object.assign({
            date: false,
            cargo: false,
            sender: false,
            recipient: false,
            driver: false
        });
        for (let item in validInputs) {
            // console.log(item, validInputs[item]);            
            if (validInputs[item] === false) {
                check = false;
                newErrors = Object.assign({
                    ...newErrors,
                    [item]: true
                })
            }
        }
        setTransportationErrors(newErrors);
        if (check === true) {
            return true;
        }
        else {
            // alert("Форма не заполнена");
            setIsLoading(false);
            setShowError(true);
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        formIsValid() && addTransportation(transportationInputs)
            .then(() => props.history.push("/dispatcher/transportation"))
            .catch(error => {
                setIsLoading(false);
                alert('Ошибка при добавлении записи');
                console.log(error);
            })
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setTransportationInputs({
            ...transportationInputs,
            [name]: value
        })
        setTransportationErrors({
            ...transportationErrors,
            [name]: false
        })
    }

    const handleDateChange = (date) => {
        const regex = "(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.[12]\d{3})";
        validateField("date", date);
        setTransportationInputs({
            ...transportationInputs,
            date: date
        })
        setTransportationErrors({
            ...transportationErrors,
            date: false
        })
    }

    useEffect(() => {
        document.title = "Создание записи транспортировки";
    }, [])

    return (
        <div className="main-form">
            <div className="main-form__title">Новая запись транспортировки</div>
            <form className="main-form__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputDate
                    inputName="Дата"
                    required
                    error={transportationErrors.date}
                    name="date"
                    selected={transportationInputs.date}
                    handleDateChange={handleDateChange}
                    errorsArr={transportationErrors}
                    setErrorsArr={setTransportationErrors}
                />
                <InputText
                    inputName="Товар"
                    required
                    error={transportationErrors.cargo}
                    name="cargo"
                    handleInputChange={handleInputChange}
                    errorsArr={transportationErrors}
                    setErrorsArr={setTransportationErrors}
                />
                <InputText
                    inputName="Кол-во"
                    name="quantity"
                    handleInputChange={handleInputChange}
                />
                <div className="main-form__item">
                    <div className="main-form__input_name">Откуда*</div>
                    <div className="main-form__input_field">
                        <select
                            name="sender"
                            onChange={handleInputChange}
                            defaultValue={transportationInputs.sender}
                        >
                            <option value="ЦехЛЭМЗ">ЦехЛЭМЗ</option>
                            <option value="ЦехЛепсари">ЦехЛепсари</option>
                            <option value="ЦехЛиговский">ЦехЛиговский</option>
                        </select>
                    </div>
                </div>
                <div className="main-form__item">
                    <div className="main-form__input_name">Куда*</div>
                    <div className="main-form__input_field">
                        <select
                            name="recipient"
                            onChange={handleInputChange}
                            defaultValue={transportationInputs.recipient}
                        >
                            <option value="ЦехЛЭМЗ">ЦехЛЭМЗ</option>
                            <option value="ЦехЛепсари">ЦехЛепсари</option>
                            <option value="ЦехЛиговский">ЦехЛиговский</option>
                        </select>
                    </div>
                </div>
                <InputText
                    inputName="Водитель"
                    required
                    error={transportationErrors.driver}
                    name="driver"
                    handleInputChange={handleInputChange}
                    errorsArr={transportationErrors}
                    setErrorsArr={setTransportationErrors}
                />
                <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/dispatcher/transportation')} value="Вернуться назад" />
                    <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Добавить запись" />
                    {isLoading && <ImgLoader />}
                </div>
            </form>
        </div>
    );
};

export default NewTransportation;