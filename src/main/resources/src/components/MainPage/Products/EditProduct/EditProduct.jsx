import React, { useEffect, useState } from 'react';
import './EditProduct.scss';
import { getProductById, editProduct } from '../../../../utils/RequestsAPI/Products.jsx';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import SelectCategory from '../SelectCategory/SelectCategory.jsx';
import { imgToBlobDownload } from '../../../../utils/functions.jsx'

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
    const [imgName, setImgName] = useState("Имя файла...");
    const [imgBASE64, setImgBASE64] = useState('');
    const [showError, setShowError] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            default:
                setValidInputs({
                    ...validInputs,
                    [fieldName]: (value !== "")
                });
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
            setShowError(true);
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(productInputs);        
        const id = props.history.location.pathname.split("/products/edit/")[1];
        formIsValid() && editProduct(productInputs, id)
            .then(() => props.history.push("/products"))
            .catch(error => {
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

    const handleFileInputChange = (event) => {
        let regex = /.+\.(jpeg|jpg|png|img)/;
        let file = event.target.files[0];
        if (file.name.match(regex) !== null) {
            setImgName(file.name);
            let reader = new FileReader();
            reader.onloadend = (() => {
                // setImgBASE64(reader.result.split("base64,")[1]);
                setImgBASE64(reader.result);
                setProductInputs({
                    ...productInputs,
                    // photo: reader.result.split("base64,")[1]
                    photo: reader.result
                })
            });
            reader.readAsDataURL(file);
        }
        else {
            setImgName('Некорректный формат файла!');
        }
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
        <div className="edit_product">
            <div className="edit_product__title">Редактирование продукта</div>
            <form className="edit_product__form">
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <div className="edit_product__item">
                    <div className="edit_product__input_name">Фотография</div>
                    <div className="edit_product__product_img">
                        <img src={productInputs.photo} alt="" />
                        <div className="edit_product__submit" onClick={() => imgToBlobDownload(productInputs.photo, (productInputs.name + '.jpeg'))}>Скачать картинку</div>
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
                <div className="edit_product__item">
                    <div className="edit_product__input_name">Единица измерения*</div>
                    <div className="edit_product__input_field">
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
                <div className="edit_product__item">
                    <div className="edit_product__input_name">Место производства*</div>
                    <div className="edit_product__input_field">
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
                <div className="edit_product__item">
                    <div className="edit_product__input_name">Фотография</div>
                    <div className="edit_product__file_upload">
                        <div className="edit_product__file_name">
                            {imgName}
                        </div>
                        <label className="edit_product__label" htmlFor="file">
                            Загрузить файл
                                {/* <img className="logo" src={fileUploadImg} alt="" /> */}
                        </label>
                        <input type="file" name="file" id="file" onChange={handleFileInputChange} />
                    </div>
                </div>
                <div className="edit_product__input_hint">* - поля, обязательные для заполнения</div>
                <input className="edit_product__submit" type="submit" onClick={handleSubmit} value="Изменить данные" />
            </form>
        </div>
    );
};

export default EditProduct;