import React, { useEffect, useState } from 'react';
import './NewStorage.scss';
import '../../../../utils/Form/Form.scss';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import { addStorage } from '../../../../utils/RequestsAPI/Workshop/LemzStorage.jsx';

const NewPart = (props) => {
    const [storageInputs, setStorageInputs] = useState({
        number: '',
        name: '',
        quantity: '',
        comment: ''
    })
    const [storageErrors, setStorageErrors] = useState({
        number: false,
        name: false,
        quantity: false,
        comment: false
    })
    const [validInputs, setValidInputs] = useState({
        number: false,
        name: false,
        quantity: false,
        comment: false
    })
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
            number: false,
            name: false,
            quantity: false,
            comment: false
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
        setStorageErrors(newErrors);
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
        formIsValid() && addStorage(storageInputs)
            .then(() => props.history.push("/lemz/workshop-storage"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setStorageInputs({
            ...storageInputs,
            [name]: value
        })
        setStorageErrors({
            ...storageErrors,
            [name]: false
        })
    }

    useEffect(() => {
        document.title = "Добавление детали на склад";
    }, [])
    return (
        <div className="main-form">
            <div className="main-form__title">Новая деталь</div>
            <form className="main-form__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputText
                    inputName="Название"
                    required
                    error={storageErrors.name}
                    name="name"
                    handleInputChange={handleInputChange}
                    errorsArr={storageErrors}
                    setErrorsArr={setStorageErrors}
                />
                <InputText
                    inputName="Номер"
                    required
                    error={storageErrors.number}
                    name="number"
                    type="number"
                    handleInputChange={handleInputChange}
                    errorsArr={storageErrors}
                    setErrorsArr={setStorageErrors}
                />
                <InputText
                    inputName="Количество"
                    required
                    error={storageErrors.quantity}
                    name="quantity"
                    handleInputChange={handleInputChange}
                    errorsArr={storageErrors}
                    setErrorsArr={setStorageErrors}
                />
                <InputText
                    inputName="Комментарий"
                    required
                    error={storageErrors.comment}
                    name="comment"
                    handleInputChange={handleInputChange}
                    errorsArr={storageErrors}
                    setErrorsArr={setStorageErrors}
                />
                <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/lemz/workshop-storage')} value="Вернуться назад" />
                    <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Добавить деталь" />
                </div>
            </form>
        </div>
    );
};

export default NewPart;