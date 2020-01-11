import React, { useEffect, useState } from 'react';
import './EditStorage.scss';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import { editStorage, getStorageById } from '../../../../utils/RequestsAPI/Workshop/Storage.jsx';

const EditPart = (props) => {
    const [storageInputs, setStorageInputs] = useState({
        number: '',
        name: '',
        quantity: '',
        comment: ''
    })
    const [storageId, setStorageId] = useState(1);

    const [storageErrors, setStorageErrors] = useState({
        number: false,
        name: false,
        quantity: false,
        comment: false
    })
    const [validInputs, setValidInputs] = useState({
        number: true,
        name: true,
        quantity: true,
        comment: true
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
            quantity: false,
            comment: false
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
        setStorageErrors(newErrors);
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
        formIsValid() && editStorage(storageInputs, storageId)
            .then(() => props.history.push("/workshop-storage"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setStorageInputs({
            ...storageInputs,
            [name]: value
        })
        setStorageErrors({
            ...storageErrors,
            [name]: false
        })
    }

    useEffect(() => {
        document.title = "Редактирование детали";
        const id = props.history.location.pathname.split("/workshop-storage/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс детали!');
            props.history.push("/workshop-storage");
        } else {
            setStorageId(id);
            getStorageById(id)
                .then(res => res.json())
                .then(oldRequest => {
                    setStorageInputs({
                        name: oldRequest.name,
                        number: oldRequest.number,
                        quantity: oldRequest.quantity,
                        comment: oldRequest.comment
                    });
                })
                .catch(error => {
                    console.log(error);
                    alert('Неправильный индекс детали!');
                    props.history.push("/workshop-storage");
                })
        }
    }, [])
    return (
        <div className="edit_storage">
            <div className="edit_storage__title">Редактирование запчасти</div>
            <form className="edit_storage__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputText
                    inputName="Название"
                    required
                    error={storageErrors.name}
                    name="name"
                    defaultValue={storageInputs.name}
                    handleInputChange={handleInputChange}
                    errorsArr={storageErrors}
                    setErrorsArr={setStorageErrors}
                />
                <InputText
                    inputName="Номер"
                    required
                    error={storageErrors.number}
                    name="number"
                    type="number"
                    defaultValue={storageInputs.number}
                    handleInputChange={handleInputChange}
                    errorsArr={storageErrors}
                    setErrorsArr={setStorageErrors}
                />
                <InputText
                    inputName="Кол-во"
                    required
                    error={storageErrors.quantity}
                    name="quantity"
                    defaultValue={storageInputs.quantity}
                    handleInputChange={handleInputChange}
                    errorsArr={storageErrors}
                    setErrorsArr={setStorageErrors}
                />
                <InputText
                    inputName="Комментарий"
                    required
                    error={storageErrors.comment}
                    name="comment"
                    defaultValue={storageInputs.comment}
                    handleInputChange={handleInputChange}
                    errorsArr={storageErrors}
                    setErrorsArr={setStorageErrors}
                />
                <div className="edit_storage__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_storage__submit" type="submit" onClick={handleSubmit} value="Изменить деталь" />
            </form>
        </div>
    );
};

export default EditPart;