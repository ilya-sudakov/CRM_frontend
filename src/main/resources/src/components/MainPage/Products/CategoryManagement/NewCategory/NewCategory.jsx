import React, { useEffect, useState } from 'react';
import './NewCategory.scss';
import '../../../../../utils/Form/Form.scss';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import { addCategory } from '../../../../../utils/RequestsAPI/Products/Categories.jsx';
// import ImgLoader from '../../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import Button from '../../../../../utils/Form/Button/Button.jsx';

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
            setIsLoading(false);
            setShowError(true);
            return false;
        };
    }

    const handleSubmit = (event) => {
        // event.preventDefault();
        setIsLoading(true);
        // console.log(categoryInputs);
        formIsValid() && addCategory(categoryInputs)
            .then(() => props.history.push("/products"))
            .catch(error => {
                setIsLoading(false);
                alert('Ошибка при добавлении записи');
                console.log(error);
            })
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
        <div className="main-form">
            <div className="main-form__title">Создание категории</div>
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
                    name="category"
                    handleInputChange={handleInputChange}
                    errorsArr={errors}
                    setErrorsArr={setErrors}
                />
                <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/products')} value="Вернуться назад" />
                    {/* <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Добавить категорию" />
                    {isLoading && <ImgLoader />} */}
                    <Button
                        text="Добавить запись"
                        isLoading={isLoading}
                        className="main-form__submit"
                        onClick={handleSubmit}
                    />
                </div>
            </form>
        </div>
    );
};

export default NewCategory;