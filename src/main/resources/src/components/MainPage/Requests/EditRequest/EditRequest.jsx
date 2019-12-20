import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import './EditRequest.scss';
import { getRequestById, editRequest, getProducts, addProductsToRequest, getUsers, editProductsToRequest, deleteProductsToRequest } from '../../../../utils/utilsAPI.jsx';
import Select from '../../Select/Select.jsx';
import SelectUser from '../../SelectUser/SelectUser.jsx';

const EditRequest = (props) => {
    const [requestId, setRequestId] = useState(1);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [requestInputs, setRequestInputs] = useState({
        date: "",
        products: [],
        quantity: "",
        codeWord: "",
        responsible: "",
        status: "Не готово"
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
        formIsValid() && editRequest(requestInputs, requestId)
            .then(() => {
                //PUT if edited, POST if product is new
                const temp = selectedProducts.map((selected) => {
                    let edited = false;
                    requestInputs.products.map((item) => {
                        if (item.id === selected.id) {
                            edited = true;
                            return;
                        }
                    });
                    return (edited === true)
                        ? (
                            editProductsToRequest({
                                requestId: requestId,
                                quantity: selected.quantity,
                                packaging: selected.packaging,
                                name: selected.name
                            }, selected.id)
                        )
                        : (
                            addProductsToRequest({
                                requestId: requestId,
                                quantity: selected.quantity,
                                packaging: selected.packaging,
                                name: selected.name
                            })
                        )
                })
                Promise.all(temp)
                    .then(() => {
                        //DELETE products removed by user
                        const temp = requestInputs.products.map((item) => {
                            let deleted = true;
                            selectedProducts.map((selected) => {
                                if (selected.id === item.id) {
                                    deleted = false;
                                    return;
                                }
                            })
                            return (deleted === true && deleteProductsToRequest(item.id));
                        })
                        Promise.all(temp)
                            .then(() => {
                                props.history.push("/requests")
                            })
                    })
            })
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
        // setRequestInputs({
        //     ...requestInputs,
        //     products: newProducts
        // })
        setSelectedProducts(newProducts);
    }

    const handleResponsibleChange = (newResponsible) => {
        validateField("responsible", newResponsible)
        setRequestInputs({
            ...requestInputs,
            responsible: newResponsible
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
                    // console.log(oldRequest.requestProducts);
                    setRequestInputs({
                        date: oldRequest.date,
                        products: oldRequest.requestProducts,
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
                .then(() => getUsers())
                .then(res => res.json())
                .then(res => {
                    setUsers(res);
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
                    <Select
                        options={products}
                        onChange={handleProductsChange}
                        searchPlaceholder="Введите название продукта для поиска..."
                        defaultValue={selectedProducts}
                    />
                </div>
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
                        <SelectUser
                            options={users}
                            defaultValue={requestInputs.responsible}
                            onChange={handleResponsibleChange}
                            searchPlaceholder="Введите имя пользователя для поиска..."
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
                            <option value="Проблема">Проблема</option>
                            <option value="Материалы">Материалы</option>
                            <option value="Ожидание">Ожидание</option>
                            <option value="В производстве">В производстве</option>
                            <option value="Готово">Готово</option>
                            <option value="Завершено">Завершено</option>
                            <option value="Отгружено">Отгружено</option>
                            <option value="Приоритет">Приоритет</option>
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