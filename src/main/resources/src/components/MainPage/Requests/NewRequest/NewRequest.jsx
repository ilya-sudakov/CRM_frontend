import React, { useState, useEffect } from 'react';
import './NewRequest.scss';
import { addRequest } from '../../../../utils/utilsAPI.jsx';

const NewRequest = (props) => {
    const [requestInputs, setRequestInputs] = useState({
        date: "",
        products: "",
        codeWord: "",
        responsible: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        addRequest(requestInputs)
            .then(() => props.history.push("/requests"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
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
                    <input type="text" name="date" onChange={handleInputChange} />
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
                <input className="new_request__submit" type="submit" onClick={handleSubmit} value="Оформить" />
            </form>
        </div>
    );
};

export default NewRequest;