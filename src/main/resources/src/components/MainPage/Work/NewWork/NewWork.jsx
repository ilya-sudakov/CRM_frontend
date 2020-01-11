import React, { useEffect, useState } from 'react';
import './NewWork.scss';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import { addWork } from '../../../../utils/RequestsAPI/WorkManaging/WorkList.jsx';

const NewWork = (props) => {
    const [workInputs, setWorkInputs] = useState({
        name: "",
    })
    const [workErrors, setWorkErrors] = useState({
        name: false,
    })
    const [validInputs, setValidInputs] = useState({
        name: false,
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
            name: false,
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
        setWorkErrors(newErrors);
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
        console.log(workInputs);
        formIsValid() && addWork(workInputs)
            .then(() => props.history.push("/work-list"))
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
        setWorkInputs({
            ...workInputs,
            [name]: value
        })
        setWorkErrors({
            ...workErrors,
            [name]: false
        })
    }

    useEffect(() => {
        document.title = "Создание работы";
    }, [])

    return (
        <div className="new_work">
            <div className="new_work__title">Создание работы</div>
            <form className="new_work__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputText
                    inputName="Название работы"
                    required
                    error={workErrors.name}
                    name="name"
                    handleInputChange={handleInputChange}
                    errorsArr={workErrors}
                    setErrorsArr={setWorkErrors}
                />
                <div className="new_work__input_hint">* - поля, обязательные для заполнения</div>
                <input className="new_work__submit" type="submit" onClick={handleSubmit} value="Добавить работу" />
            </form>
        </div>
    );
};

export default NewWork;