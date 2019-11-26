import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import './ViewRequest.scss';
import { getRequestById } from '../../../../utils/utilsAPI.jsx';

const ViewRequest = (props) => {
    const [requestId, setRequestId] = useState(1);
    const [requestInputs, setRequestInputs] = useState({
        date: "",
        products: "",
        quantity: "",
        codeWord: "",
        responsible: "",
        status: "Не готово"
    })

    useEffect(() => {
        document.title = "Просмотр заявки";
        const id = props.history.location.pathname.split("/requests/view/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс заявки!');
            props.history.push("/requests");
        } else {
            setRequestId(id);
            getRequestById(id)
                .then(res => res.json())
                .then(oldRequest => {
                    setRequestInputs({
                        date: oldRequest.date,
                        products: oldRequest.products,
                        quantity: oldRequest.quantity,
                        codeWord: oldRequest.codeWord,
                        responsible: oldRequest.responsible,
                        status: oldRequest.status
                    });
                })
                .catch(error => {
                    console.log(error);
                    alert('Неправильный индекс заявки!');
                    props.history.push("/requests");
                })
        }
    }, [])

    return (
        <div className="new_request">
            <div className="new_request__title">Редактирование заявки</div>
            <form className="new_request__form">
                <div className="new_request__item">
                    <div className="new_request__input_name">Дата</div>
                    <div className="new_request__input_field">
                        <DatePicker
                            selected={Date.parse(requestInputs.date)}
                            dateFormat="dd.MM.yyyy"
                            disabledKeyboardNavigation
                            readOnly
                        />
                    </div>
                </div>
                <div className="new_request__item">
                    <div className="new_request__input_name">Продукция</div>
                    <div className="new_request__input_field">
                        <input type="text"
                            name="products"
                            defaultValue={requestInputs.products}
                            readOnly
                        />
                    </div>
                </div>
                <div className="new_request__item">
                    <div className="new_request__input_name">Количество</div>
                    <div className="new_request__input_field">
                        <input type="text"
                            name="quantity"
                            defaultValue={requestInputs.quantity}
                            readOnly
                        />
                    </div>
                </div>
                <div className="new_request__item">
                    <div className="new_request__input_name">Кодовое слово</div>
                    <div className="new_request__input_field">
                        <input type="text"
                            name="codeWord"
                            defaultValue={requestInputs.codeWord}
                            readOnly
                        />
                    </div>
                </div>
                <div className="new_request__item">
                    <div className="new_request__input_name">Ответственный</div>
                    <div className="new_request__input_field">
                        <input type="text"
                            name="responsible"
                            defaultValue={requestInputs.responsible}
                            readOnly
                        />
                    </div>
                </div>
                <div className="new_request__item">
                    <div className="new_request__input_name">Статус</div>
                    <div className="new_request__input_field">
                        <input type="text"
                            name="status"
                            defaultValue={requestInputs.status}
                            readOnly
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ViewRequest;