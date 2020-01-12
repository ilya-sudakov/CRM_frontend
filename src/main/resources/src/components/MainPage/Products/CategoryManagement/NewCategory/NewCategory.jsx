import React, { useEffect, useState } from 'react';
import './NewCategory.scss';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import { addCategory } from '../../../../../utils/RequestsAPI/Products/Categories.jsx';

const NewCategory = (props) => {
    const [categoryInputs, setCategoryInputs] = useState({
        category: "",
    })
    const [errors, setErrors] = useState({
        category: false,
    })
    const [validInputs, setValidInputs] = useState({
        category: false,
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
            category: false,
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
        setErrors(newErrors);
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
        // console.log(categoryInputs);
        formIsValid() && addCategory(categoryInputs)
            .then(() => props.history.push("/products"))
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
        setCategoryInputs({
            ...categoryInputs,
            [name]: value
        })
        setErrors({
            ...errors,
            [name]: false
        })
    }

    useEffect(() => {
        document.title = "Создание категории";
    }, [])

    return (
        <div className="new_category">
            <div className="new_category__title">Создание категории</div>
            <form className="new_category__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputText
                    inputName="Название категории"
                    required
                    error={errors.category}
                    name="category"
                    handleInputChange={handleInputChange}
                    errorsArr={errors}
                    setErrorsArr={setErrors}
                />
                <div className="new_category__input_hint">* - поля, обязательные для заполнения</div>
                <input className="new_category__submit" type="submit" onClick={handleSubmit} value="Добавить категорию" />
            </form>
        </div>
    );
};

export default NewCategory;