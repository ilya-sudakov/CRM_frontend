import React, { useState, useEffect } from 'react';
import './NewPriceList.scss';
import '../../../../utils/Form/Form.scss';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';

const NewPriceList = (props) => {
    const [priceListInputs, setPriceListInputs] = useState({
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
        console.log(priceListInputs);
        formIsValid() && addClient(priceListInputs)
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
        setPriceListInputs({
            ...priceListInputs,
            [name]: value
        })
        setFormErrors({
            ...formErrors,
            [name]: false
        })
    }

    useEffect(() => {
        document.title = "Добавление продукции";
    })

    return (
        <div className="new_client">
            <div className="main-form">
                <div className="main-form__title">Новая продукция</div>
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
                        defaultValue={priceListInputs.name}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    {/* Картинка */}
                    <InputText
                        inputName="Описание"
                        required
                        name="description"
                        error={formErrors.description}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    {/* SelectPriceProduct */}
                    <div className="main-form__item">
                        <div className="main-form__input_name">Тип местоположения*</div>
                        <div className="main-form__input_field">
                            <input type="checkbox" id="contactChoice1"
                                name="contact" value="Фасад" onChange={handleInputChange}
                                defaultValue={priceListInputs.locationType}></input>
                            <label for="contactChoice1">Фасад</label>
                            <input type="checkbox" id="contactChoice2"
                                name="contact" value="Терасса" onChange={handleInputChange}
                                defaultValue={priceListInputs.locationType}></input>
                            <label for="contactChoice2">Терасса</label>
                        </div>
                    </div>
                    <InputText
                        inputName="Ссылка на продукцию"
                        required
                        name="linkAddress"
                        error={formErrors.linkAddress}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <InputText
                        inputName="Примечание"
                        required
                        name="infoText"
                        error={formErrors.infoText}
                        errorsArr={formErrors}
                        setErrorsArr={setFormErrors}
                        handleInputChange={handleInputChange}
                    />
                    <div className="main-form__item">
                        <div className="main-form__input_name">Категория*</div>
                        <div className="main-form__input_field">
                            <select
                                name="category"
                                onChange={handleInputChange}
                                defaultValue={priceListInputs.category}
                            >
                                <option>Крепеж для деревянных досок</option>
                                <option>Крепеж для ДПК досок</option>
                                <option>Крепежные инструменты</option>
                            </select>
                        </div>
                    </div>
                    <div className="main-form__buttons">
                        <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/price-list')} value="Вернуться назад" />
                        <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Добавить продукцию" />
                        {isLoading && <ImgLoader />}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPriceList;