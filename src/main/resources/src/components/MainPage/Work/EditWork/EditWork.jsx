import React, { useEffect, useState } from 'react';
import './EditWork.scss';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import { getWorkById, editWork } from '../../../../utils/RequestsAPI/WorkManaging/WorkList.jsx';

const EditWork = (props) => {
    const [workInputs, setWorkInputs] = useState({
        work: "",
    })
    const [workErrors, setWorkErrors] = useState({
        work: false,
    })
    const [validInputs, setValidInputs] = useState({
        work: false,
    })
    const [showError, setShowError] = useState(false);
    const [workId, setWorkId] = useState(0);

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
            work: false,
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
        formIsValid() && editWork(workInputs, workId)
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
            setWorkId(id);
            getWorkById(id)
                .then(res => res.json())
                .then(oldWork => {
                    setWorkInputs({
                        work: oldWork.work,
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
                    error={workErrors.work}
                    defaultValue={workInputs.work}
                    name="work"
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