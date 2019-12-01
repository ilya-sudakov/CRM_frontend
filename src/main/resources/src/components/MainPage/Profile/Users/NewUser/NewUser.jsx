import React, { useEffect, useState } from 'react';
import './NewUser.scss';
// import { getRequestById, editRequest } from '../../../../utils/utilsAPI.jsx';

const NewUser = (props) => {
    const [userInputs, setUserInputs] = useState({
        username: "",
        password: "",
        email: "",
        role: ""
    })
    const [requestErrors, setRequestErrors] = useState({
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
        // formIsValid() && editRequest(requestInputs, requestId)
        // .then(() => props.history.push("/requests"))
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
        // setRequestId(id);
        // getRequestById(id)
        //     .then(res => res.json())
        //     .then(oldRequest => {
        //         setRequestInputs({
        //             date: oldRequest.date,
        //             products: oldRequest.products,
        //             quantity: oldRequest.quantity,
        //             codeWord: oldRequest.codeWord,
        //             responsible: oldRequest.responsible,
        //             status: oldRequest.status
        //         });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
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
                            defaultValue={userInputs.username}
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
                            defaultValue={userInputs.password}
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
                            defaultValue={userInputs.email}
                        />
                    </div>
                </div>
                <div className="new_user__item">
                    <div className="new_user__input_name">Роль</div>
                    <div className="new_user__input_field">
                        <select
                            name="role"
                            onChange={handleInputChange}
                            value={userInputs.role}
                        >
                            <option>Руководитель</option>
                            <option>Менеджер1</option>
                            <option>Цех Лепсари</option>
                            <option>Цех ЛЭМЗ</option>
                        </select>
                    </div>
                </div>
                <input className="new_user__submit" type="submit" onClick={handleSubmit} value="Обновить данные" />
            </form>
        </div>
    );
};

export default NewUser;