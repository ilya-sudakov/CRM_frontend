import React, { useState, useEffect } from 'react';
import './NewClient.scss';
import '../../../../utils/Form/Form.scss';
import { addClient } from '../../../../utils/RequestsAPI/Clients.jsx';
import SelectLegalEntity from '../SelectLegalEntity/SelectLegalEntity.jsx';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import SelectContacts from '../SelectContacts/SelectContacts.jsx';
import CheckBox from '../../../../utils/Form/CheckBox/CheckBox.jsx';
import SelectClientCategory from '../ClientCategories/SelectClientCategory/SelectClientCategory.jsx';

const newClient = (props) => {
    const [clientInputs, setClientInputs] = useState({
        name: '',
        legalEntity: [],
        contacts: [],
        site: '',
        comment: '',
        storageAddress: '',
        WorkConditions: '',
        price: '',
        discount: '',
        check: '',
        workHistory: '',
        clientType: 'Активные'
    });
    const [formErrors, setFormErrors] = useState({
        name: false,
        legalEntity: false,
        contacts: false,
        site: false,
    });
    const [validInputs, setValidInputs] = useState({
        name: false,
        legalEntity: false,
        contacts: false,
        site: false,
    });

    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [curTab, setCurTab] = useState('clientData');

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

    const formIsValid = () => {
        let check = true;
        let newErrors = Object.assign({
            name: false,
            legalEntity: false,
            contacts: false,
            site: false,
        });
        for (let item in validInputs) {
            // console.log(item, validInputs[item]);            
            if (validInputs[item] === false) {
                check = false;
                newErrors = Object.assign({
                    ...newErrors,
                    [item]: true
                })
            }
        }
        setFormErrors(newErrors);
        if (check === true) {
            return true;
        }
        else {
            // alert("Форма не заполнена");
            setIsLoading(false);
            setShowError(true);
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        console.log(clientInputs);
        formIsValid() && addClient(clientInputs)
            .then(() => props.history.push("/clients"))
            .catch(error => {
                setIsLoading(false);
                alert('Ошибка при добавлении записи');
                console.log(error);
            })
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setClientInputs({
            ...clientInputs,
            [name]: value
        })
        setFormErrors({
            ...formErrors,
            [name]: false
        })
    }

    useEffect(() => {
        document.title = "Добавление клиента";
    })

    return (
        <div className="new_client">
            <div className="main-form">
                <div className="main-form__title">Новый клиент</div>
                <div className="main-form__header">
                    <div
                        className={curTab === 'workHistory' ? "main-form__menu-item main-form__menu-item--active" : "main-form__menu-item"}
                        onClick={() => {
                            setCurTab('workHistory');
                        }}
                    >История работы</div>
                    <div
                        className={curTab === 'clientData' ? "main-form__menu-item main-form__menu-item--active" : "main-form__menu-item"}
                        onClick={() => {
                            setCurTab('clientData');
                        }}
                    >Данные клиента</div>
                </div>
                <form className="main-form__form">
                    <ErrorMessage
                        message="Не заполнены все обязательные поля!"
                        showError={showError}
                        setShowError={setShowError}
                    />
                    {
                        curTab === 'workHistory'
                            ? <React.Fragment>
                            </React.Fragment>
                            : <React.Fragment>
                                <InputText
                                    inputName="Название"
                                    required
                                    name="name"
                                    error={formErrors.name}
                                    defaultValue={clientInputs.name}
                                    errorsArr={formErrors}
                                    setErrorsArr={setFormErrors}
                                    handleInputChange={handleInputChange}
                                />
                                {/* Добавление юридических лиц */}
                                <div className="main-form__item">
                                    <div className="main-form__input_name">Юридическое лицо*</div>
                                    <div className="main-form__input_field">
                                        <SelectLegalEntity
                                            handleLegalEntityChange={(value) => {
                                                validateField("legalEntity", value);
                                                setClientInputs({
                                                    ...clientInputs,
                                                    legalEntity: value
                                                })
                                            }}
                                            defaultValue={clientInputs.legalEntity}
                                            userHasAccess={props.userHasAccess}
                                        />
                                    </div>
                                </div>
                                {/* Добавление контактных лиц */}
                                <div className="main-form__item">
                                    <div className="main-form__input_name">Контактное лицо*</div>
                                    <div className="main-form__input_field">
                                        <SelectContacts
                                            handleContactsChange={(value) => {
                                                validateField("contacts", value);
                                                setClientInputs({
                                                    ...clientInputs,
                                                    contacts: value
                                                })
                                            }}
                                            defaultValue={clientInputs.contacts}
                                            userHasAccess={props.userHasAccess}
                                        />
                                    </div>
                                </div>
                                <InputText
                                    inputName="Сайт"
                                    required
                                    name="site"
                                    error={formErrors.site}
                                    errorsArr={formErrors}
                                    setErrorsArr={setFormErrors}
                                    defaultValue={clientInputs.site}
                                    handleInputChange={handleInputChange}
                                />
                                <InputText
                                    inputName="Комментарий"
                                    name="comment"
                                    defaultValue={clientInputs.comment}
                                    handleInputChange={handleInputChange}
                                />
                                <InputText
                                    inputName="Адрес склада"
                                    name="storageAddress"
                                    defaultValue={clientInputs.storageAddress}
                                    handleInputChange={handleInputChange}
                                />
                                <InputText
                                    inputName="Условия работы"
                                    name="WorkConditions"
                                    defaultValue={clientInputs.WorkConditions}
                                    handleInputChange={handleInputChange}
                                />
                                <InputText
                                    inputName="Прайс"
                                    name="price"
                                    defaultValue={clientInputs.price}
                                    handleInputChange={handleInputChange}
                                />
                                {/* <InputText
                        inputName="Скидки"
                        required
                        name="discount"
                        error={formErrors.discount}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    /> */}
                                <div className="main-form__item">
                                    <div className="main-form__input_name">Скидки</div>
                                    <div className="main-form__input_field main-form__input_field--vertical">
                                        <CheckBox
                                            text="Скидка №1"
                                            uniqueId={0}
                                            defaultChecked={true}
                                            onChange={(value) => {

                                            }}
                                        />
                                        <CheckBox
                                            text="Скидка №2"
                                            uniqueId={1}
                                            defaultChecked={true}
                                            onChange={(value) => {

                                            }}
                                        />
                                    </div>
                                </div>
                                <InputText
                                    inputName="Акт сверки"
                                    name="check"
                                    handleInputChange={handleInputChange}
                                    defaultValue={clientInputs.check}
                                />
                                {/* <InputText
                        inputName="История работы"
                        required
                        name="workHistory"
                        error={formErrors.workHistory}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    /> */}
                                <div className="main-form__item">
                                    <div className="main-form__input_name">Тип клиента*</div>
                                    <div className="main-form__input_field">
                                        <select
                                            name="clientType"
                                            onChange={handleInputChange}
                                            defaultValue={clientInputs.clientType}
                                        >
                                            <option value="Активные">Активные</option>
                                            <option value="Потенциальные">Потенциальные</option>
                                        </select>
                                    </div>
                                </div>
                                <SelectClientCategory
                                    inputName="Выбор категории клиента"
                                    required
                                    error={formErrors.category}
                                    userHasAccess={props.userHasAccess}
                                    windowName="select-category"
                                    name="category"
                                    handleCategoryChange={(value) => {
                                        validateField("category", value);
                                        setClientInputs({
                                            ...clientInputs,
                                            category: value
                                        })
                                        setFormErrors({
                                            ...formErrors,
                                            category: false
                                        })
                                    }}
                                    errorsArr={formErrors}
                                    setErrorsArr={setFormErrors}
                                    readOnly
                                />
                            </React.Fragment>
                    }
                    <div className="main-form__buttons">
                        <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/clients/categories')} value="Вернуться назад" />
                        <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Добавить клиента" />
                        {isLoading && <ImgLoader />}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default newClient;