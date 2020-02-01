import React, { useState, useEffect } from 'react';
import './NewPressForm.scss';
import '../../../../../../utils/Form/Form.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';
import { addPressForm, addPartsToPressForm } from '../../../../../../utils/RequestsAPI/Rigging/PressForm.jsx';
import InputText from '../../../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import ImgLoader from '../../../../../../utils/TableView/ImgLoader/ImgLoader.jsx';

const NewPressForm = (props) => {
    const [pressFormInputs, setPressFormInputs] = useState({
        name: '',
        number: '',
        comment: '',
        parts: []
    })
    const [riggingErrors, setRiggingErrors] = useState({
        name: false,
        number: false,
        // comment: false,
        parts: false,
    })
    const [validInputs, setValidInputs] = useState({
        name: false,
        number: false,
        // comment: false,
        parts: false,
    })
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'parts':
                setValidInputs({
                    ...validInputs,
                    parts: (value.length > 0)
                });
                break;
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
            number: false,
            // comment: false,
            parts: false,
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
        setRiggingErrors(newErrors);
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
        // console.log(pressFormInputs);
        let pressId = 1;
        formIsValid() && addPressForm(pressFormInputs)
            .then(res => res.json())
            .then(res => pressId = res.id)
            .then(() => {
                const parts = pressFormInputs.parts.map((item) => {
                    let newPart = Object.assign({
                        ...item,
                        riggingId: pressId
                    })
                    return addPartsToPressForm(newPart);
                })
                Promise.all(parts)
                    .then(() => props.history.push("/dispatcher/rigging/press-form"))
            })
            .catch(error => {
                setIsLoading(false);
                alert('Ошибка при добавлении записи');
                console.log(error);
            })
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setPressFormInputs({
            ...pressFormInputs,
            [name]: value
        })
        setRiggingErrors({
            ...riggingErrors,
            [name]: false
        })
    }

    const handlePartsChange = (newParts) => {
        validateField("parts", newParts);
        setPressFormInputs({
            ...pressFormInputs,
            parts: newParts
        })
        setRiggingErrors({
            ...riggingErrors,
            parts: false
        })
    }

    useEffect(() => {
        document.title = "Создание пресс-формы";
    }, [])

    return (
        <div className="main-form">
            <div className="main-form__title">Новая пресс-форма</div>
            <form className="main-form__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputText
                    inputName="Название"
                    required
                    error={riggingErrors.name}
                    name="name"
                    handleInputChange={handleInputChange}
                    errorsArr={riggingErrors}
                    setErrorsArr={setRiggingErrors}
                />
                <InputText
                    inputName="Артикул"
                    required
                    error={riggingErrors.number}
                    name="number"
                    handleInputChange={handleInputChange}
                    errorsArr={riggingErrors}
                    setErrorsArr={setRiggingErrors}
                />
                <InputText
                    inputName="Комментарий"
                    // required
                    // error={riggingErrors.comment}
                    name="comment"
                    handleInputChange={handleInputChange}
                />
                <div className="main-form__item">
                    <div className="main-form__input_name">Детали*</div>
                    <div className="main-form__input_field">
                        <SelectParts
                            handlePartsChange={handlePartsChange}
                        />
                    </div>
                </div>
                <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/dispatcher/rigging/press-form')} value="Вернуться назад" />
                    <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Добавить запись" />
                    {isLoading && <ImgLoader />}
                </div>
            </form>
        </div>
    )
}

export default NewPressForm;