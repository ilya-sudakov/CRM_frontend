import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import './NewTask.scss';
import "react-datepicker/dist/react-datepicker.css";
import '../../../../../../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import { addProduct } from '../../../../../utils/utilsAPI.jsx';

const NewTask = (props) => {
    const [taskInputs, setTaskInputs] = useState({
        dateCreated: new Date(),
        description: '',
        responsible: '',
        dateControl: new Date(),
        status: '',
        visibility: 'all'
    })
    const [productErrors, setProductErrors] = useState({
        dateCreated: '',
        description: '',
        responsible: '',
        dateControl: '',
        status: '',
        visibility: 'all'
    })
    const [descriptionValid, setDescriptionValid] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'description':
                setDescriptionValid(value !== "");
                break;
        }
    }

    const formIsValid = () => {
        if (descriptionValid) {
            return true;
        }
        else {
            alert("Форма не заполнена");
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(taskInputs);
        // formIsValid() && addProduct(taskInputs)
        //     .then(() => props.history.push("/dispatcher/transportation"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setTaskInputs({
            ...taskInputs,
            [name]: value
        })
    }

    useEffect(() => {
        document.title = "Создание основной задачи";
    }, [])
    return (
        <div className="new_general_task">
            <div className="new_general_task__title">Новая задача</div>
            <form className="new_general_task__form">
                <div className="new_general_task__item">
                    <div className="new_general_task__input_name">Дата постановки*</div>
                    <div className="new_general_task__input_field">
                        <DatePicker
                            selected={taskInputs.dateCreated}
                            dateFormat="dd.MM.yyyy"
                            onChange={(dateCreated) => {
                                validateField("dateCreated", dateCreated);
                                setTaskInputs({
                                    ...taskInputs,
                                    dateCreated: dateCreated
                                })
                            }}
                            disabledKeyboardNavigation
                            locale={ru}
                        />
                    </div>
                </div>
                <div className="new_general_task__item">
                    <div className="new_general_task__input_name">Описание*</div>
                    <div className="new_general_task__input_field">
                        <input type="text"
                            name="description"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="new_general_task__item">
                    <div className="new_general_task__input_name">Ответственный*</div>
                    <div className="new_general_task__input_field">
                        <input type="text"
                            name="responsible"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="new_general_task__item">
                    <div className="new_general_task__input_name">Дата контроля задачи*</div>
                    <div className="new_general_task__input_field">
                        <DatePicker
                            selected={taskInputs.dateControl}
                            dateFormat="dd.MM.yyyy"
                            onChange={(dateControl) => {
                                validateField("dateControl", dateControl);
                                setTaskInputs({
                                    ...taskInputs,
                                    dateControl: dateControl
                                })
                            }}
                            disabledKeyboardNavigation
                            locale={ru}
                        />
                    </div>
                </div>
                <div className="new_general_task__item">
                    <div className="new_general_task__input_name">Состояние*</div>
                    <div className="new_general_task__input_field">
                        <input type="text"
                            name="status"
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                {props.userHasAccess(['ROLE_ADMIN']) && <div className="new_general_task__item">
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
                </div>}
                <div className="new_general_task__input_hint">* - поля, обязательные для заполнения</div>
                <input className="new_general_task__submit" type="submit" onClick={handleSubmit} value="Добавить задачу" />
            </form>
        </div>
    );
};

export default NewTask;