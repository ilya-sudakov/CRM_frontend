import React, { useState, useEffect } from 'react';
import './NewPackaging.scss';
import '../../../../utils/Form/Form.scss';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import Button from '../../../../utils/Form/Button/Button.jsx';

const NewPackaging = (props) => {
    const [formInputs, setFormInputs] = useState({
        name: '',
        quantity: 0,
        size: '',
        comment: '',
    });
    const [formErrors, setFormErrors] = useState({
        name: false,
        quantity: false,
        size: false,
        comment: false,
    });
    const [validInputs, setValidInputs] = useState({
        name: false,
        quantity: false,
        size: false,
        comment: false,
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
            name: false,
            quantity: false,
            size: false,
            comment: false,
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
        // event.preventDefault();
        setIsLoading(true);
        console.log(forminp);
        // formIsValid() && addProduct(productInputs)
        //     .then(() => {

        //     })
        //     .then(() => props.history.push("/packaging"))
        //     .catch(error => {
        //         setIsLoading(false);
        //         alert('Ошибка при добавлении записи');
        //     })
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setFormInputs({
            ...formInputs,
            [name]: value
        })
        setFormErrors({
            ...formErrors,
            [name]: false
        })
    }

    useEffect(() => {
        document.title = "Создание упаковки";
    }, [])

    return (
        <div className="new-packaging">
            <div className="main-form">
                <div className="main-form__title">Создание упаковки</div>
                <form className="main-form__form">
                    <ErrorMessage
                        message="Не заполнены все обязательные поля!"
                        showError={showError}
                        setShowError={setShowError}
                    />
                    <InputText
                        inputName="Наименование"
                        required
                        error={formErrors.name}
                        name="name"
                        handleInputChange={handleInputChange}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                    />
                    <InputText
                        inputName="Кол-во штук"
                        required
                        type="number"
                        error={formErrors.quantity}
                        name="quantity"
                        handleInputChange={handleInputChange}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                    />
                    <InputText
                        inputName="Размер"
                        required
                        error={formErrors.size}
                        name="size"
                        handleInputChange={handleInputChange}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                    />
                    <InputText
                        inputName="Комментарий"
                        name="comment"
                        handleInputChange={handleInputChange}
                    />
                    <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                    <div className="main-form__buttons">
                        <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/packaging')} value="Вернуться назад" />
                        <Button
                            text="Добавить упаковку"
                            isLoading={isLoading}
                            className="main-form__submit"
                            onClick={handleSubmit}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPackaging;