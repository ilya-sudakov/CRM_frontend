import React, { useState, useEffect } from 'react';
import './RecordAction.scss';
import '../../../../../utils/Form/Form.scss';
import ImgLoader from '../../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import InputText from '../../../../../utils/Form/InputText/InputText.jsx';

const RecordAction = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [curForm, setCurForm] = useState('');

    useEffect(() => {
        props.setShowWindow && props.setShowWindow(false);
    }, [props.closeWindow])

    return (
        <div className="record-action">
            <div className="main-form">
                <div className="main-form__form">
                    {curForm == '' && <React.Fragment>
                        <div className="main-form__title">Выберите совершенное действие:</div>
                        <div className="main-form__buttons main-form__buttons--full">
                            <input className="main-form__submit" type="submit" onClick={() => {
                                setCurForm('Исходящий звонок');
                            }} value="Исходящий звонок" />
                            <input className="main-form__submit" type="submit" onClick={() => {
                                setCurForm('Входящий звонок');
                            }} value="Входящий звонок" />
                            <input className="main-form__submit" type="submit" onClick={() => {
                                setCurForm('Письмо');
                            }} value="Письмо" />
                            <input className="main-form__submit" type="submit" onClick={() => {
                                setCurForm('Другое');
                            }} value="Другое" />
                            {isLoading && <ImgLoader />}
                        </div>
                    </React.Fragment>}
                    {
                        curForm === 'Исходящий звонок'
                            ? <OutgoingCall />
                            : curForm === 'Входящий звонок'
                                ? <IncomingCall />
                                : curForm === 'Письмо'
                                    ? <MailForm />
                                    : curForm === 'Другое'
                                    && <MiscellaneousForm />
                    }
                    <div className="main-form__buttons main-form__buttons--full">
                        <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => {
                            // props.setShowWindow(!props.showWindow);
                            // props.setCloseWindow(!props.closeWindow);
                            curForm !== '' ? setCurForm('') : props.setCloseWindow(!props.closeWindow);
                        }} value={curForm === '' ? "Закрыть окно" : "Вернуться назад"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const OutgoingCall = (props) => {
    const handleInputChange = () => {

    }

    return (
        <div className="outgoing-call">
            <div className="main-form">
                <div className="main-form__title">Исходящий звонок</div>
                <div className="main-form__form">
                    <InputText
                        inputName="Имя клиента"
                        defaultValue={''}
                        name="name"
                        type="text"
                        handleInputChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

const IncomingCall = (props) => {
    const handleInputChange = () => {

    }
    return (
        <div className="incoming-call">
            <div className="main-form">
                <div className="main-form__title">Входящий звонок</div>
                <div className="main-form__form">
                    <InputText
                        inputName="Имя клиента"
                        defaultValue={''}
                        name="name"
                        type="text"
                        handleInputChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

const MailForm = (props) => {
    const handleInputChange = () => {

    }
    return (
        <div className="mail-form">
            <div className="main-form">
                <div className="main-form__title">Письмо</div>
                <div className="main-form__form">
                    <InputText
                        inputName="Имя клиента"
                        defaultValue={''}
                        name="name"
                        type="text"
                        handleInputChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

const MiscellaneousForm = (props) => {
    const handleInputChange = () => {

    }
    return (
        <div className="miscellaneous-form">
            <div className="main-form">
                <div className="main-form__title">Другое</div>
                <div className="main-form__form">
                    <InputText
                        inputName="Имя клиента"
                        defaultValue={''}
                        name="name"
                        type="text"
                        handleInputChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default RecordAction;