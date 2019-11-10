import React, { useState, useEffect } from 'react';
import './NewRequest.scss';
import { addRequest } from '../../../../utils/utilsAPI.jsx';

const NewRequest = (props) => {
    const [requestInputs, setRequestInputs] = useState({
        date: "",
        products: "",
        codeWord: "",
        responsible: "",
        status: "Не готово"
    })
    const [requestErrors, setRequestErrors] = useState({
        date: "",
        products: "",
        codeWord: "",
        responsible: "",
        status: "",
    })
    const [dateValid, setDateValid] = useState(false);
    const [productsValid, setProductsValid] = useState(false);
    const [responsibleValid, setResponsibleValid] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'date':
                value !== "" ? setDateValid(true) : setDateValid(false);
                break;
            case 'products':
                value !== "" ? setProductsValid(true) : setProductsValid(false);
                break;
            case 'responsible':
                value !== "" ? setResponsibleValid(true) : setResponsibleValid(false);
                break;
        }
    }

    const formIsValid = () => {
        if (dateValid && productsValid && responsibleValid) {
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
    })

    return (
        <div className="new_request">
            <div className="new_request__title">Новая заявка</div>
            <form className="new_request__form">
                <div className="new_request__input_name">Дата</div>
                <div className="new_request__input_field">
                    <input type="date"
                        name="date"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="new_request__input_name">Продукция</div>
                <div className="new_request__input_field">
                    <input type="text" name="products" onChange={handleInputChange} />
                </div>
                <div className="new_request__input_name">Кодовое слово</div>
                <div className="new_request__input_field">
                    <input type="text" name="codeWord" onChange={handleInputChange} />
                </div>
                <div className="new_request__input_name">Ответственный</div>
                <div className="new_request__input_field">
                    <input type="text" name="responsible" onChange={handleInputChange} />
                </div>
                <div className="new_request__input_name">Статус</div>
                <div className="new_request__input_field">
                    {/* <input type="text" name="status" onChange={handleInputChange} /> */}
                    <select name="status" onChange={handleInputChange}>
                        <option>Не готово</option>
                        <option>В процессе</option>
                        <option>Готово к отгрузке</option>
                        <option>Отгружено</option>
                    </select>
                </div>
                <input className="new_request__submit" type="submit" onClick={handleSubmit} value="Оформить" />
            </form>
        </div>
    );
};

export default NewRequest;