import React, { useEffect, useState } from 'react';
import './NewProduct.scss';
import { addProduct } from '../../../../utils/RequestsAPI/Products.jsx';
import InputText from '../../../../utils/Form/InputText/InputText.jsx';
import ErrorMessage from '../../../../utils/Form/ErrorMessage/ErrorMessage.jsx';
import FormWindow from '../../../../utils/Form/FormWindow/FormWindow.jsx';
import SelectCategory from '../SelectCategory/SelectCategory.jsx';

const NewProduct = (props) => {
    const [productInputs, setProductInputs] = useState({
        name: null,
        category: null,
        comment: null,
        packaging: null,
        photo: "",
        unit: "шт.",
        productionLocation: 'ЦехЛЭМЗ',
        weight: null,
    })
    const [productErrors, setProductErrors] = useState({
        name: false,
        category: false,
        // comment: false,
        packaging: false,
        photo: false,
        unit: false,
        weight: false
    })
    const [validInputs, setValidInputs] = useState({
        name: false,
        category: false,
        // comment: false,
        packaging: false,
        photo: true,
        unit: true,
        weight: false
    })
    const [imgName, setImgName] = useState("Имя файла...");
    const [imgBASE64, setImgBASE64] = useState('');
    const [showError, setShowError] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'category':
                setValidInputs({
                    ...validInputs,
                    category: (value !== '')
                });
                break;
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
            // comment: false,
            packaging: false,
            photo: false,
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
        console.log(productInputs);
        formIsValid() && addProduct(productInputs)
            .then(() => {

            })
            .then(() => props.history.push("/products"))
            .catch(error => {
                alert('Ошибка при добавлении записи');
            })
    }

    const handleInputChange = e => {
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
        document.title = "Создание продукции";
    }, [])

    return (
        <div className="new_product">
            <div className="new_product__title">Новая продукция</div>
            <form className="new_product__form">
                {productInputs.photo && <div className="new_product__item">
                    <div className="new_product__input_name">Фотография</div>
                    <div className="new_product__product_img">
                        <img src={productInputs.photo} alt="" />
                    </div>
                </div>}
                <ErrorMessage
                    message="Не заполнены все обязательные поля!"
                    showError={showError}
                    setShowError={setShowError}
                />
                <InputText
                    inputName="Наименование"
                    required
                    error={productErrors.name}
                    name="name"
                    handleInputChange={handleInputChange}
                    errorsArr={productErrors}
                    setErrorsArr={setProductErrors}
                />
                <SelectCategory
                    inputName="Категория"
                    required
                    error={productErrors.category}
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
                    type="number"
                    name="weight"
                    handleInputChange={handleInputChange}
                    errorsArr={productErrors}
                    setErrorsArr={setProductErrors}
                />
                <div className="new_product__item">
                    <div className="new_product__input_name">Единица измерения*</div>
                    <div className="new_product__input_field">
                        <select
                            name="unit"
                            onChange={handleInputChange}
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
                    error={productErrors.packaging}
                    name="packaging"
                    handleInputChange={handleInputChange}
                    errorsArr={productErrors}
                    setErrorsArr={setProductErrors}
                />
                <InputText
                    inputName="Комментарий"
                    name="comment"
                    handleInputChange={handleInputChange}
                />
                <div className="new_product__item">
                    <div className="new_product__input_name">Место производства*</div>
                    <div className="new_product__input_field">
                        <select
                            name="productionLocation"
                            onChange={handleInputChange}
                        >
                            <option>ЦехЛЭМЗ</option>
                            <option>ЦехЛиговский</option>
                            <option>ЦехЛепсари</option>
                        </select>
                    </div>
                </div>
                <div className="new_product__item">
                    <div className="new_product__input_name">Фотография</div>
                    <div className="new_product__file_upload">
                        <div className="new_product__file_name">
                            {imgName}
                        </div>
                        <label className="new_product__label" htmlFor="file">
                            Загрузить файл
                                {/* <img className="logo" src={fileUploadImg} alt="" /> */}
                        </label>
                        <input type="file" name="file" id="file" onChange={handleFileInputChange} />
                    </div>
                </div>
                <div className="new_product__input_hint">* - поля, обязательные для заполнения</div>
                <input className="new_product__submit" type="submit" onClick={handleSubmit} value="Добавить продукцию" />
            </form>
        </div>
    );
};

export default NewProduct;