import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import pdfMake from 'pdfmake';
import font from 'pdfmake/build/vfs_fonts';
import './ViewRequestLEMZ.scss';
import { getRequestLEMZById } from '../../../../utils/RequestsAPI/Workshop/LEMZ.jsx';
import InputProducts from '../../../../utils/Form/InputProducts/InputProducts.jsx';

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
    const [itemId, setItemId] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.history.push("/lemz/workshop-lemz");
    }

    useEffect(() => {
        document.title = "Просмотр заявки ЛЭМЗ";
        const id = props.history.location.pathname.split("/lemz/workshop-lemz/view/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс заявки!');
            props.history.push("/lemz/workshop-lemz");
        } else {
            setItemId(id);
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
                    props.history.push("/lemz/workshop-lemz");
                })
        }
    }, [])

    const getPdfText = () => {
        let testDate = new Date(requestInputs.date);
        var dd = {
            info: {
                title: 'Заявка ЛЭМЗ №' + itemId
            },
            content: [
                {
                    text: 'Заявка ЛЭМЗ №' + itemId + '\n',
                    alignment: 'center',
                    style: 'header',
                },
                {
                    text: [
                        {
                            text: 'Дата: ',
                            style: 'subheader'
                        },
                        {
                            text: (((testDate.getDate() < 10) ? ('0' + testDate.getDate()) : testDate.getDate())
                                + '.' + (((testDate.getMonth() + 1) < 10) ? ('0' + (testDate.getMonth() + 1)) : testDate.getMonth() + 1)
                                + '.' + testDate.getFullYear()) + '\n' + '\n',
                            style: 'regularText'
                        }
                    ],
                },
                {
                    text: 'Продукция: ',
                    style: 'subheader',
                    margin: [0, 0, 0, 5],
                },
                {
                    ol: requestInputs.requestProducts.map((item) => {
                        return {
                            text: [
                                'Название: ' + item.name + ', Кол-во: ' + item.quantity + ', Фасовка: ' + item.packaging,
                            ],
                            margin: [0, 0, 0, 5]
                        }
                    })
                },
                ('\n'),
                {
                    text: [
                        {
                            text: 'Кодовое слово: ',
                            style: 'subheader'
                        },
                        {
                            text: requestInputs.codeWord,
                            style: 'regularText'
                        }
                    ]
                },
            ],
            styles: {
                header: {
                    fontSize: 22,
                    bold: true
                },
                subheader: {
                    fontSize: 18,
                    bold: true
                },
                regularText: {
                    fontSize: 16
                },
            }
        }
        pdfMake.vfs = font.pdfMake.vfs;
        return dd;
    }

    const PrintRequest = (event) => {
        event.preventDefault();
        let dd = getPdfText();
        pdfMake.createPdf(dd).print();
    }

    const DownloadRequest = (event) => {
        event.preventDefault();
        let dd = getPdfText();
        let testDate = new Date(requestInputs.date);
        pdfMake.createPdf(dd).download('заявкаЛЭМЗ№' + itemId + '_' + (((testDate.getDate() < 10) ? ('0' + testDate.getDate()) : testDate.getDate())
            + '.' + (((testDate.getMonth() + 1) < 10) ? ('0' + (testDate.getMonth() + 1)) : testDate.getMonth() + 1)
            + '.' + testDate.getFullYear()) + '.pdf');
    }

    return (
        <div className="view_request_lemz">
            {/* <div className="view_request_lemz__title">Просмотр заявки ЛЭМЗ</div> */}
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
                <InputProducts
                    inputName="Продукция"
                    defaultValue={requestInputs.requestProducts}
                    readOnly
                />
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
                <div className="view_request_lemz__buttons">
                    <input className="view_request_lemz__submit" type="submit" onClick={handleSubmit} value="Вернуться назад" />
                    <input className="view_request_lemz__submit view_request_lemz__submit--inverted" type="submit" onClick={PrintRequest} value="Печать" />
                    <input className="view_request_lemz__submit view_request_lemz__submit--inverted" type="submit" onClick={DownloadRequest} value="Скачать" />
                </div>
            </form>
        </div>
    );
};

export default ViewRequestLEMZ;