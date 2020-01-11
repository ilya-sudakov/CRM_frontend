import React, { useEffect, useState } from 'react';
import './EditPart.scss';
import { editPart, getPartById } from '../../../../../../utils/RequestsAPI/Parts.jsx';
import InputText from '../../../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';

const EditPart = (props) => {
    const [partInputs, setPartInputs] = useState({
        number: '',
        name: '',
        dimensions: '',
        processing: ''
    })
    const [partId, setPartId] = useState(1);

    const [partErrors, setPartErrors] = useState({
        number: false,
        name: false,
        dimensions: false,
        processing: false
    })
    const [validInputs, setValidInputs] = useState({
        number: true,
        name: true,
        dimensions: true,
        processing: true
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
            // alert("Форма не заполнена");
            setShowError(true);
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        formIsValid() && editPart(partInputs, partId)
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
        document.title = "Редактирование запчасти";
        const id = props.history.location.pathname.split("/dispatcher/rigging/parts/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс запчасти!');
            props.history.push("/dispatcher/rigging/parts");
        } else {
            setPartId(id);
            getPartById(id)
                .then(res => res.json())
                .then(oldRequest => {
                    setPartInputs({
                        name: oldRequest.name,
                        number: oldRequest.number,
                        dimensions: oldRequest.dimensions,
                        processing: oldRequest.processing
                    });
                })
                .catch(error => {
                    console.log(error);
                    alert('Неправильный индекс запчасти!');
                    props.history.push("/dispatcher/rigging/parts");
                })
        }
    }, [])
    return (
        <div className="edit_part">
            <div className="edit_part__title">Редактирование запчасти</div>
            <form className="edit_part__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputText
                    inputName="Название"
                    required
                    error={partErrors.name}
                    name="name"
                    defaultValue={partInputs.name}
                    handleInputChange={handleInputChange}
                    errorsArr={partErrors}
                    setErrorsArr={setPartErrors}
                />
                <InputText
                    inputName="Артикул"
                    required
                    error={partErrors.number}
                    name="number"
                    defaultValue={partInputs.number}
                    handleInputChange={handleInputChange}
                    errorsArr={partErrors}
                    setErrorsArr={setPartErrors}
                />
                <InputText
                    inputName="Размеры"
                    required
                    error={partErrors.dimensions}
                    name="dimensions"
                    defaultValue={partInputs.dimensions}
                    handleInputChange={handleInputChange}
                    errorsArr={partErrors}
                    setErrorsArr={setPartErrors}
                />
                <InputText
                    inputName="Обработка"
                    required
                    error={partErrors.processing}
                    name="processing"
                    defaultValue={partInputs.processing}
                    handleInputChange={handleInputChange}
                    errorsArr={partErrors}
                    setErrorsArr={setPartErrors}
                />
                <div className="edit_part__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_part__submit" type="submit" onClick={handleSubmit} value="Изменить запчасть" />
            </form>
        </div>
    );
};

export default EditPart;