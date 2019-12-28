import React, { useState, useEffect } from 'react';
import './NewStamp.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';
import { addPartsToStamp, addStamp } from '../../../../../../utils/utilsAPI.jsx';
import InputText from '../../../../../../utils/Form/InputText/InputText.jsx';

const NewStamp = (props) => {
    const [stampInputs, setStampInputs] = useState({
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
    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'parts':
                setValidInputs({
                    ...validInputs,
                    parts: (value.length > 0)
                });
                break;
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
            alert("Форма не заполнена");
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let stampId = 1;
        formIsValid() && addStamp(stampInputs)
            .then(res => res.json())
            .then(res => stampId = res.id)
            .then(() => {
                const stamps = stampInputs.parts.map((item) => {
                    let newPart = Object.assign({
                        ...item,
                        riggingId: stampId
                    })
                    return addPartsToStamp(newPart);
                })
                Promise.all(stamps)
                    .then(() => props.history.push("/dispatcher/rigging/stamp"))
            })
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setStampInputs({
            ...stampInputs,
            [name]: value
        })
        setRiggingErrors({
            ...riggingErrors,
            [name]: false
        })
    }

    const handlePartsChange = (newParts) => {
        validateField("parts", newParts);
        setStampInputs({
            ...stampInputs,
            parts: newParts
        })
        setRiggingErrors({
            ...riggingErrors,
            parts: false
        })
    }

    useEffect(() => {
        document.title = "Создание штампа";
    }, [])

    return (
        <div className="new_stamp">
            <div className="new_stamp__title">Новый штамп</div>
            <form className="new_stamp__form">
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
                <div className="new_stamp__item">
                    <div className="new_stamp__input_name">Детали*</div>
                    <div className="new_stamp__input_field">
                        <SelectParts
                            handlePartsChange={handlePartsChange}
                        />
                    </div>
                </div>
                <div className="new_stamp__input_hint">* - поля, обязательные для заполнения</div>
                <input className="new_stamp__submit" type="submit" onClick={handleSubmit} value="Добавить запись" />
            </form>
        </div>
    )
}

export default NewStamp;