import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
// import * as DateFNS from "date-fns/esm";
import ru from 'date-fns/locale/ru';
import { addRequest } from '../../../../utils/utilsAPI.jsx';

import "react-datepicker/dist/react-datepicker.css";
import '../../../../../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import './NewRequest.scss';

const NewRequest = (props) => {
    const [requestInputs, setRequestInputs] = useState({
        date: new Date(),
        products: "",
        quantity: "",
        codeWord: "",
        responsible: "",
        status: "Не готово"
    })
    const [requestErrors, setRequestErrors] = useState({
        date: "",
        products: "",
        quantity: "",
        codeWord: "",
        responsible: "",
        status: "",
    })
    const [dateValid, setDateValid] = useState(true);
    const [productsValid, setProductsValid] = useState(false);
    const [quantityValid, setQuantityValid] = useState(false);
    const [responsibleValid, setResponsibleValid] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'date':
                value !== "" ? setDateValid(true) : setDateValid(false);
                break;
            case 'products':
                value !== "" ? setProductsValid(true) : setProductsValid(false);
                break;
            case 'quantity':
                setQuantityValid(value !== "");
                break;
            case 'responsible':
                value !== "" ? setResponsibleValid(true) : setResponsibleValid(false);
                break;
        }
    }

    const formIsValid = () => {
        if (dateValid && productsValid && quantityValid && responsibleValid) {
            return true;
        }
        else {
            alert("Форма не заполнена");
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        formIsValid() && addRequest(requestInputs)
            .then(() => props.history.push("/requests"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setRequestInputs({
            ...requestInputs,
            [name]: value
        })
    }

    useEffect(() => {
        document.title = "Создание заявки";
    }, [])

    const handleDateChange = (date) => {
        validateField("date", date);
        setRequestInputs({
            ...requestInputs,
            date: date
        })
    }

    return (
        <div className="new_request">
            <div className="new_request__title">Новая заявка</div>
            <form className="new_request__form">
                <div className="new_request__input_name">Дата</div>
                <div className="new_request__input_field">
                    <DatePicker
                        selected={requestInputs.date}
                        onChange={handleInputChange}
                        dateFormat="dd.MM.yyyy"
                        onChange={handleDateChange}
                        disabledKeyboardNavigation
                        locale={ru}
                    />
                </div>
                <div className="new_request__input_name">Продукция</div>
                <div className="new_request__input_field">
                    <input type="text" name="products" autoComplete="off" onChange={handleInputChange} />
                </div>
                <div className="new_request__input_name">Количество</div>
                <div className="new_request__input_field">
                    <input type="text" name="quantity" autoComplete="off" onChange={handleInputChange} />
                </div>
                <div className="new_request__input_name">Кодовое слово</div>
                <div className="new_request__input_field">
                    <input type="text" name="codeWord" autoComplete="off" onChange={handleInputChange} />
                </div>
                <div className="new_request__input_name">Ответственный</div>
                <div className="new_request__input_field">
                    <input type="text" name="responsible" autoComplete="off" onChange={handleInputChange} />
                </div>
                <input className="new_request__submit" type="submit" onClick={handleSubmit} value="Оформить заявку" />
            </form>
        </div>
    );
};

export default NewRequest;