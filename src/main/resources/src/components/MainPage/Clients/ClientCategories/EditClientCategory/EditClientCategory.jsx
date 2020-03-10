import React, { useState, useEffect } from 'react';
import './EditClientCategory.scss';
import '../../../../../utils/Form/Form.scss';
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';
import { editClientCategory } from '../../../../../utils/RequestsAPI/Clients/Categories.jsx';
import ImgLoader from '../../../../../utils/TableView/ImgLoader/ImgLoader.jsx';

const EditClientCategory = (props) => {
    const [formInputs, setFormInputs] = useState({
        name: '',
        visibility: 'all'
    });
    const [formErrors, setFormErrors] = useState({
        name: false,
    })
    const [validInputs, setValidInputs] = useState({
        name: true,
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
            name: false,
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
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        console.log(formInputs);
        formIsValid() && editClientCategory(formInputs, formInputs.id)
            .then(() => {
                setIsLoading(false);
                props.onSubmit();
                props.setShowWindow(!props.showWindow);
            })
            .catch(error => {
                setIsLoading(false);
                alert('Ошибка при редактировании записи');
                console.log(error);
            })
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
        console.log(props.category);
        props.category !== null && setFormInputs({
            id: props.category.id,
            name: props.category.name,
            visibility: props.category.visibility,
        })
    }, [props.category])

    return (
        <div className="edit-client-category">
            <div className="main-form">
                <form className="main-form__form">
                    <ErrorMessage
                        message="Не заполнены все обязательные поля!"
                        showError={showError}
                        setShowError={setShowError}
                    />
                    <InputText
                        inputName="Название категории"
                        required
                        error={formErrors.name}
                        defaultValue={formInputs.name}
                        name="name"
                        handleInputChange={handleInputChange}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                    />
                    <div className="main-form__item">
                        <div className="main-form__input_name">Видимость*</div>
                        <div className="main-form__input_field">
                            <select
                                name="visibility"
                                onChange={handleInputChange}
                                value={formInputs.visibility}
                            >
                                <option value="all">Все</option>
                                <option value="adminOnly">Только руководитель</option>
                            </select>
                        </div>
                    </div>
                    <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                    <div className="main-form__buttons">
                        {/* <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => {
                            return props.setShowWindow(!props.showWindow);
                        }} value="Закрыть" /> */}
                        <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Редактировать категорию" />
                        {isLoading && <ImgLoader />}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditClientCategory;