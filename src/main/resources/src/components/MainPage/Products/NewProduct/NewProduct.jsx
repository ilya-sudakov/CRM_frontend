import React, { useEffect, useState } from 'react';
import './NewProduct.scss';
import { addProduct } from '../../../../utils/utilsAPI.jsx';

const NewProduct = (props) => {
    const [productInputs, setProductInputs] = useState({
        name: null,
        typeOfProduct: "FIRST",
        comment: null,
        packaging: null,
        photo: "",
        unit: "шт.",
        weight: null,
    })
    const [productErrors, setProductErrors] = useState({
        name: "",
        type_of_product: "",
        comment: "",
        packaging: "",
        photo: "",
        unit: "",
        weight: ""
    })
    const [imgName, setImgName] = useState("Имя файла...");
    const [imgBASE64, setImgBASE64] = useState('');
    const [nameValid, setNameValid] = useState(false);
    const [typeOfProductValid, setTypeOfProductValid] = useState(true);
    const [weightValid, setWeightValid] = useState(false);

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'name':
                setNameValid(value !== "");
                break;
            case 'typeOfProduct':
                setTypeOfProductValid(value !== "");
                break;
            case 'weight':
                setWeightValid(value !== "");
                break;
        }
    }

    const formIsValid = () => {
        if (nameValid && typeOfProductValid && weightValid) {
            return true;
        }
        else {
            alert("Форма не заполнена");
            return false;
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(productInputs);
        
        formIsValid() && addProduct(productInputs)
            .then(() => props.history.push("/products"))
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        validateField(name, value);
        setProductInputs({
            ...productInputs,
            [name]: value
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

    useEffect(() => {
        document.title = "Создание продукции";
    }, [])
    return (
        <div className="new_product">
            <div className="new_product__title">Новая продукция</div>
            <form className="new_product__form">
                <div className="new_product__item">
                    <div className="new_product__input_name">Наименование*</div>
                    <div className="new_product__input_field">
                        <input type="text" name="name" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                {/* <div className="new_product__item">
                    <div className="new_product__input_name">Артикул</div>
                    <div className="new_product__input_field">
                        <input type="text" name="item" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div> */}
                <div className="new_product__item">
                    <div className="new_product__input_name">Группа продукции*</div>
                    <div className="new_product__input_field">
                        {/* <input type="text" name="typeOfProduct" autoComplete="off" onChange={handleInputChange} /> */}
                        <select
                            name="typeOfProduct"
                            onChange={handleInputChange}
                            defaultValue={productInputs.typeOfProduct}
                        >
                            <option value="FIRST">Первая группа</option>
                            <option value="SECOND">Вторая группа</option>
                            <option value="THIRD">Третья группа</option>
                        </select>
                    </div>
                </div>
                <div className="new_product__item">
                    <div className="new_product__input_name">Вес изделия*</div>
                    <div className="new_product__input_field">
                        <input type="number" name="weight" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_product__item">
                    <div className="new_product__input_name">Единица измерения*</div>
                    <div className="new_product__input_field">
                        {/* <input type="text" name="unit" autoComplete="off" onChange={handleInputChange} /> */}
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
                <div className="new_product__item">
                    <div className="new_product__input_name">Упаковка*</div>
                    <div className="new_product__input_field">
                        <input type="text" name="packaging" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="new_product__item">
                    <div className="new_product__input_name">Комментарий</div>
                    <div className="new_product__input_field">
                        <input type="text" name="comment" autoComplete="off" onChange={handleInputChange} />
                    </div>
                </div>
                {/* <div className="new_product__input_field">
                    <input type="text" name="photo" autoComplete="off" readOnly onChange={handleInputChange} />
                </div> */}
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
                <input className="new_product__submit" type="submit" onClick={handleSubmit} value="Оформить заявку" />
            </form>
        </div>
    );
};

export default NewProduct;