import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import './ViewRequestLEMZ.scss';
import { getRequestLEMZById } from '../../../../utils/utilsAPI.jsx';
import Select from '../../Select/Select.jsx';

const ViewRequestLEMZ = (props) => {
    const [requestInputs, setRequestInputs] = useState({
        date: "",
        requestProducts: "",
        // quantity: "",
        codeWord: "",
        responsible: "",
        status: "Не готово",
        shippingDate: "",
        comment: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        props.history.push("/workshop-lemz");
    }

    useEffect(() => {
        document.title = "Просмотр заявки ЛЭМЗ";
        const id = props.history.location.pathname.split("/workshop-lemz/view/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс заявки!');
            props.history.push("/workshop-lemz");
        } else {
            getRequestLEMZById(id)
                .then(res => res.json())
                .then(oldRequest => {
                    setRequestInputs({
                        date: oldRequest.date,
                        requestProducts: oldRequest.lemzProducts,
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
                    props.history.push("/workshop-lemz");
                })
        }
    }, [])

    return (
        <div className="view_request_lemz">
            <div className="view_request_lemz__title">Просмотр заявки ЛЭМЗ</div>
            <form className="view_request_lemz__form">
                <div className="view_request_lemz__item">
                    <div className="view_request_lemz__input_name">Дата</div>
                    <div className="view_request_lemz__input_field">
                        <DatePicker
                            selected={Date.parse(requestInputs.date)}
                            dateFormat="dd.MM.yyyy"
                            disabledKeyboardNavigation
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_request_lemz__item">
                    <div className="view_request_lemz__input_name">Продукция</div>
                    {/* <div className="view_request_lemz__input_field">
                        <input type="text"
                            name="products"
                            defaultValue={requestInputs.products}
                            readOnly
                        />
                    </div> */}
                    <Select
                        // options={products}
                        readOnly
                        defaultValue={requestInputs.requestProducts}
                    />
                </div>
                {/* <div className="view_request_lemz__item">
                    <div className="view_request_lemz__input_name">Количество</div>
                    <div className="view_request_lemz__input_field">
                        <input type="text"
                            name="quantity"
                            defaultValue={requestInputs.quantity}
                            readOnly
                        />
                    </div>
                </div> */}
                <div className="view_request_lemz__item">
                    <div className="view_request_lemz__input_name">Кодовое слово</div>
                    <div className="view_request_lemz__input_field">
                        <input type="text"
                            name="codeWord"
                            defaultValue={requestInputs.codeWord}
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_request_lemz__item">
                    <div className="view_request_lemz__input_name">Ответственный</div>
                    <div className="view_request_lemz__input_field">
                        <input type="text"
                            name="responsible"
                            defaultValue={requestInputs.responsible}
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_request_lemz__item">
                    <div className="view_request_lemz__input_name">Статус</div>
                    <div className="view_request_lemz__input_field">
                        <input type="text"
                            name="status"
                            defaultValue={requestInputs.status}
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_request_lemz__item">
                    <div className="view_request_lemz__input_name">Дата отгрузки</div>
                    <div className="view_request_lemz__input_field">
                        <DatePicker
                            selected={Date.parse(requestInputs.shippingDate)}
                            dateFormat="dd.MM.yyyy"
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_request_lemz__item">
                    <div className="view_request_lemz__input_name">Комментарий</div>
                    <div className="view_request_lemz__input_field">
                        <input type="text"
                            name="comment"
                            defaultValue={requestInputs.comment}
                            readOnly />
                    </div>
                </div>
                <input className="view_request_lemz__submit" type="submit" onClick={handleSubmit} value="Вернуться назад" />
            </form>
        </div>
    );
};

export default ViewRequestLEMZ;