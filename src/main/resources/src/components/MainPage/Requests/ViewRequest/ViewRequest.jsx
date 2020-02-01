import React, { useEffect, useState } from 'react';
import pdfMake from 'pdfmake';
import DatePicker from 'react-datepicker';
import PrintIcon from '../../../../../../../../assets/print.png';
import DownloadIcon from '../../../../../../../../assets/download.png';
import './ViewRequest.scss';
import '../../../../utils/Form/Form.scss';
import { getRequestById } from '../../../../utils/RequestsAPI/Requests.jsx';
import InputProducts from '../../../../utils/Form/InputProducts/InputProducts.jsx';
import { formatDateString, getRequestPdfText } from '../../../../utils/functions.jsx';

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
        let dd = getRequestPdfText(requestInputs.date, requestInputs.requestProducts, requestInputs.codeWord, '', itemId);
        pdfMake.createPdf(dd).print();
    }

    const DownloadRequest = (event) => {
        event.preventDefault();
        let dd = getRequestPdfText(requestInputs.date, requestInputs.requestProducts, requestInputs.codeWord, '', itemId);
        pdfMake.createPdf(dd).download('заявка№' + itemId + '_' + formatDateString(requestInputs.date) + '.pdf');
    }

    return (
        <div className="view-request">
            <div className="main-form">
                <div className="main-form__title">Просмотр заявки</div>
                <form className="main-form__form">
                    <div className="main-form__item">
                        <div className="main-form__input_name">Дата</div>
                        <div className="main-form__input_field">
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
                    <div className="main-form__item">
                        <div className="main-form__input_name">Кодовое слово</div>
                        <div className="main-form__input_field">
                            <input type="text"
                                name="codeWord"
                                defaultValue={requestInputs.codeWord}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="main-form__item">
                        <div className="main-form__input_name">Ответственный</div>
                        <div className="main-form__input_field">
                            <input type="text"
                                name="responsible"
                                defaultValue={requestInputs.responsible}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="main-form__item">
                        <div className="main-form__input_name">Статус</div>
                        <div className="main-form__input_field">
                            <input type="text"
                                name="status"
                                value={requestInputs.status}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="main-form__buttons">
                        <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Вернуться назад" />
                        <button className="main-form__submit main-form__submit--inverted" onClick={PrintRequest} >
                            <img className="main-form__img" src={PrintIcon} alt="" />
                            <span>Печать</span>
                        </button>
                        <button className="main-form__submit main-form__submit--inverted" onClick={DownloadRequest}>
                            <img className="main-form__img" src={DownloadIcon} alt="" />
                            <span>Скачать</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ViewRequest;