import React, { useEffect, useState } from 'react';
import './EditUser.scss';
import { getUserById, editUser } from '../../../../../utils/RequestsAPI/Users.jsx';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';

const EditUser = (props) => {
    const [userId, setUserId] = useState(1);
    const [userInputs, setUserInputs] = useState({
        username: "",
        password: "",
        email: "",
    })
    const [userErrors, setUserErrors] = useState({
        username: false,
        password: false,
        email: false,
        role: false,
    })
    const [validInputs, setValidInputs] = useState({
        username: true,
        password: false,
        email: true,
        role: true,
    })
    const [showError, setShowError] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            default:
                setValidInputs({
                    ...validInputs,
                    [fieldName]: (value !== "")
                });
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
        formIsValid() && editUser(userInputs, userId)
            .then(() => {
                props.history.push("/profile/users");
                document.location.reload(true);
            })
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
        document.title = "Редактирование пользователя";
        const id = props.history.location.pathname.split("/profile/users/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс заявки!');
            props.history.push("/profile/users");
        } else {
            setUserId(id);
            getUserById(id)
                .then(res => res.json())
                .then(oldUser => {
                    setUserInputs({
                        username: oldUser.username,
                        email: oldUser.email,
                    });
                })
                .catch(error => {
                    console.log(error);
                    alert('Неправильный индекс заявки!');
                    props.history.push("/profile/users");
                })
        }
    }, [])

    return (
        <div className="edit_user">
            <div className="edit_user__title">Редактирование пользователя</div>
            <form className="edit_user__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputText
                    inputName="Имя пользователя"
                    required
                    error={userErrors.username}
                    defaultValue={userInputs.username}
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
                    defaultValue={userInputs.email}
                    name="email"
                    handleInputChange={handleInputChange}
                    errorsArr={userErrors}
                    setErrorsArr={setUserErrors}
                />
                <div className="edit_user__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_user__submit" type="submit" onClick={handleSubmit} value="Обновить данные" />
            </form>
        </div>
    );
};

export default EditUser;