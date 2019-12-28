import React, { useEffect, useState } from 'react';
import './NewPart.scss';
import { addPart } from '../../../../../../utils/utilsAPI.jsx';
import InputText from '../../../../../../utils/Form/InputText/InputText.jsx';

const NewPart = (props) => {
    const [partInputs, setPartInputs] = useState({
        number: '',
        name: '',
        dimensions: '',
        processing: ''
    })
    const [partErrors, setPartErrors] = useState({
        number: false,
        name: false,
        dimensions: false,
        processing: false
    })
    const [validInputs, setValidInputs] = useState({
        number: false,
        name: false,
        dimensions: false,
        processing: false
    })
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
            number: false,
            name: false,
            dimensions: false,
            processing: false
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
        setPartErrors(newErrors);
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
        formIsValid() && addPart(partInputs)
            .then(() => props.history.push("/dispatcher/rigging/parts"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setPartInputs({
            ...partInputs,
            [name]: value
        })
        setPartErrors({
            ...partErrors,
            [name]: false
        })
    }

    useEffect(() => {
        document.title = "Создание запчасти";
    }, [])
    return (
        <div className="new_part">
            <div className="new_part__title">Новая запчасть</div>
            <form className="new_part__form">
                <InputText
                    inputName="Название"
                    required
                    error={partErrors.name}
                    name="name"
                    handleInputChange={handleInputChange}
                    errorsArr={partErrors}
                    setErrorsArr={setPartErrors}
                />
                <InputText
                    inputName="Артикул"
                    required
                    error={partErrors.number}
                    name="number"
                    handleInputChange={handleInputChange}
                    errorsArr={partErrors}
                    setErrorsArr={setPartErrors}
                />
                <InputText
                    inputName="Размеры"
                    required
                    error={partErrors.dimensions}
                    name="dimensions"
                    handleInputChange={handleInputChange}
                    errorsArr={partErrors}
                    setErrorsArr={setPartErrors}
                />
                <InputText
                    inputName="Обработка"
                    required
                    error={partErrors.processing}
                    name="processing"
                    handleInputChange={handleInputChange}
                    errorsArr={partErrors}
                    setErrorsArr={setPartErrors}
                />
                <div className="new_part__input_hint">* - поля, обязательные для заполнения</div>
                <input className="new_part__submit" type="submit" onClick={handleSubmit} value="Добавить запчасть" />
            </form>
        </div>
    );
};

export default NewPart;