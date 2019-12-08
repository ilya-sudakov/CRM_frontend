import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import './EditTransportation.scss';
import "react-datepicker/dist/react-datepicker.css";
import '../../../../../../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import { addProduct } from '../../../../../utils/utilsAPI.jsx';

const EditTransportation = (props) => {
    const [transportationInputs, setTransportationInputs] = useState({
        date: new Date(),
        package: '',
        from: 'ЦехЛЭМЗ',
        to: 'ЦехЛЭМЗ',
        driver: ''
    })
    const [productErrors, setProductErrors] = useState({
        date: '',
        package: '',
        from: '',
        to: '',
        driver: ''
    })
    const [transportationId, setTransportationId] = useState(1);
    const [packageValid, setPackageValid] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'package':
                setPackageValid(value !== "");
                break;
        }
    }

    const formIsValid = () => {
        if (packageValid) {
            return true;
        }
        else {
            alert("Форма не заполнена");
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(transportationInputs);

        // formIsValid() && addProduct(transportationInputs)
        //     .then(() => props.history.push("/dispatcher/transportation"))
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
        <div className="edit_transportation">
            <div className="edit_transportation__title">Редактирование записи транспортировки</div>
            <form className="edit_transportation__form">
                <div className="edit_transportation__item">
                    <div className="edit_transportation__input_name">Дата*</div>
                    <div className="edit_transportation__input_field">
                        <DatePicker
                            selected={transportationInputs.date}
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
                            name="package"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={transportationInputs.package}
                        />
                    </div>
                </div>
                <div className="edit_transportation__item">
                    <div className="edit_transportation__input_name">Откуда*</div>
                    <div className="edit_transportation__input_field">
                        <select
                            name="from"
                            onChange={handleInputChange}
                            defaultValue={transportationInputs.from}
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
                            name="to"
                            onChange={handleInputChange}
                            defaultValue={transportationInputs.to}
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