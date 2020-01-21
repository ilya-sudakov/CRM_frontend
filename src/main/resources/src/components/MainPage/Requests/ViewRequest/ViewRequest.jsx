import React, { useEffect, useState } from 'react';
import pdfMake from 'pdfmake';
import font from 'pdfmake/build/vfs_fonts';
import DatePicker from 'react-datepicker';
import './ViewRequest.scss';
import { getRequestById } from '../../../../utils/RequestsAPI/Requests.jsx';
import InputProducts from '../../../../utils/Form/InputProducts/InputProducts.jsx';

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

    const getPdfText = () => {
        let testDate = new Date(requestInputs.date);
        let productsArr = requestInputs.requestProducts.map((item) => {
            return [item.name, item.quantity, item.packaging]
        })
        var dd = {
            info: {
                title: 'Заявка №' + itemId
            },
            content: [
                {
                    text: 'Заявка №' + itemId + '\n',
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
                    // ol: requestInputs.requestProducts.map((item) => {
                    //     return {
                    //         text: 'Название: ' + item.name + ', Кол-во: ' + item.quantity + ', Фасовка: ' + item.packaging,
                    //         margin: [0, 0, 0, 5]
                    //     }
                    // })
                    table: {
                        widths: ['*', 125, 125],
                        body: [
                            [
                                { text: 'Название', style: 'tableHeader' },
                                { text: 'Кол-во', style: 'tableHeader' },
                                { text: 'Фасовка', style: 'tableHeader' }
                            ],
                            ...productsArr
                        ]
                    }
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
                tableHeader: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'center'
                }
            }
        }
        pdfMake.vfs = font.pdfMake.vfs;
        return dd;
    }

    const PrintRequest = (event) => {
        event.preventDefault();
        let dd = getPdfText();
        pdfMake.createPdf(dd).print();
        // const pdfDocGenerator = pdfMake.createPdf(dd);
        // pdfDocGenerator.getDataUrl((data) => {
        //     var iframe = "<iframe width='100%' height='100%' src='" + data + "'></iframe>"
        //     var x = window.open();
        //     x.document.open();
        //     x.document.write(iframe);
        //     x.document.close();
        // });
    }

    const DownloadRequest = (event) => {
        event.preventDefault();
        let dd = getPdfText();
        let testDate = new Date(requestInputs.date);
        pdfMake.createPdf(dd).download('заявка№' + itemId + '_' + (((testDate.getDate() < 10) ? ('0' + testDate.getDate()) : testDate.getDate())
            + '.' + (((testDate.getMonth() + 1) < 10) ? ('0' + (testDate.getMonth() + 1)) : testDate.getMonth() + 1)
            + '.' + testDate.getFullYear()) + '.pdf');
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