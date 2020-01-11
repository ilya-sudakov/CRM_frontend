import React, { useEffect, useState } from 'react';
import './EditWork.scss';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import { addWork, getWorkById } from '../../../../utils/RequestsAPI/WorkManaging/WorkList.jsx';

const EditWork = (props) => {
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
        document.title = "Редактирование работы";
        const id = props.history.location.pathname.split("/work-list/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс работы!');
            props.history.push("/work-list");
        } else {
            getWorkById(id)
                .then(res => res.json())
                .then(oldWork => {
                    setWorkInputs({
                        name: oldWork.name,
                    });
                })
                .catch(error => {
                    console.log(error);
                    alert('Неправильный индекс работы!');
                    props.history.push("/work-list");
                })
        }
    }, [])

    return (
        <div className="edit_work">
            <div className="edit_work__title">Редактирование работы</div>
            <form className="edit_work__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputText
                    inputName="Название работы"
                    required
                    error={workErrors.name}
                    defaultValue={workInputs.name}
                    name="name"
                    handleInputChange={handleInputChange}
                    errorsArr={workErrors}
                    setErrorsArr={setWorkErrors}
                />
                <div className="edit_work__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_work__submit" type="submit" onClick={handleSubmit} value="Изменить работу" />
            </form>
        </div>
    );
};

export default EditWork;