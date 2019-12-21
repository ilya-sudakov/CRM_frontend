import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { addRequest, getProducts, addProductsToRequest, getUsers } from '../../../../utils/utilsAPI.jsx';
import Select from '../../Select/Select.jsx';
import "react-datepicker/dist/react-datepicker.css";
import '../../../../../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import './NewRequest.scss';
import SelectUser from '../../SelectUser/SelectUser.jsx';

const NewRequest = (props) => {
    const [requestInputs, setRequestInputs] = useState({
        date: new Date(),
        // products: "",
        codeWord: "",
        responsible: "",
        status: "Материалы"
    })
    // const [productsRequest, setProductsRequest] = useState([])
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
    const [users, setUsers] = useState([]);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'date':
                value !== "" ? setDateValid(true) : setDateValid(false);
                break;
            case 'requestProducts':
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
        let id = 0;
        console.log(requestInputs);
        formIsValid() && addRequest(requestInputs)
            .then(res => res.json())
            .then(res => {
                id = res.id;
            })
            .then(() => {
                const temp = requestInputs.requestProducts.map((item) => {
                    return addProductsToRequest({
                        requestId: id,
                        quantity: item.quantity,
                        packaging: item.packaging,
                        name: item.name
                    })
                })
                Promise.all(temp)
                    .then(() => props.history.push("/requests"))
            })
            .catch(error => {
                console.log(error);
            })
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
        document.title = "Создание заявки";
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
    }, [])

    const handleDateChange = (date) => {
        const regex = "(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.[12]\d{3})";
        validateField("date", date);
        setRequestInputs({
            ...requestInputs,
            date: date
        })
    }

    const handleProductsChange = (newProducts) => {
        validateField("requestProducts", newProducts)
        setRequestInputs({
            ...requestInputs,
            requestProducts: newProducts
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
        <div className="new_request">
            <div className="new_request__title">Новая заявка</div>
            <form className="new_request__form">
                <div className="new_request__item">
                    <div className="new_request__input_name">Дата*</div>
                    <div className="new_request__input_field">
                        <DatePicker
                            selected={requestInputs.date}
                            dateFormat="dd.MM.yyyy"
                            onChange={handleDateChange}
                            disabledKeyboardNavigation
                            locale={ru}
                        />
                    </div>
                </div>
                <div className="new_request__item">
                    <div className="new_request__input_name">Продукция*</div>
                    {/* <div className="new_request__input_field">
                        <input type="text" name="products" autoComplete="off" onChange={handleInputChange} />
                    </div> */}
                    <Select
                        options={products}
                        onChange={handleProductsChange}
                        searchPlaceholder="Введите название продукта для поиска..."
                    />
                </div>
                {/* <div className="new_request__item">
                    <div className="new_request__input_name">Количество</div>
                    <div className="new_request__input_field">
                        <input type="text" name="quantity" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div> */}
                <div className="new_request__item">
                    <div className="new_request__input_name">Кодовое слово*</div>
                    <div className="new_request__input_field">
                        <input type="text" name="codeWord" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_request__item">
                    <div className="new_request__input_name">Ответственный*</div>
                    <div className="new_request__input_field">
                        {/* <input type="text" name="responsible" autoComplete="off" onChange={handleInputChange} /> */}
                        <SelectUser
                            options={users}
                            onChange={handleResponsibleChange}
                            searchPlaceholder="Введите имя пользователя для поиска..."
                        />
                    </div>
                </div>
                <div className="new_request__input_hint">* - поля, обязательные для заполнения</div>
                <input className="new_request__submit" type="submit" onClick={handleSubmit} value="Оформить заявку" />
            </form>
        </div>
    );
};

export default NewRequest;