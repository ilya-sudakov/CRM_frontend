import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import './EditRequestLEMZ.scss';
import { getProducts, getRequestLEMZById, editRequestLEMZ, getUsers } from '../../../../utils/utilsAPI.jsx';
import Select from '../../Select/Select.jsx';
import SelectUser from '../../SelectUser/SelectUser.jsx';

const EditRequestLEMZ = (props) => {
    const [requestId, setRequestId] = useState(1);
    const [products, setProducts] = useState([]);
    const [requestInputs, setRequestInputs] = useState({
        date: "",
        // products: "",
        // quantity: "",
        codeWord: "",
        responsible: "",
        status: "Не готово",
        shippingDate: "",
        comment: ""
    })
    const [requestErrors, setRequestErrors] = useState({
        date: "",
        products: "",
        quantity: "",
        codeWord: "",
        responsible: "",
        status: "",
        shippingDate: "",
        comment: ""
    })
    const [dateValid, setDateValid] = useState(true);
    const [productsValid, setProductsValid] = useState(true);
    const [quantityValid, setQuantityValid] = useState(true);
    const [responsibleValid, setResponsibleValid] = useState(true);
    const [users, setUsers] = useState([]);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'date':
                setDateValid(value !== "");
                break;
            case 'responsible':
                setResponsibleValid(value !== "");
                break;
        }
    }

    const formIsValid = () => {
        if (dateValid && responsibleValid) {
            return true;
        }
        else {
            alert("Форма не заполнена");
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(requestInputs);
        formIsValid() && editRequestLEMZ(requestInputs, requestId)
            .then(() => props.history.push("/workshop-lemz"))
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
        setRequestInputs({
            ...requestInputs,
            [name]: value
        })
    }

    const handleDateChange = (date) => {
        validateField("date", date);
        setRequestInputs({
            ...requestInputs,
            date: date
        })
    }

    const handleProductsChange = (newProducts) => {
        validateField("products", newProducts);
        setRequestInputs({
            ...requestInputs,
            products: newProducts
        })
    }

    useEffect(() => {
        document.title = "Редактирование заявки ЛЭМЗ";
        const id = props.history.location.pathname.split("/workshop-lemz/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс заявки!');
            props.history.push("/workshop-lemz");
        } else {
            setRequestId(id);
            getRequestLEMZById(id)
                .then(res => res.json())
                .then(oldRequest => {
                    // console.log(oldRequest),
                    setRequestInputs({
                        date: oldRequest.date,
                        // products: oldRequest.products,
                        quantity: oldRequest.quantity,
                        codeWord: oldRequest.codeWord,
                        responsible: oldRequest.responsible,
                        status: oldRequest.status,
                        shippingDate: oldRequest.shippingDate,
                        comment: oldRequest.comment
                    });
                })
                .catch(error => {
                    console.log(error);
                    alert('Неправильный индекс заявки!');
                    props.history.push("/requests");
                })
            getProducts()
                .then(res => res.json())
                .then(response => {
                    setProducts(response);
                })
                .then(() => getUsers())
                .then(res => res.json())
                .then(res => {
                    setUsers(res);
                })
        }
    }, [])

    const handleDateShippedChange = (date) => {
        const regex = "(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.[12]\d{3})";
        // validateField("date", date);
        setRequestInputs({
            ...requestInputs,
            shippingDate: date
        })
    }

    const handleResponsibleChange = (newResponsible) => {
        validateField("responsible", newResponsible)
        setRequestInputs({
            ...requestInputs,
            responsible: newResponsible
        })
    }

    return (
        <div className="edit_request_lemz">
            <div className="edit_request_lemz__title">Редактирование заявки ЛЭМЗ</div>
            <form className="edit_request_lemz__form">
                <div className="edit_request_lemz__item">
                    <div className="edit_request_lemz__input_name">Дата*</div>
                    <div className="edit_request_lemz__input_field">
                        <DatePicker
                            selected={Date.parse(requestInputs.date)}
                            dateFormat="dd.MM.yyyy"
                            onChange={handleDateChange}
                            disabledKeyboardNavigation
                            locale={ru}
                        />
                    </div>
                </div>
                {/* <div className="edit_request_lemz__item">
                    <div className="edit_request_lemz__input_name">Продукция*</div>
                    <Select
                        options={products}
                        onChange={handleProductsChange}
                        searchPlaceholder="Введите название продукта для поиска..."
                        defaultValue={requestInputs.products}
                    />
                </div> */}
                <div className="edit_request_lemz__item">
                    <div className="edit_request_lemz__input_name">Кодовое слово*</div>
                    <div className="edit_request_lemz__input_field">
                        <input type="text"
                            name="codeWord"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={requestInputs.codeWord}
                        />
                    </div>
                </div>
                <div className="edit_request_lemz__item">
                    <div className="edit_request_lemz__input_name">Ответственный*</div>
                    <div className="edit_request_lemz__input_field">
                        {/* <input type="text"
                            name="responsible"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={requestInputs.responsible}
                        /> */}
                        <SelectUser
                            options={users}
                            onChange={handleResponsibleChange}
                            defaultValue={requestInputs.responsible}
                            searchPlaceholder="Введите имя пользователя для поиска..."
                        />
                    </div>
                </div>
                <div className="edit_request_lemz__item">
                    <div className="edit_request_lemz__input_name">Статус*</div>
                    <div className="edit_request_lemz__input_field">
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
                <div className="edit_request_lemz__item">
                    <div className="edit_request_lemz__input_name">Дата отгрузки</div>
                    <div className="edit_request_lemz__input_field">
                        <DatePicker
                            selected={Date.parse(requestInputs.shippingDate)}
                            dateFormat="dd.MM.yyyy"
                            onChange={handleDateShippedChange}
                            disabledKeyboardNavigation
                            locale={ru}
                        />
                    </div>
                </div>
                <div className="edit_request_lemz__item">
                    <div className="edit_request_lemz__input_name">Комментарий</div>
                    <div className="edit_request_lemz__input_field">
                        <textarea type="text"
                            name="comment"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={requestInputs.comment}
                        />
                    </div>
                </div>
                <div className="edit_request_lemz__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_request_lemz__submit" type="submit" onClick={handleSubmit} value="Обновить данные" />
            </form>
        </div>
    );
};

export default EditRequestLEMZ;