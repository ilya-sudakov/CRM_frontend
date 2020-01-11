import React, { useState, useEffect } from 'react';
import './NewClient.scss';
import { addClient } from '../../../../utils/RequestsAPI/Clients.jsx';

const newClient = (props) => {
    const [clientInputs, setClientInputs] = useState({
        client: "",
        contact: "",
        address: "",
        file: "",
        status: "",
        smpl: true
    });
    const [formErrors, setFormErrors] = useState({
        client: "",
        contact: "",
        address: "",
        file: "",
        status: "",
        smpl: ""
    });
    const [clientValid, setClientValid] = useState(false);
    const [contactValid, setContactValid] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'client':
                value !== "" ? setClientValid(true) : setClientValid(false);
                break;
            case 'contact':
                value !== "" ? setContactValid(true) : setContactValid(false);
                break;
        }
    }

    const formIsValid = () => {
        if (clientValid && contactValid) {
            return true;
        }
        else {
            alert("Форма не заполнена");
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        formIsValid() && addClient(clientInputs)
            .then(() => props.history.push("/clients"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setClientInputs({
            ...clientInputs,
            [name]: value
        })
    }

    useEffect(() => {
        document.title = "Добавление клиента";
    })

    return (
        <div className="new_client">
            <div className="new_client__title">Новый клиент</div>
            <form className="new_client__form">
                <div className="new_client__input_name">Клиент</div>
                <div className="new_client__input_field">
                    <input type="text" name="client" onChange={handleInputChange} />
                </div>
                <div className="new_client__input_name">Контакт</div>
                <div className="new_client__input_field">
                    <input type="text" name="contact" onChange={handleInputChange} />
                </div>
                <div className="new_client__input_name">Адрес</div>
                <div className="new_client__input_field">
                    <input type="text" name="address" onChange={handleInputChange} />
                </div>
                <div className="new_client__input_name">Досье</div>
                <div className="new_client__input_field">
                    <input type="text" name="file" onChange={handleInputChange} />
                </div>
                <div className="new_client__input_name">Статус</div>
                <div className="new_client__input_field">
                    <input type="text" name="status" onChange={handleInputChange} />
                </div>
                <div className="new_client__input_name">Упрощенка</div>
                <div className="new_client__input_field">
                    {/* <input type="text" name="smpl" onChange={handleInputChange} /> */}
                    <select name="smpl" onChange={handleInputChange}>
                        <option value="true">Да</option>
                        <option value="false">Нет</option>
                    </select>
                </div>
                <input className="new_client__submit" type="submit" onClick={handleSubmit} value="Добавить" />
            </form>
        </div>
    );
};

export default newClient;