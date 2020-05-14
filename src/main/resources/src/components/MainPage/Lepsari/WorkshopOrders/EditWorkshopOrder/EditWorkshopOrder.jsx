import React, { useState, useEffect } from 'react';
import './EditWorkshopOrder.scss';
import '../../../../../utils/Form/Form.scss';
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';
import ImgLoader from '../../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx';
import SelectItems from '../../../../../utils/Form/SelectItems/SelectItems.jsx';
import { getOrderById, editOrder, editProductInOrder, addProductToOrder, deleteProductFromOrder } from '../../../../../utils/RequestsAPI/Workshop/Orders.jsx';
import Button from '../../../../../utils/Form/Button/Button.jsx';

const EditWorkshopOrder = (props) => {
    const [formInputs, setFormInputs] = useState({
        name: '',
        status: 'ordered',
        deliverBy: new Date(new Date().setDate(new Date().getDate() + 7)), //Прибавляем 7 дней к сегодняшнему числу
        products: [],
        productsNew: [],
        assembly: '',
        date: new Date(),
    });
    const [formErrors, setFormErrors] = useState({
        name: false,
        // products: false,
        date: false,
        deliverBy: false
    });
    const [validInputs, setValidInputs] = useState({
        name: true,
        // products: false,
        date: true,
        deliverBy: true
    });
    const [orderId, setOrderId] = useState(0);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'date':
                setValidInputs({
                    ...validInputs,
                    date: (value !== null)
                });
                break;
            case 'deliverBy':
                setValidInputs({
                    ...validInputs,
                    date: (value !== null)
                });
                break;
            case 'products':
                setValidInputs({
                    ...validInputs,
                    products: (value.length > 0)
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
            name: false,
            // products: false,
            date: false,
            deliverBy: false
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
        setFormErrors(newErrors);
        if (check === true) {
            return true;
        }
        else {
            // alert("Форма не заполнена");
            setIsLoading(false);
            setShowError(true);
            return false;
        };
    }

    const handleSubmit = (event) => {
        // event.preventDefault();
        setIsLoading(true);
        // console.log(formInputs);
        formIsValid() && editOrder({
            ...formInputs,
            date: new Date(formInputs.date).getTime() / 1000,
            deliverBy: new Date(formInputs.deliverBy).getTime() / 1000
        }, formInputs.id)
            .then(() => {
                //PUT if edited, POST if product is new
                Promise.all(formInputs.productsNew.map((selected) => {
                    let edited = false;
                    formInputs.products.map((item) => {
                        if (item.id === selected.id) {
                            edited = true;
                            return;
                        }
                    });
                    return (edited === true)
                        ? (
                            editProductInOrder({
                                ...selected,
                                equipmentId: formInputs.id
                            }, selected.id)
                        )
                        : (
                            addProductToOrder({
                                equipmentId: formInputs.id,
                                ...selected
                            })
                        )
                }))
                    .then(() => {
                        //DELETE products removed by user
                        Promise.all(formInputs.products.map((item) => {
                            let deleted = true;
                            formInputs.productsNew.map((selected) => {
                                if (selected.id === item.id) {
                                    deleted = false;
                                    return;
                                }
                            })
                            return (deleted === true && deleteProductFromOrder(item.id));
                        }))
                            .then(() => {
                                setIsLoading(false);
                                props.history.push("/lepsari/workshop-orders")
                            })
                    })
            })
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setFormInputs({
            ...formInputs,
            [name]: value
        })
        setFormErrors({
            ...formErrors,
            [name]: false
        })
    }

    useEffect(() => {
        document.title = "Редактирование заказа Лепсари";
        const id = props.history.location.pathname.split("/lepsari/workshop-orders/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс заказа!');
            props.history.push("/lepsari/workshop-orders");
        } else {
            setOrderId(id);
            getOrderById(id)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    setFormInputs({
                        ...formInputs,
                        productsNew: res.products,
                        ...res
                    });
                })
        }
    }, [])

    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="new-workshop-order">
            <div className="main-form">
                <div className="main-form__title">Редактирование заказа</div>
                <div className="main-form__form">
                    <ErrorMessage
                        message="Не заполнены все обязательные поля!"
                        showError={showError}
                        setShowError={setShowError}
                    />
                    <InputDate
                        inputName="Дата создания"
                        required
                        error={formErrors.date}
                        name="date"
                        selected={Date.parse(formInputs.date)}
                        handleDateChange={(date) => {
                            validateField("date", date);
                            setFormInputs({
                                ...formInputs,
                                date: date
                            })
                            setFormErrors({
                                ...formErrors,
                                date: false
                            })
                        }}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                    />
                    <InputText
                        inputName="Наименование"
                        required
                        error={formErrors.name}
                        defaultValue={formInputs.name}
                        name="name"
                        handleInputChange={handleInputChange}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                    />
                    <InputText
                        inputName="Комплектация"
                        name="assembly"
                        defaultValue={formInputs.assembly}
                        handleInputChange={handleInputChange}
                    />
                    <InputDate
                        inputName="Дата поставки"
                        required
                        error={formErrors.deliverBy}
                        name="deliverBy"
                        selected={Date.parse(formInputs.deliverBy)}
                        handleDateChange={(date) => {
                            validateField("deliverBy", date);
                            setFormInputs({
                                ...formInputs,
                                deliverBy: date
                            })
                            setFormErrors({
                                ...formErrors,
                                deliverBy: false
                            })
                        }}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                    />
                    <SelectItems
                        inputName="Продукция"
                        userHasAccess={props.userHasAccess}
                        defaultValue={formInputs.products}
                        required
                        onChange={(value) => {
                            validateField("products", value);
                            setFormInputs({
                                ...formInputs,
                                productsNew: value
                            })
                            setFormErrors({
                                ...formErrors,
                                products: value
                            })
                        }}
                        error={formErrors.products}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                    />
                    <div className="main-form__item">
                        <div className="main-form__input_name">Статус</div>
                        <div className="main-form__input_field">
                            <select
                                name="status"
                                onChange={handleInputChange}
                                value={formInputs.status}
                            >
                                <option value="ordered">Заказано</option>
                                <option value="sent">Отправлено</option>
                                <option value="problem">Проблема</option>
                                <option value="completed">Завершено</option>
                            </select>
                        </div>
                    </div>
                    <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                    <div className="main-form__buttons">
                        <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/lepsari/workshop-orders')} value="Вернуться назад" />
                        {/* <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Редактировать заказ" />
                        {isLoading && <ImgLoader />} */}
                        <Button
                            text="Редактировать запись"
                            isLoading={isLoading}
                            className="main-form__submit"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditWorkshopOrder;