import React, { useState, useEffect } from 'react';
import './NewClient.scss';
import '../../../../utils/Form/Form.scss';
import { getInfoByINN, getBIKByINN } from '../../../../utils/RequestsAPI/Clients.jsx';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';

const newClient = (props) => {
    const [clientInputs, setClientInputs] = useState({
        name: '',
        legalEntity: '',
        INN: '7707083893',
        KPP: '',
        OGRN: '',
        BIK: '',
        checkingAccount: '',
        legalAddress: '',
        factualAddress: '',
        contacts: '',
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
        INN: false,
        KPP: false,
        OGRN: false,
        BIK: false,
        checkingAccount: false,
        legalAddress: false,
        factualAddress: false,
        contacts: false,
        site: false,
        comment: false,
        storageAddress: false,
        WorkConditions: false,
        price: false,
        discount: false,
        check: false,
        workHistory: false
    });
    const [validInputs, setValidInputs] = useState({
        name: false,
        legalEntity: false,
        INN: false,
        KPP: false,
        OGRN: false,
        BIK: false,
        checkingAccount: false,
        legalAddress: false,
        factualAddress: false,
        contacts: false,
        site: false,
        comment: false,
        storageAddress: false,
        WorkConditions: false,
        price: false,
        discount: false,
        check: false,
        workHistory: false
    });

    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
            INN: false,
            KPP: false,
            OGRN: false,
            BIK: false,
            checkingAccount: false,
            legalAddress: false,
            factualAddress: false,
            contacts: false,
            site: false,
            comment: false,
            storageAddress: false,
            WorkConditions: false,
            price: false,
            discount: false,
            check: false,
            workHistory: false
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
        // console.log(clientInputs);
        // formIsValid() && addClient(clientInputs)
        //     .then(() => props.history.push("/clients"))
        //     .catch(error => {
        //         setIsLoading(false);
        //         alert('Ошибка при добавлении записи');
        //         console.log(error);
        //     })
        //Получаем данные о компании(Головной офис - MAIN BRANCH) по ИНН
        getInfoByINN({ query: clientInputs.INN, branch_type: 'MAIN' })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setIsLoading(false);
                if (res.suggestions.length > 0) {
                    let newData = Object.assign({
                        ...clientInputs,
                        name: res.suggestions[0].data.name.full,
                        KPP: res.suggestions[0].data.kpp,
                        OGRN: res.suggestions[0].data.ogrn,
                        legalAddress: res.suggestions[0].data.address.value,
                        legalEntity: res.suggestions[0].data.management.name
                    })
                    return newData;
                }
                else return null;
            })
            .then((newData) => {
                if (newData !== null) {
                    //Получаем БИК банка по названию компании
                    getBIKByINN({ query: newData.name })
                        .then(res => res.json())
                        .then(res => {
                            // console.log(res);
                            setIsLoading(false);
                            setClientInputs({
                                ...clientInputs,
                                ...newData,
                                BIK: res.suggestions[0].data.bic,
                            })
                        })
                }
                else {
                    alert("Не найдено данных с данным ИНН");
                }
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
                <form className="main-form__form">
                    <ErrorMessage
                        message="Не заполнены все обязательные поля!"
                        showError={showError}
                        setShowError={setShowError}
                    />
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
                    <InputText
                        inputName="Юридическое лицо"
                        required
                        name="legalEntity"
                        error={formErrors.legalEntity}
                        defaultValue={clientInputs.legalEntity}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="ИНН"
                        required
                        name="INN"
                        error={formErrors.INN}
                        defaultValue={clientInputs.INN}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="КПП"
                        required
                        name="KPP"
                        defaultValue={clientInputs.KPP}
                        error={formErrors.KPP}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="ОГРН"
                        required
                        name="OGRN"
                        error={formErrors.OGRN}
                        defaultValue={clientInputs.OGRN}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="БИК"
                        required
                        name="BIK"
                        error={formErrors.BIK}
                        defaultValue={clientInputs.BIK}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Расчетный счет"
                        required
                        name="checkingAccount"
                        error={formErrors.checkingAccount}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Юридический адрес"
                        required
                        name="legalAddress"
                        error={formErrors.legalAddress}
                        defaultValue={clientInputs.legalAddress}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Фактический адрес"
                        required
                        name="factualAddress"
                        error={formErrors.factualAddress}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Контактные лица"
                        required
                        name="contacts"
                        error={formErrors.contacts}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Сайт"
                        required
                        name="site"
                        error={formErrors.site}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Комментарий"
                        required
                        name="comment"
                        error={formErrors.comment}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Адрес склада"
                        required
                        name="storageAddress"
                        error={formErrors.storageAddress}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Условия работы"
                        name="WorkConditions"
                        error={formErrors.WorkConditions}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Прайс"
                        name="price"
                        error={formErrors.price}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Скидки"
                        required
                        name="discount"
                        error={formErrors.discount}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Акт сверки"
                        required
                        name="check"
                        error={formErrors.check}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="История работы"
                        required
                        name="workHistory"
                        error={formErrors.workHistory}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
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
                    <div className="main-form__buttons">
                        <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/clients')} value="Вернуться назад" />
                        <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Добавить клиента" />
                        {isLoading && <ImgLoader />}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default newClient;