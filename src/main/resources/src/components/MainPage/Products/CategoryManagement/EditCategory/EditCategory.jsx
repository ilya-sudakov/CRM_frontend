import React, { useEffect, useState } from 'react';
import './EditCategory.scss';
import '../../../../../utils/Form/Form.scss';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import { addCategory, getCategoryById, editCategory } from '../../../../../utils/RequestsAPI/Products/Categories.jsx';

const EditCategory = (props) => {
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
    const [categoryId, setCategoryId] = useState(0);

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
        formIsValid() && editCategory(categoryInputs, categoryId)
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
        document.title = "Редактирование категории";
        const id = props.history.location.pathname.split("/products/category/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс заявки!');
            props.history.push("/products");
        } else {
            setCategoryId(id);
            getCategoryById(id)
                .then(res => res.json())
                .then(oldProduct => {
                    setCategoryInputs({
                        category: oldProduct.category
                    });
                })
                .catch(error => {
                    console.log(error);
                    alert('Неправильный индекс категории!');
                    props.history.push("/products");
                })
        }
    }, [])

    return (
        <div className="main-form">
            <div className="main-form__title">Редактирование категории</div>
            <form className="main-form__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputText
                    inputName="Название категории"
                    required
                    error={errors.category}
                    defaultValue={categoryInputs.category}
                    name="category"
                    handleInputChange={handleInputChange}
                    errorsArr={errors}
                    setErrorsArr={setErrors}
                />
                <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/products')} value="Вернуться назад" />
                    <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Редактировать категорию" />
                </div>
            </form>
        </div>
    );
};

export default EditCategory;