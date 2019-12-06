import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import './EditRequest.scss';
import { getRequestById, editRequest, getProducts } from '../../../../utils/utilsAPI.jsx';
import Select from '../../Select/Select.jsx';

const EditRequest = (props) => {
    const [requestId, setRequestId] = useState(1);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [requestInputs, setRequestInputs] = useState({
        date: "",
        // products: "",
        quantity: "",
        codeWord: "",
        responsible: "",
        status: "Не готово"
    })
    const [productsRequest, setProductsRequest] = useState({
        productsId: [],
        quantity: [],
        packaging: []
    })
    const [requestErrors, setRequestErrors] = useState({
        date: "",
        products: "",
        quantity: "",
        codeWord: "",
        responsible: "",
        status: "",
    })
    const [dateValid, setDateValid] = useState(true);
    const [productsValid, setProductsValid] = useState(true);
    const [quantityValid, setQuantityValid] = useState(true);
    const [responsibleValid, setResponsibleValid] = useState(true);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'date':
                setDateValid(value !== "");
                break;
            case 'products':
                setProductsValid(value !== []);
                break;
            case 'quantity':
                setQuantityValid(value !== "");
                break;
            case 'responsible':
                setResponsibleValid(value !== "");
                break;
        }
    }

    const formIsValid = () => {
        if (dateValid && productsValid && quantityValid && responsibleValid) {
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
        
        requestInputs.products.map((item) => {
            setProductsRequest({
                productsId: productsRequest.productsId.push(item.id),
                quantity: productsRequest.quantity.push(item.quantity),
                packaging: productsRequest.packaging.push(item.packaging)
            })
        })
        formIsValid() && editRequest(requestInputs, requestId)
            .then(() => {
                addProductsToRequest(productsRequest, requestId);
            })
            .then(() => props.history.push("/requests"))
            .catch(error => {
                console.log(error);
            })
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
        document.title = "Редактирование заявки";
        const id = props.history.location.pathname.split("/requests/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс заявки!');
            props.history.push("/requests");
        } else {
            setRequestId(id);
            getRequestById(id)
                .then(res => res.json())
                .then(oldRequest => {
                    console.log(oldRequest);
                    
                    setRequestInputs({
                        date: oldRequest.date,
                        // products: oldRequest.requestProducts,
                        quantity: oldRequest.quantity,
                        codeWord: oldRequest.codeWord,
                        responsible: oldRequest.responsible,
                        status: oldRequest.status
                    });
                    setSelectedProducts(oldRequest.requestProducts);
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
        }
    }, [])

    return (
        <div className="edit_request">
            <div className="edit_request__title">Редактирование заявки</div>
            <form className="edit_request__form">
                <div className="edit_request__item">
                    <div className="edit_request__input_name">Дата*</div>
                    <div className="edit_request__input_field">
                        <DatePicker
                            selected={Date.parse(requestInputs.date)}
                            dateFormat="dd.MM.yyyy"
                            onChange={handleDateChange}
                            disabledKeyboardNavigation
                            locale={ru}
                        />
                    </div>
                </div>
                <div className="edit_request__item">
                    <div className="edit_request__input_name">Продукция*</div>
                    {/* <div className="edit_request__input_field">
                        <input type="text"
                            name="products"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={requestInputs.products}
                        />
                    </div> */}
                    <Select
                        options={products}
                        onChange={handleProductsChange}
                        searchPlaceholder="Введите название продукта для поиска..."
                        defaultValue={selectedProducts}
                    />
                </div>
                {/* <div className="edit_request__item">
                    <div className="edit_request__input_name">Количество</div>
                    <div className="edit_request__input_field">
                        <input type="text"
                            name="quantity"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={requestInputs.quantity}
                        />
                    </div>
                </div> */}
                <div className="edit_request__item">
                    <div className="edit_request__input_name">Кодовое слово*</div>
                    <div className="edit_request__input_field">
                        <input type="text"
                            name="codeWord"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={requestInputs.codeWord}
                        />
                    </div>
                </div>
                <div className="edit_request__item">
                    <div className="edit_request__input_name">Ответственный*</div>
                    <div className="edit_request__input_field">
                        <input type="text"
                            name="responsible"
                            autoComplete="off"
                            onChange={handleInputChange}
                            defaultValue={requestInputs.responsible}
                        />
                    </div>
                </div>
                <div className="edit_request__item">
                    <div className="edit_request__input_name">Статус*</div>
                    <div className="edit_request__input_field">
                        <select
                            name="status"
                            onChange={handleInputChange}
                            value={requestInputs.status}
                        >
                            <option>Не готово</option>
                            <option>В процессе</option>
                            <option>Готово к отгрузке</option>
                            <option>Отгружено</option>
                        </select>
                    </div>
                </div>
                <div className="edit_request__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_request__submit" type="submit" onClick={handleSubmit} value="Обновить данные" />
            </form>
        </div>
    );
};

export default EditRequest;