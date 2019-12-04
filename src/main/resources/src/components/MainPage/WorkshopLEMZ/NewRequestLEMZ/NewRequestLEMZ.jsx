import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { addRequest, getProducts } from '../../../../utils/utilsAPI.jsx';
import Select from '../../Select/Select.jsx';
import "react-datepicker/dist/react-datepicker.css";
import '../../../../../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import './NewRequestLEMZ.scss';

const NewRequestLEMZ = (props) => {
    const [requestInputs, setRequestInputs] = useState({
        date: new Date(),
        products: "",
        // quantity: "",
        codeWord: "",
        responsible: "",
        status: "Не готово",
        dateShipped: new Date(),
        status: '',
        comment: ''
    })
    const [requestErrors, setRequestErrors] = useState({
        date: "",
        products: "",
        // quantity: "",
        codeWord: "",
        responsible: "",
        status: "",
    })
    const [dateValid, setDateValid] = useState(true);
    const [productsValid, setProductsValid] = useState(false);
    // const [quantityValid, setQuantityValid] = useState(false);
    const [responsibleValid, setResponsibleValid] = useState(false);
    const [products, setProducts] = useState([]);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'date':
                value !== "" ? setDateValid(true) : setDateValid(false);
                break;
            case 'products':
                value !== [] ? setProductsValid(true) : setProductsValid(false);
                break;
            // case 'quantity':
            //     setQuantityValid(value !== "");
            //     break;
            case 'responsible':
                value !== "" ? setResponsibleValid(true) : setResponsibleValid(false);
                break;
        }
    }

    const formIsValid = () => {
        if (dateValid && productsValid && responsibleValid) {

            return true;
        }
        else {
            alert("Форма не заполнена");
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // formIsValid() && addRequest(requestInputs)
        //     .then(() => props.history.push("/requests"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setRequestInputs({
            ...requestInputs,
            [name]: value
        })
    }

    useEffect(() => {
        document.title = "Создание заявки ЛЭМЗ";
        getProducts()
            .then(res => res.json())
            .then(response => {
                setProducts(response);
            })
    }, [])

    const handleDateChange = (date) => {
        const regex = "(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.[12]\d{3})";
        validateField("date", date);
        setRequestInputs({
            ...requestInputs,
            date: date
        })
    }

    const handleDateShippedChange = (date) => {
        const regex = "(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.[12]\d{3})";
        validateField("date", date);
        setRequestInputs({
            ...requestInputs,
            dateShipped: date
        })
    }

    const handleProductsChange = (newProducts) => {
        validateField("products", newProducts)
        setRequestInputs({
            ...requestInputs,
            products: newProducts
        })
    }

    return (
        <div className="new_request_lemz">
            <div className="new_request_lemz__title">Новая заявка ЛЭМЗ</div>
            <form className="new_request_lemz__form">
                <div className="new_request_lemz__item">
                    <div className="new_request_lemz__input_name">Дата заявки*</div>
                    <div className="new_request_lemz__input_field">
                        <DatePicker
                            selected={requestInputs.date}
                            dateFormat="dd.MM.yyyy"
                            onChange={handleDateChange}
                            disabledKeyboardNavigation
                            locale={ru}
                        />
                    </div>
                </div>
                <div className="new_request_lemz__item">
                    <div className="new_request_lemz__input_name">Продукция*</div>
                    {/* <div className="new_request_lemz__input_field">
                        <input type="text" name="products" autoComplete="off" onChange={handleInputChange} />
                    </div> */}
                    <Select
                        options={products}
                        onChange={handleProductsChange}
                        searchPlaceholder="Введите название продукта для поиска..."
                    />
                </div>
                {/* <div className="new_request_lemz__item">
                    <div className="new_request_lemz__input_name">Количество</div>
                    <div className="new_request_lemz__input_field">
                        <input type="text" name="quantity" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div> */}
                <div className="new_request_lemz__item">
                    <div className="new_request_lemz__input_name">Кодовое слово*</div>
                    <div className="new_request_lemz__input_field">
                        <input type="text" name="codeWord" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_request_lemz__item">
                    <div className="new_request_lemz__input_name">Ответственный*</div>
                    <div className="new_request_lemz__input_field">
                        <input type="text" name="responsible" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_request_lemz__item">
                    <div className="new_request_lemz__input_name">Статус*</div>
                    <div className="new_request_lemz__input_field">
                        <select
                            name="status"
                            onChange={handleInputChange}
                            value={requestInputs.status}
                        >
                            <option>Проблема</option>
                            <option>Материалы</option>
                            <option>Ожидание</option>
                            <option>В производстве</option>
                            <option>Готово</option>
                            <option>Завершено</option>
                            <option>Отгружено</option>
                            <option>Приоритет</option>
                        </select>
                    </div>
                </div>
                <div className="new_request_lemz__item">
                    <div className="new_request_lemz__input_name">Дата отгрузки</div>
                    <div className="new_request_lemz__input_field">
                        <DatePicker
                            selected={requestInputs.dateShipped}
                            dateFormat="dd.MM.yyyy"
                            onChange={handleDateShippedChange}
                            disabledKeyboardNavigation
                            locale={ru}
                        />
                    </div>
                </div>
                <div className="new_request_lemz__item">
                    <div className="new_request_lemz__input_name">Комментарий</div>
                    <div className="new_request_lemz__input_field">
                        <textarea type="text" name="comment" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_request_lemz__input_hint">* - поля, обязательные для заполнения</div>
                <input className="new_request_lemz__submit" type="submit" onClick={handleSubmit} value="Оформить заявку" />
            </form>
        </div>
    );
};

export default NewRequestLEMZ;