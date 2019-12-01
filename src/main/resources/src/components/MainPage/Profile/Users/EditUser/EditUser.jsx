import React, { useEffect, useState } from 'react';
import './EditUser.scss';
// import { getRequestById, editRequest } from '../../../../utils/utilsAPI.jsx';

const EditUser = (props) => {
    const [userId, setUserId] = useState(1);
    const [userInputs, setUserInputs] = useState({
        username: "",
        password: "",
        email: "",
    })
    const [requestErrors, setRequestErrors] = useState({
        username: "",
        password: "",
        email: "",
    })
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);

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
        document.title = "Редактирование пользователя";
        const id = props.history.location.pathname.split("/profile/users/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс заявки!');
            props.history.push("/profile/users");
        } else {
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
            //         alert('Неправильный индекс заявки!');
            //         props.history.push("/requests");
            //     })
        }
    }, [])

    return (
        <div className="edit_user">
            <div className="edit_user__title">Редактирование пользователя</div>
            <form className="edit_user__form">
                <div className="edit_user__item">
                    <div className="edit_user__input_name">Имя пользователя</div>
                    <div className="edit_user__input_field">
                        <input type="text"
                            name="username"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={userInputs.username}
                        />
                    </div>
                </div>
                <div className="edit_user__item">
                    <div className="edit_user__input_name">Пароль</div>
                    <div className="edit_user__input_field">
                        <input type="text"
                            name="password"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={userInputs.password}
                        />
                    </div>
                </div>
                <div className="edit_user__item">
                    <div className="edit_user__input_name">Эл. почта</div>
                    <div className="edit_user__input_field">
                        <input type="text"
                            name="email"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={userInputs.email}
                        />
                    </div>
                </div>
                <input className="edit_user__submit" type="submit" onClick={handleSubmit} value="Обновить данные" />
            </form>
        </div>
    );
};

export default EditUser;