import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import './ViewRequestLepsari.scss';
import { getRequestLepsariById } from '../../../../utils/RequestsAPI/Workshop/Lepsari.jsx'
import InputProducts from '../../../../utils/Form/InputProducts/InputProducts.jsx';

const ViewRequestLepsari = (props) => {
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
        props.history.push("/workshop-lepsari");
    }

    useEffect(() => {
        document.title = "Просмотр заявки Лепсари";
        const id = props.history.location.pathname.split("/workshop-lepsari/view/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс заявки!');
            props.history.push("/workshop-lepsari");
        } else {
            getRequestLepsariById(id)
                .then(res => res.json())
                .then(oldRequest => {
                    setRequestInputs({
                        date: oldRequest.date,
                        requestProducts: oldRequest.lepsariProducts,
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
                    props.history.push("/workshop-lepsari");
                })
        }
    }, [])

    return (
        <div className="view_request_lepsari">
            <div className="view_request_lepsari__title">Просмотр заявки Лепсари</div>
            <form className="view_request_lepsari__form">
                <div className="view_request_lepsari__item">
                    <div className="view_request_lepsari__input_name">Дата</div>
                    <div className="view_request_lepsari__input_field">
                        <DatePicker
                            selected={Date.parse(requestInputs.date)}
                            dateFormat="dd.MM.yyyy"
                            disabledKeyboardNavigation
                            readOnly
                        />
                    </div>
                </div>
                <InputProducts
                    inputName="Продукция"
                    defaultValue={requestInputs.requestProducts}
                    readOnly
                />
                <div className="view_request_lepsari__item">
                    <div className="view_request_lepsari__input_name">Кодовое слово</div>
                    <div className="view_request_lepsari__input_field">
                        <input type="text"
                            name="codeWord"
                            defaultValue={requestInputs.codeWord}
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_request_lepsari__item">
                    <div className="view_request_lepsari__input_name">Ответственный</div>
                    <div className="view_request_lepsari__input_field">
                        <input type="text"
                            name="responsible"
                            defaultValue={requestInputs.responsible}
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_request_lepsari__item">
                    <div className="view_request_lepsari__input_name">Статус</div>
                    <div className="view_request_lepsari__input_field">
                        <input type="text"
                            name="status"
                            defaultValue={requestInputs.status}
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_request_lepsari__item">
                    <div className="view_request_lepsari__input_name">Дата отгрузки</div>
                    <div className="view_request_lepsari__input_field">
                        <DatePicker
                            selected={Date.parse(requestInputs.shippingDate)}
                            dateFormat="dd.MM.yyyy"
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_request_lepsari__item">
                    <div className="view_request_lepsari__input_name">Комментарий</div>
                    <div className="view_request_lepsari__input_field">
                        <input type="text"
                            name="comment"
                            defaultValue={requestInputs.comment}
                            readOnly />
                    </div>
                </div>
                <input className="view_request_lepsari__submit" type="submit" onClick={handleSubmit} value="Вернуться назад" />
            </form>
        </div>
    );
};

export default ViewRequestLepsari;