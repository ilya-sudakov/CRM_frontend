import React, { useEffect, useState } from 'react';
import './EditRequestLepsari.scss';
import { getUsers } from '../../../../utils/RequestsAPI/Users.jsx';
import { getRequestLepsariById, editProductsToRequestLepsari, addProductsToRequestLepsari, deleteProductsToRequestLepsari, editRequestLepsari } from '../../../../utils/RequestsAPI/Workshop/Lepsari.jsx';
import InputDate from '../../../../utils/Form/InputDate/InputDate.jsx';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import InputUser from '../../../../utils/Form/InputUser/InputUser.jsx';
import InputProducts from '../../../../utils/Form/InputProducts/InputProducts.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';

const EditRequestLepsari = (props) => {
    const [requestId, setRequestId] = useState(1);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [requestInputs, setRequestInputs] = useState({
        date: "",
        products: [],
        // quantity: "",
        codeWord: "",
        responsible: "",
        status: "Не готово",
        shippingDate: "",
        comment: ""
    })
    const [requestErrors, setRequestErrors] = useState({
        date: false,
        requestProducts: false,
        codeWord: false,
        responsible: false,
        shippingDate: false
    })
    const [validInputs, setValidInputs] = useState({
        date: true,
        requestProducts: true,
        codeWord: true,
        responsible: true,
        shippingDate: true
    })
    const [users, setUsers] = useState([]);
    const [showError, setShowError] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'date':
                setValidInputs({
                    ...validInputs,
                    date: (value !== null)
                });
                break;
            case 'shippingDate':
                setValidInputs({
                    ...validInputs,
                    shippingDate: (value !== null)
                });
                break;
            case 'requestProducts':
                setValidInputs({
                    ...validInputs,
                    requestProducts: (value.length > 0)
                });
                break;
            default:
                setValidInputs({
                    ...validInputs,
                    [fieldName]: (value !== "")
                });
                break;
        }
    }

    const formIsValid = () => {
        // console.log(validInputs);
        let check = true;
        let newErrors = Object.assign({
            date: false,
            requestProducts: false,
            codeWord: false,
            responsible: false,
            shippingDate: false
        });
        for (let item in validInputs) {
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
        // console.log(requestInputs);
        formIsValid() && editRequestLepsari(requestInputs, requestId)
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
                            editProductsToRequestLepsari({
                                requestId: requestId,
                                quantity: selected.quantity,
                                packaging: selected.packaging,
                                name: selected.name
                            }, selected.id)
                        )
                        : (
                            addProductsToRequestLepsari({
                                requestId: requestId,
                                quantity: selected.quantity,
                                packaging: selected.packaging,
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
                            return (deleted === true && deleteProductsToRequestLepsari(item.id));
                        })
                        Promise.all(productsArr)
                            .then(() => props.history.push("/lepsari/workshop-lepsari"))
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

    useEffect(() => {
        document.title = "Редактирование заявки Лепсари";
        const id = props.history.location.pathname.split("/lepsari/workshop-lepsari/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс заявки!');
            props.history.push("/lepsari/workshop-lepsari");
        } else {
            setRequestId(id);
            getRequestLepsariById(id)
                .then(res => res.json())
                .then(oldRequest => {
                    console.log(oldRequest),
                    setRequestInputs({
                        date: oldRequest.date,
                        products: oldRequest.lepsariProducts,
                        quantity: oldRequest.quantity,
                        codeWord: oldRequest.codeWord,
                        responsible: oldRequest.responsible,
                        status: oldRequest.status,
                        shippingDate: oldRequest.shippingDate,
                        comment: oldRequest.comment
                    });
                    setSelectedProducts(oldRequest.lepsariProducts)
                })
                .catch(error => {
                    console.log(error);
                    alert('Неправильный индекс заявки!');
                    props.history.push("/lepsari/workshop-lepsari");
                })
            getUsers()
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
        setRequestErrors({
            ...requestErrors,
            shippingDate: false
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

    return (
        <div className="edit_request_lepsari">
            {/* <div className="edit_request_lepsari__title">Редактирование заявки Лепсари</div> */}
            <form className="edit_request_lepsari__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP']) && <InputDate
                    inputName="Дата заявки"
                    required
                    error={requestErrors.date}
                    name="date"
                    selected={Date.parse(requestInputs.date)}
                    handleDateChange={handleDateChange}
                    errorsArr={requestErrors}
                    setErrorsArr={setRequestErrors}
                    readOnly={props.userHasAccess(['ROLE_WORKSHOP'])}
                />
                }
                {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP']) && <InputProducts
                    inputName="Продукция"
                    required
                    options
                    onChange={handleProductsChange}
                    searchPlaceholder="Введите название продукта для поиска..."
                    defaultValue={selectedProducts}
                    error={requestErrors.requestProducts}
                    errorsArr={requestErrors}
                    setErrorsArr={setRequestErrors}
                    workshop={props.userHasAccess(['ROLE_WORKSHOP'])}
                />}
                {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP']) && <InputText
                    inputName="Кодовое слово"
                    required
                    error={requestErrors.codeWord}
                    defaultValue={requestInputs.codeWord}
                    name="codeWord"
                    handleInputChange={handleInputChange}
                    errorsArr={requestErrors}
                    setErrorsArr={setRequestErrors}
                    readOnly={props.userHasAccess(['ROLE_WORKSHOP'])}
                />}
                {props.userHasAccess(['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_WORKSHOP']) && <InputUser
                    inputName="Ответственный"
                    required
                    error={requestErrors.responsible}
                    defaultValue={requestInputs.responsible}
                    name="responsible"
                    options={users}
                    handleUserChange={handleResponsibleChange}
                    searchPlaceholder="Введите имя пользователя для поиска..."
                    errorsArr={requestErrors}
                    setErrorsArr={setRequestErrors}
                    readOnly={props.userHasAccess(['ROLE_WORKSHOP'])}
                />}
                <div className="edit_request_lepsari__item">
                    <div className="edit_request_lepsari__input_name">Статус*</div>
                    <div className="edit_request_lepsari__input_field">
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
                            <option>Частично готово</option>
                            <option>Завершено</option>
                            <option>Отгружено</option>
                            <option>Приоритет</option>
                        </select>
                    </div>
                </div>
                <InputDate
                    inputName="Дата отгрузки"
                    name="shippingDate"
                    selected={Date.parse(requestInputs.shippingDate)}
                    handleDateChange={handleDateShippedChange}
                    errorsArr={requestErrors}
                    setErrorsArr={setRequestErrors}
                />
                <InputText
                    inputName="Комментарий"
                    name="comment"
                    defaultValue={requestInputs.comment}
                    handleInputChange={handleInputChange}
                    errorsArr={requestErrors}
                    setErrorsArr={setRequestErrors}
                />
                <div className="edit_request_lepsari__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_request_lepsari__submit" type="submit" onClick={handleSubmit} value="Обновить данные" />
            </form>
        </div>
    );
};

export default EditRequestLepsari;