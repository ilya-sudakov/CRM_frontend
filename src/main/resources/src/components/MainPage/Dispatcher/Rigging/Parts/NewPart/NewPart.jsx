import React, { useEffect, useState } from 'react';
import './NewPart.scss';
import '../../../../../../utils/Form/Form.scss';
// import { addPart } from '../../../../../../utils/RequestsAPI/Parts.jsx';
import InputText from '../../../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import ImgLoader from '../../../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import SelectParts from '../../SelectParts/SelectParts.jsx';
import { addPart, addPartsToPart } from '../../../../../../utils/RequestsAPI/Rigging/Parts.jsx';

const NewPart = (props) => {
    const [partInputs, setPartInputs] = useState({
        name: '',
        number: '',
        comment: '',
        parts: [],
        lastEdited: new Date()
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
        let partId = 1;
        formIsValid() && addPart(partInputs)
            .then(res => res.json())
            .then(res => partId = res.id)
            .then(() => {
                const parts = partInputs.parts.map((item) => {
                    let newPart = Object.assign({
                        ...item,
                        riggingId: partId
                    })
                    return addPartsToPart(newPart);
                })
                Promise.all(parts)
                    .then(() => props.history.push("/dispatcher/rigging/parts"))
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
        setPartInputs({
            ...partInputs,
            [name]: value
        })
        setRiggingErrors({
            ...riggingErrors,
            [name]: false
        })
    }

    const handlePartsChange = (newParts) => {
        validateField("parts", newParts);
        setPartInputs({
            ...partInputs,
            parts: newParts
        })
        setRiggingErrors({
            ...riggingErrors,
            parts: false
        })
    }

    useEffect(() => {
        document.title = "Создание запчасти";
    }, [])
    return (
        <div className="main-form">
            <div className="main-form__title">Новая запчасть</div>
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
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/dispatcher/rigging/parts')} value="Вернуться назад" />
                    <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Добавить запчасть" />
                    {isLoading && <ImgLoader />}
                </div>
            </form>
        </div>
    );
};

export default NewPart;