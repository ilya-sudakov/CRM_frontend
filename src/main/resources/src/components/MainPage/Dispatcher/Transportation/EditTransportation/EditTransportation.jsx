import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import './EditTransportation.scss';
import "react-datepicker/dist/react-datepicker.css";
import '../../../../../../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import { getTransportationById, editTransportation } from '../../../../../utils/utilsAPI.jsx';

const EditTransportation = (props) => {
    const [transportationInputs, setTransportationInputs] = useState({
        date: new Date(),
        cargo: '',
        sender: 'ЦехЛЭМЗ',
        recipient: 'ЦехЛЭМЗ',
        driver: ''
    })
    const [productErrors, setProductErrors] = useState({
        date: '',
        cargo: '',
        sender: '',
        recipient: '',
        driver: ''
    })
    const [transportationId, setTransportationId] = useState(1);
    const [cargoValid, setCargoValid] = useState(true);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'cargo':
                setCargoValid(value !== "");
                break;
        }
    }

    const formIsValid = () => {
        if (cargoValid) {
            return true;
        }
        else {
            alert("Форма не заполнена");
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        formIsValid() && editTransportation(transportationInputs, transportationId)
            .then(() => props.history.push("/dispatcher/transportation"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setTransportationInputs({
            ...transportationInputs,
            [name]: value
        })
    }

    const handleDateChange = (date) => {
        const regex = "(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.[12]\d{3})";
        validateField("date", date);
        setTransportationInputs({
            ...transportationInputs,
            date: date
        })
    }

    useEffect(() => {
        document.title = "Редактирование записи транспортировки";
        const id = props.history.location.pathname.split("/dispatcher/transportation/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс транспортировки!');
            props.history.push("/dispatcher/transportation");
        } else {
            setTransportationId(id);
            getTransportationById(id)
                .then(res => res.json())
                .then(oldRequest => {
                    setTransportationInputs({
                        date: oldRequest.date,
                        cargo: oldRequest.cargo,
                        sender: oldRequest.sender,
                        recipient: oldRequest.recipient,
                        driver: oldRequest.driver
                    });
                })
                .catch(error => {
                    console.log(error);
                    alert('Неправильный индекс транспортировки!');
                    props.history.push("/dispatcher/transportation");
                })
        }
    }, [])
    return (
        <div className="edit_transportation">
            <div className="edit_transportation__title">Редактирование записи транспортировки</div>
            <form className="edit_transportation__form">
                <div className="edit_transportation__item">
                    <div className="edit_transportation__input_name">Дата*</div>
                    <div className="edit_transportation__input_field">
                        <DatePicker
                            selected={Date.parse(transportationInputs.date)}
                            dateFormat="dd.MM.yyyy"
                            onChange={handleDateChange}
                            disabledKeyboardNavigation
                            locale={ru}
                        />
                    </div>
                </div>
                <div className="edit_transportation__item">
                    <div className="edit_transportation__input_name">Товар*</div>
                    <div className="edit_transportation__input_field">
                        <input type="text"
                            name="cargo"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={transportationInputs.cargo}
                        />
                    </div>
                </div>
                <div className="edit_transportation__item">
                    <div className="edit_transportation__input_name">Откуда*</div>
                    <div className="edit_transportation__input_field">
                        <select
                            name="sender"
                            onChange={handleInputChange}
                            value={transportationInputs.sender}
                        >
                            <option value="ЦехЛЭМЗ">ЦехЛЭМЗ</option>
                            <option value="ЦехЛепсари">ЦехЛепсари</option>
                            <option value="ЦехЛиговский">ЦехЛиговский</option>
                        </select>
                    </div>
                </div>
                <div className="edit_transportation__item">
                    <div className="edit_transportation__input_name">Куда*</div>
                    <div className="edit_transportation__input_field">
                        <select
                            name="recipient"
                            onChange={handleInputChange}
                            value={transportationInputs.recipient}
                        >
                            <option value="ЦехЛЭМЗ">ЦехЛЭМЗ</option>
                            <option value="ЦехЛепсари">ЦехЛепсари</option>
                            <option value="ЦехЛиговский">ЦехЛиговский</option>
                        </select>
                    </div>
                </div>
                <div className="edit_transportation__item">
                    <div className="edit_transportation__input_name">Водитель*</div>
                    <div className="edit_transportation__input_field">
                        <input type="text"
                            name="driver"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={transportationInputs.driver}
                        />
                    </div>
                </div>
                <div className="edit_transportation__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_transportation__submit" type="submit" onClick={handleSubmit} value="Редактировать запись" />
            </form>
        </div>
    );
};

export default EditTransportation;