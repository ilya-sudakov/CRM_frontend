import React, { useEffect, useState } from 'react';
import './EditTask.scss';
import { getMainTaskById, editMainTask } from '../../../../../utils/RequestsAPI/MainTasks.jsx';
import { getUsers } from '../../../../../utils/RequestsAPI/Users.jsx';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx';
import InputUser from '../../../../../utils/Form/InputUser/InputUser.jsx';
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';

const EditTask = (props) => {
    const [taskId, setTaskId] = useState(1);
    const [users, setUsers] = useState([]);
    const [taskInputs, setTaskInputs] = useState({
        dateCreated: new Date(),
        description: '',
        responsible: '',
        dateControl: new Date(),
        status: '',
        // visibility: 'all'
    })
    const [taskErrors, setTaskErrors] = useState({
        dateCreated: false,
        description: false,
        responsible: false,
        dateControl: false,
        status: false
    })
    const [validInputs, setValidInputs] = useState({
        dateCreated: true,
        description: true,
        responsible: true,
        dateControl: true,
        status: true
    })
    const [showError, setShowError] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'dateCreated':
                setValidInputs({
                    ...validInputs,
                    dateCreated: (value !== null)
                });
                break;
            case 'dateControl':
                setValidInputs({
                    ...validInputs,
                    dateControl: (value !== null)
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
            dateCreated: false,
            description: false,
            responsible: false,
            dateControl: false,
            status: false
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
        setTaskErrors(newErrors);
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
        formIsValid() && editMainTask(taskInputs, taskId)
            .then(() => props.history.push("/dispatcher/general-tasks"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setTaskInputs({
            ...taskInputs,
            [name]: value
        })
        setTaskErrors({
            ...taskErrors,
            [name]: false
        })
    }

    const handleResponsibleChange = (newResponsible) => {
        validateField("responsible", newResponsible)
        setTaskInputs({
            ...taskInputs,
            responsible: newResponsible
        })
        setTaskErrors({
            ...taskErrors,
            responsible: false
        })
    }

    useEffect(() => {
        document.title = "Редактирование основной задачи";
        const id = props.history.location.pathname.split("/dispatcher/general-tasks/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс задачи!');
            props.history.push("/dispatcher/general-tasks");
        } else {
            setTaskId(id);
            getMainTaskById(id)
                .then(res => res.json())
                .then(oldRequest => {
                    console.log(oldRequest);
                    
                    setTaskInputs({
                        dateCreated: oldRequest.dateCreated,
                        description: oldRequest.description,
                        responsible: oldRequest.responsible,
                        dateControl: oldRequest.dateControl,
                        status: oldRequest.status
                    });
                })
                .then(() => {
                    getUsers()
                        .then(res => res.json())
                        .then(res => {
                            setUsers(res);
                        })
                })
                .catch(error => {
                    console.log(error);
                    alert('Неправильный индекс задачи!');
                    props.history.push("/dispatcher/general-tasks");
                })
        }
    }, [])
    return (
        <div className="edit_general_task">
            <div className="edit_general_task__title">Редактирование задачи</div>
            <form className="edit_general_task__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputDate
                    inputName="Дата постановки"
                    required
                    error={taskErrors.dateCreated}
                    name="dateCreated"
                    selected={Date.parse(taskInputs.dateCreated)}
                    errorsArr={taskErrors}
                    setErrorsArr={setTaskErrors}
                    handleDateChange={(dateCreated) => {
                        validateField("dateCreated", dateCreated);
                        setTaskInputs({
                            ...taskInputs,
                            dateCreated: dateCreated
                        });
                        setTaskErrors({
                            ...taskErrors,
                            dateCreated: false
                        })
                    }}
                />
                <InputText
                    inputName="Описание"
                    required
                    error={taskErrors.description}
                    name="description"
                    handleInputChange={handleInputChange}
                    errorsArr={taskErrors}
                    setErrorsArr={setTaskErrors}
                    defaultValue={taskInputs.description}
                />
                <InputUser
                    inputName="Ответственный"
                    required
                    error={taskErrors.responsible}
                    defaultValue={taskInputs.responsible}
                    name="responsible"
                    options={users}
                    handleUserChange={handleResponsibleChange}
                    errorsArr={taskErrors}
                    setErrorsArr={setTaskErrors}
                    searchPlaceholder="Введите имя пользователя для поиска..."
                />
                <InputDate
                    inputName="Дата контроля задачи"
                    required
                    error={taskErrors.dateControl}
                    name="dateControl"
                    selected={Date.parse(taskInputs.dateControl)}
                    errorsArr={taskErrors}
                    setErrorsArr={setTaskErrors}
                    handleDateChange={(dateControl) => {
                        validateField("dateControl", dateControl);
                        setTaskInputs({
                            ...taskInputs,
                            dateControl: dateControl
                        });
                        setTaskErrors({
                            ...taskErrors,
                            dateControl: false
                        })
                    }}
                />
                <InputText
                    inputName="Состояние"
                    required
                    error={taskErrors.status}
                    name="status"
                    errorsArr={taskErrors}
                    setErrorsArr={setTaskErrors}
                    handleInputChange={handleInputChange}
                    defaultValue={taskInputs.status}
                />
                {/* {props.userHasAccess(['ROLE_ADMIN']) && <div className="edit_general_task__item">
                    <div className="edit_general_task__input_name">Видимость*</div>
                    <div className="edit_general_task__input_field">
                        <select
                            name="visibility"
                            onChange={handleInputChange}
                            defaultValue={taskInputs.visibility}
                        >
                            <option value="all">Всем</option>
                            <option value="adminOnly">Только руководитель</option>
                        </select>
                    </div>
                </div>} */}
                <div className="edit_general_task__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_general_task__submit" type="submit" onClick={handleSubmit} value="Редактировать задачу" />
            </form>
        </div>
    );
};

export default EditTask;