import React, { useEffect, useState } from 'react';
import pdfMake from 'pdfmake';
import DatePicker from 'react-datepicker';
import './ViewRequest.scss';
import { getRequestById } from '../../../../utils/RequestsAPI/Requests.jsx';
import InputProducts from '../../../../utils/Form/InputProducts/InputProducts.jsx';
import { formatDateString, getPdfText } from '../../../../utils/functions.jsx';

const ViewRequest = (props) => {
    const [requestInputs, setRequestInputs] = useState({
        date: "",
        requestProducts: "",
        codeWord: "",
        responsible: "",
        status: ""
    })
    const [itemId, setItemId] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.history.push("/requests");
    }

    useEffect(() => {
        document.title = "Просмотр заявки";
        const id = props.history.location.pathname.split("/requests/view/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс заявки!');
            props.history.push("/requests");
        } else {
            setItemId(id);
            getRequestById(id)
                .then(res => res.json())
                .then(oldRequest => {
                    setRequestInputs({
                        date: oldRequest.date,
                        requestProducts: oldRequest.requestProducts,
                        // quantity: oldRequest.quantity,
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

    const PrintRequest = (event) => {
        event.preventDefault();
        let dd = getPdfText(requestInputs.date, requestInputs.requestProducts, requestInputs.codeWord, '', itemId);
        pdfMake.createPdf(dd).print();
    }

    const DownloadRequest = (event) => {
        event.preventDefault();
        let dd = getPdfText(requestInputs.date, requestInputs.requestProducts, requestInputs.codeWord, '', itemId);
        pdfMake.createPdf(dd).download('заявка№' + itemId + '_' + formatDateString(requestInputs.date) + '.pdf');
    }

    return (
        <div className="view_request">
            <div className="view_request__title">Просмотр заявки</div>
            <form className="view_request__form">
                <div className="view_request__item">
                    <div className="view_request__input_name">Дата</div>
                    <div className="view_request__input_field">
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
userHasAccess={props.userHasAccess}                    
                    defaultValue={requestInputs.requestProducts}
                    readOnly
                />
                <div className="view_request__item">
                    <div className="view_request__input_name">Кодовое слово</div>
                    <div className="view_request__input_field">
                        <input type="text"
                            name="codeWord"
                            defaultValue={requestInputs.codeWord}
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_request__item">
                    <div className="view_request__input_name">Ответственный</div>
                    <div className="view_request__input_field">
                        <input type="text"
                            name="responsible"
                            defaultValue={requestInputs.responsible}
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_request__item">
                    <div className="view_request__input_name">Статус</div>
                    <div className="view_request__input_field">
                        <input type="text"
                            name="status"
                            defaultValue={requestInputs.status}
                            readOnly
                        />
                    </div>
                </div>
                <div className="view_request__buttons">
                    <input className="view_request__submit" type="submit" onClick={handleSubmit} value="Вернуться назад" />
                    <input className="view_request__submit view_request__submit--inverted" type="submit" onClick={PrintRequest} value="Печать" />
                    <input className="view_request__submit view_request__submit--inverted" type="submit" onClick={DownloadRequest} value="Скачать" />
                </div>
            </form>
        </div>
    );
};

export default ViewRequest;