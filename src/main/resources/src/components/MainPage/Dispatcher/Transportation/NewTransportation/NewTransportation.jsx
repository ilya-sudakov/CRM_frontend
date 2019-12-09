import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import './NewTransportation.scss';
import "react-datepicker/dist/react-datepicker.css";
import '../../../../../../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import { addProduct, addTransportation } from '../../../../../utils/utilsAPI.jsx';

const NewTransportation = (props) => {
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
    const [cargoValid, setCargoValid] = useState(false);

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
        formIsValid() && addTransportation(transportationInputs)
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
        document.title = "Создание записи транспортировки";
    }, [])
    return (
        <div className="new_transportation">
            <div className="new_transportation__title">Новая запись транспортировки</div>
            <form className="new_transportation__form">
                <div className="new_transportation__item">
                    <div className="new_transportation__input_name">Дата*</div>
                    <div className="new_transportation__input_field">
                        <DatePicker
                            selected={transportationInputs.date}
                            dateFormat="dd.MM.yyyy"
                            onChange={handleDateChange}
                            disabledKeyboardNavigation
                            locale={ru}
                        />
                    </div>
                </div>
                <div className="new_transportation__item">
                    <div className="new_transportation__input_name">Товар*</div>
                    <div className="new_transportation__input_field">
                        <input type="text" name="cargo" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_transportation__item">
                    <div className="new_transportation__input_name">Откуда*</div>
                    <div className="new_transportation__input_field">
                        <select
                            name="sender"
                            onChange={handleInputChange}
                            defaultValue={transportationInputs.sender}
                        >
                            <option value="ЦехЛЭМЗ">ЦехЛЭМЗ</option>
                            <option value="ЦехЛепсари">ЦехЛепсари</option>
                            <option value="ЦехЛиговский">ЦехЛиговский</option>
                        </select>
                    </div>
                </div>
                <div className="new_transportation__item">
                    <div className="new_transportation__input_name">Куда*</div>
                    <div className="new_transportation__input_field">
                        <select
                            name="recipient"
                            onChange={handleInputChange}
                            defaultValue={transportationInputs.recipient}
                        >
                            <option value="ЦехЛЭМЗ">ЦехЛЭМЗ</option>
                            <option value="ЦехЛепсари">ЦехЛепсари</option>
                            <option value="ЦехЛиговский">ЦехЛиговский</option>
                        </select>
                    </div>
                </div>
                <div className="new_transportation__item">
                    <div className="new_transportation__input_name">Водитель*</div>
                    <div className="new_transportation__input_field">
                        <input type="text" name="driver" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_transportation__input_hint">* - поля, обязательные для заполнения</div>
                <input className="new_transportation__submit" type="submit" onClick={handleSubmit} value="Добавить запись" />
            </form>
        </div>
    );
};

export default NewTransportation;