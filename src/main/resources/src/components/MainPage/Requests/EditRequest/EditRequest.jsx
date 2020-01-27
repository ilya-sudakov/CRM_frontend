import React, { useEffect, useState } from 'react';
import './EditRequest.scss';
import '../../../../utils/Form/Form.scss';
import { getProducts } from '../../../../utils/RequestsAPI/Products.jsx';
import { getRequestById, editRequest, addProductsToRequest, editProductsToRequest, deleteProductsToRequest } from '../../../../utils/RequestsAPI/Requests.jsx';
import { getUsers } from '../../../../utils/RequestsAPI/Users.jsx';
import InputDate from '../../../../utils/Form/InputDate/InputDate.jsx';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import InputUser from '../../../../utils/Form/InputUser/InputUser.jsx';
import InputProducts from '../../../../utils/Form/InputProducts/InputProducts.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';

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
        date: false,
        requestProducts: false,
        codeWord: false,
        responsible: false,
    })
    const [validInputs, setValidInputs] = useState({
        date: true,
        requestProducts: true,
        codeWord: true,
        responsible: true,
    });
    const [showError, setShowError] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'date':
                setValidInputs({
                    ...validInputs,
                    date: (value !== null)
                });
                break;
            case 'requestProducts':
                setValidInputs({
                    ...validInputs,
                    requestProducts: (value.length > 0)
                });
                break;
            default:
                if (validInputs[fieldName] !== undefined) {
                    setValidInputs({
                        ...validInputs,
                        [fieldName]: (value !== "")
                    })
                }
                break;
        }
    }

    const formIsValid = () => {
        let check = true;
        let newErrors = Object.assign({
            date: false,
            products: false,
            codeWord: false,
            responsible: false,
        });
        for (let item in validInputs) {
            // console.log(item, validInputs[item]);            
            if (validInputs[item] === false) {
                check = false;
                newErrors = Object.assign({
                    ...newErrors,
                    [item]: true
                })
            }
        }
        setRequestErrors(newErrors);
        if (check === true) {
            return true;
        }
        else {
            // alert("Форма не заполнена");
            setShowError(true);
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(selectedProducts);
        formIsValid() && editRequest(requestInputs, requestId)
            .then(() => {
                //PUT if edited, POST if product is new
                const productsArr = selectedProducts.map((selected) => {
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
                                status: selected.status,
                                name: selected.name
                            }, selected.id)
                        )
                        : (
                            addProductsToRequest({
                                requestId: requestId,
                                quantity: selected.quantity,
                                packaging: selected.packaging,
                                status: selected.status,
                                name: selected.name
                            })
                        )
                })
                Promise.all(productsArr)
                    .then(() => {
                        //DELETE products removed by user
                        const productsArr = requestInputs.products.map((item) => {
                            let deleted = true;
                            selectedProducts.map((selected) => {
                                if (selected.id === item.id) {
                                    deleted = false;
                                    return;
                                }
                            })
                            return (deleted === true && deleteProductsToRequest(item.id));
                        })
                        Promise.all(productsArr)
                            .then(() => {
                                props.history.push("/requests")
                            })
                    })
            })
            .catch(error => {
                alert('Ошибка при добавлении записи')
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
        setRequestErrors({
            ...requestErrors,
            [name]: false
        })
    }

    const handleDateChange = (date) => {
        validateField("date", date);
        setRequestInputs({
            ...requestInputs,
            date: date
        })
        setRequestErrors({
            ...requestErrors,
            date: false
        })
    }

    const handleProductsChange = (newProducts) => {
        validateField("requestProducts", newProducts);
        setSelectedProducts(newProducts);
        setRequestErrors({
            ...requestErrors,
            requestProducts: false
        })
    }

    const handleResponsibleChange = (newResponsible) => {
        validateField("responsible", newResponsible)
        setRequestInputs({
            ...requestInputs,
            responsible: newResponsible
        })
        setRequestErrors({
            ...requestErrors,
            responsible: false
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
        <div className="main-form">
            <div className="main-form__title">Редактирование заявки</div>
            <form className="main-form__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputDate
                    inputName="Дата"
                    required
                    error={requestErrors.date}
                    name="date"
                    selected={Date.parse(requestInputs.date)}
                    handleDateChange={handleDateChange}
                    errorsArr={requestErrors}
                    setErrorsArr={setRequestErrors}
                />
                <InputProducts
                    inputName="Продукция"
                    userHasAccess={props.userHasAccess}
                    required
                    options={products}
                    onChange={handleProductsChange}
                    defaultValue={selectedProducts}
                    searchPlaceholder="Введите название продукта для поиска..."
                    error={requestErrors.requestProducts}
                    errorsArr={requestErrors}
                    setErrorsArr={setRequestErrors}
                />
                <InputText
                    inputName="Кодовое слово"
                    required
                    error={requestErrors.codeWord}
                    name="codeWord"
                    handleInputChange={handleInputChange}
                    defaultValue={requestInputs.codeWord}
                    errorsArr={requestErrors}
                    setErrorsArr={setRequestErrors}
                />
                <InputUser
                    inputName="Ответственный"

                    userData={props.userData}
                    required
                    error={requestErrors.responsible}
                    name="responsible"
                    options={users}
                    handleUserChange={handleResponsibleChange}
                    defaultValue={requestInputs.responsible}
                    searchPlaceholder="Введите имя пользователя для поиска..."
                    errorsArr={requestErrors}
                    setErrorsArr={setRequestErrors}
                />
                <div className="main-form__item">
                    <div className="main-form__input_name">Статус*</div>
                    <div className="main-form__input_field">
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
                            <option value="Частично готово">Частично готово</option>
                            <option value="Завершено">Завершено</option>
                            <option value="Отгружено">Отгружено</option>
                            <option value="Приоритет">Приоритет</option>
                        </select>
                    </div>
                </div>
                <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                <div className="main-form__buttons">
                    <div className="main-form__submit main-form__submit--inverted" onClick={() => props.history.push("/requests")}>Вернуться назад</div>
                    <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Обновить данные" />
                </div>
            </form>
        </div>
    );
};

export default EditRequest;