import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import './EditTask.scss';
import "react-datepicker/dist/react-datepicker.css";
import '../../../../../../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import { addProduct } from '../../../../../utils/utilsAPI.jsx';

const EditTask = (props) => {
    const [taskId, setTaskId] = useState(1);
    const [taskInputs, setTaskInputs] = useState({
        dateCreated: new Date(),
        description: '',
        responsible: '',
        dateControl: new Date(),
        status: ''
    })
    const [productErrors, setProductErrors] = useState({
        dateCreated: '',
        description: '',
        responsible: '',
        dateControl: '',
        status: ''
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
        document.title = "Редактирование основной задачи";
        const id = props.history.location.pathname.split("/dispatcher/general-tasks/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс задачи!');
            props.history.push("/dispatcher/general-tasks");
        } else {
            setTaskId(id);
            // getRequestById(id)
            //     .then(res => res.json())
            //     .then(oldRequest => {
            //         setTransportationInputs({
            //             date: oldRequest.date,
            //             package: oldRequest.package,
            //             from: oldRequest.from,
            //             to: oldRequest.to,
            //             driver: oldRequest.driver
            //         });
            //     })
            //     .catch(error => {
            //         console.log(error);
            //         alert('Неправильный индекс транспортировки!');
            //         props.history.push("/dispatcher/transportation");
            //     })
        }
    }, [])
    return (
        <div className="edit_general_task">
            <div className="edit_general_task__title">Редактирование задачи</div>
            <form className="edit_general_task__form">
                <div className="edit_general_task__item">
                    <div className="edit_general_task__input_name">Дата постановки*</div>
                    <div className="edit_general_task__input_field">
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
                <div className="edit_general_task__item">
                    <div className="edit_general_task__input_name">Описание*</div>
                    <div className="edit_general_task__input_field">
                        <input type="text"
                            name="description"
                            autoComplete="off"
                            defaultValue={taskInputs.description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="edit_general_task__item">
                    <div className="edit_general_task__input_name">Ответственный*</div>
                    <div className="edit_general_task__input_field">
                        <input type="text"
                            name="responsible"
                            autoComplete="off"
                            defaultValue={taskInputs.responsible}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="edit_general_task__item">
                    <div className="edit_general_task__input_name">Дата контроля задачи*</div>
                    <div className="edit_general_task__input_field">
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
                <div className="edit_general_task__item">
                    <div className="edit_general_task__input_name">Состояние*</div>
                    <div className="edit_general_task__input_field">
                        <input type="text"
                            name="status"
                            autoComplete="off"
                            defaultValue={taskInputs.status}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="edit_general_task__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_general_task__submit" type="submit" onClick={handleSubmit} value="Редактировать задачу" />
            </form>
        </div>
    );
};

export default EditTask;