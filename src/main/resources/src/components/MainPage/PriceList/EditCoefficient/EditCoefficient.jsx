import React, { useEffect, useState } from 'react';
import './EditCoefficient.scss';
import '../../../../utils/Form/Form.scss';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import { getPriceListCoefficient, editPriceListCoefficient } from '../../../../utils/RequestsAPI/PriceList/PriceList.jsx';
import { withRouter } from 'react-router-dom';

const EditCoefficient = (props) => {
    const [coefficientInputs, setCoefficientInputs] = useState({
        retailPrice: 1,
        dealerPrice: 0.56,
        distributorPrice: 0.485,
        partnerPrice: 0.79,
        stopPrice: 0.4545,
        lessThan5000Price: 0.89,
        lessThan1500Price: 0.96,
    })

    const [coefficientErrors, setCoefficientErrors] = useState({
        retailPrice: false,
        dealerPrice: false,
        distributorPrice: false,
        partnerPrice: false,
        stopPrice: false,
        lessThan5000Price: false,
        lessThan1500Price: false,
    })
    const [validInputs, setValidInputs] = useState({
        retailPrice: true,
        dealerPrice: true,
        distributorPrice: true,
        partnerPrice: true,
        stopPrice: true,
        lessThan5000Price: true,
        lessThan1500Price: true,
    })
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
            retailPrice: false,
            dealerPrice: false,
            distributorPrice: false,
            partnerPrice: false,
            stopPrice: false,
            lessThan5000Price: false,
            lessThan1500Price: false,
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
        setCoefficientErrors(newErrors);
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
        formIsValid() && editPriceListCoefficient(coefficientInputs)
            .then(() => {
                props.setCloseWindow(!props.closeWindow);
                props.setShowWindow(!props.showWindow);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                alert('Ошибка при добавлении записи');
                console.log(error);
            })
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setCoefficientInputs({
            ...coefficientInputs,
            [name]: value
        })
        setCoefficientErrors({
            ...coefficientErrors,
            [name]: false
        })
    }

    useEffect(() => {
        getPriceListCoefficient()
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                setCoefficientInputs({ ...res });
            })
        props.setShowWindow && props.setShowWindow(false);
    }, [props.closeWindow])

    return (
        <div className="main-form">
            {/* <div className="main-form__title">Редактирование детали</div> */}
            <form className="main-form__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputText
                    inputName="Розница"
                    required
                    type="number"
                    error={coefficientErrors.retailPrice}
                    name="retailPrice"
                    defaultValue={coefficientInputs.retailPrice}
                    handleInputChange={handleInputChange}
                    errorsArr={coefficientErrors}
                    setErrorsArr={setCoefficientErrors}
                />
                <InputText
                    inputName="До 1500 шт."
                    required
                    type="number"
                    error={coefficientErrors.lessThan1500Price}
                    name="lessThan1500Price"
                    defaultValue={coefficientInputs.lessThan1500Price}
                    handleInputChange={handleInputChange}
                    errorsArr={coefficientErrors}
                    setErrorsArr={setCoefficientErrors}
                />
                <InputText
                    inputName="До 5000 шт."
                    required
                    type="number"
                    error={coefficientErrors.lessThan5000Price}
                    name="lessThan5000Price"
                    defaultValue={coefficientInputs.lessThan5000Price}
                    handleInputChange={handleInputChange}
                    errorsArr={coefficientErrors}
                    setErrorsArr={setCoefficientErrors}
                />
                <InputText
                    inputName="Партнер"
                    required
                    type="number"
                    error={coefficientErrors.partnerPrice}
                    name="partnerPrice"
                    defaultValue={coefficientInputs.partnerPrice}
                    handleInputChange={handleInputChange}
                    errorsArr={coefficientErrors}
                    setErrorsArr={setCoefficientErrors}
                />
                <InputText
                    inputName="Дилер"
                    required
                    type="number"
                    error={coefficientErrors.dealerPrice}
                    name="dealerPrice"
                    defaultValue={coefficientInputs.dealerPrice}
                    handleInputChange={handleInputChange}
                    errorsArr={coefficientErrors}
                    setErrorsArr={setCoefficientErrors}
                />
                <InputText
                    inputName="Дистрибутор"
                    required
                    type="number"
                    error={coefficientErrors.distributorPrice}
                    name="distributorPrice"
                    defaultValue={coefficientInputs.distributorPrice}
                    handleInputChange={handleInputChange}
                    errorsArr={coefficientErrors}
                    setErrorsArr={setCoefficientErrors}
                />
                <InputText
                    inputName="Стопцена"
                    required
                    type="number"
                    error={coefficientErrors.stopPrice}
                    name="stopPrice"
                    defaultValue={coefficientInputs.stopPrice}
                    handleInputChange={handleInputChange}
                    errorsArr={coefficientErrors}
                    setErrorsArr={setCoefficientErrors}
                />
                <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => {
                        props.setCloseWindow(!props.closeWindow);
                        props.setShowWindow(!props.showWindow)
                    }} value="Закрыть" />
                    <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Изменить коэффициенты" />
                    {isLoading && <ImgLoader />}
                </div>
            </form>
        </div>
    );
};

export default EditCoefficient;