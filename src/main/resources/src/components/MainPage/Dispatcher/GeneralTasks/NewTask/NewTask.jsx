import React, { useEffect, useState } from 'react';
import './NewTask.scss';
import { addMainTask } from '../../../../../utils/RequestsAPI/MainTasks.jsx';
import { getUsers } from '../../../../../utils/RequestsAPI/Users.jsx';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx';
import InputUser from '../../../../../utils/Form/InputUser/InputUser.jsx';
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';

const NewTask = (props) => {
    const [taskInputs, setTaskInputs] = useState({
        dateCreated: new Date(),
        description: '',
        responsible: '',
        dateControl: new Date(),
        status: '',
        condition: 'В процессе'
        // visibility: 'all'
    })
    const [taskErrors, setTaskErrors] = useState({
        dateCreated: false,
        description: false,
        responsible: false,
        dateControl: false,
        // status: false
    })
    const [validInputs, setValidInputs] = useState({
        dateCreated: true,
        description: false,
        responsible: false,
        dateControl: true,
        // status: false
    })
    const [users, setUsers] = useState([]);
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
        // console.log(taskInputs);
        formIsValid() && addMainTask(taskInputs)
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
        document.title = "Создание основной задачи";
        getUsers()
            .then(res => res.json())
            .then(res => {
                setUsers(res);
            })
    }, [])

    return (
        <div className="new_general_task">
            <div className="new_general_task__title">Новая задача</div>
            <form className="new_general_task__form">
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
                    selected={taskInputs.dateCreated}
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
                />
                <InputUser
                    inputName="Ответственный"
                    
userData={props.userData}           
                    required
                    error={taskErrors.responsible}
                    name="responsible"
                    options={users}
                    errorsArr={taskErrors}
                    setErrorsArr={setTaskErrors}
                    handleUserChange={handleResponsibleChange}
                    searchPlaceholder="Введите имя пользователя для поиска..."
                />
                <InputDate
                    inputName="Дата контроля задачи"
                    required
                    error={taskErrors.dateControl}
                    errorsArr={taskErrors}
                    setErrorsArr={setTaskErrors}
                    name="dateControl"
                    selected={taskInputs.dateControl}
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
                    // required
                    // error={taskErrors.status}
                    name="status"
                    handleInputChange={handleInputChange}
                    // errorsArr={taskErrors}
                    // setErrorsArr={setTaskErrors}
                />
                {/* {props.userHasAccess(['ROLE_ADMIN']) && <div className="new_general_task__item">
                    <div className="new_general_task__input_name">Видимость*</div>
                    <div className="new_general_task__input_field">
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
                <div className="new_general_task__input_hint">* - поля, обязательные для заполнения</div>
                <input className="new_general_task__submit" type="submit" onClick={handleSubmit} value="Добавить задачу" />
            </form>
        </div>
    );
};

export default NewTask;