import React, { useState, useEffect } from 'react';
import './ViewFeedback.scss';
import '../../../../utils/Form/Form.scss';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import InputDate from '../../../../utils/Form/InputDate/InputDate.jsx';
import FeedbackChat from '../FeedbackChat/FeedbackChat.jsx';
import { getFeedbackById } from '../../../../utils/RequestsAPI/Feedback/feedback';
import { addMessage } from '../../../../utils/RequestsAPI/Feedback/messages';

const ViewFeedback = (props) => {
    const [formInputs, setFormInputs] = useState({
        date: new Date(),
        subject: '',
        text: '',
        author: props.userData.username,
        status: 'in-progress',
        messages: []
    });
    const [formErrors, setFormErrors] = useState({
        subject: false,
        text: false,
    })
    const [validInputs, setValidInputs] = useState({
        subject: false,
        text: false,
    })
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [feedbackId, setFeedbackId] = useState(0)

    useEffect(() => {
        // const data = {
        //     date: new Date(),
        //     subject: 'Тема  ылвоар ылвоа ылвоа',
        //     text: 'ыл во арлвыоп лвплыопрдыапр ыдшгпрукшщгрущш гмрвдш м выщшмрвыа шпгвщ шгв пщшврг щшвг щвшм выщшрмвыщшмивщшир ',
        //     author: props.userData.username,
        //     status: 'В процессе',
        //     messages: [
        //         {
        //             id: 1,
        //             date: new Date(1485134558 * 1000),
        //             author: 'Аркадий',
        //             text: 'у менеджеров не наполняется база. некоторые фирмы проходят, некоторые нет. по нескольку раз заполняюты'
        //         },
        //         {
        //             id: 2,
        //             date: new Date(),
        //             author: 'Аркадий',
        //             text: 'Необходимо быстро исправить'
        //         },
        //         {
        //             id: 2,
        //             date: new Date(),
        //             author: 'Аркадий',
        //             text: 'Необходимо быстро исlkправить'
        //         },
        //         {
        //             id: 2,
        //             date: new Date(1525134558 * 1000),
        //             author: 'Аркадий',
        //             text: 'Необходимо быстро испраlskd fdslkfвить'
        //         },
        //         {
        //             id: 2,
        //             date: new Date(),
        //             author: 'Аркадий',
        //             text: 'Необходимо быстро исправ 20838 492834 u9ить'
        //         },
        //         {
        //             id: 2,
        //             date: new Date(),
        //             author: 'Аркадий',
        //             text: 'Необходимо быстро исправить lkjf kjfgkjdfgkjdfhgkjdh fkjgh dfjg aksjh lasjdk flasjkdfh lksadjfhl kasjd fhlkasjdfh ljkadh flsadjfh lasjdkfh sladjkfh aslkdjfh asldjkfh asldkjfh askdjfhaslk d'
        //         },
        //         {
        //             id: 3,
        //             date: new Date(),
        //             author: 'Евгений',
        //             text: 'Добрый вечер, конечно сделаем'
        //         }
        //     ]
        // }
        document.title = "Просмотр обсуждения";
        const id = props.history.location.pathname.split("/feedback/view/")[1];
        setFeedbackId(id);
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс обсуждения!');
            props.history.push("/feedback");
        } else {
            loadData(id);
        }
    }, [])

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

    const validateField = (fieldName, value) => {
        switch (fieldName) {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formInputs);
    }

    const loadData = (id) => {
        setIsLoading(true);
        getFeedbackById(id)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setFormInputs({
                    date: res.date,
                    subject: res.subject,
                    text: res.text,
                    author: res.author,
                    status: res.status,
                    messages: res.messages ? res.messages : []
                });
                setIsLoading(false);
            })
    }

    return (
        <div className="view-feedback">
            <div className="main-form">
                <div className="main-form__title">Просмотр обсуждения</div>
                <form className="main-form__form">
                    <InputDate
                        inputName="Дата"
                        readOnly
                        selected={Date.parse(formInputs.date)}
                    />
                    <InputText
                        inputName="Автор"
                        defaultValue={formInputs.author}
                        readOnly
                    />
                    {props.userHasAccess(['ROLE_ADMIN'])
                        ? <div className="main-form__item">
                            <div className="main-form__input_name">Статус</div>
                            <div className="main-form__input_field">
                                <select
                                    name="status"
                                    onChange={() => {

                                    }}
                                    value={formInputs.status}
                                >
                                    <option value="in-progress">В процессе</option>
                                    <option value="completed">Завершено</option>
                                    <option value="urgent">Срочно</option>
                                </select>
                            </div>
                        </div>
                        : <InputText
                            inputName="Статус"
                            defaultValue={formInputs.status}
                            readOnly
                        />
                    }
                    <InputText
                        inputName="Тема"
                        defaultValue={formInputs.subject}
                        readOnly
                    />
                    <InputText
                        inputName="Сообщение"
                        type="textarea"
                        defaultValue={formInputs.text}
                        readOnly
                    />
                    <FeedbackChat
                        messages={formInputs.messages}
                        handleSubmit={(message) => {
                            addMessage({
                                author: props.userData.username,
                                date: new Date().getTime() / 1000,
                                text: message,
                                discussionId: feedbackId
                            })
                                .then(() => {
                                    loadData(feedbackId);
                                })
                        }}
                    />
                    <div className="main-form__buttons">
                        <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/feedback')} value="Вернуться назад" />
                        {/* <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Добавить обсуждение" /> */}
                        {isLoading && <ImgLoader />}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ViewFeedback;