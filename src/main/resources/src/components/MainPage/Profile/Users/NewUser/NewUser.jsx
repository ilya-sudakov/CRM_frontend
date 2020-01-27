import React, { useEffect, useState } from 'react';
import './NewUser.scss';
import '../../../../../utils/Form/Form.scss';
import { addUser } from '../../../../../utils/RequestsAPI/Users.jsx';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';

const NewUser = (props) => {
    const [userInputs, setUserInputs] = useState({
        username: "",
        password: "",
        email: "",
        role: "ROLE_ADMIN"
    })
    const [userErrors, setUserErrors] = useState({
        username: false,
        password: false,
        email: false,
        role: false,
    })
    const [validInputs, setValidInputs] = useState({
        username: false,
        password: false,
        email: false,
        role: true,
    })
    const [showError, setShowError] = useState(false);

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
            username: false,
            password: false,
            email: false,
            role: false,
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
        setUserErrors(newErrors);
        if (check === true) {
            return true;
        }
        else {
            // alert("Форма не заполнена");
            setShowError(true);
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userInputs);

        formIsValid() && addUser(userInputs)
            .then(() => props.history.push("/profile/users"))
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
        setUserInputs({
            ...userInputs,
            [name]: value
        })
        setUserErrors({
            ...userErrors,
            [name]: false
        })
    }

    useEffect(() => {
        document.title = "Создание пользователя";
    }, [])

    return (
        <div className="main-form">
            <div className="main-form__title">Создание пользователя</div>
            <form className="main-form__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputText
                    inputName="Имя пользователя"
                    required
                    error={userErrors.username}
                    name="username"
                    handleInputChange={handleInputChange}
                    errorsArr={userErrors}
                    setErrorsArr={setUserErrors}
                />
                <InputText
                    inputName="Пароль"
                    required
                    error={userErrors.password}
                    name="password"
                    handleInputChange={handleInputChange}
                    errorsArr={userErrors}
                    setErrorsArr={setUserErrors}
                />
                <InputText
                    inputName="Эл. почта"
                    required
                    error={userErrors.email}
                    name="email"
                    handleInputChange={handleInputChange}
                    errorsArr={userErrors}
                    setErrorsArr={setUserErrors}
                />
                <div className="main-form__item">
                    <div className="main-form__input_name">Роль</div>
                    <div className="main-form__input_field">
                        <select
                            name="role"
                            onChange={handleInputChange}
                        >
                            <option value="ROLE_ADMIN">Руководитель</option>
                            <option value="ROLE_MANAGER">Менеджер1</option>
                            <option value="ROLE_LEPSARI">Цех Лепсари</option>
                            <option value="ROLE_LEMZ">Цех ЛЭМЗ</option>
                            <option value="ROLE_DISPATCHER">Диспетчер</option>
                            <option value="ROLE_ENGINEER">Инженер</option>
                        </select>
                    </div>
                </div>
                <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/profile/users')} value="Вернуться назад" />
                    <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Добавить пользователя" />
                </div>
            </form>
        </div>
    );
};

export default NewUser;