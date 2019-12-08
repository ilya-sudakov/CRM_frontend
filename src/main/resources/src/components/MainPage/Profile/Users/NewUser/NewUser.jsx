import React, { useEffect, useState } from 'react';
import './NewUser.scss';
import { addUser } from '../../../../../utils/utilsAPI.jsx';

const NewUser = (props) => {
    const [userInputs, setUserInputs] = useState({
        username: "",
        password: "",
        email: "",
        role: "ROLE_ADMIN"
    })
    const [userErrors, setUserErrors] = useState({
        username: "",
        password: "",
        email: "",
        role: ""
    })
    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'username':
                setUsernameValid(value !== "");
                break;
            case 'password':
                setPasswordValid(value !== "");
                break;
            case 'email':
                setEmailValid(value !== "");
                break;
        }
    }

    const formIsValid = () => {
        if (usernameValid && passwordValid && emailValid) {
            return true;
        }
        else {
            alert("Форма не заполнена");
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
    }

    useEffect(() => {
        document.title = "Создание пользователя";
    }, [])

    return (
        <div className="new_user">
            <div className="new_user__title">Создание пользователя</div>
            <form className="new_user__form">
                <div className="new_user__item">
                    <div className="new_user__input_name">Имя пользователя</div>
                    <div className="new_user__input_field">
                        <input type="text"
                            name="username"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="new_user__item">
                    <div className="new_user__input_name">Пароль</div>
                    <div className="new_user__input_field">
                        <input type="text"
                            name="password"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="new_user__item">
                    <div className="new_user__input_name">Эл. почта</div>
                    <div className="new_user__input_field">
                        <input type="text"
                            name="email"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="new_user__item">
                    <div className="new_user__input_name">Роль</div>
                    <div className="new_user__input_field">
                        <select
                            name="role"
                            onChange={handleInputChange}
                        >
                            <option value="ROLE_ADMIN">Руководитель</option>
                            <option value="ROLE_MANAGER">Менеджер1</option>
                            <option value="ROLE_WORKSHOP">Цех Лепсари</option>
                            <option value="ROLE_WORKSHOP">Цех ЛЭМЗ</option>
                            <option value="ROLE_DISPATCHER">Диспетчер</option>
                            <option value="ROLE_ENGINEER">Инженер</option>
                        </select>
                    </div>
                </div>
                <input className="new_user__submit" type="submit" onClick={handleSubmit} value="Добавить пользователя" />
            </form>
        </div>
    );
};

export default NewUser;