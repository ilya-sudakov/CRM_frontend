import React, { useState, useEffect } from 'react';
import './NewMachine.scss';
import '../../../../../../utils/Form/Form.scss';
import SelectParts from '../../SelectParts/SelectParts.jsx';
import { addMachine, addPartsToMachine } from '../../../../../../utils/RequestsAPI/Rigging/Machine.jsx';
import InputText from '../../../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';

const NewMachine = (props) => {
    const [machineInputs, setMachineInputs] = useState({
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
            // alert("Форма не заполнена");
            setShowError(true);
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(machineInputs);
        let machineId = 1;
        formIsValid() && addMachine(machineInputs)
            .then(res => res.json())
            .then(res => machineId = res.id)
            .then(() => {
                const parts = machineInputs.parts.map((item) => {
                    let newPart = Object.assign({
                        ...item,
                        riggingId: machineId
                    })
                    return addPartsToMachine(newPart);
                })
                Promise.all(parts)
                    .then(() => props.history.push("/dispatcher/rigging/machine"))
            })
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setMachineInputs({
            ...machineInputs,
            [name]: value
        })
        setRiggingErrors({
            ...riggingErrors,
            [name]: false
        })
    }

    const handlePartsChange = (newParts) => {
        validateField("parts", newParts);
        setMachineInputs({
            ...machineInputs,
            parts: newParts
        })
        setRiggingErrors({
            ...riggingErrors,
            parts: false
        })
    }

    useEffect(() => {
        document.title = "Создание станка";
    }, [])

    return (
        <div className="main-form">
            <div className="main-form__title">Новый станок</div>
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
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/dispatcher/rigging/machine')} value="Вернуться назад" />
                    <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Добавить запись" />
                </div>
            </form>
        </div>
    )
}

export default NewMachine;