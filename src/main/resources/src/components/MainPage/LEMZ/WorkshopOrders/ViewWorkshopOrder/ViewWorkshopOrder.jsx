import React, { useState, useEffect } from 'react';
import './ViewWorkshopOrder.scss';
import '../../../../../utils/Form/Form.scss';
import ErrorMessage from '../../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';
import ImgLoader from '../../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import InputDate from '../../../../../utils/Form/InputDate/InputDate.jsx';
import SelectItems from '../../../../../utils/Form/SelectItems/SelectItems.jsx';
import { getOrderById } from '../../../../../utils/RequestsAPI/Workshop/Orders.jsx';

const ViewWorkshopOrder = (props) => {
    const [formInputs, setFormInputs] = useState({
        name: '',
        status: 'ordered',
        deliverBy: new Date(new Date().setDate(new Date().getDate() + 7)), //Прибавляем 7 дней к сегодняшнему числу
        products: [{
            name: '',
            quantity: ''
        }],
        assembly: '',
        date: new Date(),
    });

    const [orderId, setOrderId] = useState(0);

    useEffect(() => {
        document.title = "Просмотр заказа ЛЭМЗ";
        const id = props.history.location.pathname.split("/lemz/workshop-orders/view/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс заказа!');
            props.history.push("/lemz/workshop-orders");
        } else {
            setOrderId(id);
            getOrderById(id)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    setFormInputs(res);
                })
        }
    }, [])

    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="new-workshop-order">
            <div className="main-form">
                <div className="main-form__title">Просмотр заказа</div>
                <div className="main-form__form">
                    <InputDate
                        inputName="Дата"
                        name="date"
                        selected={Date.parse(formInputs.date)}
                        readOnly
                    />
                    <InputText
                        inputName="Наименование"
                        defaultValue={formInputs.name}
                        name="name"
                        readOnly
                    />
                    <InputText
                        inputName="Комплектация"
                        name="assembly"
                        defaultValue={formInputs.assembly}
                        readOnly
                    />
                    <InputDate
                        inputName="Дата поставки"
                        readOnly
                        name="deliverBy"
                        selected={Date.parse(formInputs.deliverBy)}
                    />
                    <SelectItems
                        inputName="Продукция"
                        userHasAccess={props.userHasAccess}
                        defaultValue={formInputs.products}
                        readOnly
                    />
                    <div className="main-form__item">
                        <div className="main-form__input_name">Статус</div>
                        <div className="main-form__input_field">
                            <select
                                name="status"
                                value={formInputs.status}
                                disabled
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
                        <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/lemz/workshop-orders')} value="Вернуться назад" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewWorkshopOrder;