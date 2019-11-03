import React, { useState, useEffect } from 'react';
import './NewRequest.scss';

const NewRequest = () => {
    const [requestInputs, setRequestInputs] = useState({
        client: '',
        contact: '',
    })

    const handleSubmit = (event) => {
        event.preventDefault();
    }

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
                <input className="new_request__submit" type="submit" onClick={handleSubmit}></input>
            </form>
        </div>
    );
};

export default NewRequest;