import React, { useState, useEffect } from 'react';
import './NewRequestLepsari.scss';
import '../../../../utils/Form/Form.scss';
import InputDate from '../../../../utils/Form/InputDate/InputDate.jsx';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import InputUser from '../../../../utils/Form/InputUser/InputUser.jsx';
import InputProducts from '../../../../utils/Form/InputProducts/InputProducts.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import { addProductsToRequestLepsari, addRequestLepsari } from '../../../../utils/RequestsAPI/Workshop/Lepsari.jsx';

const NewRequestLepsari = (props) => {
    const [requestInputs, setRequestInputs] = useState({
        date: new Date(),
        codeWord: "",
        responsible: "",
        status: "Ожидание",
        shippingDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        comment: ''
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
        requestProducts: false,
        codeWord: false,
        responsible:  (props.userHasAccess(['ROLE_ADMIN']) ? false : true),
        shippingDate: true
    })
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
                    requestProducts: (value !== [])
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
        let id = 0;
        // console.log(requestInputs);
        formIsValid() && addRequestLepsari(requestInputs)
            .then(res => res.json())
            .then(res => {
                console.log('addedRequest');
                
                id = res.id;
            })
            .then(() => {
                const productsArr = requestInputs.requestProducts.map((item) => {
                    return addProductsToRequestLepsari({
                        requestId: id,
                        quantity: item.quantity,
                        packaging: item.packaging,
                        status: item.status,
                        name: item.name
                    })
                })
                Promise.all(productsArr)
                    .then(() => props.history.push("/lepsari/workshop-lepsari"))
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
        setRequestErrors({
            ...requestErrors,
            [name]: false
        })
    }

    useEffect(() => {
        document.title = "Создание заявки Лепсари";
        // console.log(props.transferState, props.transferData);
        //Если есть перенос данных, то добавляем их в state
        if (props.transferState === true && props.transferData !== null) {
            props.setTransferState(false);
            setRequestInputs({
                date: props.transferData.date,
                requestProducts: props.transferData.requestProducts,
                quantity: props.transferData.quantity,
                codeWord: props.transferData.codeWord,
                responsible: props.transferData.responsible,
                status: props.transferData.status,
                shippingDate: new Date(new Date(props.transferData.date).setDate(new Date(props.transferData.date).getDate() + 7)),
                comment: '',
            });
            setValidInputs({
                date: true,
                requestProducts: true,
                codeWord: true,
                responsible: true,
                shippingDate: true
            });
        }
    }, [])

    const handleDateChange = (date) => {
        const regex = "(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.[12]\d{3})";
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

    const handleDateShippedChange = (date) => {
        const regex = "(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.[12]\d{3})";
        validateField("date", date);
        setRequestInputs({
            ...requestInputs,
            shippingDate: date
        })
        setRequestErrors({
            ...requestErrors,
            shippingDate: false
        })
    }

    const handleProductsChange = (newProducts) => {
        validateField("requestProducts", newProducts)
        setRequestInputs({
            ...requestInputs,
            requestProducts: newProducts
        })
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

    return (
        <div className="main-form">
            <div className="main-form__title">Новая заявка Лепсари</div>
            <form className="main-form__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputDate
                    inputName="Дата заявки"
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
                    options
                    name="requestProducts"
                    onChange={handleProductsChange}
                    error={requestErrors.requestProducts}
                    defaultValue={requestInputs.requestProducts}
                    searchPlaceholder="Введите название продукта для поиска..."
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
                    defaultValue={requestInputs.responsible}
                    name="responsible"
                    handleUserChange={handleResponsibleChange}
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
                            <option value="Завершено">Завершено</option>
                            <option value="Частично готово">Частично готово</option>
                            <option value="Отгружено">Отгружено</option>
                            <option value="Приоритет">Приоритет</option>
                        </select>
                    </div>
                </div>
                <InputDate
                    inputName="Дата отгрузки"
                    name="shippingDate"
                    selected={requestInputs.shippingDate}
                    handleDateChange={handleDateShippedChange}
                    errorsArr={requestErrors}
                    setErrorsArr={setRequestErrors}
                />
                <InputText
                    inputName="Комментарий"
                    name="comment"
                    handleInputChange={handleInputChange}
                    errorsArr={requestErrors}
                    setErrorsArr={setRequestErrors}
                />
                <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/lepsari/workshop-lepsari')} value="Вернуться назад" />
                    <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Оформить заявку" />
                </div>
            </form>
        </div>
    );
};

export default NewRequestLepsari;