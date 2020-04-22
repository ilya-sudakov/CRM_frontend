import React, { useEffect, useState } from 'react';
import './EditProduct.scss';
import '../../../../utils/Form/Form.scss';
import { getProductById, editProduct } from '../../../../utils/RequestsAPI/Products.jsx';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import SelectCategory from '../SelectCategory/SelectCategory.jsx';
import { imgToBlobDownload, getDataUri } from '../../../../utils/functions.jsx'
import ImgLoader from '../../../../utils/TableView/ImgLoader/ImgLoader.jsx';
import FileUploader from '../../../../utils/Form/FileUploader/FileUploader.jsx';
import Button from '../../../../utils/Form/Button/Button.jsx';

const EditProduct = (props) => {
    const [productInputs, setProductInputs] = useState({
        name: "",
        item: "",
        weight: "",
        productionLocation: "ЦехЛЭМЗ",
        group: "",
        unit: "шт.",
        vendor: "",
        photo: "",
        category: "",
        packaging: "",
        comment: ""
    });
    const [productErrors, setProductErrors] = useState({
        name: false,
        category: false,
        comment: false,
        // productionLocation: false,
        packaging: false,
        photo: false,
        unit: false,
        weight: false
    })
    const [validInputs, setValidInputs] = useState({
        name: true,
        category: true,
        // comment: false,
        packaging: true,
        productionLocation: true,
        // photo: false,
        unit: true,
        weight: true
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
            name: false,
            category: false,
            packaging: false,
            unit: false,
            weight: false
        });
        for (let item in validInputs) {
            if (validInputs[item] === false) {
                check = false;
                newErrors = Object.assign({
                    ...newErrors,
                    [item]: true
                })
            }
        }
        setProductErrors(newErrors);
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
        // event.preventDefault();
        setIsLoading(true);
        // console.log(productInputs);        
        const id = props.history.location.pathname.split("/products/edit/")[1];
        formIsValid() && editProduct(productInputs, id)
            .then(() => props.history.push("/products"))
            .catch(error => {
                setIsLoading(false);
                alert('Ошибка при добавлении записи');
            })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
        setProductInputs({
            ...productInputs,
            [name]: value
        })
        setProductErrors({
            ...productErrors,
            [name]: false
        })
    }

    const handleCategoryChange = (value) => {
        validateField('category', value);
        setProductInputs({
            ...productInputs,
            category: value
        })
        setProductErrors({
            ...productErrors,
            category: false
        })
    }

    useEffect(() => {
        document.title = "Редактирование продукта";
        const id = props.history.location.pathname.split("/products/edit/")[1];
        if (isNaN(Number.parseInt(id))) {
            alert('Неправильный индекс заявки!');
            props.history.push("/products");
        } else {
            getProductById(id)
                .then(res => res.json())
                .then(oldProduct => {
                    setProductInputs({
                        name: oldProduct.name,
                        weight: oldProduct.weight,
                        unit: oldProduct.unit,
                        packaging: oldProduct.packaging,
                        vendor: oldProduct.vendor,
                        productionLocation: oldProduct.productionLocation,
                        category: oldProduct.category,
                        comment: oldProduct.comment,
                        photo: oldProduct.photo
                    });
                })
                .catch(error => {
                    console.log(error);
                    alert('Неправильный индекс заявки!');
                    props.history.push("/products");
                })
        }
    }, [])
    return (
        <div className="main-form">
            <div className="main-form__title">Редактирование продукта</div>
            <form className="main-form__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <div className="main-form__item">
                    <div className="main-form__input_name">Фотография</div>
                    <div className="main-form__product_img">
                        <img src={productInputs.photo} alt="" />
                        <div className="main-form__submit" onClick={() => imgToBlobDownload(productInputs.photo, (productInputs.name + '.jpeg'))}>Скачать картинку</div>
                    </div>
                </div>
                <InputText
                    inputName="Наименование"
                    required
                    error={productErrors.name}
                    name="name"
                    defaultValue={productInputs.name}
                    handleInputChange={handleInputChange}
                    errorsArr={productErrors}
                    setErrorsArr={setProductErrors}
                />
                <SelectCategory
                    inputName="Категория"
                    required
                    error={productErrors.category}
                    defaultValue={productInputs.category}
                    name="category"
                    handleCategoryChange={handleCategoryChange}
                    errorsArr={productErrors}
                    setErrorsArr={setProductErrors}
                    readOnly
                />
                <InputText
                    inputName="Вес изделия"
                    required
                    error={productErrors.weight}
                    defaultValue={productInputs.weight}
                    name="weight"
                    type="number"
                    handleInputChange={handleInputChange}
                    errorsArr={productErrors}
                    setErrorsArr={setProductErrors}
                />
                <InputText
                    inputName="Артикул"
                    defaultValue={productInputs.vendor}
                    name="vendor"
                    type="text"
                    handleInputChange={handleInputChange}
                />
                <div className="main-form__item">
                    <div className="main-form__input_name">Единица измерения*</div>
                    <div className="main-form__input_field">
                        <select
                            name="unit"
                            onChange={handleInputChange}
                            value={productInputs.unit}
                        >
                            <option value="шт.">Штук</option>
                            <option value="тыс. шт.">Тысяч Штук</option>
                            <option value="упак.">Упаковок</option>
                        </select>
                    </div>
                </div>
                <InputText
                    inputName="Упаковка"
                    required
                    defaultValue={productInputs.packaging}
                    error={productErrors.packaging}
                    name="packaging"
                    handleInputChange={handleInputChange}
                    errorsArr={productErrors}
                    setErrorsArr={setProductErrors}
                />
                <InputText
                    inputName="Комментарий"
                    name="comment"
                    defaultValue={productInputs.comment}
                    handleInputChange={handleInputChange}
                />
                <div className="main-form__item">
                    <div className="main-form__input_name">Место производства*</div>
                    <div className="main-form__input_field">
                        <select
                            name="productionLocation"
                            onChange={handleInputChange}
                            value={productInputs.productionLocation}
                        >
                            <option>ЦехЛЭМЗ</option>
                            <option>ЦехЛиговский</option>
                            <option>ЦехЛепсари</option>
                        </select>
                    </div>
                </div>
                <div className="main-form__item">
                    <div className="main-form__input_name">Фотография</div>
                    <FileUploader
                        regex={/.+\.(jpeg|jpg|png|img)/}
                        uniqueId={0}
                        onChange={async (result) => {
                            const downgraded = await getDataUri(result, "jpeg", 0.3);
                            setProductInputs({
                                ...productInputs,
                                photo: downgraded
                            })
                        }}
                    />
                </div>
                <div className="main-form__input_hint">* - поля, обязательные для заполнения</div>
                <div className="main-form__buttons">
                    <input className="main-form__submit main-form__submit--inverted" type="submit" onClick={() => props.history.push('/products')} value="Вернуться назад" />
                    {/* <input className="main-form__submit" type="submit" onClick={handleSubmit} value="Изменить данные" />
                    {isLoading && <ImgLoader />} */}
                    <Button
                        text="Изменить данные"
                        isLoading={isLoading}
                        className="main-form__submit"
                        onClick={handleSubmit}
                    />
                </div>
            </form>
        </div>
    );
};

export default EditProduct;