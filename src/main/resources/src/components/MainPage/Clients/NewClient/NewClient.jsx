import React, { useState, useEffect } from 'react';
import './NewClient.scss';
import '../../../../utils/Form/Form.scss';
import { addClient } from '../../../../utils/RequestsAPI/Clients.jsx';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';

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
        client: false,
        contact: false,
        address: false,
        file: false,
        status: false,
        smpl: false,
    });
    const [validInputs, setValidInputs] = useState({
        client: false,
        contact: false,
        address: false,
        file: false,
        status: false,
        smpl: true,
    });

    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const validateField = (fieldName, value) => {
        switch (fieldName) {
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
            client: false,
            contact: false,
            address: false,
            file: false,
            status: false,
            smpl: false,
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
        setFormErrors(newErrors);
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
        console.log(clientInputs);
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
        setFormErrors({
            ...formErrors,
            [name]: false
        })
    }

    useEffect(() => {
        document.title = "Добавление клиента";
    })

    return (
        <div className="new_client">
            <div className="main-form">
                <div className="main-form__title">Новый клиент</div>
                <form className="main-form__form">
                    <ErrorMessage
                        message="Не заполнены все обязательные поля!"
                        showError={showError}
                        setShowError={setShowError}
                    />
                    <InputText
                        inputName="Клиент"
                        required
                        name="client"
                        error={formErrors.client}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Контакт"
                        required
                        name="contact"
                        error={formErrors.contact}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Адрес"
                        required
                        name="address"
                        error={formErrors.address}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Досье"
                        required
                        name="file"
                        error={formErrors.file}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Статус"
                        required
                        name="status"
                        error={formErrors.status}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <div className="main-form__item">
                        <div className="main-form__input_name">Упрощенка</div>
                        <div className="main-form__input_field">
                            <select name="smpl" onChange={handleInputChange}>
                                <option value={true}>Да</option>
                                <option value={false}>Нет</option>
                            </select>
                        </div>
                    </div>
                    <div className="main-form__buttons">
                        <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/clients')} value="Вернуться назад" />
                        <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Добавить клиента" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default newClient;