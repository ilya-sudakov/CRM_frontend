import React, { useState, useEffect } from 'react';
import './NewRequest.scss';

const NewRequest = (props) => {
    const [requestInputs, setRequestInputs] = useState({
        client: '',
        contact: '',
        description: '',
        status: '',
        something: '',
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        let inputs = document.querySelectorAll('.new_request__input_field input');
        setRequestInputs({
            client: inputs[0].value,
            contact: inputs[1].value,
            description: inputs[2].value,
            status: inputs[3].value,
            something: inputs[4].value
        });
        props.history.push("/requests");
    }

    useEffect(() => {
        document.title = "Создание заявки";
    })

    return(
        <div className="new_request">
            <div className="new_request__title">Новая заявка</div>
            <form className="new_request__form">
                <div className="new_request__input_name">Клиент</div>
                <div className="new_request__input_field">
                    <input type="text" />
                </div>
                <div className="new_request__input_name">Контакт</div>
                <div className="new_request__input_field">
                    <input type="text" />
                </div>
                <div className="new_request__input_name">Описание</div>
                <div className="new_request__input_field">
                    <input type="text" />
                </div>
                <div className="new_request__input_name">Статус</div>
                <div className="new_request__input_field">
                    <input type="text" />
                </div>
                <div className="new_request__input_name">Заметка</div>
                <div className="new_request__input_field">
                    <input type="text" />
                </div>
                <input className="new_request__submit" type="submit" onClick={handleSubmit} value="Оформить" />
            </form>
        </div>
    );
};

export default NewRequest;